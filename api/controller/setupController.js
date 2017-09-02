const Todos = require('../models/todoModel');

module.exports = function (app) {
  app.get('/api/setupTodo' , function (req, res) {
      //Set up seed data
      const seedTodos = [
          {
              text : "Hoc nodejs",
              isDone : false
          },
          {
              text : "Hoc angular",
              isDone : true
          },
          {
              text : "Viet mot ung dung hoan chinh",
              isDone : true
          },
      ];
      Todos.create(seedTodos, function (err, results) {
         res.send(results);
      });
  });
};