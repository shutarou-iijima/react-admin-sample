const express = require('express');
const router = express.Router();
const doQuery = require('../db/db');
const addHeader = require('../middleware/add_header');

router.route('/books')
    .get(addHeader, async (req, res) => {
        const sql = `SELECT * FROM book;`;
        const queryResult = await doQuery(sql).catch((err) => { console.log(err) });
        res.setHeader('X-Total-Count', queryResult.rows.length + '');
        res.send(queryResult.rows)
    })
    .post(addHeader, async (req, res) => {
        const book = req.body;
        const sql = `INSERT INTO book (title, author, borrow_member_id) VALUES ($1, $2, $3) RETURNING *`;
        const queryResult = await doQuery({
            text: sql,
            values: [
                book.title,
                book.author,
                book.borrow_member_id,
            ],
        }).catch((err) => { console.log(err) });
        res.send(queryResult.rows[0]);
    });

router.route('/books/:id')
    .get(addHeader, async (req, res) => {
        const sql = `SELECT * FROM book where id=${req.params.id}`;
        const queryResult = await doQuery(sql)
            .catch((err) => { console.log(err) });
        res.send(queryResult.rows[0]);
    })
    .put(addHeader, async (req, res) => {
        const book = req.body;
        const sql = `UPDATE book SET title=$1, author=$2, borrow_member_id=$3 where id=$4 RETURNING *`;
        const queryResult = await doQuery({
            text: sql,
            values: [
                book.title,
                book.author,
                book.borrow_member_id,
                book.id,
            ],
        }).catch((err) => { console.log(err) });
        res.send(queryResult.rows[0])
    })
    .delete(addHeader, async (req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM book WHERE id=$1`;
        const queryResult = await doQuery({
            text: sql,
            values: [
                id
            ],
        }).catch((err) => { console.log(err) });
        res.send({ id })
    });

module.exports = router;
