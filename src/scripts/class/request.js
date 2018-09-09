/* global Promise */

export class Request {

  constructor(main) {

    this.main = main;
  }

  get(path) {

    return this.send('get', path);
  }

  post(path, data) {

    return this.send('post', path, data);
  }

  onReadyStateChange(xhttp, resolve, reject) {

    if (xhttp.readyState !== 4) {
      return;
    }

    if (xhttp.status !== 200) {
      return reject(xhttp);
    }

    try {

      const response = JSON.parse(xhttp.responseText);

      if (!response || !response.success) {
        return reject(response || {success: false, message: 'Empty Response'});
      }

      resolve(response.data);
    } catch (e) {

      reject(xhttp);
    }
  }

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
