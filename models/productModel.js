module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("products", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Le titre est un champ obligatoire' },
                notEmpty: { msg: 'Le titre est un champ obligatoire' }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Description est un champ obligatoire' },
                notEmpty: { msg: 'Description est un champ obligatoire' },
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: 'Le prix est un champ obligatoire' },
                notEmpty: { msg: 'Le prix est un champ obligatoire' }
            }
        },
        rating: {
            type: DataTypes.STRING,
        },
        qty: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.STRING,
        }
    })

    return Product;
}