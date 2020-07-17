const path = require('path');

const express = require('express');

const journalController = require('../controllers/journal');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', isAuth, journalController.getIndex);

router.get('/add-entry', isAuth, journalController.getAddEntry);

router.get('/entries', isAuth, journalController.getEntries);

router.get('/entries/:entryId', isAuth, journalController.getEntry);

router.get('/journal', isAuth, journalController.getJournal);

router.post('/entries', isAuth, journalController.postAddEntry);

router.post('/journal', isAuth, journalController.postJournal);

router.post('/delete', isAuth, journalController.postJournalDeleteEntry);

router.post('/delete-entry', isAuth, journalController.postDeleteEntry);


module.exports = router;
