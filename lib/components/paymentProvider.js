'use strict';

const HttpRequestClient = require('../services/httpRequestClient');

class PaymentProvider {
  constructor(authCredential) {
    this._authCredential = authCredential;
    this.httpRequestClient = new HttpRequestClient(this._authCredential);
  }

  // Get all the payment providers
  // The method takes in a callback with two parameters error and responseBody
  getAllPaymentProviders() {
    return new Promise((resolve, reject) => {
      this.httpRequestClient.executePaymentProvidersRequest(
        (error, responseBody) => {
          if (error) {
            reject(error.message);
          } else {
            resolve(responseBody);
          }
        }
      );
    });
  }
}

module.exports = PaymentProvider;
