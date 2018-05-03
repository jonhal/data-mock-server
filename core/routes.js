const express = require('express');
const crypto = require('crypto');
const database = require('./database');
const { URL } = require('url');

function checkContentType(req, res, next) {
    if (!req.is('application/json')) {
        return res.status(400).send({ ok: false, error: "Bad request" });
    }

    next();
}
const router = express.Router();

router.get('/get-link', (req, res) => {
    const seed = crypto.randomBytes(64);
    const hash = crypto.createHash('sha256').update(seed).digest('hex');

    const url = new URL(req.get('referer'));
    return res.send({ link: `${url.protocol}//${url.hostname}/${hash}/` });
});

// router.get(/^\/[0-9a-z]{64}/, (req, res) =>
router.get(/^\/[0-9]*/, (req, res) =>
    database
        .get(req.path, result => res.status(200).send(result)),
        () => res.status(500).send({ ok: false })   
);

// router.post(/^\/[0-9a-z]{64}\/initdataformock/, checkContentType, (req, res) =>
router.post(/^\/[0-9]*\/initdataformock/, checkContentType, (req, res) =>
    database
    .post(req.path.replace('initdataformock/',''), req.body, (msg) => res.status(201).send({ ok: true , 'msg': msg}),
        () => res.status(500).send({ ok: false }))
)

// router.post(/^\/[0-9a-z]{64}\/(?!initdataformock)/, checkContentType, (req, res) =>
router.post(/^\/[0-9]*\/initdataformock/, checkContentType, (req, res) =>
    database
    .get(req.path, result => res.status(200).send({ result, ok: true, aa:1 })),
    () => res.status(500).send({ ok: false })   
)

// router.put(/^\/[0-9a-z]{64}/, checkContentType, (req, res) =>
router.put(/^\/[0-9]*/, checkContentType, (req, res) =>
    database
        .put(req.path, req.body)
        .then(() => res.status(200).send({ ok: true }))
        .catch(() => res.status(500).send({ ok: false }))
);

// router.delete(/^\/[0-9a-z]{64}/, (req, res) =>
router.delete(/^\/[0-9]*/, (req, res) =>
    database
        .delete(req.path, req.body)
        .then(() => res.status(200).send({ ok: true }))
        .catch(() => res.status(500).send({ ok: false }))
);

module.exports = router;
