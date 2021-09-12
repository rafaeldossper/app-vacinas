const router = require("express").Router();
const { UsuarioController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
// const { create, login, updatemail, updatesenha } = new UsuarioController();
const { create, login, updatemail, updatesenha, updateperfil } = new UsuarioController();

// curl -X POST -d http://localhost:3100/usuario/create
router.post("/create", create);

// curl -X GET -d http://localhost:3100/usuario/login
router.get("/login", login);

router.use(authMiddleware);

// curl -X PUT -d http://localhost:3100/usuario/update/mail
router.put("/update/mail", updatemail);

// curl -X PUT -d http://localhost:3100/usuario/update/senha
router.put("/update/senha", updatesenha);

// curl -X PUT -d http://localhost:3100/usuario/update/perfil
router.put("/update/perfil", updateperfil);

router.use((req, res) => {
    res.status(400).json({ error: ['Operação desconhecida com o usuário'] });
})

module.exports = router;