var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.locals.connection.query('SELECT * from tapahtuma', function (err, results, fields) {
        if (err) throw err;
        res.send({ 'status': 200, 'error': null, 'response': results });
    });
});

router.get('/piggybank/:pID', (req, res) => {
    res.locals.connection.query(`SELECT * from tapahtuma WHERE SP_ID = ${req.params.pID}`, function (err, results, fields) {
        if (err) throw err;
        res.send({ 'status': 200, 'error': null, 'response': results });
    });
})
router.get('/:id', function (req, res, next) {
    res.locals.connection.query(`SELECT * from tapahtuma WHERE ID = ${req.params.id}`, function (err, results, fields) {
        if (err) throw err;
        res.send({ 'status': 200, 'error': null, 'response': results });
    });
});

router.post('/', (req, res, next) => {
    res.locals.connection.query('INSERT INTO tapahtuma (Rahanarvo, SP_ID) VALUES (?, ?)',
        [req.body.rahanarvo, req.body.SP_ID],
        (err, results, fields) => {
            if (err) throw err;
            res.json({message:'success'});
        });
});

module.exports = router;
