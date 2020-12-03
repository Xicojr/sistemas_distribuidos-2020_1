const express = require('express');

const app = express();

const porta = process.env.PORT || 2000;

var listaDeCarros = [];

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/consulta/:pos", (req, res) => {
    const posicao = req.params.pos;

    res.send(JSON.stringify(listaDeCarros[posicao]));
});

app.get("/consulta", (req, res) => {//todos, vetor inteiro

    res.send(JSON.stringify(listaDeCarros));
});

app.post("/carro", (req,res) => {
    const carro = req.body;

    listaDeCarros.push(carro);

    console.log(req.body);

    res.send("ok");
});


app.listen(porta, () => {
    console.log("servidor inicializado");

});

