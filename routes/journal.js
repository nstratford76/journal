const path = require('path');

const express = require('express');

const journalController = require('../controllers/journal');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', isAuth, journalController.getIndex);

router.get('/entries', isAuth, journalController.getEntries);

router.get('/entries/:entryId', isAuth, journalController.getEntry);

// router.get('/cart', isAuth, journalController.getCart);

// router.post('/cart', isAuth, journalController.postCart);

// router.post('/cart-delete-item', isAuth, journalController.postCartDeleteProduct);

// router.post('/create-order',isAuth, journalController.postOrder);

// router.get('/orders', isAuth, journalController.getOrders);

module.exports = router;
