'use strict';

// Import all the components of the SDK
const Account = require('./components/account');
const PaymentProvider = require('./components/paymentProvider');
const Transaction = require('./components/transaction');
const Validation = require('./services/validation');

// Entry point class which is exposed to the user to initialized
class XentePayment {
  constructor(authCredential) {
    this._authCredential = authCredential;
    this._validation = new Validation(this._authCredential);

    const validationErrors = this._validation.validateAuthCredential();
    if (validationErrors) {
      throw Error(validationErrors.message);
    } else if (
      this._authCredential.mode != 'production' &&
      this._authCredential.mode != 'sandbox'
    ) {
      throw Error('Mode should be either sandbox or production');
    } else {
      this.accounts = new Account(this._authCredential);
      this.paymentProviders = new PaymentProvider(this._authCredential);
      this.transactions = new Transaction(this._authCredential);
    }
  }
}

module.exports = XentePayment;
