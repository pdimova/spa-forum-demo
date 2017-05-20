'use strict';

const requesterModule = ($ => {
    return {
        get(url) {
            let promise = new Promise((resolve, reject) => {
                $.ajax({
                    url,
                    contentType: 'text/html',
                    method: "GET",
                    success(response) {
                        resolve(response);
                    },
                    error(jqXHR, textStatus, errorThrown) {
                        // console.log(jqXHR);
                        // console.log(textStatus);
                        // console.log(errorThrown);
                        reject(jqXHR.responseJSON);
                    }
                });
            });
            return promise;
        },
        getJSON(url, options = {}) {
            let promise = new Promise((resolve, reject) => {
                let headers = options.headers || {};
                $.ajax({
                    url,
                    headers,
                    method: "GET",
                    contentType: "application/json",
                    success(response) {
                        resolve(response);
                    },
                    error(jqXHR, textStatus, errorThrown) {
                        // console.log(jqXHR);
                        // console.log(textStatus);
                        // console.log(errorThrown);
                        reject(jqXHR.responseJSON);
                    }
                });
            });
            return promise;
        },
        putJSON(url, body, options = {}) {
            let promise = new Promise((resolve, reject) => {
                let headers = options.headers || {};
                $.ajax({
                    url,
                    headers,
                    method: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify(body),
                    success(response) {
                        resolve(response);
                    },
                    error(jqXHR, textStatus, errorThrown) {
                        reject(jqXHR.responseJSON);
                    }
                });
            });
            return promise;
        },
        postJSON(url, body, options = {}) {
            let promise = new Promise((resolve, reject) => {
                let headers = options.headers || {};

                $.ajax({
                    url,
                    headers,
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(body),
                    success(response) {
                        resolve(response);
                    },
                    error(jqXHR, textStatus, errorThrown) {
                        reject(jqXHR.responseJSON);
                    }
                });
            });
            return promise;
        },
    }
})($);

