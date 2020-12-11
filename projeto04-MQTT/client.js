var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')

var dias = [];
for (var cont = 1; cont < 32; cont ++){
    dias.push(cont);
}

const imovel = {
      //"Apartamento no Renascença": {Endereco: "R. das Mitras, 10 - Jardim Renascença, São Luís - MA, 65075-770", Quartos: "1", Suites: "2", Banheiros: "1", Diaria: "120.80", Disponibilidade: dias}
      //"Apartamento na Peninsula": {Endereco: "R. Crisântemos, 158 - Ponta D'areia, São Luís - MA, 65077-355", Quartos: "2", Suites: "1", Banheiros: "1", Diaria: "110.60", Disponibilidade: dias},
      //"Apartamento na Cohama": {Endereco: "Rua Deputado Luís Rocha, 7 - Cohama, São Luís - MA, 65070-290", Quartos: "2", Suites: "0", Banheiros: "1", Diaria: "80.50", Disponibilidade: dias},
      //"Casa no Vinhais": {Endereco: "R. Santo Antônio, 640 - Recanto Vinhais, São Luís - MA, 65074-380", Quartos: "2", Suites: "2", Banheiros: "1", Diaria: "180.40", Disponibilidade: dias},
      //"Casa na Cohama": {Endereco: "Rua Domingos Barbosa, 50 - Cohama, São Luís - MA, 65073-460", Quartos: "2", Suites: "3", Banheiros: "2", Diaria: "200.30", Disponibilidade: dias},
      "Casa no São Francisco": {Endereco: "R. Dois, 526 - São Francisco, São Luís - MA, 65076-340", Quartos: "1", Suites: "1", Banheiros: "1", Diaria: "70.50", Disponibilidade: dias}
};
  
client.on('connect', function () {

  client.subscribe('resultado-consulta-catalogo', function(err){
    if (!err){
      console.log('Subscrito no tópico resultado-consulta-catalogo com sucesso!');

      client.publish('consultaCatalogo', "");
      //client.publish('registraImovel', JSON.stringify(imovel));
      //client.end();
    }
  })
});

client.on('message', function(topic, message){
  if (topic === 'resultado-consulta-catalogo'){
    const lista = JSON.parse(message.toString());

    console.log(lista);
    client.end();
  }
})