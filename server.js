const express = require("express");
var cors = require('cors')
const app = express();

const admin = require('firebase-admin');
const credentials = require("./tversus-f87bb-firebase-adminsdk-1f9qc-f3c77d5161.json")
admin.initializeApp({
    credential: admin.credential.cert(credentials)
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.post('/signup', async (req, res) => {
    console.log(req.body)
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    const userReponse = await admin.auth().createUser({
        email: user.email,
        password: user.password,
        emailVerified: false,
        disabled: false
    })
    res.json(userReponse);
})

app.get('/register')


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('server is running on port ' + PORT))