const { VacinaModel } = require("../models");
const { Token } = require("../utils");
const { getToken } = require("../middlewares");
const Usuario = require("../models/usuario");

class VacinaController {
    async create(req, res) {
        const token = await getToken(req);
        if(token.perfil != 'admin'){
          return res
          .status(400)
          .json({ error: ["Você não tem permisão para essa solicitação"] });
        }
        let { nome } = req.body;
        nome = (nome || "").toString().trim();
        if (nome === "") {
            return res
                .status(400)
                .json({ error: ["Forneça o nome da vacina."] });
        }
        return await VacinaModel.create({ nome })
            .then(async (r) => {
                const { nome } = r.get();
                return res.status(200).json({ nome });
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
            return await VacinaModel.findAndCountAll({
                attributes: ["idvacina", "nome"],
                order: [["nome", "ASC"]],
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
        async remove(req, res) {
            const token = await getToken(req);
        
            if (!token || !token.idusuario) {
              return res.status(401).json({ error: ["Efetue o login para continuar"] });
            }

            if(token.perfil != 'admin'){
              return res
              .status(400)
              .json({ error: ["Você não tem permisão para essa solicitação"] });
            }
        
            let { idvacina } = req.body;
            idvacina = (idvacina || "").toString().replace(/[^\d]+/g, "");
            if (idvacina === "") {
              return res
                .status(400)
                .json({ error: ["Forneça a identificação da vacina"] });
            }
        
            return await VacinaModel.findOne({ where: { idvacina } })
              .then(async (vacinas) => {
                if (vacinas !== null) {
                  await vacinas.destroy();
                  return res.status(200).json({ idvacina });
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

          async updatevacina(req, res) {
            const token = await getToken(req);
            if (!token || !token.idusuario) {
              return res.status(401).json({ error: ["Efetue o login para continuar"] });
            }
            
            if(token.perfil != 'admin'){
              return res
              .status(400)
              .json({ error: ["Você não tem permisão para essa solicitação"] });
            }
        
            let { idvacina, nome } = req.body;
            idvacina = (idvacina || "").toString().replace(/[^\d]+/g, "");
            nome = (nome || "").toString().trim();

            if (idvacina === "") {
              return res.status(400).json({ error: ["Vacina não identificada"] });
            }
        
            if (nome === "") {
              return res.status(400).json({ error: ["Forneça o novo nome"] });
            }
        
            return await VacinaModel.findOne({
              where: { idvacina },
            })
              .then(async (vacinas) => {
                if (vacinas) {
                  await vacinas.update({ nome });
                  return res.status(200).json({
                    nome,
                  });
                }
                return res.status(400).json({ error: ["Nome não identificado"] });
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
    }
        module.exports = VacinaController;