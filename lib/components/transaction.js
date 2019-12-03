const HttpRequestClient = require('../services/httpRequestClient');
const Validation = require('../services/validation');

class Transaction {
  constructor(authCredential) {
    this._authCredential = authCredential;
    this.httpRequestClient = new HttpRequestClient(this._authCredential);
    this.Validation = new Validation(this._authCredential);
  }

  // Create Transaction with the PaymentRequest object Provided
  createTransaction(transactionRequest) {
    return new Promise((resolve, reject) => {
      // Check that all the required fields are present in the paymentRequest object
      const validationErrors = this.Validation.validateTransactionRequest(
        transactionRequest
      );

      if (validationErrors) {
        reject(validationErrors.message);
      }

      // Call executeTransaction method to make API call when the fields validation is succeeded
      // The method takes in two parameters, paymentRequest and callback
      this.httpRequestClient.executeTransactionRequest(
        transactionRequest,
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

  // Get the Transaction Information using Transaction ID given by Xente
  getTransactionDetailsById(transactionId) {
    return new Promise((resolve, reject) => {
      // Validate the transaction ID before making a request to the API
      if (!transactionId || typeof transactionId != 'string') {
        reject(
          new Error('Transaction ID is required and must be a string').message
        );
      }

      // Make request when the transaction Id has been validated presence and of the right format
      // The method takes in two parameters i.e. transactionId and the callback function
      this.httpRequestClient.executeTransactionDetailsRequest(
        transactionId,
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

  // Get the Transaction Information using Request Id given by Xente
  getTransactionDetailsByRequestId(requestId) {
    return new Promise((resolve, reject) => {
      // Validate the transaction ID before making a request to the API
      if (!requestId || typeof requestId != 'string') {
        reject('Request ID is required and must be a string');
      }

      this.httpRequestClient.executeTransactionDetailsRequest2(
        requestId,
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

module.exports = Transaction;
