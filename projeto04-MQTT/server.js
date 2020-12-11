var mqtt = require('mqtt')
var server  = mqtt.connect('mqtt://test.mosquitto.org')

const catalogo = [];

const REGISTRA_IMOVEL = 'registraImovel';
const CONSULTA_CATALOGO = 'consultaCatalogo';
const RESERVA_IMOVEL = 'reservaImovel';

server.on('connect', function () {
    server.subscribe(REGISTRA_IMOVEL, function (err) {
        if (!err){
            console.log("Subscrito no tópico 'registraImovel' com sucesso")
        }
    });
    
    server.subscribe(CONSULTA_CATALOGO, function (err) {
        if (!err){
            console.log("Subscrito no tópico 'consultaCatalogo' com sucesso")
        }
        });

    server.subscribe(RESERVA_IMOVEL, function (err) {
        if (!err){
            console.log("Subscrito no tópico 'reservaImovel' com sucesso")
        }
        });
    });

server.on('message', function (topic, message) {

    switch(topic){
        case REGISTRA_IMOVEL:
            const imovel = JSON.parse(message);
            catalogo.push(imovel);
            break;
        
        case CONSULTA_CATALOGO:
            server.publish('resultado-consulta-catalogo', JSON.stringify(catalogo));
            break;

        case RESERVA_IMOVEL:
            const item = message.imovel;
            const disponiveis = catalogo[item].Disponibilidade;
            const dias = message.dias;

            for(var i = 0;i<disponiveis.length;i++){
                if (disponiveis[i] === dias[i]){
                    catalogo[item].Disponibilidade.splice(dias[i], 1);
                }
            }

            server.publish('imovel-reservado');
            break;
    }

    console.log(message.toString());
})