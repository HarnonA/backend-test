const axios = require('axios')

// key to use 'https://www.mapquestapi.com/geocoding/v1/reverse'
const KEY = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

const error1 = {
    "error": {
        "message": "Endereço não encontrado para essa localidade.",
        "code": "01"
    }
}
const error2 = {
    "error": {
        "message": "Endereço não encontrado para essa localidade.",
        "code": "02"
    }
}
const error3 = {
    "error": {
        "message": "Erro ao salvar no BD.",
        "code": "03"
    }
}
const error4 = {
    "error": {
        "message": "Campo cidade, estado ou país vazio",
        "code": "04"
    }
}

var cache = [];

//unique id for database
var myID = 0;

// put data on template
function prepData(geolocation, body, id) {
    var newData = {
        data: {
            id: id,
            ...body,
            endereco: {
                "logradouro": geolocation.results[0].locations[0].street,
                "bairro": geolocation.results[0].locations[0].adminArea6,
                "cidade": geolocation.results[0].locations[0].adminArea5,
                "estado": geolocation.results[0].locations[0].adminArea3,
                "pais": geolocation.results[0].locations[0].adminArea1,
                "cep": geolocation.results[0].locations[0].postalCode,
            }
        }
    };
    console.log("data preparation: sucess")
    return newData;
}

// save data in db
function saveOnDB(obj, dbTable) {

    if (obj.data.endereco.estado == '' ||
        obj.data.endereco.cidade == '' ||
        obj.data.endereco.pais == '') {
        return error4;
    }
    else {

        dbTable.db('denuncias').insert({
            id: obj.data.id,
            latitude: obj.data.latitude,
            longitude: obj.data.longitude,
            nome: obj.data.denunciante.nome,
            cpf: obj.data.denunciante.cpf,
            titulo: obj.data.denuncia.titulo,
            descricao: obj.data.denuncia.descricao,
            logradouro: obj.data.endereco.logradouro,
            bairro: obj.data.endereco.bairro,
            cidade: obj.data.endereco.cidade,
            estado: obj.data.endereco.estado,
            pais: obj.data.endereco.pais,
            cep: obj.data.endereco.cep
        }

        ).catch(() => { return error3; })
    }
    console.log("data saved on db: sucess")
    return obj;
}

function dataProc(req, res, app) {

    axios.get(`https://www.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${req.body.latitude}%2C${req.body.longitude}&outFormat=json&thumbMaps=false`)
        .then(adress => {
            adress.data
                ? (res.send(saveOnDB(prepData(adress.data, req.body, ++myID), app)))
                : res.send(error2);
            cache.push(prepData(adress.data, req.body, myID))
        })
        .catch(e => { 
             res.send(error1) 
             return
        })
}

function dataSave(req, res, app) {

    if (myID < 1) {
        app.db('denuncias').max('id').first()
            .then(result => {
                myID = result.max;
            })
    }
    if (cache.length > 0) { // cache not empty

        cache.map(element => { // match latitude and longitude
            if (element.data.latitude == req.body.latitude &&
                element.data.longitude == req.body.longitude) {

                // keep latitude, longitude and endereco
                // change others
                element.data.id = ++myID
                element.data.denunciante = req.body.denunciante
                element.data.denuncia = req.body.denuncia

                saveOnDB(element, app)
                console.log('source: cache')
                res.send(element)
                
            }
            else {

                dataProc(req, res, app)
                console.log('source: API')
            }
        })

    } else {
        dataProc(req, res, app);
        console.log('source: API')
    }
    console.log('is finished')
}

module.exports = { dataSave };
