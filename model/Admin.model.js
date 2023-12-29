const mongoose = require('mongoose');
const AdminSchema = require("../schema/admin.schema");
const AdminModel = mongoose.model('admin', AdminSchema, 'admin');
module.exports = AdminModel;