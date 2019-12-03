'use strict';

const { assert } = require('chai');

const chalk = require('chalk');

const xentePaymentGateway = require('./spec.helper');

describe('Transaction Details', () => {
  describe('getTransactionDetails()', () => {
    it('Message property should exist in the returned object', () => {
      const transactionId = 'BBDEE4B0D4204206BA0D24DCC7ECE3C3-256784378515';
      xentePaymentGateway.transactions
        .getTransactionDetailsById(transactionId)
        .then(response => {
          assert.exists(response.message);
        })
        .catch(error => {
          console.log(chalk.red(error.message));
        });
    });
  });
});
