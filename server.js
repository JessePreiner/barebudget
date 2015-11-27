var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var expenses = [
  {
    id: 1,
    description: "first expense",
    category:"automotive",
    overdue: false,
    paid: 0,
    owing: 100
  },
  {
    id: 2,
    description: "second expense",
    category:"home",
    overdue: false,
    paid: 200,
    owing: 0
  },
  {
    id: 3,
    description: "third expense",
    category:"erotica",
    overdue: true,
    paid: 0,
    owing: 100
  }
];
app
  .get('/', function(req, res) {
    res.send('budget api');
})
  .get('/expenses', function(req, res) {
    res.json(expenses);
})
  .get('/expenses/:id', function(req, res) {
    res.send('looking for ' + req.params.id);
    res.json(expenses);
})
  .listen(PORT, function() {
    console.log('Express listening on port ' + PORT);
});