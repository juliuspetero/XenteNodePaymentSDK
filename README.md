# Xente Payment SDK for NodeJS

## Installation

```
npm install xente-node-sdk --save
```

## Usage

To write an application using the SDK

- Register for a developer account and get your apikey at [Xente Developer Portal](http://sandbox.developers.xente.co/).
- Require 'xente-node-sdk' in your file

  ```
  const XentePayment = require('xente-node-sdk');
  ```

- Create authentication credential with parameters (apikey, password and mode).

  ```
  const authCredential = {
  apikey: 'myApiKey',
  password: 'myPassword',
  mode: 'sandbox' //  'production'
  };
  ```

- Initialized XentePayment class with authCredential above

  ```
  const xentePaymentGateway = new XentePayment(authCredential);
  ```

- Create a transaction request information with the following required parameters.

```
const transactionRequest = {
  paymentProvider: 'MTNMOBILEMONEYUG', // Based on the payer phone number
  amount: '800',
  message: 'Payment for Ebook',
  customerId: 'uniqueStringIdentifier',
  customerPhone: '256778418592',
  customerEmail: 'juliuspetero@outlook.com',
  customerReference: '256778418592',

  // Metadata is optional
  metadata: JSON.stringify({
    orderId: '123',
    category: 'cat4'
  }),
  batchId: 'Batch001',
  requestId: 'uniqueStringIdentifier
};
```

- Create transaction and handle promised responses

```
xentePaymentGateway.transactions
  .createTransaction(transactionRequest)
  .then(response => console.log(response))
  .catch(error => console.log(error));
```

- Get Transaction Details with a specific transaction ID

```
 xentePaymentGateway.transactions
  .getTransactionDetailsById('CD212A2D9B55408092E54DC73F335735-256784378515')
  .then(response => console.log(response))
  .catch(error => console.log(error));

```

- Get transaction details with a specific request ID

```
xentePaymentGateway.transactions
  .getTransactionDetailsByRequestId('df313c0766d744239bf71f33c902c01f')
  .then(response => console.log(response))
  .catch(error => console.log(error));
```

- Get the account Details with a specific account ID

```
xentePaymentGateway.accounts
  .getAccountDetailsById('256784378515')
  .then(response => console.log(response))
  .catch(error => console.log(error));
```

- List an array of all the payment providers

```
xentePaymentGateway.paymentProviders
  .getAllPaymentProviders()
  .then(response => console.log(response.data.collection))
  .catch(error => console.log(error));

```

## Contributions

- If you would like to contribute, please fork the repo and send in a pull request.

### Refactory Team Xente

> 1. Olive Nakiyemba
> 2. Kintu Declan Trevor
> 3. Oketayot Julius Peter
