import * as dotenv from 'dotenv';

dotenv.config();

export const env: any = {
    PORT: process.env.PORT,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
};