const {getDocuments} = require('../service/documentService.js');
const { Readable } = require('stream');
const {s3Client , GetObjectCommand } = require('../config/aws-s3.js');
const {AWS_CONFIG} = require('../config/index.js')
const {sendFailRes , sendSuccessRes} = require('../utils/responses.js');

async function getDocumentsCtrl(_ , res){
  try {
    const results = await getDocuments();
    return sendSuccessRes(res, {result: results});
  } catch (error) {
    return sendFailRes(res, { message: "Error getting List" }, 400);
  }
}
async function downloadPdf(req, res) {
  const { filename } = req.params;
  const s3Key = `${AWS_CONFIG.S3_PATH}/${filename}`;
  const s3Bucket = AWS_CONFIG.BUCKET;
  try {
    s3Client.send(new GetObjectCommand({ Bucket: s3Bucket, Key: s3Key }))
      .then(s3response => {
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        Readable.from(s3response.Body).pipe(res);
        return sendSuccessRes(res, { message : "documents downloaded successfully"});
      })
      .catch(err => {
        return sendFailRes(res, {message: 'Error in getting object from s3'})
      })
  } catch (error) {
    return sendFailRes(res, { message: 'Error in getting object from s3' }, 400);
  }
}
module.exports = { getDocumentsCtrl , downloadPdf};
