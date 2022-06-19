
var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({
    name: String,
    refno: Number,
    amount: Number
});

module.exports = mongoose.model('Transaction', TransactionSchema);
