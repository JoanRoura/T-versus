const { Router } = require('express');
const { db } = require('../../firebase');

const router = Router();

// Endpoints dels usuaris (CRUD)

// Obtenir tots els usuaris del Firestore
router.get('/users', async (req, res) => {
    // Posem la resposat del servidor en una constant
    const querySnapshot = await db.collection('users').get();

    const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    // Amb aixo retornes els usuaris del firestore
    res.send(users)
});

// Crear usaris en el Firestore
router.post('/new-user', async (req, res) => {

    // TODO: Add camp tokens to the new user created
    const { username, email, password, borndate, isJoined, tokens, tournament_id, image } = req.body

    await db.collection('users').doc(email).set({
        username,
        email,
        password,
        borndate,
        isJoined,
        tokens,
        tournament_id,
        image
    });

    res.send('New user created');
});

// Obtenir un usuari del Firestore
router.get('/get-user/:id', async (req, res) => {

    // Per poder buscar un usuari en concret es passa la id per els 'params' que son els parametres de la url
    console.log(req.params.id);

    const user = await db.collection('users').doc(req.params.id).get();
    console.log({
        ...user.data()
    })

    res.send(user.data())
});

// router.get('/get-user/:id', async (req, res) => {

//     // Per poder buscar un usuari en concret es passa la id per els 'params' que son els parametres de la url
//     try {
//         const userId = req.params.id;
//         const userDoc = await db.collection('users').doc(userId).get();

//         console.log(userDoc)

//         if (!userDoc.exists) {
//             res.status(404).send('User not found');
//         } else {
//             const userData = userDoc.data();
//             res.send(userData);
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });

// Eliminar un usuari del Firestore
router.delete('/delete-user/:id', async (req, res) => {

    await db.collection('users').doc(req.params.id).delete()

    res.send('User deleted')
});

// Actualitzar un usuari del Firestore
router.post('/update-user/:id', async (req, res) => {

    const { id } = req.params;

    await db.collection('users').doc(id).update(req.body);

    res.send("Updated user");
});

// Endpoints dels torneijos

// Obtenit tots els torneijos
router.get('/tournaments', async (req, res) => {

    const querySnapshot = await db.collection('tournaments').get();

    const tournaments = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }));

    res.send(tournaments);
});

// Obtenir un torneig del Firestore
router.get('/get-tournament/:id', async (req, res) => {

    const tournament = await db.collection('tournaments').doc(req.params.id).get();
    res.send(tournament.data())
});

// Crear un torneig
router.post('/new-tournament', async (req, res) => {

    // TODO: Add camp tokens to the new user created
    const { description, game, id, image, name, organizer, price, type } = req.body

    await db.collection('tournaments').doc(id).set({
        description, game, id, image, name, organizer, price, type
    });

    res.send('New tournament created');
});

router.get('/get-tournaments-type/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const collectionRef = db.collection('tournaments');
        const querySnapshot = await collectionRef.where('type', '==', id).get();

        if (querySnapshot.empty) {
            res.status(404).send('Tournaments not found');
        } else {
            const tournaments = querySnapshot.docs.map(doc => ({
                ...doc.data()
            }));
            res.send(tournaments);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// router.get('/get-tournaments-unofficial/', async (req, res) => {

//     try {
//         const collectionRef = db.collection('tournaments');
//         const querySnapshot = await collectionRef.where('type', '==', "unofficial").get();

//         if (querySnapshot.empty) {
//             res.status(404).send('Tournaments not found');
//         } else {
//             const tournaments = querySnapshot.docs.map(doc => ({
//                 ...doc.data()
//             }));
//             res.send(tournaments);
//         }

//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });

router.post('/buy-tokens/:id', async (req, res) => {

    const { id } = req.params;

    await db.collection('users').doc(id).update(req.body);

    res.send(req.body);
});

router.post('/join-tournament/:id', async (req, res) => {

    const { id } = req.params;

    await db.collection('users').doc(id).update(req.body);

    res.send(req.body);
});

router.get('/get-players-by-tournament/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const collectionRef = db.collection('users');
        const querySnapshot = await collectionRef.where('tournament_id', '==', id).get();

        if (querySnapshot.empty) {
            res.status(404).send('Tournaments without players');
        } else {
            const users = querySnapshot.docs.map(doc => ({
                ...doc.data()
            }));
            res.send(users);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.delete('/delete-tournament/:id', async (req, res) => {

    await db.collection('tournament').doc(req.params.id).delete()

    res.send('Tournament Deleted')
});



module.exports = router;