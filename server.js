var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;
var expenseNextId = 1;
var expenses = [];

app.use(bodyParser.json());
app
  .get('/', function(req, res) {
    res.send('budget api');
})
  .get('/expenses/', function(req, res) {
    res.json(expenses);
})
  .get('/expenses/:id', function(req, res) {
      var id = parseInt(req.params.id, 10);

      expenses.forEach(function(x) {
        if (x.id === id) {
          res.json(x);
        }
      });
      res.status(404).send();
   })
   .post('/expenses', function(req, res) {
     var body = req.body;
     body.id = expenseNextId++;
     expenses.push(body);
     res.json(body);
   })


  .listen(PORT, function() {
    console.log('Express listening on port ' + PORT);
});
