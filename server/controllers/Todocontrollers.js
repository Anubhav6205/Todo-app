//all the data from frontend is extracted
const todoschema = require("../models/Todomodel");

const getTodo = async (req, res) => {
  const todos = await todoschema.find();
  res.send(todos);
};

const saveTodo = (req, res) => {
  const { statement } = req.body;
  const newTodo = new todoschema({ statement });
  newTodo
    .save()
    .then((result) => {
      console.log(result);
      console.log("Data added successfully");
      res.status(201).json({
        message: "Data added!",
        data: result
      });
    })
    .catch((error) => {
      console.log(`Error occurred while adding: ${error.message}`);
      res.status(400).json({
        message: error
      });
    });
};

const updateTodo = async (req, res) => {
  const { _id, statement } = req.body;
  todoschema
    .findByIdAndUpdate(_id, { statement })
    .then((data) => {
      console.log("Data updated successfully");
      res.set(201).json({
        message: "Data updated!"
      });
    })
    .catch((err) => {
      console.log("Error updating data");
      res.set(400).json({
        message: err
      });
    });
};

const deleteTodo = async (req, res) => {
  const { _id } = req.body;
  todoschema
    .findByIdAndDelete(_id)
    .then((data) => {
      console.log("Data deleted successfully");
      res.set(201).json({
        message: "Data deleted!"
      });
    })
    .catch((err) => {
      console.log("Error deleting data");
      res.set(400).json({
        message: err
      });
    });
};

const deleteAllTodo = (req, res) => {
  todoschema
    .deleteMany()
    .then((data) => {
      console.log("All data deleted successfully");
      res.json({
        message: "All data deleted successfully ! "
      });
    })
    .catch((err) => {
      console.log("Error in deleting all data");
      res.json({
        message: "Error in deleting all data !"
      });
    });
};

const searchTodo=async(req,res)=>{
  const {statement}=req.body;
  const data=await todoschema.find({statement:{$regex:`^${statement}`}})
  res.send(data);

}
module.exports = { getTodo, saveTodo, updateTodo, deleteTodo,deleteAllTodo ,searchTodo}; 
