const fetch = require('node-fetch');
const validate = require('validate.js');

const Constant = require('./constant');
const Utility = require('./validation');

// All Http requests are made in this class
class HttpRequestClient {
  constructor(authCredential) {
    // Check if the instance of the class is already created in memory
    if (!HttpRequestClient.instance) {
      //Set the first instance of the class as a singleton
      HttpRequestClient.instance = this;
    }

    this._authCredential = authCredential;

    // Set the global variable for holding token at runtime
    this.bearerToken;

    // Check whether to retrieve sandbox Urls or live Urls
    if (this._authCredential.mode == 'production') {
      this.constant = new Constant(true);
    } else {
      this.constant = new Constant(false);
    }

    // Create an initial Http object for making request
    // Some of the properties here cuts across all the requests
    this.httpOptions = {
      method: null,
      headers: {
        'Content-Type': 'application/json',
        'X-ApiAuth-ApiKey': this._authCredential.apikey,
        'X-Date': new Date().toJSON(),
        'X-Correlation-ID': new Date().getTime().toString(),
        Authorization: null
      },
      body: null
    };

    // The singleton is return when this class is after first instantiation
    return HttpRequestClient.instance;
  }

  // Set the initial request parameters to avoid repetition
  setHttpRequestParams(method, body) {
    this.httpOptions.method = method;

    // Renew X-Date  in order to avoid 403 forbidden
    this.httpOptions.headers['X-Date'] = new Date().toJSON();

    if (body == null) {
      this.httpOptions.body = null;
    } else {
      this.httpOptions.body = JSON.stringify(body);
    }

    this.httpOptions.headers.Authorization = `Bearer ${this.bearerToken}`;
  }

  // This method generate a new bearer token and passed the token or any potential errors to the callback
  async executeBearerTokenRequest(bearerTokenHandler) {
    // Set the request parameters i.e. the method is post and the body has to be serialized to Json
    this.setHttpRequestParams('POST', this._authCredential);

    // Make Http request post using node-fetch library and passed the response to the callback
    try {
      const response = await fetch(this.constant.authUrl, this.httpOptions);
      const responseStatusCode = await response.status;

      // Deserialize the response body which contains the bearerToken object
      const responseBody = await response.json();

      if (responseStatusCode == 401) {
        // The user supplied incorrect credentials i.e. apikey or password
        bearerTokenHandler(new Error('Incorrect Apikey or Password'), null);
      } else {
        // Set the generated token in a global variable (memory) before passing it to the callback
        this.bearerToken = responseBody.token;
        bearerTokenHandler(null, this.bearerToken);
      }
    } catch (error) {
      // Any other errors can be catch her and passed to the callback
      bearerTokenHandler(new Error(error.message), null);
    }
  }

  // This method create transaction by the token in memory variable or a new token
  async executeTransactionRequest(
    transactionRequest,
    transactionHandler,
    executeWithANewToken = false
  ) {
    // Check if the token is present in the global variable or when executeWithANewToken is true
    // This command is awaited for it to finish completely because token is required for the request to be succesful
    if (this.bearerToken == null || executeWithANewToken === true) {
      await this.executeBearerTokenRequest((error, bearerToken) => {
        if (error) {
          // This happens when the user submitted incorrect auth credentialss
          transactionHandler(error, null);
        } else {
          // Update the bearer token in a global variable
          this.bearerToken = bearerToken;
        }
      });
    }

    // Set the Http request parameters, this can be a fresh token or token already stored in the memory
    this.setHttpRequestParams('POST', transactionRequest);

    // Make Http request to create transaction and passed the deserialized transactionResponse object to the callback
    try {
      const response = await fetch(
        this.constant.transactionUrl,
        this.httpOptions
      );
      const responseStatusCode = await response.status;

      // Deserialized the response to JavaScript object literal
      const responseBody = await response.json();

      // Check that request ID is not repeated (bad request)
      if (responseStatusCode == 400) {
        transactionHandler(
          new Error('Incorrect Payment Credentials Provided'),
          null
        );
      } else {
        transactionHandler(null, responseBody);
      }
    } catch (error) {
      // Check that the token is available and has expired
      if (this.bearerToken != null && error.type == 'invalid-json') {
        // The API returns 401 and no response body which cannot ne deserialized hence, invalid Json
        // Call this function again so that it can generate a new token and make transaction again
        this.executeTransactionRequest(
          transactionRequest,
          transactionHandler,
          true
        );
      } else {
        transactionHandler(error, null);
      }
    }
  }

  // Get transaction details by transaction ID
  async executeTransactionDetailsRequest(
    transactionId,
    transactionDetailsHandler,
    executeWithANewToken = false
  ) {
    // Check if the token is present in the global variable or when executeWithANewToken is true
    if (this.bearerToken == null || executeWithANewToken === true) {
      await this.executeBearerTokenRequest((error, bearerToken) => {
        if (error) {
          // This happens when the user submitted incorrect auth credentials
          transactionDetailsHandler(error, null);
        } else {
          this.bearerToken = bearerToken;
        }
      });
    }

    // Set the intial request parameters
    this.setHttpRequestParams('GET', null);

    try {
      const response = await fetch(
        `${this.constant.transactionUrl}/${transactionId}`,
        this.httpOptions
      );
      const responseStatusCode = await response.status;
      const responseBody = await response.json();

      // Pass the deserialized transactionDetails to the callback
      transactionDetailsHandler(null, responseBody);
    } catch (error) {
      // Check that the available token has expired
      if (this.bearerToken != null && error.type == 'invalid-json') {
        // Execute this function again because the bearertoken has expired
        this.executeTransactionDetailsRequest(
          transactionId,
          transactionDetailsHandler,
          true
        );
      } else {
        transactionDetailsHandler(error, null);
      }
    }
  }

  // Get transaction details by Request Id
  async executeTransactionDetailsRequest2(
    requestId,
    transactionDetailsHandler,
    executeWithANewToken = false
  ) {
    // Check if the token is present in the global variable or when executeWithANewToken is true
    if (this.bearerToken == null || executeWithANewToken === true) {
      await this.executeBearerTokenRequest((error, bearerToken) => {
        if (error) {
          // This happens when the user submitted incorrect auth credentials
          transactionDetailsHandler(error, null);
        } else {
          this.bearerToken = bearerToken;
        }
      });
    }

    // Set the intial request parameters
    this.setHttpRequestParams('GET', null);

    try {
      const response = await fetch(
        `${this.constant.transactionUrl}/Requests/${requestId}`,
        this.httpOptions
      );
      const responseStatusCode = await response.status;
      const responseBody = await response.json();

      // Pass the deserialized transactionDetails to the callback
      transactionDetailsHandler(null, responseBody);
    } catch (error) {
      // Check that the available token has expired
      if (this.bearerToken != null && error.type == 'invalid-json') {
        // Execute this function again because the bearertoken has expired
        this.executeTransactionDetailsRequest(
          requestId,
          transactionDetailsHandler,
          true
        );
      } else {
        transactionDetailsHandler(error, null);
      }
    }
  }

  // Get the Details describing the user account
  async executeAccountDetailsRequest(
    accountId,
    accountDetailsHandler,
    executeWithANewToken = false
  ) {
    // Check if the token is present in the global variable or when executeWithANewToken is true
    if (this.bearerToken == null || executeWithANewToken === true) {
      await this.executeBearerTokenRequest((error, bearerToken) => {
        if (error) {
          // This happens when the user submitted incorrect auth credentials
          accountDetailsHandler(error, null);
        } else {
          this.bearerToken = bearerToken;
        }
      });
    }

    // Set the request parameters
    this.setHttpRequestParams('GET', null);

    try {
      const response = await fetch(
        `${this.constant.accountUrl}/${accountId}`,
        this.httpOptions
      );
      const responseStatusCode = await response.status;
      const responseBody = await response.json();

      // Pass the deserialized accountDetails object to the callback
      accountDetailsHandler(null, responseBody);
    } catch (error) {
      // Check that the available token has expired
      if (this.bearerToken != null && error.type == 'invalid-json') {
        // Execute this function but with a new bearer token
        this.executeAccountDetailsRequest(
          accountId,
          accountDetailsHandler,
          true
        );
      } else {
        accountDetailsHandler(error, null);
      }
    }
  }

  async executePaymentProvidersRequest(
    paymentProvidersHandler,
    executeWithANewToken = false
  ) {
    // Check if the token is present in the global variable or when executeWithANewToken is true
    if (this.bearerToken == null || executeWithANewToken === true) {
      await this.executeBearerTokenRequest((error, bearerToken) => {
        if (error) {
          // This happens when the user submitted incorrect auth credentials
          paymentProvidersHandler(error, null);
        } else {
          this.bearerToken = bearerToken;
        }
      });
    }

    // Set the request parameters
    this.setHttpRequestParams('GET', null);

    try {
      const response = await fetch(
        `${this.constant.paymentProvidersUrl}/MOBILEMONEYUG/providerItems?PageSize=10&PageNumber=1`,
        this.httpOptions
      );
      const responseStatusCode = await response.status;
      const responseBody = await response.json();

      // Pass the deserialize paymentProviderResponse object to the callback
      paymentProvidersHandler(null, responseBody);
    } catch (error) {
      // Check that the token is available and has not yet expired
      if (this.bearerToken != null && error.type == 'invalid-json') {
        // Execute this function again because the bearertoken has expired
        this.executePaymentProvidersRequest(paymentProvidersHandler, true);
      } else {
        paymentProvidersHandler(error, null);
      }
    }
  }
}

module.exports = HttpRequestClient;
