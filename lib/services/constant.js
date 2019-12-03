'use strict';

const productionUrl = 'https://payments.xente.co/api/v1';
const sandboxUrl = 'http://34.90.206.233:83/api/v1';

let baseDomain = 'api.xente.co';
const baseSandboxDomain = `sandbox.${baseDomain}`;

class Constant {
  constructor(isProduction) {
    let baseUrl = '';
    if (isProduction == true) {
      baseUrl = productionUrl;
    } else {
      baseUrl = sandboxUrl;
    }

    this.authUrl = `${baseUrl}/Auth/login`;
    this.transactionUrl = `${baseUrl}/transactions`;
    this.accountUrl = `${baseUrl}/Accounts`;
    this.paymentProvidersUrl = `${baseUrl}/paymentproviders`;
  }
}

module.exports = Constant;
