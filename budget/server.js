var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var expenseNextId = 1;
var expenses = [
    {
    "description": "Things to purchase for around the house",
    "category": "household",
    "id": 1
  },
  {
    "description": "Items for yard work",
    "category": "yard",
    "id": 2
  },
  {
    "description": "Expenses for automotobiles, including fuel, maintenence, and general upkeep",
    "category": "auto",
    "id": 3
  }
];

app.use(bodyParser.json());
app
  .get('/', function(req, res) {
    res.send('budget api homepage');
  })
  .get('/expenses/', function(req, res) {
    var query = req.query;
    var order = query.order || 'asc';
    var sortColumn = query.sortCol || 'category'
    if (order === 'desc') {
      res.json(_.sortBy(expenses, sortColumn).reverse());
    } else {
      res.json(_.sortBy(expenses, sortColumn));  
    }
  })
  .get('/expenses/:id', function(req, res) {

    var id = parseInt(req.params.id, 10);
    var result = _.findWhere(expenses, {
      id: id
    });
  
    if (result) {
      res.json(result);
    }
    res.status(404).send();
  })
  .post('/expenses', function(req, res) {
    
  var body = _.pick(req.body, 'description', 'category');

    if (!_.isString(body.category) || !_.isString(body.description) || body.description.trim().length === 0) {
      return res.status(400).send();
    }

    body.id = expenseNextId++;
    body.description = body.description.trim();
    expenses.push(body);
    res.json(body);
  })

  .put('/expenses/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    var body = _.pick(req.body, 'description', 'category');
    var expense = _.findWhere(expenses, {id: id });
    var validAttributes = {};

    if (body.hasOwnProperty('description') && _.isString(body.description)) {
      validAttributes.description = body.description;
    } else if (expense.hasOwnProperty(body.description)) {
      res.status(400).send("Bad value for description");
    }

    if (body.hasOwnProperty('category') && _.isString(body.category)) {
      validAttributes.category = body.category;
    } else if (expense.hasOwnProperty(body.category)) {
      res.status(400).send("Bad value for category");
    }
    _.extend(expense, validAttributes);
    res.json(expense);
  })

  .delete('/expenses/:id', function(req, res) {
    var body = req.body;
    var id = parseInt(req.params.id, 10);
    var expenseToRemove = _.findWhere(expenses, {id: id });
    if (expenseToRemove) {
      expenses = _.without(expenses, expenseToRemove);
      res.json(expenseToRemove);
    }

    return res.status(404).json({"error": "id was not found: " + id});
  })

  .listen(PORT, function() {
    console.log('Express listening on port ' + PORT);
  });
