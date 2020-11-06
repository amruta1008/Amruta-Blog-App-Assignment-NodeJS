var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var swaggerJsDoc = require('swagger-jsdoc');
var swaggerUi =  require('swagger-ui-express');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/api/posts');


// configure swagger in app.js 
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'BLOG-APP-API',
      description: 'Blog app Documentation'
    },
    servers: ['http://localhost:8080']
  },
  apis: ["app.js"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, PUT, POST, DELETE"
}
 
app.use(cors(corsOptions));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * definitions:
 *  blogPost:
 *   type: object
 *   properties:
 *    postHeader:
 *     type: String
 *     description: postheader of the blog
 *     example: 'blogpost3'
 *    createdBy:
 *     type: String
 *     description: post created by
 *     example: 'ammu'
 *    updatedBy:
 *     type: String
 *     description: post updated by
 *     example: 'ammu'
 */
app.use('/users', usersRouter);
/**
 * @swagger
 * /api/posts:
 *  get:
 *    tags:
 *      - Posts
 *    summary: listing all posts
 *    description: Use to get all posts
 *    responses:
 *      '200':
 *        description: A successful response
 */
/**
 * @swagger
 /api/posts/{id}:
 *  get:
 *   tags:
 *    - Posts
 *   summary: listing a single post
 *   description: A post by id
 *   produces:
 *    - appication/json
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: id of the post
 *      schema:
 *       $ref: '#/definitions/blogPost'
 *   responses:
 *    '200':
 *     description: A successful 
 *    '500':
 *     description: failure in getting post
 */
/**
 * @swagger
 * /api/posts:
 *  post:
 *   tags:
 *    - Posts
 *   summary: Add a post
 *   description: create a post for blog app
 *   consumes:
 *    - application/json
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *          $ref: '#/definitions/blogPost' 
 *   responses:
 *    200:
 *     description: Post created successfully
 *    500:
 *     description: failure in creating the post
 */
/**
 * @swagger
 * /api/posts/{id}:
 *  put:
 *   tags:
 *    - Posts
 *   summary: Editing the post
 *   description: Update the post
 *   consumes:
 *    - application/json
 *   produces:
 *    - appication/json
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: id of the post
 *      schema:
 *       $ref: '#/definitions/blogPost'
 *    - in: body
 *      name: blogPost
 *      description: The user to create.
 *      schema:
 *       $ref: '#/definitions/blogPost'
 *   responses:
 *    '200':
 *     description: A successful 
 *    '500':
 *     description: failure in creating the post
 */
/**
 * @swagger
 /api/posts/{id}:
 *  delete:
 *   tags:
 *    - Posts
 *   summary: deleting the post
 *   description: delete the post
 *   produces:
 *    - appication/json
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: id of the post
 *      schema:
 *       $ref: '#/definitions/blogPost'
 *   responses:
 *    '200':
 *     description: A successful 
 *    '500':
 *     description: failure in creating the post
 */
app.use('/api/posts', postsRouter);

 // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 80')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
