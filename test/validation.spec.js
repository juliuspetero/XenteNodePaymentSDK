'use strict';

const { assert } = require('chai');
const chalk = require('chalk');

const Validation = require('../lib/services/validation');

let authCredential = {
  apikey: '6A19EA2A706041A599375CC95FF08809',
  password: 'Demo123456',
  mode: 'live'
};

let transactionRequest = {
  paymentProvider: 'MTNMOBILEMONEYUG',
  amount: '800',
  message: 'Demo Request',
  customerId: '256778418592',
  customerPhone: '256778418592',
  customerEmail: 'juliuspetero@outlook.com',
  customerReference: '256778418592',
  metadata: '',
  batchId: 'Batch001',
  requestId: new Date().getTime().toString(36)
};

describe('Validation', () => {
  describe('AuthCredential validations', () => {
    it('Should return null when all authCredential fields are provided with correct data types', () => {
      const validation = new Validation(authCredential);
      const validationErrors = validation.validateAuthCredential();
      assert.notExists(validationErrors);
    });

    it('Should error messsages when some fields are not provided or in the wrong data types', () => {
      authCredential = {
        apikey: '6A19EA2A706041A599375CC95FF08809',
        password: 12334,
        mode: 'live'
      };
      const validation = new Validation(authCredential);
      const validationErrors = validation.validateAuthCredential();
      assert.exists(validationErrors);
    });
  });

  describe('Transaction Request validations', () => {
    it('Should return null when all fields in the transactionRequest object are provided with correct data types', () => {
      const validation = new Validation(authCredential);
      const validationErrors = validation.validateTransactionRequest(
        transactionRequest
      );
      assert.notExists(validationErrors);
    });

    it('Should return error messsages when some fields are not provided or in the wrong data types', () => {
      transactionRequest = {
        paymentProvider: 'MTNMOBILEMONEYUG',
        amount: '800',
        message: 'Demo Request',
        customerId: '256778418592',
        customerPhone: '256778418592',
        customerEmail: 'juliuspetero@outlook.com',
        customerReference: '256778418592',
        metadata: '',
        batchId: 'Batch001'
        // requestId: new Date().getTime().toString(36) // RequestId is missing
      };
      const validation = new Validation(authCredential);
      const validationErrors = validation.validateTransactionRequest(
        transactionRequest
      );
      assert.exists(validationErrors);
    });
  });
});
