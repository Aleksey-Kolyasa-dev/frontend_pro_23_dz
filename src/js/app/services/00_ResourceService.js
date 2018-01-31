class ResourceService {
    constructor($log, $http, $q, toastr) {
        this.$log = $log;
        this.$http = $http;
        this.$q = $q;
        this.toastr = toastr;

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
                                self.toastr.error(err.message || err.data || 'ERROR: GET method failed');
                                deferred.reject(err);
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
                                self.toastr.error(err.message || err.data || 'ERROR: POST method failed');
                                deferred.reject(err);
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
                                self.toastr.error(err.message || err.data || 'ERROR: PUT method failed');
                                deferred.reject(err);
                            });
                    }
                    if (url && data) {
                        console.log(data);
                        self.$http({method: "PUT", url: self.baseURL + url, data: data}).then(
                            (data) => {
                                deferred.resolve(data);
                            },
                            (err) => {
                                self.toastr.error(err.message || err.data || 'ERROR: PUT method failed');
                                deferred.reject(err);
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
                            self.toastr.error(err.message || err.data || 'ERROR: DELETE method failed');
                            deferred.reject(err);
                        });
                    break;
            }
        }).catch(function (err) {
            self.toastr.error(err.message || err.data || "ERROR: AJAX OPS. faild");
            self.$log.warn(err);
        });
        return deferred.promise;
    }

}

ResourceService.$inject = ['$log', '$http', '$q', 'toastr'];

export {ResourceService};