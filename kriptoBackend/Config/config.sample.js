// config file for user credentials for accessing OSS blockchain

// rename the file to "config.js"
// and enter username and password

const config = {
  user_credentials: {
    username: "enter_username_here",
    password: "enter_password_here",
  },
  OSS: {
    host: "blockchain.oss.unist.hr",
    port: 8332,
  } /*,
     db: {
       host: "localhost",
       port: 27017,
       name: "db",
     }, */
};

module.exports = config;
