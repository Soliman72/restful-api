import mongoose from 'mongoose';
import config from 'config';
import logger from './logger'

const DB_URL = config.get<string>('mongo_url');

async function connect(){
  await mongoose.connect(DB_URL)
    .then(() => {
      logger.info('DB connect success...');
    })
    .catch((err) => {
      throw new Error(err);
    })
}

export default connect;