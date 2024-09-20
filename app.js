const express = require('express');

const app = express();

require('dotenv').config();
app.use(express.json())
//import db from "./database/db.js"
const apiRoutes  = require( './routes/routes.js');
 //const app = express();

  //app.use(express.json());
app.use('/api',apiRoutes)  //app.use('/api', apiRoutes);


app.listen(process.env.PORT, () => console.log("Server is running on port 5000"))