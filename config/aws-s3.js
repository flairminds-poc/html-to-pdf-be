const {AWS_CONFIG} = require('../config/index.js');
const { S3Client , PutObjectCommand , GetObjectCommand} = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
    region: AWS_CONFIG.AWS_REGION,
    credentials: {
        accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
        secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY
    },
});

module.exports = {s3Client , PutObjectCommand , GetObjectCommand};