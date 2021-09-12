const router = require("express").Router();
const { VacinaController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
const { create, list, remove, updatevacina } = new VacinaController();

router.use(authMiddleware);

// curl -X POST -d http://localhost:3100/vacina/creat
router.post("/create", create);

// curl -X GET -d http://localhost:3100/vacina/list
router.get("/list", list);

// curl -X DELETE -d http://localhost:3100/vacina/remove
router.delete("/remove", remove);

// curl -X PUT -d http://localhost:3100/vacina/updatevacina
router.put("/updatevacina", updatevacina);

router.use((req, res) => {
    res.status(400).json({ error: ['Operação desconhecida com o usuário'] });
})

module.exports = router;