var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.locals.connection.query('SELECT * from käyttäjä', function (err, results, fields) {
        if (err) throw err;
        res.send({ 'status': 200, 'error': null, 'response': results });
    });
});

router.get('/:id', function (req, res, next) {
    res.locals.connection.query(`SELECT * from käyttäjä WHERE ID = ${req.params.id}`, function (err, results, fields) {
        if (err) {
            res.send({ 'status': 400, 'error': "Bad request", 'response': results });
        }
        res.send({ 'status': 200, 'error': null, 'response': results });
    });
});

router.post('/', function (req, res, next) {
    res.locals.connection.query('INSERT INTO käyttäjä (Käyttäjänimi, Salasana, Etunimi, Sukunimi) VALUES (?, ?, ?, ?)',
    [req.body.kayttajanimi, req.body.salasana, req.body.etunimi, req.body.sukunimi],
    function (err, results, fields) {
        if (err) {
            res.send({ 'status': 400, 'error': "Bad request", 'response': results });
        }
        res.send({ 'status': 200, 'error': null, 'response': results });
    });
});

module.exports = router;