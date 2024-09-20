const express = require('express');

const app = express();

require('dotenv').config();
app.use(express.json())
const apiRoutes  = require( './routes/routes.js');
app.use('/api',apiRoutes)  //app.use('/api', apiRoutes);

app.listen(process.env.PORT, () => console.log("Server is running on port 5000"))