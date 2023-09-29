import express from 'express';
import cors from 'cors';
import config from 'config';
import connect from './utils/connect'
import logger from './utils/logger';
import router from './router/router';
import bodyParser from 'body-parser';


const app = express();

// body parser 
app.use(bodyParser.json());

// enable cors with varios option 
app.use(cors({
  credentials: true
}));


// Route Mounting 
app.use('/api/v1', router);

const port = config.get<number>('port') || 3000;

app.listen(port, async() => {
  logger.info(`server running on port ${port}...`);
  await connect();
});