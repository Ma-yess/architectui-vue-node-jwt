module.exports = app => {
    const controller = require("../controllers/listeUser.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/listeUsers", controller.findAll);
  
    // Retrieve all published Tutorials
    router.get("/roleUser", controller.findAllUserRole);
  
   
  
    app.use('/api', router);
  };