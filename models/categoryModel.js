module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("categories", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Nom est un champ obligatoire' },
                notEmpty: { msg: 'Nom est un champ obligatoire' }
            }
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Desc est un champ obligatoire' },
                notEmpty: { msg: 'Desc est un champ obligatoire' },
            }
        },
    })

    return Category;
}