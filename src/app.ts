import express from 'express';
import { APP_CONFIG } from './config';
import { testRouter } from './features/test/test-router';
import {blogsRouter} from "./features/blogs/api/blogs-router";


const app = express();

app.use(express.json()); // Чтобы Express понимал JSON в теле запроса

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(APP_CONFIG.PATH.BLOGS.BASE, blogsRouter)

app.use(APP_CONFIG.PATH.TEST.BASE, testRouter)

export { app };
