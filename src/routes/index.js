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
    const { username, email, password, borndate, isJoined, tokens, tournament_id, image, devices} = req.body

    await db.collection('users').doc(email).set({
        username,
        email,
        password,
        borndate,
        isJoined,
        tokens,
        tournament_id,
        image,
        devices
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
  try {
      const tournamentId = req.params.id;
      const collectionRef = db.collection('tournaments');
      const documentSnapshot = await collectionRef.doc(tournamentId).get();

      if (!documentSnapshot.exists) {
          res.status(404).send('Tournament not found');
      } else {
          const tournament = documentSnapshot.data();
          res.send(tournament);
      }

  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
});

// Crear un torneig
router.post('/new-tournament', async (req, res) => {
  const { description, game, id, image, name, organizer, price, type, reward, modality } = req.body;

  const tournamentRef = db.collection('tournaments').doc(id);
  const roundsRef = tournamentRef.collection('rounds');

  const tournamentData = {
    description,
    game,
    id,
    image,
    name,
    organizer,
    price,
    type,
    reward,
    modality
  };

  // Create a new tournament document and add its rounds collection
  try {
    await db.runTransaction(async (transaction) => {
      // Create the tournament document
      transaction.set(tournamentRef, tournamentData);

      res.send('New tournament created');
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post('/new-tournament-teams', async (req, res) => {
  const { description, game, id, image, name, organizer, price, type, rounds, teamsNumber, reward, actualRound, modality } = req.body;

  const tournamentRef = db.collection('tournaments').doc(id);
  const roundsRef = tournamentRef.collection('rounds');

  const tournamentData = {
    description,
    game,
    id,
    image,
    name,
    organizer,
    price,
    type,
    teamsNumber,
    reward,
    actualRound,
    modality
  };

  // Create a new tournament document and add its rounds collection
  try {
    await db.runTransaction(async (transaction) => {
      // Create the tournament document
      transaction.set(tournamentRef, tournamentData);

      // Create the rounds collection
      transaction.set(roundsRef.doc('0'), { roundNumber: 0 });

      res.send('New tournament created');
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
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

router.get('/delete-tournament/:id', async (req, res) => {

    await db.collection('tournaments').doc(req.params.id).delete();

    res.send('Tournament Deleted');
});

router.post('/update-tournament/:id', async (req, res) => {

    const { id } = req.params;

    await db.collection('tournaments').doc(id).update(req.body);

    res.send("Updated Tournament");
});

router.get('/get-suggestion-tournaments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const collectionRef = db.collection('tournaments');
        const querySnapshot = await collectionRef.where('name', '>=', id).get();

        if (querySnapshot.empty) {
            res.status(404).send('Tournaments not found');
        } else {
            const tournaments = querySnapshot.docs
                .map(doc => doc.data())
                .filter(tournament => tournament.name.includes(id));

            res.send(tournaments);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


router.get('/get-users-by-tournament-id/:id', async (req, res) => {
  try {
    const collectionRef = db.collection('users');
    const tournamentId = req.params.id;
    const querySnapshot = await collectionRef.where('tournament_id', '==', tournamentId).get();

    if (querySnapshot.empty) {
      res.status(404).send(`Users not found for tournament with id ${tournamentId}`);
    } else {
      const usernames = querySnapshot.docs.map(doc => doc.get('username'));
      res.send(usernames);
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

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

router.post('/tournaments/:id/users', async (req, res) => {
  try {
    const tournamentId = req.params.id;
    const userId = req.body.userId;

    const tournamentRef = db.collection('tournaments').doc(tournamentId);
    const userRef = db.collection('users').doc(userId);

    // Verificar que tanto el usuario como el torneo existen
    const tournamentDoc = await tournamentRef.get();
    const userDoc = await userRef.get();

    if (!tournamentDoc.exists) {
      return res.status(404).send('Tournament not found');
    }

    if (!userDoc.exists) {
      return res.status(404).send('User not found');
    }

    // Agregar el usuario a la colección "users" del torneo
    await tournamentRef.collection('users').doc(userId).set({
      name: userDoc.data().name,
      email: userDoc.data().email,
      // Aquí podrías incluir cualquier otra información del usuario que quieras guardar en la colección "users" del torneo
    });

    return res.send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.post('/update-tournament/:id', async (req, res) => {
  const { id } = req.params.id;
  const { rounds } = req.body;

  await db.collection('tournaments').doc(id).update({
    rounds: {
      rounds: rounds
    }
  });

  res.send("Updated tournament");
});

router.get('/rounds/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tournamentRef = db.collection('tournaments').doc(id);
    const roundsRef = tournamentRef.collection('rounds');

    const snapshot = await roundsRef.orderBy('roundNumber').get();
    const rounds = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.send(rounds);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put('/updateRounds/:tournamentId/:roundNumber', async (req, res) => {
  try {
    const { tournamentId, roundNumber } = req.params;
    const roundsRef = db.collection('tournaments').doc(tournamentId).collection('rounds');
    const query = roundsRef.where('roundNumber', '==', parseInt(roundNumber));
    const snapshot = await query.get();
    if (snapshot.empty) {
      throw new Error(`No round found with number ${roundNumber}`);
    }
    const roundRef = snapshot.docs[0].ref;
    await roundRef.update(req.body);

    res.send('Round updated successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.patch('/updateTournamentValues/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let { users, ...tournament } = req.body;

    const tournamentRef = db.collection('tournaments').doc(id);
    await tournamentRef.update(tournament);

    res.status(200).json({ message: 'Tournament updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating tournament' });
  }
});

router.delete('/deleteRounds/:tournamentId', async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const tournamentRef = db.collection('tournaments').doc(tournamentId);
    const roundsRef = tournamentRef.collection('rounds');
    const documentRef = roundsRef.doc('0');

    await documentRef.delete();

    res.send('Documento eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el documento:', error);
    res.status(500).send('Error al eliminar el documento');
  }
});

router.get('/get-usersData-by-tournament-id/:id', async (req, res) => {
  try {
    const collectionRef = db.collection('users');
    const tournamentId = req.params.id;
    const querySnapshot = await collectionRef.where('tournament_id', '==', tournamentId).get();

    if (querySnapshot.empty) {
      res.status(404).send(`Users not found for tournament with id ${tournamentId}`);
    } else {
      const users = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          username: data.username,
          email: data.email
        };
      });

      res.send(users);
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.post('/add-round/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tournamentRef = db.collection('tournaments').doc(id);

    await tournamentRef.collection('rounds').doc().set(req.body);

    res.send(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);

  }});

module.exports = router;
