import 'dotenv/config';
import express from 'express';
import router from './router.js';
import cors from 'cors';
import { notFound, errorHandler } from './middlewares/errorHandlers.js';

const app = express();

app.use(express.static("../front/"));

app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || /^(http:\/\/localhost:\d+|http:\/\/127\.0\.0\.1:\d+)$/.test(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
}));


app.use(router);

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.BASE_URL}:${process.env.PORT}`);
});