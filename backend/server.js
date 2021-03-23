const express=require('express');
const mongoose=require('mongoose');
const { MONGO_URI }=require('./config');
var http = require('http');
var debug = require('debug');
// routes
const heroesRoutes=require('./routes/heroes');
const heroRoutes=require('./routes/hero');
const petsRoutes=require('./routes/pets');
const petRoutes=require('./routes/pet');
const initRoutes=require('./routes/init');

var cors = require('cors')
const app = express();
app.use(cors())

//BodyParser
app.use(express.json());

// Connect to mongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(()=> console.log('MongoDB connected'))
    .catch(err=> console.log(err));
//User routes
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  next();
});
app.use('/heroes', heroesRoutes);
app.use('/hero', heroRoutes);
app.use('/pets', petsRoutes);
app.use('/pet', petRoutes);
app.use('/init', initRoutes);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', parameterLimit: 100000, extended: false }));

app.get('/', (req, res) => {
    res.send("Hello, Heroes!");
})

const PORT = normalizePort(process.env.PORT || 6330);

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(PORT);


/**
 * Normalize a port into a number, string, or false.
 */

 function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }
  
 