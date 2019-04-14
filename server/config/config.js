
module.exports = {
  "development": {
    "username": "postgres",
    "password": "yash6496",
    "database": "QRSCAN",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres",
    //"use_env_variable": "DATABASE_URL", // for REMOTE DB -> requires DATABASE_URL as .env var
    "alloworigin": "http://localhost:3000",
  },
  "TEST": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "alloworigin": "TEST_ALLOW_ORIGIN"
  },
  "production": {
    "username": process.env.PROD_DB_USERNAME,
    "password": process.env.PROD_DB_PASSWORD,
    "database": process.env.PROD_DB_NAME,
    "host": process.env.PROD_DB_HOSTNAME,
    "port": 5432,
    "dialect": "postgres",
    "alloworigin": process.env.PROD_ALLOW_ORIGIN
  }
};
