const backendUrl = 'http://localhost:3000';

export default {
  backendUrl,
  async sendRequest(url, method, data) {
    const res = await fetch(backendUrl + url, {
      method: method,
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    return await res.json();
  }
};