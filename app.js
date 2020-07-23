const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const listEndpoints = require('express-list-endpoints');
const swaggerUi = require('swagger-ui-express');
const models = Object.values(require('./models').sequelize.models);


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(cors());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('origin', 'http://localhost:3000')
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


models
  .forEach((Model, i) => {
    Model.creatingCustomMethod(app);
    Model.createDefCrud(app);

    if (i + 1 === models.length) {
      app.use('/explorer', swaggerUi.serve, swaggerUi.setup(Model.cmOpenapi))
    }
  });

// require('./routes')(app);
// console.log('list', listEndpoints(app))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// function emptyOpenApi() {
//   swaggerDocument.paths = {}
//   swaggerDocument.components.schemas = {}
//   try { fs.writeFileSync('./openApi.json', JSON.stringify(swaggerDocument, null, 2), 'utf8'); }
//   catch (err) { console.log('err in json', err) }
// }







