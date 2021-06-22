
const order = require("../controllers/order.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

// # ORDERS CRUD

  //Create New ORDER
  app.post("/api/test/order/add", order.createOrder);

  // Retrieve all ORDER
  app.get("/api/test/order/list", order.findAllOrder);

  // Retrieve ORDER with id
  app.get("/api/test/order/:id", order.findOneOrder);

  // Delete a ORDER with id
  app.delete("/api/test/order/:id", order.deleteOrder);

  // Update a ORDER with id
  app.put("/api/test/order/:id", order.updateOrder);

  // Retrieve client ORDER
  //app.get("/api/test/order/client", order.findAllClientStats);

//# END ORDER CRUD
};