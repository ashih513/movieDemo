const Helper = require("../../helper/Helper");
const AdminModel = require("../../model/Admin.model");

const AdminService = {};

AdminService.login = async (req) => {
	try{
    var query = { email: req.email, password: Helper.createPassword(req.password), status:"active" };
    console.log("Admin login query ", query)
    const response =  await AdminModel.findOne(query);
    console.log("response", response)
    return response;
	}
	catch (error) {
        return [];
    }
};

module.exports = AdminService;