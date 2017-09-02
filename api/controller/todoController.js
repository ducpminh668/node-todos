const Todos = require('../models/todoModel');

function getTodos(res) {
    Todos.find(function (err, todos) {
        if (err) res.status(500).json(err);
        res.json(todos);
    });
}

module.exports = function (app) {
    app.get('/api/todos', function (req, res) {
        getTodos(res);
    });

    app.get('/api/todo/:id', function (req, res) {
        Todos.findById({_id: req.params.id}, function (err, todo) {
            if (err) throw err;
            res.json(todo);
        });
    });

    app.post('/api/todo', function (req, res) {
        const todo = {
            text: req.body.text,
            isDone: req.body.isDone
        };
        Todos.create(todo, function (err) {
            if (err) throw err;
            getTodos(res);
        });
    });

    app.put('/api/todo', function (req, res) {
        if (!req.body) res.status(500).send("id is required");
        Todos.update({_id: req.body._id},
            {
                text: req.body.text,
                isDone : req.body.isDone
            },
            function (err) {
                if(err) res.status(500).json(err);
                getTodos(res);
            });
    });

    app.delete('/api/todo/:id', function (req, res) {
        Todos.remove({_id : req.params.id}, function (err) {
            if(err) res.status(500).json(err);
            getTodos(res);
        })
    });
};