var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var expenses = [
  {
    id: 1,
    description: "first expense",
    category:"automotive",
    overdue: false
  },
  {
    id: 2,
    description: "second expense",
    category:"home",
    overdue: false
  }
];
app
  .get('/', function(req, res) {
    res.send('budget api');
})
  .get('/expenses', function(req, res) {
    res.json(expenses);
})
  .listen(PORT, function() {
    console.log('Express listening on port ' + PORT);
});