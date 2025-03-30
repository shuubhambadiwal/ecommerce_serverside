const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: 'sandbox',
  client_id: 'AYSBc_K2pC4e_B9d4vGNbXWNM2A8o9lO8na6uJN5uEsEonhhft6jnnnNcLwAuyH4jN4xp6J2OHGqK34M',
  client_secret: 'EPb1jKKAwoMSxrA704PP-t-mPH0I72CCgqEY57kojIwn9D5onNn2jnhbHxjjsB9uvlPkttKODvbu3DQ2',
});

module.exports = paypal;
