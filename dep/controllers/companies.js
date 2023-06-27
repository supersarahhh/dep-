const express = require('express')
const router = express.Router()
const db = require('../models')
const companies = require('../models/companies')

router.get('/', function (req, res) {
    db.companies.find({})
        .then(companies => {
            res.render('companies-index', {
                companies: companies
            })
        })
})

router.get('/new', (req, res) => {
    res.render('new-company')
})

router.post('/', (req, res) => {
    db.companies.create(req.body)
        .then(companies => res.redirect('/companies/' + company._id))
})


router.get('/:id', function (req, res) {
    db.companies.findById(req.params.id)
        .then(company => {
                res.render('company-details', { company: company,
                })
    })
})

router.get('/:id/edit', (req, res) => {
    db.companies.findById(req.params.id)
        .then(company => {
            res.render('edit-form', {
                company: company,
            })
        })
})

router.put('/:id', (req, res) => {
    db.companies.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(product => res.redirect('/companies/' + company._id))
})

router.delete('/:id', (req, res) => {
    db.companies.findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/companies'))
 })

 router.post('/create/:companyId', (req, res) => {
    db.companies.findByIdAndUpdate(
        req.params.companyId,
        { $push: { companies: req.body } },
        { new: true }
    )
        .then(() => res.redirect('/company/' + req.params.companyId))
});

module.exports = router