const express = require('express');
const morgan = require('morgan');
// const path = require()
const cors = require('cors')

const app = express();


app.use(morgan('dev'));
// Quan s'envi un metode 'post' atraves de un formulari, el servidor el podra entendra i es podra gestionar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(require('./src/routes/index'));

// Fer publica la carpeta per accedir a un HTML, directament des del servidor
// app.use(express.static(path.join(__dirname, 'public')))

module.exports = app;















// const express = require("express");
// var cors = require('cors')
// const app = express();

// const admin = require('firebase-admin');
// const credentials = require("./tversus-f87bb-firebase-adminsdk-1f9qc-f3c77d5161.json")
// admin.initializeApp({
//     credential: admin.credential.cert(credentials)
// })

// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));

// app.post('/signup', async (req, res) => {
//     // console.log(req.body)
//     const user = {
//         email: req.body.email,
//         password: req.body.password
//     }
//     const userReponse = await admin.auth().createUser({
//         email: user.email,
//         password: user.password,
//         emailVerified: false,
//         disabled: false
//     })
//     res.json(userReponse);
// }) 

// app.get('/login', async (res) => {
//     console.log(req.body)
//     const userResponse = await admin.auth().getUserByEmail({
//         email: req.body.email
//     })
//     res.json(userResponse)
// });


// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log('server is running on port ' + PORT));