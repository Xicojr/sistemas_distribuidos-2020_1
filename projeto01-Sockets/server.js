const net = require('net');

var dias = [];
for (var cont = 1; cont < 32; cont ++){
    dias.push(cont);
}

let imoveis = {
    Residencias: {
        "Apartamento no Renascença": {Endereco: "R. das Mitras, 10 - Jardim Renascença, São Luís - MA, 65075-770", Quartos: "1", Suites: "2", Banheiros: "1", Diaria: "120.80"},
        "Apartamento na Peninsula": {Endereco: "R. Crisântemos, 158 - Ponta D'areia, São Luís - MA, 65077-355", Quartos: "2", Suites: "1", Banheiros: "1", Diaria: "110.60"},
        "Apartamento na Cohama": {Endereco: "Rua Deputado Luís Rocha, 7 - Cohama, São Luís - MA, 65070-290", Quartos: "2", Suites: "0", Banheiros: "1", Diaria: "80.50"},
        "Casa no Vinhais": {Endereco: "R. Santo Antônio, 640 - Recanto Vinhais, São Luís - MA, 65074-380", Quartos: "2", Suites: "2", Banheiros: "1", Diaria: "180.40"},
        "Casa na Cohama": {Endereco: "Rua Domingos Barbosa, 50 - Cohama, São Luís - MA, 65073-460", Quartos: "2", Suites: "3", Banheiros: "2", Diaria: "200.30"},
        "Casa no São Francisco": {Endereco: "R. Dois, 526 - São Francisco, São Luís - MA, 65076-340", Quartos: "1", Suites: "1", Banheiros: "1", Diaria: "70.50"}
    },
    Quartos: {
        "Quarto no Vinhais": {Endereco: "R. Santo Antônio, 2 - Recanto Vinhais, São Luís - MA, 65074-380", Suite: "Não", Banheiros: "Compartilhado", Diaria: "15.40"},
        "Quarto no Renascença": {Endereco: "Rua Domingos Barbosa - Cohama, São Luís - MA, 65073-460", Suite: "Não", Banheiros: "Compartilhado", Diaria: "28.30"},
        "Quarto no São Francisco": {Endereco: "R. Dois, 526 - São Francisco, São Luís - MA, 65076-340", Suite: "Sim", Banheiros: "Privativo", Diaria: "50.50"}
    }
}

let catalogo = imoveis;
let operando = undefined;

//gera o vetor que recebe a disponibilidade de cada imovel
var disponibilidade = {};
disponibilidade.imovel = [];
Object.keys(imoveis).forEach(function (tipo){
    Object.keys(imoveis[tipo]).forEach(function(item){
        disponibilidade.imovel.push(item);
    })
})
disponibilidade.datas = [];
for(i =0; i<disponibilidade.imovel.length; i++){
    disponibilidade.datas.push(dias);
}


// função que trata todos os eventos da conexão no servidor
function trataRequisicoes(socket) {
    // imprime mensagem ao conectar
    console.log("Conexão realizada!");
    socket.write('Digite Seu Nome')

    // código que executa quando a conexão é encerrada
    socket.on("end", function () {
        console.log("Conexão finalizada!");
    });
    
    function ShowMenu(){
        socket.write("Bem vindo ao AirCnc! Estamos aqui para salvar sua viagem. \n");
        socket.write('###########################################')
        socket.write('\n')
        socket.write('                MENU')
        socket.write('\n')
        socket.write('###########################################')
        socket.write('\n')
        socket.write('OP1 --> Reservar acomodação')
        socket.write('\n')
        socket.write('OP2 --> Cadastrar acomodação')

    }
    function ShowCatalogo() {
        socket.write("As nossas opções de residências e acomodações. \n");

        socket.write('###########################################')
        socket.write('\n')
        socket.write('                CATALOGO')
        socket.write('\n')
        socket.write('###########################################')
        socket.write('\n')



        Object.keys(imoveis).forEach(function (categoria) {
            //console.log( categoria )
            socket.write('\n')
            socket.write('#-----------------------------------------#')
            socket.write('\n')
            socket.write('                ' + categoria)
            socket.write('\n')
            let contador = 0
            Object.keys(imoveis[categoria]).forEach(function (item) {
                //console.log(item + " --> " + 'R$ ' + imoveis[categoria][item]);
                if(categoria == Residencias){
                    socket.write(categoria[0] +`${contador} - ` + item + " --> " + 'Endereço: ' + imoveis[categoria][item].Endereco + ' Nº de Quartos: ' + imoveis[categoria][item].Quartos + ' Nº de Suites: ' + imoveis[categoria][item].Suites + ' Nº de Banheiros: ' + imoveis[categoria][item].Banheiros + ' Diária: ' + imoveis[categoria][item].Diaria);}
                    contador = contador + 1
                if(categoria == Quartos){
                    socket.write(categoria[0] + `${contador} - ` + item + " --> " + 'Endereço: ' + imoveis[categoria][item].Endereco + ' Suite: ' + imoveis[categoria][item].Suites + ' Banheiro: ' + imoveis[categoria][item].Banheiros + ' Diária: ' + imoveis[categoria][item].Diaria);}
                contador = contador + 1
                socket.write('\n')
            })

        })
        socket.write('###########################################')
        socket.write('\n')
        socket.write('Escolha a sua acomodação digitando o código precedente. Ex: R4')
        socket.write('\n')
    }

    function buscarDisponibilidade(item) {
        var indice;
        for(i=0; i<Object.keys(disponibilidade.imovel).length; i++){
            if(disponibilidade.imovel[i] === item){
                indice = i;
            }
        }
        return indice;
    }

    function tratamentoEntrada(imovel) {
        var categoria;
        if(imovel[0] === 'R'){
            categoria = 'Residencias';
        }
        if(imovel[0] === 'Q'){
            categoria = 'Quartos';
        }

        imovel = Object.keys(catalogo[categoria][imovel[1]]);

        var dias = disponibilidade.datas[disponibilidade.imovel.indexOf(imovel)];

            
        var item = imoveis[categoria][imovel];
        socket.write('O ' + categoria + ' '+ Object.keys(categoria)[imovel] + ' no endereço: ' + item.Endereco + ' tem disponibilidade os seguintes dias: ' + dias);

        socket.write('Caso deseje fazer o angendamento, só digitar o(s) dia(s) para qual deseja reservar sua acomodação separado por virgulas')
        


    }
    function aluguel(dias, acomodacao) {
        dias = dias.split(",");
        let reserva = [];
        var categoria;

        if(acomodacao[0] === 'R'){
            categoria = 'Residencias';
        }
        if(acomodacao[0] === 'Q'){
            categoria = 'Quartos';
        }

        var indice = buscarDisponibilidade(acomodacao);
        var diasDisponiveis = disponibilidade.datas[indice];

        for(var i=0; i<diasDisponiveis.length; i++) {
            if(dias.indexOf(diasDisponiveis[i]) > -1) {
                reserva.push(dias[i])
                disponibilidade.datas[indice].splice(disponibilidade.datas[indice].indexOf(dias[i]), 1);
            }
            else{
                socket.write('Dia ' + dias[i] + ' não disponivel para reserva.')
            }
        }

        socket.write("            RESERVA REALIZADA")
        socket.write('#-----------------------------------------#')
        socket.write('\n')

        var valor = reserva.length * catalogo[categoria][disponibilidade.imovel[indice]].Diaria;

        socket.write('#-----------------------------------------#')
        socket.write('\n')
        socket.write('TOTAL a pagar: ' + valor)
        socket.write('\n')
    }

    // código que executa quando dados são recebidos
    socket.on("data", function (dados) {
        const comando = dados.toString();
        var acomodacao;

        function comandosMenu(comando) {
            
            if(operando){
                acomodacao = comando;
                tratamentoEntrada(comando);
            }
            if(!operando){
                adcItemCatalogo(comando);
            }
            }if (comando == 'OP1') {
                socket.write('\n');
                ShowCatalogo();
                operando = true;
            } if (comando == 'OP2') {
                operando = false;
                socket.write('\n')
                socket.write('\nDigite o imovel da seguinte forma, separados por vírgulas e seguindo as instruções:');
                socket.write('\nCaso Casa/Apartamento: CATEGORIA, DESCRIÇÃO, ENDEREÇO, Nº DE QUARTO, Nº DE SUITES, Nº DE BANHEIROS, VALOR DA DIÁRIA');
                socket.write('\nCaso Quarto: CATEGORIA, DESCRIÇÃO, ENDEREÇO, SUITE (Sim/Não), BANHEIRO (Compartilhado/Privativo), VALOR DA DIÁRIA');
            }

            if(typeof dados === 'object'){
                aluguel(comando, acomodacao);
            }

            function adcItemCatalogo(comando) {
                let novoItem = comando.split(","),
                    categoria = novoItem[0],
                    item = novoItem[1],
                    endereco = novoItem[2];
                    if(categoria === 'Residencias') {
                        quartos = novoItem[3];
                        suite = novoItem[4];
                        banheiro = novoItem[5];
                        diaria = novoItem[6];
                        novoImovel[`${categoria}`] = { [`${item}`]: {endereco, quartos, suite, banheiro, diaria} };
                    }
                    else{
                        suite = novoItem[3];
                        banheiro = novoItem[4];
                        diaria = novoItem[5];
                        novoImovel[`${categoria}`] = { [`${item}`]: {endereco, suite, banheiro, diaria} };
                    }
                console.log(novoImovel);
                Object.assign(imoveis[`${categoria}`], novoImovel[`${categoria}`]);
                console.log(`O seguinte pedido foi adicionado com sucesso ${item}`)
                console.log(imoveis);
            }


    });
}


// cria servidor
const server = net.createServer(trataRequisicoes);

// escuta em porta de rede
server.listen(2000, "127.0.0.1");