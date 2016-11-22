var Todo = require("../models/todo");

module.exports = app => {
    // show all todos
    app.get('/api/todos', (req, res, next) => {
        // use mongoose to get all todos in the database
        Todo.find(function (err, todos) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                next(err, req, res);

            res.format({
                html: function () {
                    res.render("todos", {
                        title: "ToDos",
                        "todos": todos
                    });
                },
                json: function () {
                    res.json(todos); // return all todos in JSON format
                }

            });
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', (req, res, next) => {
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                next(err, req, res);

            // get and return all the todos after you create another
            Todo.find(function (err, todos) {
                if (err)
                    next(err, req, res);
                res.json(todos);
            });
        });
    });

    // delete a todo
    app.delete('/api/todos/:todoId', (req, res, next) => {
        Todo.remove({
            _id: req.params.todoId
        }, function (err, todo) {
            if (err)
                next(err, req, res);

            // get and return all the todos after you removed another
            Todo.find(function (err, todos) {
                if (err)
                    next(err, req, res);
                res.json(todos);
            });
        });
    });
}
