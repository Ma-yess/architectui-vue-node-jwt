const db = require("../models");
const Client = db.clients;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

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
    const { page, size, customerFirstName } = req.query;
  //console.log(req.query);
  var condition = customerFirstName
    ? { customerFirstName: { $regex: new RegExp(customerFirstName), $options: "i" } }
    : {};
    console.log(req.body);
  const { limit, offset } = getPagination(page, size);
  console.log(offset);
  Client.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        clients: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users.",
      });
  });
    
    
};

exports.findOneClient = (req, res) => {

    Client.findOne({ _id: req.params.id })
    .then(client => res.status(200).json(client))
    .catch(error => res.status(404).json({ error }));
};

exports.deleteClient = (req, res) => {
    Client.deleteOne({ id: req.params.id })
    .then(() => res.status(200).json({ message: 'Client  supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.updateClient = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
      var newClient = {};
      newClient = JSON.parse(req.body.data)//JSON.parse()
      console.log(id)
      console.log(newClient)
      console.log(newClient.customerFirstName)
      Client.findByIdAndUpdate(id,  newClient, { new : true, useFindAndModify:false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Client with id=${id}. Maybe Client was not found!`
            });
          } else {
            //res.json(data);
            console.log(data.customerFirstName)
            res.send({ message: "Client was updated successfully."  });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Client with id=" + id
          });
        });
};