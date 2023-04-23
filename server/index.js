require("./database/db");
require("dotenv").config();
const routes = require("./routes/Todoroute");
const express=require("express");
const app = express();
const cors=require('cors');
const PORT=process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(PORT,()=>{
    console.log("Listening on port 8000")
})


