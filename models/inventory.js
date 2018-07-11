module.exports = function (sequelize, DataTypes) {
    var Inventory = sequelize.define("Inventory", {
        make: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        msrp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        invoice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        sale_price: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        sold: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        sale_date: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len:[1]
            }
        }
    });
    return Inventory;
};