console.log('May Node be with you');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser= require('body-parser')
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.static('public'));


// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
//   res.render(view, locals);
//
//   // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
//   // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
// });

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
});

app.use(bodyParser.urlencoded({extended: true}));

var db;

MongoClient.connect('mongodb://pralad:logic@ds147900.mlab.com:47900/plab', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
});


app.get('/apple', (req, res) => {
  db.collection('quotes').find().toArray(function(err, results) {
  console.log(results)
  // send HTML file populated with quotes here
});
});


app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database')
    res.redirect('/')
  })
});

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'apple'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
          console.log("updated successfully!!!");
    res.send(result);
  });
});

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send('A darth vadar quote got deleted')
  });
});
