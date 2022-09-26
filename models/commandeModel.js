module.exports = (sequelize, DataTypes) => {
    const Commande = sequelize.define("commandes", {
        desc: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Desc est un champ obligatoire' },
                notEmpty: { msg: 'Desc est un champ obligatoire' },
            }
        },
    })

    return Commande;
}