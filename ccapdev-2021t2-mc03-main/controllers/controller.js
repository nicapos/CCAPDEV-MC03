const db = require('../models/db.js');
const Transaction = require('../models/TransactionModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/`. This displays `index.hbs` with all
            transactions currently stored in the database.
    */
    getIndex: function (req, res) { // WORKS
        var query = {};
        var projection = 'name refno amount';

        db.findMany(Transaction, query, projection, function (result) {
            if (result) {
                let data = JSON.parse(JSON.stringify(result));
                //console.log(data);
                res.render('index', {transaction: data});
            } else
                res.render('index');
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getCheckRefNo`. This function checks if a
            specific reference number is stored in the database. If the number
            is stored in the database, it returns an object containing the
            reference number, otherwise, it returns an empty string.
    */
    getCheckRefNo: function(req, res) {
        var refno = req.query.refno;
        var query = {refno: refno};
        var projection = 'refno';

        db.findOne(Transaction, query, projection, function (result) {
            res.send(result);
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getAdd`. This function adds the transaction
            sent by the client to the database, then appends the new
            transaction to the list of transactions in `index.hbs`.
    */
    getAdd: function(req, res) {
        var name = req.query.name;
        var refno = req.query.refno;
        var amount = req.query.amount;
        var transaction = {
            name: name,
            refno: refno,
            amount: amount
        };

        db.insertOne(Transaction, transaction, function(flag) {
            if (flag)
                res.send(flag);
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getDelete`. This function deletes the transaction
            from the database, then removes the transaction from the list of
            transactions in `index.hbs`.
    */
    getDelete: function (req, res) {
        var refno = req.query.refno;
        var query = {refno: refno};

        db.deleteOne(Transaction, query, function (result) {
            res.send(result);
        });
    }

}

module.exports = controller;
