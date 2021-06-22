
const account = require("../controllers/account.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

// # Accounts CRUD

  //Create New Account
  app.post("/api/test/account/add", account.createAccount);

  // Retrieve all Account
  app.get("/api/test/account/list", account.findAllAccount);

  // Retrieve Account with id
  app.get("/api/test/account/:id", account.findOneAccount);

  // Delete a Account with id
  app.delete("/api/test/account/:id", account.deleteAccount);

  // Update a Account with id
  app.put("/api/test/account/:id", account.updateAccount);

  // Retrieve client Account
  //app.get("/api/test/order/client", account.findAllClientStats);

//# END ORDER CRUD
};