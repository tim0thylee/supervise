var db = require("../models");

module.exports = function(app){
    
    app.get("/api/employeeposts/", function(req, res){
        db.EmployeePost.findAll({})
        .then(function(dbPost) {
            res.json(dbPost);
        });
    });
    
    app.post("/api/employeeposts", function(req,res){
        console.log(req.body);
        db.EmployeePost.create({
            name: req.body.name,
            position: req.body.position,
            birthday: req.body.birthday,
            address: req.body.address,
            email: req.body.email,
            phone_number: req.body.phone_number
        }).then(function(dbPost){
            res.json(dbPost);
        })
    });
    
    app.delete("/api/employeeposts/:id", function(req, res) {
        db.EmployeePost.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(dbPost) {
            res.json(dbPost);
        });
    });
}