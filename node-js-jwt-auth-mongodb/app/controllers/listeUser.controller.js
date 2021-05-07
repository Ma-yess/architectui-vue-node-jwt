const db = require("../models");
const User = db.users;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};


// Create and Save a new User
//refer to auth controller signup

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
          err.message || "Some error occurred while retrieving users.",
      });
  });
    
    
};

// Find a single User with an id
exports.findOne = (req, res) => {
  
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  var newUser = {};
  newUser = JSON.parse(req.body.data)
  console.log(id)
  console.log(newUser)
  console.log(newUser.firstName)
  User.findByIdAndUpdate(id,  newUser, { new : true, useFindAndModify:false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else {
        //res.json(data);
        console.log(data.firstName)
        res.send({ message: "User was updated successfully."  });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
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