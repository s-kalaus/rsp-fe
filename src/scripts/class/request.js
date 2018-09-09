import { Promise } from 'bluebird';

export class Request {

  /**
   * Constructor
   *
   * @param {Object} main Main class reference
   */
  constructor(main) {

    this.main = main;
  }

  /**
   * GET request
   *
   * @param {Object} path URL path
   */
  get(path) {

    return this.send('get', path);
  }

  /**
   * POST request
   *
   * @param {Object} path URL path
   * @param {Object} data Data to post
   */
  post(path, data) {

    return this.send('post', path, data);
  }

  /**
   * Handles XHR request response
   *
   * @param {Object} xhttp Request object
   * @param {Function} resolve Resolve function
   * @param {Function} reject Reject function
   */
  onReadyStateChange(xhttp, resolve, reject) {

    if (xhttp.readyState !== 4) {
      return;
    }

    if (xhttp.status !== 200) {
      return reject(new Error('Response status incorrect'));
    }

    try {

      const response = JSON.parse(xhttp.responseText);

      if (!response || !response.success) {
        return reject(new Error('Response is not successfull'));
      }

      resolve(response.data);
    } catch (e) {

      reject(new Error('Response parse error'));
    }
  }

  /**
   * Send request
   *
   * @param {String} method Method to use
   * @param {Object} path URL path
   * @param {Object} data Data to post
   */
  send(method, path, data = {}) {

    return new Promise((resolve, reject) => {

      let body;
      const xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = () =>
        this.onReadyStateChange(xhttp, resolve, reject);

      xhttp.open(method.toUpperCase(), this.main.config.apiUrl + '/' + path, true);

      if (this.main.user) {
        xhttp.setRequestHeader('Authorization', this.main.user.sessionId);
      }

      if (method === 'post') {

        xhttp.setRequestHeader('Content-Type', 'application/json');

        body = JSON.stringify(data);
      }

      xhttp.send(body);
    });
  }
}
