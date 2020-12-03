const express = require('express');

const app = express();

const porta = process.env.PORT || 2000;

let carrinho = {
    quantidade: [],
    total: 0
  
  }

  let imoveis = {//imoveis/catalogo - cardapio

    RESIDENCIAS: {
       id: 1, "Casa no Renascença": {Endereco: "R. das Mitras, 10 - Jardim Renascença, São Luís - MA, 65075-770", Quartos: "1", Suites: "2", Banheiros: "1", Diaria: "120.80"},
       id: 2, "Casa na Peninsula": {Endereco: "R. Crisântemos, 158 - Ponta D'areia, São Luís - MA, 65077-355", Quartos: "2", Suites: "1", Banheiros: "1", Diaria: "110.60"},
       id: 3, "Casa na Cohama": {Endereco: "Rua Deputado Luís Rocha, 7 - Cohama, São Luís - MA, 65070-290", Quartos: "2", Suites: "0", Banheiros: "1", Diaria: "80.50"},
       id: 4, "Casa no Vinhais": {Endereco: "R. Santo Antônio, 640 - Recanto Vinhais, São Luís - MA, 65074-380", Quartos: "2", Suites: "2", Banheiros: "1", Diaria: "180.40"},
       id: 5, "Casa na Cohama": {Endereco: "Rua Domingos Barbosa, 50 - Cohama, São Luís - MA, 65073-460", Quartos: "2", Suites: "3", Banheiros: "2", Diaria: "200.30"},
       id: 6, "Casa no São Francisco": {Endereco: "R. Dois, 526 - São Francisco, São Luís - MA, 65076-340", Quartos: "1", Suites: "1", Banheiros: "1", Diaria: "70.50"},
    },  
    APARTAMENTOS: {
       id: 1, "Quarto no Vinhais": {Endereco: "R. Santo Antônio, 2 - Recanto Vinhais, São Luís - MA, 65074-380", Suite: "Não", Banheiros: "Compartilhado", Diaria: "15.40"},
       id: 2, "Quarto no Renascença": {Endereco: "Rua Domingos Barbosa - Cohama, São Luís - MA, 65073-460", Suite: "Não", Banheiros: "Compartilhado", Diaria: "28.30"},
       id: 3, "Quarto no São Francisco": {Endereco: "R. Dois, 526 - São Francisco, São Luís - MA, 65076-340", Suite: "Sim", Banheiros: "Privativo", Diaria: "50.50"},
      }
    }


//var listaDeCarros = [];

app.post("/novoItem", (req, res) => { //reserva
    const { tipo, item, Endereco, Suite, Banheiros, Diaria } = req.body; // preco
    let posicao = imoveis[`${tipo}`].length + 1;
    let reserva = { // -novoItem
      id: posicao, item: item, Endereco: Endereco, Suite: Suite, Banheiro: Banheiro, Diaria: Diaria  //-preco
    }
    imoveis[`${tipo}`].push(reserva)
    console.log(imoveis);
    console.log(req.body);
    res.send(`a seguinte reserva foi adicionada com sucesso: Tipo: ${tipo}, Item: ${item}, Endereço ${Endereco}, Suíte ${Suite}, Banheiro ${Banheiro}, Diária ${Diaria}`);
  
  });

  app.post("/novoItemCarrinho", (req, res) => {
    const { tipo, id } = req.body;
    
    for (var i = 0, tamanho = imoveis[`${tipo}`].length; i < tamanho; i++) {
  
      if (imoveis[`${tipo}`][i].id == id) {
        var item = (imoveis[`${tipo}`][i])
        console.log(item)
      }
    }
    carrinho.quantidade.push(item)
    let valor = parseFloat(item.Diaria) // - preco
    //console.log(valor)
    carrinho.total = carrinho.total + valor
    res.send(JSON.stringify(carrinho));
  });

  app.get("/imoveis/:tipo", (req, res) => {
    const tipo = req.params.tipo;
    res.send(JSON.stringify(imoveis[`${tipo}`]));
  });
  
  app.get("/imoveis", (req, res) => {
    res.send(JSON.stringify(imoveis));
  });

  app.delete("/deleteItem", (req, res) => {
    const { tipo, id } = req.body;
    //delete imoveis[`${tipo}`][`${id}`]
    imoveis[`${tipo}`].splice(imoveis[`${tipo}`].indexOf(`id: ${id}`), 1);
    console.log(imoveis);
    res.send(JSON.stringify(imoveis));
  })

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.listen(porta, () => {
    console.log("servidor inicializado");

});

//app.get("/consulta/:pos", (req, res) => {
//    const posicao = req.params.pos;
//
//    res.send(JSON.stringify(listaDeCarros[posicao]));
//});

//app.get("/consulta", (req, res) => {//todos, vetor inteiro

//    res.send(JSON.stringify(listaDeCarros));
//});

//app.post("/carro", (req,res) => {
//    const carro = req.body;

//   listaDeCarros.push(carro);

//    console.log(req.body);

//    res.send("ok");
//});



