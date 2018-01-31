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
                return;
            }
            // Do Login
            else{
                ResourceService._ajaxRequest("PUT", "user/login", user).then( (success) => {

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
                    }
                }, (err) => {
                    $log.log('ERROR: LOGIN FAILED', err);
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