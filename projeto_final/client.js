const axios = require('axios').default;

const client = axios.create({baseURL:"http://127.0.0.1:5000"})

// Utilizada a biblioteca Axios para implementação dos métodos de requisição HTTP e esses métodos organizados em função para facilitar a chamada das mesmas.

function cadastrarAutor(nome, sobrenome){                                       // função com o método http post para cadastro dos autores
  client.post('/autor', {
    nome: nome,
    sobrenome: sobrenome
  })
  .then(function(response){
    console.log(response.data);
    })
    .catch(function (error){
      console.log(error);
    })
}

function cadastrarLivro(titulo, autor, lido, favorito){                            // função com o método http post para cadastro dos livros
  client.post('/livro', {
    title: titulo,
    autor: autor,
    readed: lido,
    favorite: favorito
  })
  .then(function(response){
    console.log(response.data);
    })
    .catch(function (error){
      console.log(error);
    })
}

function editarAutor(nome, first_name, last_name){                                 // função com o método http get para editar os autores
  client.put('/autor', {
    nome: nome,
    first_name: first_name,
    last_name: last_name
  })
  .then(function(response){
    console.log(response.data);
    })
    .catch(function (error){
      console.log(error);
    })
}

function editarLivro(titulo, lido, favorito){                                      // função com o método http get para edição dos livros
  client.put('/livro', {
    titulo: titulo,
    lido: lido,
    favorito: favorito
  })
  .then(function(response){
    console.log(response.data);
    })
    .catch(function (error){
      console.log(error);
    })
}

function deletarAutor(nome){                                                       // função com o método http delete para deleção dos autores
  client.delete('/autor', {
    nome: nome
  })
    .then(function(response){
      console.log(response.data);
    })
    .catch(function (error){
      console.log(error);
    })
}

function deletarLivro(titulo){                                                     // função com o método http post para deleção dos livros
  client.delete('/livro', {
    titulo: titulo
  })
    .then(function(response){
        console.log(response.data);
    })
    .catch(function (error){
      console.log(error);
    })
}

function listarBiblioteca(){                                                       // função com o método http get para listagem de todos os livros cadastrados no Banco de Dados
  client.get('/biblioteca')
    .then(function (response){
      const biblioteca = response.data;

      console.log(JSON.stringify(biblioteca));
    })
    .catch(function (error){
      console.log(error);
    })}

function listarAutores(){                                                          // função com o método http get para listagem de todos os autores cadastrados no Banco de Dados
  client.get('/autores')
    .then(function (response){
      const autores = response.data;

      console.log(JSON.stringify(autores));
    })
    .catch(function (error){
      console.log(error);
    })}