const db = require("../models");
const Client = db.clients;

exports.createClient = (req, res) => {

    //delete req.body._id;
    const client = new Client({
        ...req.body
    });
    client.save()
        .then(() => res.status(201).json({ message: 'Client enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.findAllClient = (req, res) => {
    Client.find()
    .then(clients => { 
        //console.log(clients); 
        res.status(200).json(clients)
    })
    .catch(error => res.status(400).json({ error }));
};

exports.findOneClient = (req, res) => {

    Client.findOne({ _id: req.params.id })
    .then(client => res.status(200).json(client))
    .catch(error => res.status(404).json({ error }));
};

exports.deleteClient = (req, res) => {
    Client.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Client  supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.updateClient = (req, res) => {

    Client.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Client modifié !'}))
    .catch(error => res.status(400).json({ error }));
};