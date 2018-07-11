// Dependencies
// =============================================================
let Sequelize = require("sequelize")
let db = require('../models')
// Routes
// =============================================================
module.exports = function(app) {


//GET route for getting all posts
app.get("/api/inventory/", function(req, res) {
    db.Inventory.findAll({
        where: {
            sold: 0
        }
    })
    .then(function(dbInventory){
        res.json(dbInventory)
    })
});

    // Get rotue for retrieving a single post
    app.get("/api/inventory/:id", function (req, res) {
        db.Inventory.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(function (dbInventory) {
                res.json(dbInventory);
            });
    });

  

app.post("/api/inventory", function (req, res) {
    // Add sequelize code for creating a post using req.body,
    // then return the result using res.json
    db.Inventory.create({
            make: req.body.make,
            model: req.body.model,
            color: req.body.color,
            year: req.body.year,
            year: req.body.year,
            msrp: req.body.msrp_price,
            invoice: req.body.invoice_price,
            sticker: req.body.sticker_price,
            sale: req.body.sale_price,
            saleDate: req.body.sale_date
    })
        .then(function (dbInventory) {
            res.json(dbInventory);
        })
    })

    //Update the post
    app.put("/api/inventory/", function (req, res) {
        db.Inventory.update(req.body,
            {
                where: {
                    id: req.body.id
                }
            })
            .then(function (dbInventory) {
                res.json(dbInventory);
            });
    });
}
