'use strict';

const validate = require('validate.js');

class Utility {
  constructor(authCredential) {
    this._authCredential = authCredential;
  }

  // Validate Authentication Credentials
  validateAuthCredential() {
    const constraints = {
      // The apikey is required and should be a string
      apikey: function(value) {
        if (validate.isEmpty(value)) {
          return {
            presence: {
              message: 'is required'
            }
          };
        }
        if (!validate.isString(value)) {
          return {
            format: 'must not contain invalid apikey - eg. Space'
          };
        }

        return null;
      },
      // The password is required and must be a string
      password: function(value) {
        if (validate.isEmpty(value)) {
          return {
            presence: {
              message: 'is required'
            }
          };
        }
        if (!validate.isString(value)) {
          return {
            format: 'must not contain invalid password format'
          };
        }

        return null;
      },
      // The mode is required and must be string
      mode: function(value) {
        if (validate.isEmpty(value)) {
          return {
            presence: {
              message: 'is required'
            }
          };
        }
        if (!validate.isString(value)) {
          return {
            format: 'must not contain invalid payment provider - eg. Space'
          };
        }

        return null;
      }
    };

    // Store all the error messages here
    const error = validate(this._authCredential, constraints);

    if (error) {
      let msg = '';
      for (let k in error) {
        msg += error[k] + '; ';
      }

      // Return the error message to the caller of the function
      return new Error(msg);
    }
  }

  // Validate Payment Credentials object
  validateTransactionRequest(paymentCredential) {
    const constraints = {
      // The Payment Provider is required
      paymentProvider: function(value) {
        if (validate.isEmpty(value)) {
          return {
            presence: {
              message: 'is required'
            }
          };
        }
        if (!validate.isString(value)) {
          return {
            format: 'must not contain invalid payment provider - eg. Space'
          };
        }

        return null;
      },

      // Amount is requires in correct format
      amount: function(value) {
        if (validate.isEmpty(value)) {
          return {
            presence: {
              message: 'is required'
            }
          };
        }
        if (!/^\d+$/.test(value)) {
          return {
            format: 'must not contain invalid amount. Must be a number.'
          };
        }

        return null;
      },

      // Message is required in correct format
      message: function(value) {
        if (validate.isEmpty(value)) {
          return {
            presence: {
              message: 'is required'
            }
          };
        }
        if (!validate.isString(value)) {
          return {
            format: 'must not contain invalid description message - eg. Space'
          };
        }

        return null;
      },

      // Customer ID is required in correct format
      customerId: function(value) {
        if (validate.isEmpty(value)) {
          return {
            presence: {
              message: 'is required'
            }
          };
        }
        if (!validate.isString(value)) {
          return {
            format: 'must not contain invalid customerId - eg. Space'
          };
        }

        return null;
      },

      // customer phone is required
      customerPhone: function(value) {
        if (validate.isEmpty(value)) {
          return {
            presence: {
              message: 'is required'
            }
          };
        }

        if (!/^\d+$/.test(value)) {
          return {
            format: 'must not contain invalid phone number'
          };
        }

        return null;
      },

      // customer Email must be in correct order
      customerEmail: function(value) {
        if (validate.isEmpty(value)) {
          return {
            presence: {
              message: 'is required'
            }
          };
        }
        if (!/\S+@\S+\.\S+/.test(value)) {
          return {
            format: 'must not contain invalid Email Address'
          };
        }

        return null;
      },

      // Customer Reference is required
      customerReference: function(value) {
        if (validate.isEmpty(value)) {
          return {
            presence: {
              message: 'is required'
            }
          };
        }

        if (!/^\d+$/.test(value)) {
          return {
            format: 'must not contain invalid phone number'
          };
        }

        return null;
      },

      // Checking the validity of metadata if provided
      metadata: function(value) {
        if (value && !validate.isString(value)) {
          return {
            format:
              'Must contain stringified object "{"key":"value", "otherKey":"otherValue"}"'
          };
        }
        return null;
      },

      // Check that BatchId is in the right format
      batchId: function(value) {
        if (validate.isEmpty(value)) {
          return {
            presence: {
              message: 'is required'
            }
          };
        }
        if (!validate.isString(value)) {
          return {
            format: 'must not contain invalid batch ID - eg. Space'
          };
        }

        return null;
      },

      // Request must be presence in correct format
      requestId: function(value) {
        if (validate.isEmpty(value)) {
          return {
            presence: {
              message: 'is required'
            }
          };
        }
        if (!validate.isString(value)) {
          return {
            format: 'must not contain invalid request ID - eg. Space'
          };
        }

        return null;
      }
    };

    const error = validate(paymentCredential, constraints);

    if (error) {
      let msg = '';
      for (let k in error) {
        msg += error[k] + '; ';
      }

      return new Error(msg);
    }
  }
}

module.exports = Utility;
