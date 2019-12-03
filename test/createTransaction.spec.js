'use strict';

const { assert } = require('chai');

const chalk = require('chalk');

const xentePaymentGateway = require('./spec.helper');

describe('Transaction', () => {
  describe('createTransaction()', () => {
    it('Should return a success message', () => {
      const transactionRequest = {
        paymentProvider: 'MTNMOBILEMONEYUG',
        amount: '50000',
        message: 'Web Development Ebook',
        customerId: new Date().getTime().toString(36),
        customerPhone: '256782822846',
        customerEmail: 'juliuspetero@outlook.com',
        customerReference: '256782872856',
        metadata: '',
        batchId: 'Batch001',
        requestId: Math.random()
          .toString(36)
          .slice(2)
      };
      xentePaymentGateway.transactions
        .createTransaction(transactionRequest)
        .then(response => {
          assert.exists(response.message);
        })
        .catch(error => {
          console.log(chalk.red(error.message));
        });
    });
  });
});
