class usersLoginCtrl {
    constructor($scope, $log, ResourceService, TokenService, toastr){
        this.init($scope, $log, ResourceService, TokenService, toastr);
    }
    init($scope, $log, ResourceService, TokenService, toastr){

        // Login Fn
        $scope.doLogin = (user) => {
            // Input Validation
            if( !user.login || !user.password ){
                toastr.error('WRONG INPUT, CHECK AGAIN!');
                throw new Error('INVALID INPUT');
            }
            // Do Login
            else{
                ResourceService._ajaxRequest("POST", "users/login", user).then( (success) => {
                    if(success.data._id){

                        toastr.success(`WELCOME, ${success.data.name} !`);
                        $log.log(`WELCOME, ${success.data.name} !`);

                        // USER TOKEN
                        let token = { login: user.login, password: user.password };
                        // SET USER TOKEN
                        TokenService._setToken(token);

                        // EVENT: SEND LOGGED USER DATA ( to mainCtrl )
                        success.data.isLogged = true;
                        $scope.$emit('LOGGED', success.data);

                    } else {
                        $log.log(success);
                        $log.log('ERROR: USER NOT FOUND!');
                        toastr.error('ERROR: USER NOT FOUND!');
                    }
                }, (err) => {
                    $log.log('ERROR: LOGIN FAILED', err);
                    toastr.error('ERROR: LOGIN FAILED');
                });
            }
        };

        // ON-EVENT => DO AUTO-LOGIN ( from userMainCtrl )
        $scope.$on('DoLOGIN', function (event, user) {
            $scope.doLogin(user);
        });

        //ON-LOAD: check if user token exist => Do Login
        (function checkToken() {
            if(TokenService._getToken() && !$scope.authorized){
                let token = TokenService._getToken();
                $scope.doLogin(token);
            }
        })();
    }
}
usersLoginCtrl.$inject = ['$scope', '$log', 'ResourceService', 'TokenService', 'toastr'];

export  { usersLoginCtrl };