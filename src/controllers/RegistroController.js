const { RegistroModel } = require("../models");
const { getToken } = require("../middlewares");

class RegistroController {
    async create(req, res) {
        const token = await getToken(req);
        let { idvacina, data } = req.body;
        idvacina = (idvacina || "").toString().trim();
        data = (data || "").toString().trim();
        if (idvacina === "") {
            return res
                .status(400)
                .json({ error: ["Forneça o identificado da vacina."] });
        }
        if (data === "") {
            return res
                .status(400)
                .json({ error: ["Forneça a data da vacina."] });
        }
        return await RegistroModel.create({ idvacina, data, idusuario: token.idusuario })
            .then(async (r) => {
                const { idregistro, idvacina, data, idusuario } = r.get();
                return res.status(200).json({ idregistro, idvacina, data, idusuario });
            })
            .catch((err) => {
                try {
                    return res.status(400).json({
                        error: err.errors.map((item) => item.message),
                        type: "validation",
                    });
                } catch (e) {
                    return res.status(400).json({ error: [e.message] });
                }
            });
        }     
        async list(req, res) {
            let { limit, offset } = req.body;
            const token = await getToken(req);
            return await RegistroModel.findAndCountAll({
                where: {idusuario: token.idusuario},
                attributes: ["idvacina", "idregistro", "data"],
                order: [["data", "DESC"]],
                offset,
                limit,
            })
                .then((vacinas) => {
                    return res.status(200).json({
                        vacinas: vacinas.rows.map((item) => item.get()),
                        count: vacinas.count,
                    });
                })
                .catch((e) => {
                    return res.status(400).json({ error: [e.message] });
                });
        }
        async updateregistro(req, res) {
            const token = await getToken(req);
            if (!token || !token.idusuario) {
              return res.status(401).json({ error: ["Efetue o login para continuar"] });
            }
        
            let { idregistro, data } = req.body;
            idregistro = (idregistro || "").toString().replace(/[^\d]+/g, "");
            data = (data || "").toString().trim();

            if (idregistro === "") {
              return res.status(400).json({ error: ["Registro não identificado"] });
            }
        
            if (data === "") {
              return res.status(400).json({ error: ["Forneça a nova data"] });
            }
        
            return await RegistroModel.findOne({
              where: { idusuario: token.idusuario, idregistro },
            })
              .then(async (registros) => {
                if (registros) {
                  await registros.update({ data });
                  return res.status(200).json({
                    data,
                  });
                }
                return res.status(400).json({ error: ["Data não identificado"] });
              })
              .catch((err) => {
                  console.log(err.message)
                try {
                  return res.status(400).json({
                    error: err.errors.map((item) => item.message),
                    type: "validation",
                  });
                } catch (e) {
                  return res.status(400).json({ error: [e.message] });
                }
              });
          }
          async remove(req, res) {
            const token = await getToken(req);
            if (!token || !token.idusuario) {
              return res.status(401).json({ error: ["Efetue o login para continuar"] });
            }
          
            let { idregistro } = req.body;
            idregistro = (idregistro || "").toString().replace(/[^\d]+/g, "");
            if (idregistro === "") {
              return res
                .status(400)
                .json({ error: ["Forneça a identificação do registro"] });
            }
        
            return await RegistroModel.findOne({ where: { idusuario: token.idusuario, idregistro } })
              .then(async (registros) => {
                if (registros !== null) {
                  await registros.destroy();
                  return res.status(200).json({ idregistro });
                } else {
                  return res.status(400).json({ error: ["Registro inexistente"] });
                }
              })
              .catch((err) => {
                try {
                  return res.status(400).json({
                    error: err.errors.map((item) => item.message),
                    type: "validation",
                  });
                } catch (e) {
                  return res.status(400).json({ error: [e.message] });
                }
              });
          }
    }
        module.exports = RegistroController;