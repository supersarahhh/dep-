require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const methodOverride = require('method-override');

const db = require('./models');

const companiesCtrl = require('./controllers/companies')
const revsCtrl = require('./controllers/reviews')

const app = express();

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static('public'))
app.use(connectLiveReload());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', function (req, res) {
    db.companies.find({ isFeatured: true })
        .then(companies => {
            res.render('home', {
                companies: companies
            })
        })
});

app.get('/seed', function (req, res) {

    db.companies.deleteMany({})
        .then(removedCompanies => {
            console.log(`Removed ${removedCompanies.deletedCount} products`)

            db.companies.insertMany(db.seedCompanies)
            .then(addedCompanies => {
                console.log(`Added ${addedCompanies.length} new companies`)
                res.json(addedCompanies)
            })
    })
});


app.use('/companies', companiesCtrl)
app.use('/reviews', revsCtrl)
app.get('*', function (req, res) {
    res.render('404')
});

app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});

