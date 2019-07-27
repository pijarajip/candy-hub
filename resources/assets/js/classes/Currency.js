'use strict';

import ApiRequest from './ApiRequest';

export default {
    currencies: [],

    fetching: false,
    // This isn't working as intended, hits the api per component...
    getCurrencies() {
        if (!this.currencies.length && !this.fetching) {
            this.fetching = true;
            return axios({
                method: 'GET',
                url: '/api/v1/currencies',
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                this.fetching = false;
                return this.currencies = response.data.data
            })
            .catch(error => {
                console.log(error)
            });
        }
        return this.currencies;
    }
}