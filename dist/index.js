require("dotenv").config();
const express = require("express");
const cors = require("cors"); 
const app = express();

const files = require("./routes/fileRoutes");

app.use(cors()); 

app.use(express.json());

app.use("/", files);

app.listen(process.env.APP_PORT, () => {
    console.log("Servidor rodando na porta:", process.env.APP_PORT);

});