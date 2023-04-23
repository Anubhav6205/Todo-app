import axios from "axios";
import { formData } from "../components/Todo";

const addTodo = (event) => {
  axios
    .post("http://localhost:8000/save", { statement: formData })
    .then((response) => {
      console.log(`Data submitted from frontend :${formData}`);
      console.log(`Response : ${response.data}`);
    })
    .catch((error) => {
      console.log("Error occured in frontend");
    });
};

const getTodos = () => {
  return axios.get("http://localhost:8000").then((response) => {
    return response.data;
  });
};

const updateTodos = (statement, id) => {
  axios
    .post("http://localhost:8000/update", { statement: statement, _id: id })
    .then((response) => {
      console.log("Data updated successfully");
    })
    .catch((error) => {
      console.log("Error in updating data in frontend");
    });
};

const deleteTodos = (id) => {
  axios
    .post("http://localhost:8000/delete", { _id: id })
    .then((response) => {
      console.log("Deleted successfully in frontend");
      console.log(`Response : ${response.data}`);
    })
    .catch((error) => {
      console.log("Error in deleting ");
    });
};

const deleteAllTodos = () => {
  axios
    .post("http://localhost:8000/deleteall")
    .then((response) => {
      console.log("All Data deleted from frontend");
    })
    .catch((error) => {
      console.log("Error in deleting all data in frontend");
    });
};

const searchTodos=()=>{
  return axios.post("http://localhost:8000/search",{statement:formData}).then((response)=>{
    console.log("Data searched succesfully");

    return response.data;
  
  }).catch((error)=>{
    console.log("Error in searching data in frontend")
    return error.message;
  
  })
}


export { addTodo, getTodos, updateTodos, deleteTodos,deleteAllTodos,searchTodos};
