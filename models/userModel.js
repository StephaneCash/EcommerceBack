const { isEmail } = require('validator');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Pseudo est un champ obligatoire' },
                notEmpty: { msg: 'Pseudo est un champ obligatoire' }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: [isEmail],
            validate: {
                notNull: { msg: 'Email est un champ obligatoire' },
                notEmpty: { msg: 'Email est un champ obligatoire' },
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Password est un champ obligatoire' },
                notEmpty: { msg: 'Password est un champ obligatoire' }
            }
        },
        statut: {
            type: DataTypes.INTEGER
        },
        role: {
            type: DataTypes.STRING,
        },
        img: {
            type: DataTypes.STRING,
        }
    })

    return User;
}