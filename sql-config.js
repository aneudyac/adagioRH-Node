const sqlConfig = {
  user: 'user',
  password: '123',
  server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
  database: 'adagioRH',

  options: {
      encrypt: true // Use this if you're on Windows Azure
  }
}

module.exports = { sqlConfig }