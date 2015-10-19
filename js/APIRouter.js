var express = require('express');
var Sortie = require('./models/sortie')
module.exports = function(authenticate){
  //API ROUTER
  var router = express.Router();

  router.use(function(req, res, next){
    authenticate(req,res,next);
  })

  router.route('/sortie')
    //create sortie
    .get(function(req, res){
      if(!req.query.map)
        res.status(500).json({ message : "You have to choose a map!"})
      else
        {
          Sortie.find({map:req.query.map}, function(err, docs){
            if (err) res.send(err);
            res.status(200).send(docs);
          })
        }
      //if no map index, return err
      //else give all maps associated to user
    })

    .post(function(req, res){
      var sortie = new Sortie();
      sortie.map = req.body.map;
      sortie.fuel = req.body.fuel;
      sortie.ammo = req.body.ammo;
      sortie.steel = req.body.steel;
      sortie.bauxite = req.body.bauxite;
      sortie.results = req.body.results;
      sortie.comments = req.body.comments;
      sortie.user_id = req.user._id;

      sortie.save(function(err){
        if(err)
          res.send(err);
        else
          res.json({ message: 'A sortie has been added'});
      })

    })

  router.get('/', function(req, res){
    res.json({ message: 'api'});
  });

  return router;
}
