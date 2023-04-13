const express = require("express");
const admin = require("../controller/Admin/controller")
const middleware = require("../middleware/middleware")
const router = express.Router();
const multer = require("multer")


var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'upload');
    },
    filename: function (req, file, callback) {
      console.log("File:", file)
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
  });
var upload = multer({
  storage: Storage,
})

router.post('/register', upload.single("photo"),admin.registerAdmin);
router.post('/login', admin.loginAdmin);
router.get('/getList', [middleware], admin.getAdminList);
router.get('/getbyid/:id', [middleware], admin.getAdminById);
router.put('/update/:id', upload.single("photo"),[middleware],admin.updateAdmin);
router.delete('/logOut/:id',[middleware], admin.logOutAdmin);

module.exports = router
