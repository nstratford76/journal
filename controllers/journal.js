const Entry = require('../models/entry');


exports.getAddEntry = (req, res, next) => {
  res.render('journal/add-entry', {
    pageTitle: 'Add Entry',
    path: '/journal/add-entry'
  });
};

exports.postAddEntry = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const date = req.body.date;
  const entry = new Entry({
    title: title, 
    description: description, 
    imageUrl: imageUrl,
    date: date,
    userId: req.user
  });
  entry
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Entry');
      res.redirect('/entries');
    })
    .catch(err => {
      console.log(err);
    });
};


exports.getEntries = (req, res, next) => {
  Entry.find()
    .then(entries => {
      res.render('journal/entries', {
        entries: entries,
        pageTitle: 'All entries',
        path: '/entries',
      
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEntry = (req, res, next) => {
  const entryId = req.params.entryId;
  Entry.findById(entryId)
    .then(entry => {
      res.render('journal/entry-detail', {
        entry: entry,
        pageTitle: entry.title,
        path: '/entries',
        
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Entry.find()
    .then(entries => {
      res.render('journal/index', {
        entries: entries,
        pageTitle: 'journal',
        path: '/'
      
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getJournal = (req, res, next) => {
  req.user
    .populate('journal.entries.entryId')
    .execPopulate()
    .then(user => {
      const entries = user.journal.entries;
      res.render('journal/entry-list', {
        path: '/journal',
        pageTitle: 'Your Journal',
        entries: entries,
        
      });
    })
    .catch(err => console.log(err));
};

exports.postJournal = (req, res, next) => {
  const entryId = req.body.entryId;
  entry.findById(entryId)
  .then(entry => {
    
    return req.user.addToJournal(entry);

  }).then(result => {
    
    res.redirect('/journal');

  })
  
};

exports.postJournalDeleteEntry = (req, res, next) => {
  const entryId = req.body.entryId;
  req.user.removeFromJournal(entryId)
    .then(result => {
      res.redirect('/delete-entry');
    })
    .catch(err => console.log(err));
};

exports.postDeleteEntry = (req, res, next) => {
  const entryId = req.body.entryId;
  Entry.findByIdAndRemove(entryId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/entries');
    })
    .catch(err => console.log(err));
};

// exports.postOrder = (req, res, next) => {
//   req.user
//     .populate('cart.items.entryId')
//     .execPopulate()
//     .then(user => {
//       const entries = user.cart.items.map(i => {
//         return { quantity: i.quantity, entry: { ...i.entryId._doc } };
//       });
//       const order = new Order({
//         user: {
//           name: req.user.name,
//           userId: req.user
//         },
//         entries: entries
//       });
//       return order.save();
//     })
//     .then(result => {
//       return req.user.clearCart();
//     })
//     .then(() => {
//       res.redirect('/orders');
//     })
//     .catch(err => console.log(err));
// };

// exports.getOrders = (req, res, next) => {
//   Order.find({ 'user.userId': req.user._id })
//     .then(orders => {
//       res.render('journal/orders', {
//         path: '/orders',
//         pageTitle: 'Your Orders',
//         orders: orders,
        
//       });
//     })
//     .catch(err => console.log(err));
// };
