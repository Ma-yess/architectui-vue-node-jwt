
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
  app.post("/api/test/client/add", client.createClient);

  // Retrieve all CLIENTS
  app.get("/api/test/client/list", client.findAllClient);

  // Retrieve CLIENT with id
  app.get("/api/test/client/:id", client.findOneClient);

  // Delete a CLIENT with id
  app.delete("/api/test/client/:id", client.deleteClient);

  // Update a CLIENT with id
  app.put("/api/test/client/:id", client.updateClient);

  

//# END CLIENTS CRUD
};