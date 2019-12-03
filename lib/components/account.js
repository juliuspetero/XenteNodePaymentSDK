// Import custom files
const HttpRequestClient = require('../services/httpRequestClient');

class Account {
  constructor(authCredential) {
    this._authCredential = authCredential;
    this.httpRequestClient = new HttpRequestClient(this._authCredential);
  }

  // Retrieve the user account information by the Account ID
  getAccountDetailsById(accountId) {
    return new Promise((resolve, reject) => {
      // Validate the account ID before making any request to the API
      if (!accountId || typeof accountId != 'string') {
        reject(
          new Error('Account ID is required and must be a string').message
        );
      }

      // For passed validation make request to retrieve specific account information
      // This method takes in an accountId and callback with error and responseBody as the first and second parameters
      this.httpRequestClient.executeAccountDetailsRequest(
        accountId,
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

module.exports = Account;
