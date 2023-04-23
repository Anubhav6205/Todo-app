"use strict";

//all the data from frontend is extracted
var todoschema = require("../models/Todomodel");

var getTodo = function getTodo(req, res) {
  var todos;
  return regeneratorRuntime.async(function getTodo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(todoschema.find());

        case 2:
          todos = _context.sent;
          res.send(todos);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var saveTodo = function saveTodo(req, res) {
  var statement = req.body.statement;
  var newTodo = new todoschema({
    statement: statement
  });
  newTodo.save().then(function (result) {
    console.log(result);
    console.log("Data added successfully");
    res.status(201).json({
      message: "Data added!",
      data: result
    });
  })["catch"](function (error) {
    console.log("Error occurred while adding: ".concat(error.message));
    res.status(400).json({
      message: error
    });
  });
};

var updateTodo = function updateTodo(req, res) {
  var _req$body, _id, statement;

  return regeneratorRuntime.async(function updateTodo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, _id = _req$body._id, statement = _req$body.statement;
          todoschema.findByIdAndUpdate(_id, {
            statement: statement
          }).then(function (data) {
            console.log("Data updated successfully");
            res.set(201).json({
              message: "Data updated!"
            });
          })["catch"](function (err) {
            console.log("Error updating data");
            res.set(400).json({
              message: err
            });
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var deleteTodo = function deleteTodo(req, res) {
  var _id;

  return regeneratorRuntime.async(function deleteTodo$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _id = req.body._id;
          todoschema.findByIdAndDelete(_id).then(function (data) {
            console.log("Data deleted successfully");
            res.set(201).json({
              message: "Data deleted!"
            });
          })["catch"](function (err) {
            console.log("Error deleting data");
            res.set(400).json({
              message: err
            });
          });

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports = {
  getTodo: getTodo,
  saveTodo: saveTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo
};