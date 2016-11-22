var Todo = require("../models/todo");

module.exports = app => {
    // show all todos
    app.get('/api/todos', (req, res) => {
        // use mongoose to get all todos in the database
        Todo.find(function (err, todos) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

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
    app.post('/api/todos', (req, res) => {
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function (err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    // delete a todo
    app.delete('/api/todos/:todoId', (req, res) => {
        Todo.remove({
            _id: req.params.todoId
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you removed another
            Todo.find(function (err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });
}
