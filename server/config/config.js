module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    JWT_EXPIRE: '30d',
    PORT: process.env.PORT || 5000
  };
  