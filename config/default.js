module.exports = {
  api: {
    port: process.env.SERVER_PORT || 8080
  },
  auth: {
    secretKey: process.env.AUTH_SECRECT_KEY || 'resource_allocation_app_salt'
  },
  users:[
    {email: 'test1@gmail.com', password: 'pass123'},
    {email: 'test2@gmail.com', password: 'pass123'},
    {email: 'test3@gmail.com', password: 'pass123'},
  ],
  mongoInitialTimeOut: process.env.MONGO_INTIAL_TIMEOUT || '50000',
  mongoIdleTimeOut: process.env.MONGO_IDLE_TIMEOUT || '5000000',
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017',
  mongoApplicationDB: process.env.MONGO_APP_DB || 'resource-allocation',
}
