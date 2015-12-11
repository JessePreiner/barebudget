var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

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
    var result = _.findWhere(expenses, {id:id} );
    if (result) {
      res.json(result);
    }
    res.status(404).send();
    
    
   })
   .post('/expenses', function(req, res) {
     var body = _.pick(req.body, 'description', 'completed');
     
     if (!_.isBoolean(body.completed) || 
     !_.isString(body.description) || 
     body.description.trim().length === 0) {
       return res.status(400).send();
     }
     
     body.id = expenseNextId++;
     body.description = body.description.trim();
     expenses.push(body);
     res.json(body);
   })


  .listen(PORT, function() {
    console.log('Express listening on port ' + PORT);
});
