const express = require('express');
const db = require('../db/db');
const { TakeChance } = require('take-chance');

const router = express.Router();

/*
let public_id = 'HbRaZvgdls';
let xhr = new XMLHttpRequest();
xhr.open("GET", '/api/list?public_id='+public_id, true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        console.table(JSON.parse(this.response));
    }
}
*/
router.get('/list', (req, res) => {
    const { public_id } = req.query;

    if (public_id == undefined) {
        res.status(400).send('Bad Request: No id specified');
        return;
    }

    db.query('SELECT name, created_by, created_date FROM lists WHERE public_id = ?', [public_id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json(err);
            return;
        }
        res.status(200).json(results);
    });
});

/*
let xhr = new XMLHttpRequest();
xhr.open("POST", '/api/list', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
    name: 'Biedronka',
    created_by: 'Foo',
    created_date: new Date().toISOString(),
    lang: navigator.languages[0],
}));
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        console.log(this.response);
    }
}
*/
router.post('/list', (req, res) => {
    const { name, created_by, created_date, lang } = req.body;
    const public_id = TakeChance.id();

    db.query('INSERT INTO lists SET ?', { public_id, name, created_by, created_date }, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json(err);
            return;
        }
        db.query('SELECT name FROM list_suggestions WHERE name = ?', [name], (err2, items) => {
            if (err2) {
                console.error(err2);
                return;
            }
            if (items.length) return;
            db.query('INSERT INTO list_suggestions SET ?', { name, type: 'null', accepted: 0, lang: lang.toLowerCase() }, (err3) => {
                if (err3) {
                    console.error(err3);
                    return;
                }
            });
        });
        res.status(201).send(public_id);
    });
});

/*
let list_id = 'HbRaZvgdls';
let xhr = new XMLHttpRequest();
xhr.open("GET", '/api/products?list_id='+list_id, true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        console.table(JSON.parse(this.response));
    }
}
*/
router.get('/products', (req, res) => {
    const { list_id } = req.query;

    if (list_id == undefined) {
        res.status(400).send('Bad Request: No id specified');
        return;
    }

    db.query('SELECT * FROM products WHERE list_id = ?', [list_id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json(err);
            return;
        }
        res.status(200).json(results);
    });
});

/*
let xhr = new XMLHttpRequest();
xhr.open("POST", '/api/products', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
    list_id: 'HbRaZvgdls',
    name: 'Kawa',
    amount: '2',
    created_by: 'joker876',
    created_date: new Date().toISOString(),
    lang: navigator.languages[0],
}));
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        console.log(this.response);
    }
}
*/
router.post('/products', (req, res) => {
    const { list_id, name, amount, created_by, created_date, lang } = req.body;

    if (list_id == undefined) {
        res.status(400).send('Bad Request: No id specified');
        return;
    }

    db.query('INSERT INTO products SET ?', { list_id, name, amount, created_by, created_date }, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json(err);
            return;
        }
        db.query('SELECT name FROM product_suggestions WHERE name = ?', [name], (err2, items) => {
            if (err2) {
                console.error(err2);
                return;
            }
            if (items.length) return;
            db.query('INSERT INTO product_suggestions SET ?', { name, accepted: 0, lang: lang.toLowerCase() }, (err3) => {
                if (err3) {
                    console.error(err3);
                    return;
                }
            });
        });
        res.status(201).json(results);
    });
});

/*
let xhr = new XMLHttpRequest();
xhr.open("PATCH", '/api/products', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
    id: 2,
    name: 'Kawa',
    amount: '2',
    modified_by: 'joker876',
    modified_date: new Date().toISOString(),
    lang: navigator.languages[0],
}));
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        console.log(this.response);
    }
}
*/
router.patch('/products', (req, res) => {
    const { id, name, amount, modified_by, modified_date, lang } = req.body;

    if (id == undefined) {
        res.status(400).send('Bad Request: No id specified');
        return;
    }

    db.query('UPDATE products SET ? WHERE id = ?', [{ name, amount, modified_by, modified_date }, id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json(err);
            return;
        }
        db.query('SELECT name FROM product_suggestions WHERE name = ?', [name], (err2, items) => {
            if (err2) {
                console.error(err2);
                return;
            }
            if (items.length) return;
            db.query('INSERT INTO product_suggestions SET ?', { name, accepted: 0, lang: lang.toLowerCase() }, (err3) => {
                if (err3) {
                    console.error(err3);
                    return;
                }
            });
        });
        res.status(201).json(results);
    });
});

module.exports = router;