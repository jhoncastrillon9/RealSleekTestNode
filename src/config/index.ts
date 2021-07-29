import dotenv from 'dotenv';

const envFound = dotenv.config();
const env = process.env;
if (envFound.error) {  
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {


    /**Database */
    MONGO_DATABASE: process.env.MONGO_DATABASE,
    MONGO_USER: process.env.MONGO_USER || '',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || '',
    MONGO_HOST: process.env.MONGO_HOST,

    /**Jwt */
    JWT_SECRET:process.env.JWT_SECRET,

    /**Port */
    PORT: process.env.PORT,


};