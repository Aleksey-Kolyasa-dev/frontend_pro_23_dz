class TokenService {
    constructor($log, $window) {
        this.$log = $log;
        this.$window = $window;
        this.expire = 1000*60*60*24;
        this.tokenName = 'dz_js_user';

    }

    _setToken(user) {
        if (angular.isDefined(this.$window.localStorage)
            && angular.isDefined(user.login)
            && angular.isDefined(user.password))
        {
            user.init = new Date();

            // Set & Cash User Token
            this.$window.localStorage[this.tokenName] = angular.toJson(user);
        }
        else {
            return false;
        }
    }

    _getToken (){
        if(angular.isDefined(this.$window.localStorage[this.tokenName])){
            //  Get Old Token
            let oldToken = angular.fromJson(this.$window.localStorage[this.tokenName]);

            if (this.expire > ( Date.now() - new Date(oldToken.init))){
                return angular.fromJson(this.$window.localStorage[this.tokenName]);
            } else {
                this._removeToken();
            }
        } else {
            return false;
        }
    }

    _removeToken(){
        if(angular.isDefined(this.$window.localStorage[this.tokenName])){
            this.$window.localStorage.removeItem(this.tokenName);
        }
    }
}

TokenService.$inject = ['$log', '$window'];

export { TokenService };