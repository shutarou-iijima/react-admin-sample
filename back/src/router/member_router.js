const express = require('express');
const router = express.Router();
const doQuery = require('../db/db');
const addHeader = require('../middleware/add_header');

router.route('/members')
    .get(addHeader, async (req, res) => {
        const sql = `SELECT * FROM member;`;
        const queryResult = await doQuery(sql).catch((err) => { console.log(err) });
        res.setHeader('X-Total-Count', queryResult.rows.length + '');
        res.send(queryResult.rows)
    })
    .post(addHeader, async (req, res) => {
        const member = req.body;
        const sql = `INSERT INTO member (name) VALUES ($1) RETURNING *`;
        const queryResult = await doQuery({
            text: sql,
            values: [
                member.name,
            ],
        }).catch((err) => { console.log(err) });
        res.send(queryResult.rows[0]);
    });

router.route('/members/:id')
    .get(addHeader, async (req, res) => {
        const sql = `SELECT * FROM member where id=${req.params.id}`;
        const queryResult = await doQuery(sql)
            .catch((err) => { console.log(err) });
        res.send(queryResult.rows[0]);
    })
    .put(addHeader, async (req, res) => {
        const member = req.body
        const sql = `UPDATE member SET name=$1 where id=$2 RETURNING *`;
        const queryResult = await doQuery({
            text: sql,
            values: [
                member.name,
                member.id,
            ],
        }).catch((err) => { console.log(err) });
        res.send(queryResult.rows[0])
    })
    .delete(addHeader, async (req, res) => {
        // TODO 借りている本からも削除する
        const id = req.params.id;
        const sql = `DELETE FROM member WHERE id=$1`;
        const queryResult = await doQuery({
            text: sql,
            values: [
                id
            ],
        }).catch((err) => { console.log(err) });
        res.send({ id })
    });

module.exports = router;
