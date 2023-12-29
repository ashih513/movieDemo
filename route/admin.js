var express = require('express');
var router = express.Router();
const VerifyToken = require("../middleware/VerifyToken");
const paginationMiddleware = require("../middleware/pagination");

// constoller include
const AdminController = require("../controller/admin/admin.controller");
const MovieController = require("../controller/admin/movie.controller");
const HomeController = require("../controller/admin/home.controller");

// Admin related api
router.post('/login', AdminController.login);
router.post('/uploadImageArr', HomeController.uploadImageArr);

 
/* start movie route  */
router.get('/movie', VerifyToken, MovieController.index);
router.get('/movie/:id', VerifyToken, MovieController.view);
router.post('/movie/store', VerifyToken, MovieController.store);
router.post('/movie/update/:id', VerifyToken, MovieController.update);
/* end movie route  */


module.exports = router;