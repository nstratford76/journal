const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String, 
    required: true
  },
  journal: {
    entries: [
      {
        entryId: {
          type: Schema.Types.ObjectId,
          ref: 'Entry',
          required: true
        },
        quantity: { type: Number, required: true }
      }   
    ]
  } 
});

userSchema.methods.addToJournal = function(entry) {
  const journalEntryIndex = this.journal.items.findIndex(cp => {
    return cp.entryId.toString() === entry._id.toString();
  });
  let newQuantity = 1;
  const updatedJournalEntries = [...this.journal.entries];

  if (journalEntryIndex >= 0) {
    newQuantity = this.journal.items[journalEntryIndex].quantity + 1;
    updatedJournalEntries[journalEntryIndex].quantity = newQuantity;
  } else {
    updatedJournalEntries.push({
      entryId: entry._id,
      quantity: newQuantity
    });
  }
  const updatedJournal = {
    entries: updatedJournalEntries
  };
  this.journal = updatedJournal;
  return this.save();
};

userSchema.methods.removeFromCart = function(entryId) {
  const updatedJournalEntries = this.journal.entries.filter(entry => {
    return entry.entryId.toString() !== entryId.toString();
  });
  this.journal.entries = updatedJournalEntries;
  return this.save();
};

userSchema.methods.clearCart = function() {
  this.journal = { entries: [] };
  return this.save();
};

module.exports = mongoose.model('User', userSchema);