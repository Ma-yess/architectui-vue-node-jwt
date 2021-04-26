const db = require("../models");
const User = db.users;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Create and Save a new Tutorial
exports.create = (req, res) => {
  
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  
  const { page, size, username } = req.query;
  console.log(req.query);
  var condition = username
    ? { username: { $regex: new RegExp(username), $options: "i" } }
    : {};
    console.log(req.body);
  const { limit, offset } = getPagination(page, size);
  console.log(offset);
  User.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        users: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
  });
    
    
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};


 // Find all users with roles user
exports.findAllUserRole = (req, res) => { 
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  User.paginate({ Roles: "User" }, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        users: data.docs,
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

// other CRUD functions