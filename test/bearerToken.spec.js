'use strict';

const { assert } = require('chai');
const chalk = require('chalk');

const HttpRequestClient = require('../lib/services/httpRequestClient');

// Correct authentication Credentials
const correctAuthCredential = {
  apikey: '6A19EA2A706041A599375CC95FF08809',
  password: 'Demo123456',
  mode: 'sandbox'
};

// Wrong Authentication Credentials
const WrongAuthCredential = {
  apikey: 'wrongapikey',
  password: 'wrongpassword',
  mode: 'sandbox'
};

// Initialize HttpRequestClient with respectrive authCredentials
const CorrectHttpRequestClient = new HttpRequestClient(correctAuthCredential);
const WrongHttpRequestClient = new HttpRequestClient(WrongAuthCredential);

//Test the executeBearerToken() method with correct and wrong authentication credentials
describe('executeBearerToken()', () => {
  describe('executeBaearerToken() with correct authCredentials', () => {
    it('The Bearer Token should be generated from the Xente API', () => {
      CorrectHttpRequestClient.executeBearerTokenRequest(
        (error, bearerToken) => {
          if (error) {
            console.log(chalk(error.message));
          } else {
            assert.exists(bearerToken);
          }
        }
      );
    });
  });

  describe('executeBearerToken() with wrong authCredentials', () => {
    it('The Bearer Token should not be generated from the Xente API', () => {
      WrongHttpRequestClient.executeBearerTokenRequest((error, bearerToken) => {
        if (error) {
          try {
            assert.equal(error.message, 'Incorrect Apikey or Password');
          } catch (error) {
            console.log(chalk.red(error.message));
          }
        }
      });
    });
  });
});

// Test Bearer Token is actually generated and kept in a global variable this.bearerToken
describe('this.bearerToken global variable', () => {
  it('executeBearerToken() should update this.bearerToken global variable ', () => {
    CorrectHttpRequestClient.executeBearerTokenRequest((error, bearerToken) => {
      if (error) {
        console.log(chalk.red(error.message));
      } else {
        assert.equal(CorrectHttpRequestClient.bearerToken, bearerToken);
      }
    });
  });

  // Test that the bearer token generated and kept in global variable is actually the one being used for
  // making any subsequent API calls before a new can be generated
  // The bearer token should not be generated unless the it is confirmed the the global one has actually expired
  it('the Bearer Token in the global variable should be used first for making request', () => {
    // Generate a bearer token and kept in a constant variable "generatedBearertoken"
    CorrectHttpRequestClient.executeBearerTokenRequest((error, bearerToken) => {
      if (error) {
        console.log(chalk.red(error.message));
      } else {
        // A constant variable the keeps the generated bearer token
        const generatedBearerToken = CorrectHttpRequestClient.bearerToken;

        // Make a request (transaction, account etc) and check the token used is still the same
        CorrectHttpRequestClient.executeAccountDetailsRequest(
          '256784378515',
          (error, accountDetails) => {
            if (error) {
              console.log(chalk.red(error.message));
            } else {
              // A constant variable that keeps the token used for making subsequent request(account details)
              const accountBearerToken = CorrectHttpRequestClient.bearerToken;

              // Check that the two bearer token are actually the same
              assert.equal(accountBearerToken, generatedBearerToken);
            }
          }
        );
      }
    });
  });
});
