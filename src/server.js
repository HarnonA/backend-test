const PORT = 3000;
// const HOST = '0.0.0.0';

const app = require('express')()

const bodyParser = require('body-parser');
app.use(bodyParser.json())

const db = require('./config/db')
app.db = db

const dataHandler = require('./util/dataHandler')



app.get('/', function (req, res) {
  res.send('Uhuu, tá funcionando!')
})


app.post('/v1/denuncias', function (req, res) {
  dataHandler.dataSave(req, res, app)  
})

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`)
})
