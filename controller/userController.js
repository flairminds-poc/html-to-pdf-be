const userService = require('../service/userService.js');
const documentService = require('../service/documentService.js')
const {sendFailRes , sendSuccessRes} = require('../utils/responses.js');
async function addUser(req , res){
    try {
      const insUserRes = await userService.insUserData(req.body);
      if (!insUserRes) {
        return sendFailRes(res, { message: "Error adding user data" }, 400, 'addUser-insUserRes');
      }
      const insDocRes = await documentService.generatePDF(req.body);
      if (!insDocRes) {
        return sendFailRes(res, { message: "Error generating PDF" }, 400 , 'addUser-insDocRes');
      }
      const saveDocData = await documentService.saveDocData(insUserRes.insertId ,insDocRes);
      if(!saveDocData){
        return sendFailRes(res, { message: "Error saving document related data" }, 400 , 'addUser-saveDocData');
      }
      return sendSuccessRes(res, { message : "All the operations performed successfully"});
    
    } catch (error) {
      return sendFailRes(res, { message: "Data couldnt be saved..." }, 500);
    }
}
module.exports = { addUser }