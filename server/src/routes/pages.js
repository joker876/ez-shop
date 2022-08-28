const express = require('express');
const path = require('path');
// const { authenticateToken } = require('../controllers/auth');

const router = express.Router();

const distDirectory = path.join(__dirname, '../../static/');

// router.get('/', (req, res) => {
//     res.sendFile(path.join(distDirectory, 'app/index.html'));
// })
router.get('/', (req, res) => {
    res.status(308).redirect('/app/');
})
router.get('/app/*', (req, res) => {
    res.sendFile(path.join(distDirectory, 'app/index.html'));
});
router.get('/admin', (req, res) => {
    res.sendFile(path.join(distDirectory, 'admin/index.html'));
});

module.exports = router;