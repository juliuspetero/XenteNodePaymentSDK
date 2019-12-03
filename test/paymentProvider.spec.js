'use strict';

const chalk = require('chalk');

const { assert } = require('chai');

const xentePaymentGateway = require('./spec.helper');

describe('Payment Providers', () => {
  describe('getPaymentProviders()', () => {
    it('Should return an array of payment providers', () => {
      xentePaymentGateway.paymentProviders
        .getAllPaymentProviders()
        .then(response => {
          assert.isArray(response.data.collection);
        })
        .catch(error => {
          console.log(chalk.red(error.message));
        });
    });
  });
});
