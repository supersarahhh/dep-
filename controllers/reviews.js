const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', (req, res) => {
    db.Company.find({}, { reviews: true, _id: false })
        .then(companies => {
           
            const flatList = []
            for (let company of companies) { flatList.push(...company.reviews) }
            res.render('reviews/rev-index', { revs: flatList })
        })
});


router.get('/new/:companyId', (req, res) => {
    db.Company.findById(req.params.companyId)
        .then(company => {
            if (company) {
                res.render('reviews/rev-form.ejs', { company: company })
            } else {
                res.send('404 Error: Page Not Found')
            }
        })
})

router.post('/create/:companyId', (req, res) => {
    db.Company.findByIdAndUpdate(
        req.params.companyId,
        { $push: { reviews: req.body } },
        { new: true }
    )
        .then((result) => {
            console.log(result)
            res.redirect('/companies/' + req.params.companyId)})
});

router.get('/:id', (req, res) => {
    db.Company.findOne(
        { 'rev._id': req.params.id },
        { 'rev.$': true, _id: false }
    )
        .then(company => {
           
            res.render('reviews/rev-details', { app: company.reviews[0] })
        })
});

router.delete('/:id', (req, res) => {
    db.Company.findOneAndUpdate(
        { 'reviews._id': req.params.id },
        { $pull: { reviews: { _id: req.params.id } } },
        { new: true }
    )
    .then(company => res.redirect('/companies/' + company._id))
});


module.exports = router
