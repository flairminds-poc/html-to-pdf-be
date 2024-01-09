const handlebars = require('handlebars');
const puppeteer = require('puppeteer');
const {AWS_CONFIG } = require('../config/index.js')
const {executeQuery} = require('../db_config/dbSchema.js');
const {htmlTemplate} = require('../htmlTemplate/sampleHTMLTemplate.js');
const {s3Client , PutObjectCommand} = require('../config/aws-s3.js');

const saveDocData = (insertId ,unique_identifier ) => {
    const link = AWS_CONFIG.S3_BUCKET_LINK + unique_identifier;
    const documentsData = `INSERT INTO training_tracker_dev.documents (id , unique_identifier, link) VALUES (?, ?, ?)`;
    const insertDocumentsParams = [insertId,unique_identifier,link];
    return executeQuery(documentsData ,insertDocumentsParams)
}

const getDocuments =()=> {
    const selectQuery = `SELECT id , unique_identifier , link FROM training_tracker_dev.documents`
    return executeQuery(selectQuery);
}
const generatePDF = async (data) => {
    try {
        const compiledTemplate = handlebars.compile(htmlTemplate);
        const renderedHtml = compiledTemplate(data);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const fileName = `${data.name}_${Date.now()}.pdf`;

        await page.setContent(renderedHtml, { waitUntil: 'domcontentloaded' });
        const pdfBuffer = await page.pdf({ format: 'A4' });
        
        const s3Key = `${AWS_CONFIG.S3_PATH}/${fileName}`;
        const s3Command = new PutObjectCommand({
            Bucket: AWS_CONFIG.BUCKET,
            Key: s3Key,
            Body: pdfBuffer,
            ContentType: 'application/pdf',
        });
        await s3Client.send(s3Command);
        await browser.close();
        return fileName
    } catch (error) {
        throw error;
    }
};
module.exports = { saveDocData, getDocuments, generatePDF };