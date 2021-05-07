
const client = require("../controllers/client.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

// # CLIENTS CRUD

  //Create New CLIENT
  app.post("/api/auth/add-client", client.create);

  // Retrieve all CLIENTS
  app.get("/api/test/list-client", client.findAll);

  // Retrieve CLIENT with id
  app.get("/api/test/client:id", client.findOne);

  // Delete a CLIENT with id
  app.delete("/api/test/client:id", client.delete);

  // Update a CLIENT with id
  app.put("/api/test/client:id", client.update);

  

//# END CLIENTS CRUD
};