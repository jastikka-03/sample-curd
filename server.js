const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()



MongoClient.connect('mongodb+srv://jastikka:mongo_123jas@cluster0.qjb0k62.mongodb.net/?retryWrites=true&w=majority',  { useUnifiedTopology: true })
.then(client => {
    // ...
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    // ...
  })
  .catch(console.error)
  app.set('view engine', 'ejs')

  app.use(bodyParser.urlencoded({ extended: true }))

  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray()
      .then(results => {
        res.render('index.ejs', { quotes: results })
    })
      .catch(error => console.error(error))
    })

app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })

app.listen(8000, function() {
    console.log('listening on 8000')
  })