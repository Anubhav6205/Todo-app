"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTodos = exports.addTodo = exports.todoData = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _Form = require("../components/Form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var todoData;
exports.todoData = todoData;

var addTodo = function addTodo(event) {
  _axios["default"].post("http://localhost:8000/save", {
    statement: _Form.formData
  }).then(function (response) {
    getTodos();
    console.log("Data submitted from frontend :".concat(_Form.formData));
    console.log("Response : ".concat(response.data));
  })["catch"](function (error) {
    console.log("Error occured in frontend");
  });
};

exports.addTodo = addTodo;

var getTodos = function getTodos() {
  return _axios["default"].get("http://localhost:8000").then(function (response) {
    return response.data;
  });
};

exports.getTodos = getTodos;