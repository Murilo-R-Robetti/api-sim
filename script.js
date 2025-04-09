const express = require('express');
const app = express();
const port = 8086;

app.get('/', function(req, res){
    res.send("Bem-vindo!");
});

app.get('/homepage', function(req, res, next){
    console.log("A resposta estÃ¡ na prÃ³xima funÃ§Ã£o.");
    next();
}, (req, res) => {
    res.send("Bem-vindo ao homepage!");
});

//Passagem por parÃ¢metro
app.get('/ola/:nome/:sobrenome', function(req, res){
    res.send(`Bem-vindo, ${req.params.nome} ${req.params.sobrenome}`);
});

//Passagem por parÃ¢metro usando Query String
//localhost:8086/ola?nome=Leandro&sobrenome=Ensina
app.get('/ola', function(req, res){
    const {nome, sobrenome} = req.query
    res.send(`Bem-vindo, ${nome} ${sobrenome}`);
});

app.get('/titulo', function(req, res){
    fetch("https://brasilapi.com.br/api/isbn/v1/" + "9788545702870")
        .then((response) => response.json())
        .then((cod_isbn) => {
            res.send(`Isbn: ${cod_isbn.isbn}`);
        })
        .catch(error => {
            console.log("Erro ao acessar o link");
            res.send("Ops, houve um erro.");
        });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}...`)
});