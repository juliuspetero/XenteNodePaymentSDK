'use strict';

const { assert } = require('chai');

const Constant = require('../lib/services/constant');

describe('Constant URLs', () => {
  const constant = new Constant(true);
  it('Authentication URL Should be correct', () => {
    assert.equal(constant.authUrl, 'http://34.90.206.233:83/api/v1/Auth/login');
  });
  it('Transaction URL should be correct', () => {
    assert.equal(
      constant.transactionUrl,
      'http://34.90.206.233:83/api/v1/transactions'
    );
  });
  it('Account URL should be correct', () => {
    assert.equal(
      constant.accountUrl,
      'http://34.90.206.233:83/api/v1/Accounts'
    );
  });
  it('Payment Providers URL should be correct', () => {
    assert.equal(
      constant.paymentProvidersUrl,
      'http://34.90.206.233:83/api/v1/paymentproviders'
    );
  });
});
