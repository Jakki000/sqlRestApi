var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    try {
        res.locals.connection.query('SELECT * from käyttäjä', function (err, results, fields) {
            if (err) {
                res.status(500).send({ 'status': 500, 'error': "Database error"});
                return;
            };
            res.send(results);
        });
    } catch(err) {
        console.log(err);
    }
    
});

router.get('/:id', function (req, res, next) {
    if(isNaN(req.params.id)) {
        res.status(400).send({'error': 'bad request'});
        return;
    }
    try {
        res.locals.connection.query(`SELECT * from käyttäjä WHERE ID = ${req.params.id}`, function (err, results, fields) {
            if (err) {
                res.status(500).send({'error': "Database error"});
                return;
            }
            res.status(200).send(results);
        });
    } catch (error) {
        console.log(error);
    }
});

router.post('/', function (req, res, next) {
    try {
        res.locals.connection.query('INSERT INTO käyttäjä (Käyttäjänimi, Salasana, Etunimi, Sukunimi) VALUES (?, ?, ?, ?)',
        [req.body.kayttajanimi, req.body.salasana, req.body.etunimi, req.body.sukunimi],
        function (err, results, fields) {
            if (err) {
                res.status(500);
                res.send({'error': "Database error"});
                return;
            }
            res.status(200).json({'message':'success'});
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;