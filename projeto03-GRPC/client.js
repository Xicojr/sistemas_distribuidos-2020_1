const PROTO_PATH = "./immobile.proto";

const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');


const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
    
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition).immobile;

const client = new protoDescriptor.ServicoImovel('localhost:50051',
                                grpc.credentials.createInsecure());


client.CadastrarImovel({descricao: "Casa São Francisco", endereco: "Rua Dois, nº 6" , n_quartos: 3, n_suites: 1, n_banheiros: 2, diaria: 48.70, disponibilidade: [1,2,3,4,5,6,7,8,9,15,19,24,28,29,30,31]}, function(err, response) {
    if(err != null){
        console.log("Ocorreu um erro na chamada da função CadastrarImovel")
        return;
    }

    console.log(descricao + " registrado com sucesso!");

});

client.CadastrarQuarto({descricao: "Quarto na Ponta do Farol", endereco: "Avenida qualquer, nº 67" , suites: True , banheiros: "Privativo", diaria: 20.50, disponibilidade: [1,2,3,4,5,6,7,8,9,15,19,24,28,29,30,31]}, function(err, response) {
    if(err != null){
        console.log("Ocorreu um erro na chamada da função CadastrarQuarto")
        return;
    }

    console.log(descricao + " registrado com sucesso!");
    
});

client.ListarCatalogo({}, function(err, response) {
    if(err != null){
        console.log("Ocorreu um erro na chamada da função ListarCatalogo")
        return;
    }

    console.log(" >>>>>>>>> CATALOGO <<<<<<<<<< ");
    console.log(JSON.stringify([response.imoveis , response.quartos]));
});

client.ConsultarDisponibilidade({}, function(err, response) {
    if(err != null){
        console.log("Ocorreu um erro na chamada da função ConsultarDisponibilidade")
        return;
    }
    var dias = ;
    console.log("O imovel em questão tem disponibilidade para os dias: " + dias)
});

