var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.locals.connection.query('SELECT * from tapahtuma', function (err, results, fields) {
        if (err) {
            res.status(500).send({'error': "Database error"});
            return;
        }
        res.send(results);
    });
});

router.get('/piggybank/:pID', (req, res) => {
    if(isNaN(req.params.pID)) {
        res.status(400).send({'error': 'bad request'});
        return;
    }
    res.locals.connection.query(`SELECT * from tapahtuma WHERE SP_ID = ${req.params.pID}`, function (err, results, fields) {
        if (err) {
            res.status(500).send({'error': "Database error"});
            return;
        }
        res.send(results);
    });
})
router.get('/:id', function (req, res, next) {
    if(isNaN(req.params.id)) {
        res.status(400).send({'error':'bad request'});
        return;
    }
    res.locals.connection.query(`SELECT * from tapahtuma WHERE ID = ${req.params.id}`, function (err, results, fields) {
        if (err) {
            res.status(500).send({'error': "Database error"});
            return;
        }
        res.send(results);
    });
});

router.post('/', (req, res, next) => {
    if(!req.body || isNaN(req.body.rahanarvo) || isNaN(req.body.SP_ID)) {
        res.status(400).send({'error': 'bad request'})
        return;
    }
    res.locals.connection.query('INSERT INTO tapahtuma (Rahanarvo, SP_ID) VALUES (?, ?)',
        [req.body.rahanarvo, req.body.SP_ID],
        (err, results, fields) => {
            if (err) {
                res.status(500).send({'error': "Database error"});
                return;
            }
            res.json({'message':'success'});
        });
});

module.exports = router;
