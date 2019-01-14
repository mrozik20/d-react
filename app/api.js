export default class Api {
  constructor(config) {
    this.config = config;
    // move this up to config?
    this.statusTimeValue = 6000;
    this.statusTimer = setInterval(this.checkUserStatus.bind(this), this.statusTimeValue);
  }

  getHeaders() {
    return {
      Authorization: `Bearer ${this.config.auth.token.key}`,
    };
  }

  resetCheckUserStatus() {
    clearInterval(this.statusTimer);
    this.statusTimer = setInterval(this.checkUserStatus.bind(this), this.statusTimeValue);
    return this.statusTimer;
  }

  // Actual request-making methods
  fetch(uri, method = 'GET', bodyData) {
    const url = this.config.site.api_url + (Array.isArray(uri) ? uri.join('/') : uri);
    const opts = {
      method,
      headers: this.getHeaders(),
    };
    if (bodyData) {
      if (bodyData instanceof FormData) {
        opts.body = bodyData;
      } else {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(bodyData);
      }
    }

    const checkResponseIsValid = (response) => {
      if (!response.ok) {
        throw Error(`Request Failed. code: ${response.status}`);
      }
      if (!response.headers.has('Content-Type') || !response.headers.get('Content-Type').startsWith('application/json')) {
        throw Error('Unexpected Content-Type for response');
      }
      return response;
    };

    this.resetCheckUserStatus();
    return fetch(url, opts)
      .then(checkResponseIsValid)
      .then(resp => resp.json());
  }

  post(uri, data) {
    return this.fetch(uri, 'POST', data);
  }

  put(uri, data) {
    return this.fetch(uri, 'PUT', data);
  }

  checkUserStatus() {
    const uri = '/v2/users/updateOnlineStatus';
    return this.fetch(uri);
  }

  postUserStatus(data) {
    const uri = '/v2/users/changeStatus';
    return this.post(uri, data);
  }

}
