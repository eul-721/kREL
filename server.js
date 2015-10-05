var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Sortie = require('./js/models/sortie');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next){
  console.log("something is happening");
  next();
})

router.route('/sortie')
  .post(function(req, res){
    var sortie = new Sortie();
    
    sortie.fuel = req.body.fuel;
    sortie.ammo = req.body.ammo;
    sortie.steel = req.body.steel;
    sortie.bauxite = req.body.bauxite;
    sortie.results = req.body.results;
    sortie.comments = req.body.comments;

    sortie.save(function(err){
      if(err)
        res.send(err);

      res.json({ message: 'A sortie has been added'});
    })

  })

router.get('/', function(req, res){
  res.json({ message: 'api'});
});

app.use('/api', router);

app.listen(port);
console.log("Server started at : " + port);
