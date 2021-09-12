const UsuarioModel = require("./usuario");
const RegistroModel = require("./registro");
const VacinaModel = require("./vacina");

//importa o arquivo database/index.js
const database = require("../database");


//Fazendo relacionamento de usuario e registro
UsuarioModel.hasMany(RegistroModel, {
  foreignKey: {
    name: "idusuario",
    allowNull: false,
  },
  sourceKey: "idusuario",
  onDelete: "cascade",
  onUpdate: "cascade",
  hooks: true, //usado para forçar o cascade no onDelete
});
RegistroModel.belongsTo(UsuarioModel, {
  foreignKey: "idusuario",
  targetKey: "idusuario",
});

//Fazendo relacionamento de vacina e registro
VacinaModel.hasMany(RegistroModel, {
  foreignKey: {
    name: "idvacina",
    allowNull: false,
  },
  sourceKey: "idvacina",
  onDelete: "cascade",
  onUpdate: "cascade",
  hooks: true, //usado para forçar o cascade no onDelete
});
RegistroModel.belongsTo(VacinaModel, {
  foreignKey: "idvacina",
  targetKey: "idvacina",
}); 

//cria as tabelas no SGBD se elas não existirem
database.sync();

module.exports = {
  UsuarioModel,
  RegistroModel,
  VacinaModel,
};