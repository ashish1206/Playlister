import express from 'express';
import { env } from './config'

const app = express();

app.listen(env.PORT, () => {
    console.log('Server started at', env.PORT);
})