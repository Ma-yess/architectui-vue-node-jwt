const db = require("../models");
const Account = db.accounts;

exports.createAccount = (req, res) => {
    //delete req.body._id;
    const account = new Account({
        ...req.body
    });
    account.save()
        .then(() => res.status(201).json({ message: 'Account enregistré !'}))
        .catch(error => res.status(400).json({ error }));
    
};

exports.findAllAccount = (req, res) => {
    
  
    
};

exports.findOneAccount = (req, res) => {

    Account.findOne({ _id: req.params.id })
    .then(account => res.status(200).json(account))
    .catch(error => res.status(404).json({ error }));
};

exports.deleteAccount = (req, res) => {
    Account.deleteOne({ id: req.params.id })
    .then(() => res.status(200).json({ message: 'Account  supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.updateAccount = (req, res) => {

    
};