const db = require('../models');
const { ValidationError, UniqueConstraintError, where } = require('sequelize');

const createCategory = (req, res) => {
    db.categories.create(req.body)
        .then(resp => {
            res.status(201).json(resp);
        })
        .catch(err => {
            return res.status(500).json(err)
        })
};

const updateCategory = (req, res) => {
    let id = req.params.id;

    db.categories.update(req.body, { where: { id: id } })
        .then(resp => {
            res.status(200).json("Catégorie a été bien modifiée")
        })
        .catch(err => {
            return res.status(500).json(err)
        })
}

const delteCategory = (req, res) => {
    let id = req.params.id;

    db.categories.destroy({ where: { id: id } })
        .then(resp => {
            res.status(200).json('Catégorie supprimée avec succès')
        })
        .catch(err => {
            return res.status(500).json(err)
        })
}

const getAllCategories = (req, res) => {
    db.categories.findAll()
        .then(resp => {
            res.status(200).json({ data: resp })
        })
        .catch(err => {
            return res.status(500).json(err)
        })
}

module.exports = {
    getAllCategories,
    delteCategory,
    createCategory,
    updateCategory
}