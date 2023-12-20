const express = require("express");
const adminRouter = express.Router();
const {addAdmin, adminLogin, getAdmins, getAdminById} = require('../controllers/admin-controller');

adminRouter.get('/signup', addAdmin);
adminRouter.post('/login', adminLogin);
adminRouter.get('/', getAdmins);
// adminRouter.get('/:id', getAdminById);

module.exports = adminRouter;