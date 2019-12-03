// // Include xente library
// const XentePayment = require('../index');

// // Initialized Xente
// const authCredential = {
//   apikey: '6A19EA2A706041A599375CC95FF08809',
//   password: 'Demo123456',
//   mode: 'sandbox' // 'sandbox'
// };

// const xentePaymentGateway = new XentePayment(authCredential);

// // Create payment object
// const transactionRequest = {
//   paymentProvider: 'MTNMOBILEMONEYUG',
//   amount: '800',
//   message: 'Demo Request',
//   customerId: '256778418592',
//   customerPhone: '256778418592',
//   customerEmail: 'juliuspetero@outlook.com',
//   customerReference: '256778418592',
//   metadata: JSON.stringify({
//     orderId: '123',
//     category: 'cat4'
//   }),
//   batchId: 'Batch001',
//   requestId: new Date().getTime().toString(36)
// };

// // Create Transaction and handle promise response
// xentePaymentGateway.transactions
//   .createTransaction(transactionRequest)
//   .then(response => console.log(response))
//   .catch(error => console.log(error));

// // Get transaction details by the ID
// xentePaymentGateway.transactions
//   .getTransactionDetailsById('CD212A2D9B55408092E54DC73F335735-256784378515')
//   .then(response => console.log(response))
//   .catch(error => console.log(error));

// Get transaction details by request ID
// xentePaymentGateway.transactions
//   .getTransactionDetailsByRequestId('df313c0766d744239bf71f33c902c01f')
//   .then(response => console.log(response))
//   .catch(error => console.log(error));

// // Get your account details
// xentePaymentGateway.accounts
//   .getAccountDetailsById('256784378515')
//   .then(response => console.log(response))
//   .catch(error => console.log(error));

// // Fetch a list of payment providers
// xentePaymentGateway.paymentProviders
//   .getAllPaymentProviders()
//   .then(response => console.log(response.data.collection))
//   .catch(error => console.log(error));

// new Date().getTime().toString(36)
