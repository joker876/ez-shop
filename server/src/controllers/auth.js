const jwt = require('jsonwebtoken');
const crypto = require('crypto');



// exports.login = (req, res) => {
//     const { username, password } = req.body;

//     db.query('SELECT username, password FROM users WHERE username = ?', [username], (err, results) => {
//         console.log('query1');
//         if (err) console.error(err);

//         if (results?.length == 0) {
//             console.log('results1');
//             return res.json({
//                 type: 'error',
//                 code: 'CANNOT_FIND',
//             }); // "wrong username or password" error
//         }
//         if (results?.length > 1) {
//             console.log('results2');
//             return res.status(500).json({
//                 message: 'There are multiple users with the same username. Please contact the administrators about this issue.',
//             }); // there are somehow multiple of same username. Don't know if this will ever happen, but it's just to be sure.
//         }

//         let hashedPassword = hash(password);

//         if (hashedPassword == results[0].password) {

//             const user = { name: username };

//             const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//             res.status(200).json({ accessToken });
//             //! old
//             // return res.status(200).json({
//             //     type: 'success',
//             //     code: 'LOGGED_IN'
//             // });
//         }
//         return res.json({
//             type: 'error',
//             code: 'CANNOT_FIND',
//         }); // "wrong username or password" error
//     });
// }

// exports.authenticateToken = function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader?.split(' ')[1];
//     if (token == null) return res.status(401).send();

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.status(403).send();
//         req.user = user;
//         next();
//     })
// }

function hash(text) {
    return crypto.createHash('sha256').update(text).digest('base64');
}