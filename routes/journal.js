const path = require('path');

const express = require('express');

const journalController = require('../controllers/journal');
//const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', journalController.getIndex);

router.get('/add-entry', journalController.getAddEntry);

router.get('/entries', journalController.getEntries);

router.get('/entries/:entryId', journalController.getEntry);

router.get('/journal', journalController.getJournal);

router.post('/entries', journalController.postAddEntry);

router.post('/journal', journalController.postJournal);

router.post('/journal-delete-item', journalController.postJournalDeleteEntry);


module.exports = router;
