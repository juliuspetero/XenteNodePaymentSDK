'use strict';

const { assert } = require('chai');
const chalk = require('chalk');

const xentepaymentGateway = require('./spec.helper');

describe('Account', () => {
  describe('getAccountDetailsById()', () => {
    it('Should return account object with message property', () => {
      const accountId = '256784378515';
      xentepaymentGateway.accounts
        .getAccountDetailsById(accountId)
        .then(response => {
          assert.exists(response.message);
        })
        .catch(error => {
          console.log(chalk.red(error.message));
        });
    });
  });
});
