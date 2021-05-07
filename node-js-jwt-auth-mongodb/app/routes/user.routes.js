const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const users = require("../controllers/listeUser.controller.js");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);


// # USERS CRUD

  // Retrieve all users
  app.get("/api/test/list-users", users.findAll);

  // Delete a Tutorial with id
  app.delete("/api/test/:id", users.delete);

  // Update a Tutorial with id
  app.put("/api/test/:id", users.update);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

//# END USERS CRUD



  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );


};
