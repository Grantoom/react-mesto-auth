class Api {
  constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

  _sendRequest(baseUrl, options) {
    return fetch(baseUrl, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error('Ошибка'));
      })
    }
  
  getCards() {
    return this._sendRequest(`${this._baseUrl}/cards`, {
      headers: this._headers
    });
  }

  createNewCard({name, link}) {
    console.log(JSON.stringify({
        name: name,
        link: link
    }));
    
    return this._sendRequest(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            name,
            link
        })
      });
  }

  deleteCard(id) {
      return this._sendRequest(`${this._baseUrl}/cards/${id}`, {
          method: "DELETE",
          headers: this._headers
      });
  }

  getUserInfo() {
      return this._sendRequest(`${this._baseUrl}/users/me`, {
        headers: this._headers
      });
  }

  sendUserInfo(userData) {
      return this._sendRequest(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ 
          name: userData.name, 
          about: userData.about 
        })
      });
  }
  
  addCardLike(id) {
      return this._sendRequest(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers
      });
  }


  deleteCardLike(id) {
      return this._sendRequest(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
  }

  setUserAvatar(data) {
      return this._sendRequest(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        })
      })
  }

  getInitialData () {
      return Promise.all([this.getCards(), this.getUserInfo()])
  }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-75',
    headers: {
      authorization: '97d17c4f-b130-485b-9ec0-eeb35e105a97',
      'Content-Type': 'application/json'
    }
  });

export default api;