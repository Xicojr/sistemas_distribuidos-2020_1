const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

//Conexão ao Banco de Dados SQLite
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('Banco_Biblioteca.sdb', (err) => {
    if (err){
        console.error(err.message);
    }
    console.log('Conectado ao Banco de Dados!!')
});

// O body de uma requisição é indefinido por padrão, com esses comandos ele pode ser preenchido com dados do corpo da requisição
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Variavel na qual a data atual é armazenada para as aplicações da API
var d = new Date();


// Aplicação dos métodos HTTP no banco de dados em si, essas sendo implementadas para cumprimento das funcionalidades.
db.serialize(function(){

    app.post('/autor', function (req, res){
        const autor = req.body;
        
        var stmt = db.prepare("INSERT INTO author VALUES (?, ?, ?, ?, ?)");

        stmt.run(null, autor.nome, autor.sobrenome, d, null);
    
        res.send("Autor registrado com sucesso!");
    });
    
    app.post('/livro', function (req, res){
        const livro = req.body;
    
        var stmt = db.prepare("INSERT INTO book VALUES (?, ?, ?, ?, ?, ?, ?)");

        db.each("SELECT id, first_name, last_name FROM author", function(err, row){                   //método utilizado para se encontrar o id do autor dado o nome dele
            const autor = row.first_name + ' ' +  row.last_name;                                      // método importante para que de maneira mais intuitiva e natural, se cadastre um livro
            if (autor === livro.autor){                                                               // o livro é ligado ao autor por meio de chave estrangeira, sendo essa o seu id
                var autor_id = row.id;                                                                //este método é execuado mais vezes no código
                stmt.run(null, autor_id, livro.title, livro.readed, livro.favorite, d, null);
                res.send("Livro registrado com sucesso!");
            }
            else{
                res.send("Autor não registrado.");
            }
        });        
    });
    
    app.put('/autor', function (req, res){
        const autor = req.body.nome;
        var autor_id = null;

        db.each("SELECT id, first_name, last_name FROM author", function(err, row){
            var autor_nome = row.first_name + ' ' +  row.last_name;
            if (autor === autor_nome){
                var autor_id = row.id;
                
                var stmt = db.prepare("UPDATE author SET first_name = (?), last_name = (?), updated_at = (?) WHERE id = (?)");

                stmt.run(req.body.first_name, req.body.last_name, d, autor_id);

                res.send(autor_nome + " atualizado com sucesso para " + req.body.first_name + ' ' + req.body.last_name);
            }
            else{
                res.send("Autor não registrado.");
            }
        });
    });
    
    app.put('/livro', function (req, res){
        const livro = req.body.titulo;
        var livro_id = null;
        var autor_id = null;
    
        db.each("SELECT id, title FROM book", function(err, row){
            if (livro === row.title){
                var livro_id = row.id;

                db.each("SELECT id, first_name, last_name FROM author", function(req2, res2){
                    var autor = res2.first_name + ' ' +  res2.last_name;
                    if (autor === req.body.autor){
                        autor_id = res2.id;

                        var stmt = db.prepare("UPDATE book SET author_id = (?), readed = (?), favorite = (?), updated_at = (?) WHERE id = (?)");
                        stmt.run(autor_id, req.body.lido, req.body.favorito, d, autor_id);
                        res.send("Livro " + livro +" atualizado com sucesso!");
                    }
                    else{
                        res.send("Autor não registrado.");  
                    }
                });
            }
            else{
                res.send("Livro não registrado.");
            }
        });
    });
    
    app.delete('/autor', function (req, res){
        const nome_autor = req.body.nome;
    
        var stmt = db.prepare("DELETE FROM author WHERE id = (?)");

        db.each("SELECT id, first_name, last_name FROM author", function(err, row){
            const autor = row.first_name + ' ' +  row.last_name;
            if (autor === nome_autor){
                var autor_id = row.id;
                stmt.run(autor_id);
                res.send(autor + " deletado com sucesso!");              
            }
            else{
                res.send("Autor não registrado!");
            }
        });
    });
    
    app.delete('/livro', function (req, res){
        const livro = req.body.titulo;
    
        var stmt = db.prepare("DELETE FROM book WHERE id = (?)");

        db.each("SELECT id, title FROM book", function(err, row){
            if (livro === row.title){
                var livro_id = row.id;
                stmt.run(livro_id);
                res.send("Livro " + livro + " deletado com sucesso!");              
            }
            else{
                res.send("Titulo não registrado!");
            }
        });
    });
    
    app.get('/biblioteca', function(req, res){
        db.each("SELECT * FROM book", function(err, row){
            livros.push(row);
        });   
    })
    
    app.get('/autores', function(req, res){
        db.each("SELECT * FROM author", function (err, row){
            res.send(row);
        })
    })
    
    app.listen(PORT, function(){
        console.log("Servidor inicializado!")
    });

})