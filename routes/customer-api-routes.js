var db = require("../models");

module.exports = function(app){
    
    app.get("/api/customerposts/", function(req, res){
        db.Post.findAll({})
        .then(function(dbPost) {
            res.json(dbPost);
        });
    });
    
    app.post("/api/customerposts", function(req,res){
        console.log(req.body);
        db.Post.create({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phone_number: req.body.phone_number
        }).then(function(dbPost){
            res.json(dbPost);
        })
    });
    
    app.delete("/api/customerposts/:id", function(req, res) {
        db.Post.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(dbPost) {
            res.json(dbPost);
        });
    });
}