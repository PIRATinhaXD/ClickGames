const express = require('express');
const server = express();
const path = require('path');
const Login = require('./public/js/login');
const database = require('./db');
const Perfil = require('./public/js/perfil');
const Register = require('./public/js/register');
const bodyParser = require('body-parser');
const alert = require('alert');

server.use(express.static(path.join(__dirname, "public")));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

(async() =>{
        
    try{
        const resultado = await database.sync();
        console.log(resultado);

                const resultadoCreateLogin = await Login.create({
                    password: '12345678',
                    username: 'Vitor'
                })
        
        
                const resultadoCreateRegister = await Register.create({
                    password: '12345678',
                    email: 'vitoremanuelxs753@gmail.com',
                    username: 'Vitor'
                })
        
        console.log(resultadoCreateLogin);
        console.log(resultadoCreateRegister);

    } catch(error){
        console.log(error);
    }
})();

server.post('/logar', async(req, res)=>{
    const selectUsuario = await Perfil.findOne({
        where: {
            login: req.body.username,
            senha: req.body.password
        }
    });

    if(selectUsuario !== null){
        res.sendFile(path.join(__dirname='/public/pages/index.html'))
    } else {
        alert("Login ou senha incorretos");
        res.sendFile(path.join(__dirname='/public/pages/login.html'))
    }

})

server.post('/salvarPerfil', async(req, res)=>{
    const createPerfil = await Perfil.create({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        telefone: req.body.telefone,
        bairro: req.body.bairro,
        rua: req.body.rua,
        cep: req.body.cep,
        estado: req.body.estado,
        email: req.body.email,
        pais: req.body.pais,
        login: req.body.login,
        senha: req.body.senha

    });
    console.log(createPerfil);
    res.sendFile(path.join(__dirname='/public/pages/index.html'));

});

server.get('/perfil', (req, res)=>{
    res.sendFile(path.join(__dirname+'/public/pages/perfil.html'));   
})

server.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname+'/public/pages/login.html'));
})

server.get('/Games', (req, res)=>{
    res.sendFile(path.join(__dirname+'/public/pages/Games.html'));
})

server.get('/register', (req, res)=>{
    res.sendFile(path.join(__dirname+'/public/pages/register.html'));
})

server.get('/home', (req, res)=>{
    res.sendFile(path.join(__dirname+'/public/pages/index.html'));
})


server.listen(5500)