'use strict';

const XentePaymentGateway = require('../index');

// Initialize Xente SDK
const authCredential = {
  apikey: '6A19EA2A706041A599375CC95FF08809',
  password: 'Demo123456',
  mode: 'sandbox'
};

module.exports = new XentePaymentGateway(authCredential);
