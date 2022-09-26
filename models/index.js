const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('Connexion successful à la DB');
    })
    .catch((err) => {
        console.log("Erreur de connexion à la DB : ", err)
    });
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel.js')(sequelize, DataTypes);
db.products = require('./productModel')(sequelize, DataTypes);
db.categories = require('./categoryModel')(sequelize, DataTypes);
db.commandes = require("./commandeModel")(sequelize, DataTypes);

// Relation 1-N 

db.categories.hasMany(db.products, {
    as: 'products',
});

db.products.belongsTo(db.categories, {
    foreignKey: 'categoryId',
    as: 'categories'
})

db.users.hasMany(db.products, {
    as: 'products'
});

db.products.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'users'
});

db.users.hasMany(db.commandes, {
    as: "commandes"
});

db.commandes.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'users'
})

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Models synchronisés avec succès');
    }).catch(err => {
        console.log('Erreur de synchronisation de models : ', err);
    })

module.exports = db;
