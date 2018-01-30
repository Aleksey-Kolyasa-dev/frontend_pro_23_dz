class ResourceService {
    constructor($log, $http, $q, toastr) {
        this.$log = $log;
        this.$http = $http;
        this.$q = $q;
        this.toastr = toastr;

        // Uncomment if use herokuapp.com
        //this.baseURL = 'https://doit-test-demo.herokuapp.com/api/';

        // Uncomment if use localhost
        this.baseURL = 'http://localhost:3000/api/';

    }

    _ajaxRequest(method, url, data) {
        let self = this;
        let deferred = this.$q.defer();
        let result = Promise.resolve();

        result.then(function () {
            switch (method) {
                case "GET" :
                    if (url) {
                        self.$http({url: self.baseURL + url}).then(
                            (data) => {
                                deferred.resolve(data);
                            },
                            (err) => {
                                self.toastr.error('ERROR: GET method failed');
                                deferred.reject('ERROR: GET method failed');
                                throw new Error('ERROR: GET method failed: ', err);
                            });
                    }
                    break;

                case "POST" :
                    if (url && angular.isObject(data)) {
                        self.$http({method: "POST", url: self.baseURL + url, data: data}).then(
                            (data) => {
                                deferred.resolve(data);
                            },
                            (err) => {
                                self.toastr.error('ERROR: POST method failed');
                                deferred.reject('ERROR: POST method failed');
                                throw new Error('ERROR: POST method failed: ', err);
                            });
                    }
                    break;

                case "PUT" :
                    if (url && !data) {
                        self.$http({method: "PUT", url: self.baseURL + url}).then(
                            (data) => {
                                deferred.resolve(data);
                            },
                            (err) => {
                                self.toastr.error('ERROR: PUT method failed');
                                deferred.reject('ERROR: PUT method failed');
                                throw new Error('ERROR: PUT method failed: ', err);
                            });
                    }
                    if (url && data) {
                        console.log(data);
                        self.$http({method: "PUT", url: self.baseURL + url, data: data}).then(
                            (data) => {
                                deferred.resolve(data);
                            },
                            (err) => {
                                self.toastr.error('ERROR: PUT method failed');
                                deferred.reject('ERROR: PUT method failed');
                                throw new Error('ERROR: PUT method failed: ', err);
                            });
                    }
                    break;

                case "DELETE" :
                    self.$http({method: "DELETE", url: self.baseURL + url}).then(
                        (data) => {
                            deferred.resolve(data);
                            self.toastr.info('DELETE OPS SUCCESS');
                        },
                        (err) => {
                            self.toastr.error('ERROR: DELETE method failed');
                            deferred.reject('ERROR: DELETE method failed');
                            throw new Error('ERROR: DELETE method failed: ', err);
                        });
                    break;
            }
        }).catch(function (err) {
            self.toastr.error("ERROR: AJAX OPS. faild");
            self.$log.warn(err);
        });
        return deferred.promise;
    }

}

ResourceService.$inject = ['$log', '$http', '$q', 'toastr'];

export {ResourceService};