
// Dependencies
// =============================================================
let Sequelize = require("sequelize")
let db = require('../models')

// Routes
// =============================================================
module.exports = function(app) {

    app.post('/api/sales', function(req,res){
        db.Inventory.findAll({
            where: {
                sold: req.body.sale,
                sale_date: req.body.sale_date
            }
        }).then(function(result){
            res.json(result)
        })
    });

    app.post('/api/inventory', function(req,res){
        db.Inventory.findAll({
            where:{
                sold: 0
            }
        }).then(function(result){
            res.json(result)
        })
    });

    app.post('/api/invcount', function(req,res){
        db.Inventory.findAll({
            where: {
                sold: 0
            }
        }).then(function(result){
            res.json(result)
        })
    });

    app.post('/api/brand', function (req, res){
        
        db.Inventory.findAll({
            where:{
                sold: 1
            }
        }).then(function(result){
            
            res.json(result)
        })
       
    });

    app.post('/api/goal', function (req,res){

        db.Inventory.findAll({
            where: {
                sold: 1,
            }
        }).then(function(result){
            res.json(result)
        })
    });

    
  

};
