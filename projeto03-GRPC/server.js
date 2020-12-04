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

let catalogo = {
    Residencias: [],
    Quartos: [],
};    

var protoDescriptor = grpc.loadPackageDefinition(packageDefinition).immobile;

const servicoImovel = protoDescriptor.ServicoImovel;

function listarCatalogo(call,callback){
    console.log("listar CAtalogo");
    callback(null, {imoveis: catalogo.imoveis, quartos: catalogo.quartos});
}

function consultarDisponibilidade (call,callback){
    //console.log(" Consultar Disponibilidade" + call.request.pos);
    const cat = call.request.categoria;
    const pos = call.request.pos;

    callback(null, catalogo[cat][pos].disponibilidade);
}

function cadastrarImovel(call,callback){
    const imovel = {
            descricao: call.request.descricao,
            endereco: call.request.endereco,
            n_quartos: call.request.n_quartos,
            n_suites: call.request.n_suites,
            n_banheiros: call.request.n_banheiros,
            diaria: call.request.diaria,
            disponibilidade: call.request.disponibilidade,
    };
    //console.log("Cadastrar Imovel: " + JSON.stringify(imovel) );
    catalogo["Residencias"].push(imovel);
    callback(null, {});
}

function cadastrarQuarto(call,callback){
    const quarto = {
        descricao: call.request.descricao,
        endereco: call.request.endereco,
        suite: call.request.n_suite,
        banheiro: call.request.n_banheiro,
        diaria: call.request.diaria,
        disponibilidade: call.request.disponibilidade,
    };
    //console.log("Cadastrar Quarto: " + JSON.stringify(quarto) );
    catalogo["Quartos"].push(quarto);
    callback(null, {});
}

const server = new grpc.Server();

server.addService(servicoImovel.service, {
    ListarCatalogo : listarCatalogo,
    ConsultarDisponibilidade : consultarDisponibilidade,
    CadastrarImovel : cadastrarImovel,
    CadastrarQuarto : cadastrarQuarto,
});

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start;
