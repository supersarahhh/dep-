const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', (req, res) => {
    db.companies.find({}, { reviews: true, _id: false })
        .then(companies => {
           
            const flatList = []
            for (let company of companies) { flatList.push(...company.reviews) }
            res.render('reviews/rev-index', { revs: flatList })
        })
});


router.get('/new/:companyId', (req, res) => {
    db.companies.findById(req.params.companyId)
        .then(company => {
            if (company) {
                res.render('reviews/new-form.ejs', { company: company })
            } else {
                res.send('404 Error: Page Not Found')
            }
        })
})

router.post('/create/:companyId', (req, res) => {
    db.companies.findByIdAndUpdate(
        req.params.revId,
        { $push: { reviews: req.body } },
        { new: true }
    )
        .then(() => res.redirect('/companies/' + req.params.revId))
});

router.get('/:id', (req, res) => {
    db.companies.findOne(
        { 'rev._id': req.params.id },
        { 'rev.$': true, _id: false }
    )
        .then(company => {
           
            res.render('reviews/rev-details', { app: company.reviews[0] })
        })
});

router.delete('/:id', (req, res) => {
    db.companies.findOneAndUpdate(
        { 'reviews._id': req.params.id },
        { $pull: { reviews: { _id: req.params.id } } },
        { new: true }
    )
        .then(company => res.json(company))
});


module.exports = router
