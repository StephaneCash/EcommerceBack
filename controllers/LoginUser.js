const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const primaryKey = require('../auth/private_key');

const login = (req, res) => {

    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (req.body?.email?.match(pattern)) {
        db.users.findOne({
            where: { email: req.body.email }
        })
            .then((user => {

                if (!user) {
                    const message = 'L\'utilisateur demandé n\'existe pas';
                    return res.status(400).json({ message })
                }
                bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                    if (!isPasswordValid) {
                        const message = 'Le mot de passe est incorrect';
                        return res.status(401).json({ message })
                    }

                    let role = user.role
                    let id = user.id;

                    // Création du jéton pour chaque user avec jwt
                    const jeton = jwt.sign(
                        { id: user.id },
                        primaryKey,
                        { expiresIn: "5h" }
                    )

                    const message = `L'utilisateur a été connecté avec succès`;
                    db.users.update({ statut: 1 }, { where: { id: id } }).then(() => {

                    }).catch(err => {
                        console.log(err)
                    })

                    return res.json({ message, jeton, role, id })
                })
            }))

            .catch(err => {
                const message = `L'utilisateur n'a pas pu être connecté`;
                return res.status(500).json({ message, data: err })
            })
    }

    else {
        const message = "Adresse email non valide.";
        return res.status(401).json({ message });
    }
}

module.exports = {
    login
}