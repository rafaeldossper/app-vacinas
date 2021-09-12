## Aplicação back-end
Aplicação Node com o objetivo de fazer o controle de cadastro de usuários e seus registros de vacina.

### Utilizando:
- Pacote Express
- Restrição de acesso utilizando JWT (JSON Web Token)
- ORM Sequelize (Object-Relational Mapper) para persistir os dados no BD;
- Banco de dados PostgreSQL na cloud ElephantSQL;
- Deploy da aplicação Node no Heroku.

### Requisitos:
> 1 -  O usuário efetua o seu próprio cadastro; <br /> 
2 - O usuário efetua login;<br /> 
3 - O usuário altera mail e senha;<br /> 
4 - O e-mail é único;<br /> 
5 - O usuário admin possui a função de cadastrar, editar, excluir e listar as vacinas;<br /> 
6 - Somente o usuário admin pode mudar o perfil de acesso de outros usuários;<br /> 
7 - O usuário comum não pode cadastrar vacinas;<br /> 
8 - O usuário registra que foi vacinado fornecendo a identificação da vacina e a data no formato YYYY-MMDD;<br /> 
9 - O usuário pode editar e excluir os seus registros de vacinação;<br /> 
10 - O usuário pode listar os registros de vacina em ordem decrescente de data;<br /> 
11 - O usuário possui acesso a somente os seus próprios registros de vacinação;<br /> 
12 - Todas as operações requerem login;<br /> 
13 - Os dados precisam ser persistidos no SGBD PostreSQL da cloud ElephantSQL;<br /> 
14 - Fazer deploy da aplicação na cloud do Heroku.<br /> 

### Modelagem dos Dados:
![](https://github.com/rafaeldossper/app-vacinas/blob/main/Imagem/Modelagem.png)
