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

    console.log(users);

    // Amb aixo retornes els usuaris del firestore
    res.send(users)
});

// Crear usaris en el Firestore
router.post('/new-user', async (req, res) => {

    // TODO: Add camp tokens to the new user created
    const { id, username, email, password, borndate } = req.body

    console.log(username, password, email, borndate);

    await db.collection('users').doc(id).set({
        username,
        email,
        password,
        borndate
    });

    res.send('New user created');
});

// Obtenir un usuari del Firestore
router.get('/get-user/:id', async (req, res) => {

    // Per poder buscar un usuari en concret es passa la id per els 'params' que son els parametres de la url
    const user = await db.collection('users').doc(req.params.id).get();

    res.send(user.data())
});

// Eliminar un usuari del Firestore
router.get('/delete-user/:id', async (req, res) => {

    await db.collection('users').doc(req.params.id).delete()

    res.send('User deleted')
});

// Actualitzar un usuari del Firestore
router.post('/update-user/:id', async (req, res) => {

    console.log(req.params.id);
    console.log(req.body);

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

// Obtenir torneijos oficials



router.get('/get-tournaments-official/', async (req, res) => {

    try {
        const collectionRef = db.collection('tournament');
        const querySnapshot = await collectionRef.where('type', '==', "official").get();

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

router.get('/get-tournaments-unofficial/', async (req, res) => {

  try {
      const collectionRef = db.collection('tournament');
      const querySnapshot = await collectionRef.where('type', '==', "unofficial").get();

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

router.post('/buy-tokens/:id', async (req, res) => {

    console.log(req.params.id);
    console.log(req.body);

    const { id } = req.params;

    await db.collection('users').doc(id).update(req.body);

    res.send(req.body);
});

router.post('/join-tournament/:id', async (req, res) => {

    console.log(req.params.id);
    console.log(req.body);

    const { id } = req.params;

    await db.collection('users').doc(id).update(req.body);

    res.send(req.body);
});

module.exports = router;
