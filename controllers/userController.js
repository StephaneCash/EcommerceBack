const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

// USER MODEL
const User = db.users;

const addUser = async (req, res) => {

    let pseudo = req.body.pseudo;
    let email = req.body.email;
    let password = req.body.password;
    let statut = 0;
    let role = req.body.role;

    password = await bcrypt.hash(password, 10)

    User.findOne({
        where: { email: req.body.email }
    })
        .then(user => {
            if (user) {
                return res.status(404).json(`L'adresse email existe déjà, veuillez entre une autre.`);
            } else {

                User.create({ pseudo: pseudo, email: email, password: password, statut: statut, role: role })
                    .then((user) => {
                        res.status(201).json({
                            message: 'Utilisateur créé avec succès',
                            data: user
                        });
                    }).catch(err => {
                        if (err instanceof ValidationError) {
                            return res.status(400).json({
                                message: err.message
                            });
                        }

                        if (err instanceof UniqueConstraintError) {
                            return res.status(400).json({
                                message: err.message
                            });
                        }
                    })
            }
        })
        .catch(err => {
            return res.status(400).json(err)
        })
}


const getAllUsers = (req, res) => {
    if (req.query.pseudo) {
        const pseudo = req.query.pseudo;
        const limit = parseInt(req.query.limit) || 5

        if (pseudo.length > 1) {
            return User.findAndCountAll({
                where: {
                    pseudo: {
                        [Op.like]: "%" + pseudo + "%"
                    }
                },
                order: ['pseudo'],
                limit: limit,
            }).then(({ count, rows }) => {
                const msg = `Il y a ${count} users qui correspondent au terme de recherche ${pseudo} `
                res.json({ msg, data: rows })
            })
        } else {
            const msg = "Le terme de recherche doit contenir au minimum deux caractères";
            return res.status(400).json({ msg })
        }

    } else {
        User.findAll({ order: ['pseudo'], }).then(users => {
            const message = "La liste de users a été bien trouvée";
            res.json({
                message, data: users
            })
        })
    }
}

const getOneUser = (req, res) => {
    User.findByPk(req.params.id)
        .then(user => {
            if (user) {
                const message = `Le user ${req.params.id} a été bien trouvé`;
                res.json({ message, data: user })
            } else {
                const message = `Le user ${req.params.id} n'a pas été trouvé`;
                res.json({ message, data: user })
            }
        }).catch(err => {
            let message = "Le user n'a pas être trouvé";
            res.status(500).json({ message, data: err })
        })
}

const updateUser = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
        where: { id: id }
    }).then(() => {
        return User.findByPk(id).then(user => {

            if (user === null) {
                const message = `Le user demandé n'existe pas`;
                return res.status(404).json({ message, data: user })
            }

            const message = `Le user ${id} a été modifié avec succès`;
            res.status(200).json({ message, data: user })
        })
    }).catch(err => {
        if (err instanceof ValidationError) {
            return res.status(400).json({ message: err.message, data: err })
        }
        let message = "Le user n'a pas être modifié";
        res.status(500).json({ message, data: err })
    })
}

const deleteUser = (req, res) => {
    User.findByPk(req.params.id).then(user => {

        if (user === null) {
            const message = `Le user demandé n'existe pas`;
            return res.status(404).json({ message, data: user })
        }

        const userdeleted = user;

        return User.destroy({
            where: { id: req.params.id }
        }).then(() => {
            const message = `Le user ${req.params.id} a été bien supprimé`;
            res.json({ message, data: userdeleted })
        }).catch(err => {
            let message = "Le user n'a pas être supprimé";
            res.status(500).json({ message, data: err })
        })
    })
}

module.exports = {
    addUser,
    getAllUsers,
    deleteUser,
    getOneUser,
    updateUser
}