const path = require('path');

const express = require('express');

const journalController = require('../controllers/journal');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', isAuth, journalController.getIndex);

router.get('/entries', isAuth, journalController.getEntries);

router.get('/entries/:entryId', isAuth, journalController.getEntry);

router.get('/journal', isAuth, journalController.getJournal);

router.post('/journal', isAuth, journalController.postJournal);

router.post('/journal-delete-item', isAuth, journalController.postJournalDeleteEntry);


module.exports = router;
