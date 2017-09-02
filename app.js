const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const setupController = require('./api/controller/setupController');
const todoController = require('./api/controller/todoController');

const app = express();
const port = process.env.PORT || 3000;

app.use("/assets", express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/bower_components"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));
app.use(morgan("dev"));

app.set("view engine", "ejs");

mongoose.connect(config.getDbConnectionString(), { useMongoClient: true });
setupController(app);
todoController(app);

app.get("/" ,function (req, res) {
   res.render('index');
});

app.listen(port ,function () {
    console.log(('app listening on port: ' + port));
});

