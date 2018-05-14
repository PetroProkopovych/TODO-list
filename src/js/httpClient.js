export class HttpClient {
    constructor() {
        this.baseUrl = 'https://todolist-47f72.firebaseio.com/';
        this.headers = {
            'Content-type': 'application/json/'
        };
    }

    setBaseUrl(url) {
        /*
         * set base url for http requests
         * @param {string} url - base url
         */
        this.baseUrl = url;
    }

    post(data, endpoint) {
        /*
         * send http POST request
         * @param {object} data - data
         * @param {string} endpoint - name of api endpoint
         */
        return fetch(this.baseUrl + endpoint, {
            method: 'post',
            headers: this.headers,
            body: JSON.stringify(data)
        }).then(res => {
            return res.json();
        });
    }

    remove(endpoint) {
        /*
         * send http DELETE request
         * @param {string} endpoint - name of api endpoint
         */
        return fetch(this.baseUrl + endpoint, {
            method: 'delete'
        }).then(res => {
            return res.json();
        });
    }

    put(data, endpoint) {
        /*
         * send http PUT request
         * @param {object} data - data
         * @param {string} endpoint - name of api endpoint
         */
        return fetch(this.baseUrl + endpoint, {
            method: 'put',
            headers: this.headers,
            body: JSON.stringify(data)
        }).then(res => {
            return res.json();
        });
    }

    get(endpoint) {
        /*
         * send http GET request
         * @param {string} endpoint - name of api endpoint
         */
        return fetch(this.baseUrl + endpoint, {
            method: 'get',
        }).then(res => {
            return res.json();
        });
    }
}