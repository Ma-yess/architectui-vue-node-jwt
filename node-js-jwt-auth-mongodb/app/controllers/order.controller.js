const db = require("../models");
const Order = db.orders;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };


exports.createOrder = (req, res) => {
    //delete req.body._id;
    const order = new Order({
        ...req.body
    });
    order.save()
        .then(() => res.status(201).json({ message: 'Order enregistré !'}))
        .catch(error => res.status(400).json({ error }));
    
};

exports.findAllOrder = (req, res) => {
    const { page, size, clientID } = req.query;
  console.log(req.query);
  var condition = clientID
    ? { clientID: { $regex: new RegExp(clientID), $options: "i" } }
    : {};
    console.log(req.body);
  const { limit, offset } = getPagination(page, size);
  console.log(offset);
  Order.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        Orders: data.docs,
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

exports.findOneOrder = (req, res) => {

    Order.findOne({ _id: req.params.id })
    .then(order => res.status(200).json(order))
    .catch(error => res.status(404).json({ error }));
};

exports.deleteOrder = (req, res) => {
    Order.deleteOne({ id: req.params.id })
    .then(() => res.status(200).json({ message: 'Order  supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.updateOrder = (req, res) => {

    
};