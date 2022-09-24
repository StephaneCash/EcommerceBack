const db = require('../models');
const Product = db.products;
const multer = require('multer');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const productCreate = async (req, res) => {
    let Storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "../frontend/public/images")
        },
        filename: (req, file, callback) => {
            const MIME_TYPES = {
                "image/jpg": "jpg",
                "image/png": "png",
                "image/jpeg": "jpg",
                "image/gif": "gif"
            };

            const extension = MIME_TYPES[file.mimetype];

            if (extension) {
                callback(null, file.originalname ? file.originalname : req.body.file);
            } else {
                return
            }
        }
    });

    const upload = multer({
        storage: Storage
    }).single('file');

    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ err })
        } else {
            console.log(req.file)
            try {
                const title = req.body.title;
                const description = req.body.description;
                const price = req.body.price;
                const qty = req.body.qty;
                const rating = req.body.rating;

                try {
                    const product = await Product.create({
                        title: title,
                        description: description,
                        price: price,
                        qty: qty,
                        image: "./images/" + req.file.originalname,
                        rating: rating,
                        userId: req.body.userId,
                        categoryId: req.body.categoryId
                    });
                    return res.status(201).json({ message: "Produit ajouté avec succès ", data: product })
                } catch (err) {
                    return res.status(400).send({ err })
                }
            }
            catch (errors) {
                if (errors instanceof ValidationError) {
                    return res.status(400).json({
                        message: errors.message
                    });
                }

                if (errors instanceof UniqueConstraintError) {
                    return res.status(400).json({
                        message: errors.message
                    });
                }
            }
        }
    });
}

const getAllProducts = (req, res) => {
    Product.findAll(
        {
            include: [{
                model: db.users,
                as: 'users'
            }, {
                model: db.categories,
                as: 'categories'
            }]
        })
        .then(resp => {
            if (resp) {
                res.status(200).json({
                    message: 'La liste de tableaux a été bien trouvée.',
                    data: resp
                });
            } else {
                return res.status(404).json({
                    message: 'La liste de tableaux est vide.',
                    data: resp
                });
            }
        }).catch(err => {
            return res.status(500).json({ erreur: err })
        })
}

const updateProduct = (req, res) => {
    let Storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "../frontend/public/images")
        },
        filename: (req, file, callback) => {
            const MIME_TYPES = {
                "image/jpg": "jpg",
                "image/png": "png",
                "image/jpeg": "jpg",
                "image/gif": "gif"
            };

            const extension = MIME_TYPES[file.mimetype];

            if (extension) {
                callback(null, file.originalname ? file.originalname : req.body.file);
            } else {
                return
            }
        }
    });

    const upload = multer({
        storage: Storage
    }).single('file');

    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ err })
        } else {
            const id = req.params.id;
            const title = req.body.title;
            const description = req.body.description;
            const price = req.body.price;
            const qty = req.body.qty;
            const rating = req.body.rating;

            Product.update({
                title: title,
                description: description,
                price: price,
                qty: qty,
                image: "./images/" + req.file.originalname,
                rating: rating,
                userId: req.body.userId,
                categoryId: req.body.categoryId
            }, {
                where: { id: id }
            })
                .then(resp => {
                    if (resp) {
                        res.status(200).json({ message: "Produit a été bien édité" })
                    } else {
                        return res.status(400).json('Pas de modification');
                    }
                })
                .catch(err => {
                    return res.status(500).json({ message: "Pas de modification" })
                })
        }
    })
}

const getOneProduct = (req, res) => {
    Product.findByPk(req.params.id)
        .then(product => {
            if (product === null) {
                const message = `Le tableau demandé n'existe pas`;
                return res.status(404).json({ message, data: product })
            }
            const productFind = product;

            return Product.findAll({ where: { id: req.params.id } })
                .then(resp => {
                    res.status(200).json({ message: 'Tableau trouvé', data: productFind })
                })
                .catch(err => {
                    return res.status(500).json(err)
                })

        }).catch(err => {
            let message = "Le tableau n'a pas être trouvé";
            res.status(500).json({ message, data: err })
        })
}

const deleteProduct = (req, res) => {
    Product.findByPk(req.params.id).then(product => {
        if (product === null) {
            const message = `Le tableau demandé n'existe pas`;
            return res.status(404).json({ message, data: product })
        }

        const productDeleted = product;

        return Product.destroy({
            where: { id: req.params.id }
        }).then(() => {
            const message = `Le tableau ${req.params.id} a été bien supprimé`;
            res.json({ message, data: productDeleted })
        }).catch(err => {
            let message = "Le tableau n'a pas être supprimé";
            res.status(500).json({ message, data: err })
        })
    })
}

module.exports = {
    productCreate,
    getAllProducts,
    updateProduct,
    getOneProduct,
    deleteProduct
}