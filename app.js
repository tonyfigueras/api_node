import express from "express"   //const express = require('express');

//import db from "./database/db.js"
import apiRoutes from './routes/routes.js'  //const apiRoutes = require('./routes/api');

const app = express() //const app = express();

require('dotenv').config()
app.use(express.json())  //app.use(express.json());
app.use('/api',apiRoutes)  //app.use('/api', apiRoutes);


app.listen(process.env.PORT, () => console.log("Server is running on port 5000"))