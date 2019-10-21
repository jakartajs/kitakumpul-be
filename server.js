require('dotenv').config();
const { env } = process;
const {createTerminus} = require('@godaddy/terminus');
const http = require('http');
const app =  require('./src/app');

const serverApi =  http.createServer(app);

createTerminus(serverApi,{
  logger: console.log,
  healthChecks: {
    '/healthz': () => Promise.resolve()
  }
}).listen(env.SERVICE_PORT, () => {
   console.info(`Kita Kumpulbe run in port ${env.SERVICE_PORT}`);
});
