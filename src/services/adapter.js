class APICommunicator {
    constructor(endpoint = 'http://localhost:3000/'){
      this.endpoint = endpoint;
      this.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      this.fetchOptions = function(httpVerb = 'GET', body){
        if(httpVerb === 'GET' || httpVerb === 'DELETE') {
          return {
            method: httpVerb,
            headers: this.headers
          } 
        } else {
          return { 
            method: httpVerb,
            headers: this.headers,
            body: body ? JSON.stringify(body) : {}
          }
        }; 
      };
    }
  
    parseData(response){
        return response.json();
    }

    getPosts() {
      return fetch(`${this.endpoint}/posts`).then(this.parseData);
  }

    createUser(user) {
        return fetch(`${this.endpoint}/signup`, this.fetchOptions('POST', { user }))
        .then(this.parseData)
    }

    loginUser(user) {
        return fetch(`${this.endpoint}/login`, this.fetchOptions('POST', { user }))
        .then(this.parseData)
    }

    getSafetyConcerns() {
        return fetch(`${this.endpoint}/safety_concerns`).then(this.parseData);
    }

    getUserCheckIns(id) {
        return fetch(`${this.endpoint}/user/${id}/check_ins`, this.fetchOptions())
        .then(this.parseData)
    }

    getUserSafetyConcerns(id) {
        return fetch(`${this.endpoint}/safety_concerns_by_user_id/${id}`, this.fetchOptions())
        .then(this.parseData)
    }

    createCheckIn(user_id, check_in) {
        return fetch(`${this.endpoint}/users/${user_id}/check_ins`, this.fetchOptions('POST', { check_in }))
        .then(this.parseData);    
    }

};

export default APICommunicator;