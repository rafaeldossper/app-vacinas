const router = require("express").Router();
const { RegistroController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
const { create, list, updateregistro, remove } = new RegistroController();

router.use(authMiddleware);

// curl -X POST -d http://localhost:3100/registro/create
router.post("/create", create);

// curl -X GET -d http://localhost:3100/registro/list
router.get("/list", list);

// curl -X PUT -d http://localhost:3100/registro/updateregistro
router.put("/updateregistro", updateregistro);

// curl -X DELETE -d http://localhost:3100/registro/remove
router.delete("/remove", remove);

router.use((req, res) => {
    res.status(400).json({ error: ['Operação desconhecida com o usuário'] });
})

module.exports = router;