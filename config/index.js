require('dotenv').config()

const DB_CONFIG = {
    HOST: process.env.HOST,
    USER : process.env.USER,
    PASSWORD : process.env.PASSWORD ,
    DATABASE : process.env.DATABASE ,
    DATABASE_PORT :  process.env.DATABASE_PORT,
    PORT : process.env.PORT,
}

const AWS_CONFIG = {
    ACCESS_KEY_ID :  process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY : process.env.SECRET_ACCESS_KEY,
    AWS_REGION : process.env.REGION,
    BUCKET : process.env.BUCKET, 
    S3_BUCKET_LINK : process.env.S3_BUCKET_LINK,
    S3_PATH : process.env.S3_PATH
}
module.exports = {DB_CONFIG , AWS_CONFIG}