class mainCtrl {
    constructor($scope, $location, $timeout, TokenService, toastr) {
        this.init($scope, $location, $timeout, TokenService, toastr);
    }

    init($scope, $location, $timeout, TokenService, toastr) {
        // Default Values
        $scope.currentUser = {};
        $scope.authorized = false;

        // View Navigation
        $scope.viewShift = view => {
            switch (view) {
                case 'home':
                    if($scope.currentUser._id){
                        $location.path(view);
                    } else {
                        toastr.warning('PLEASE, SIGN IN TO CONTINUE');
                        $location.path('/');
                    }
                    break;

                case 'author':
                    if($scope.currentUser._id){
                        $location.path(view);
                    } else {
                        toastr.warning('PLEASE, SIGN IN TO CONTINUE');
                        $location.path('/');
                    }
                    break;

                default:
                    $location.path('/');
                    break;
            }
        };

        // Default View
        $scope.viewShift(null);

        // ON-EVENT: GET USER DATA
        $scope.$on("LOGGED", function (event, user) {
               $scope.currentUser = user;
               $scope.authorized = true;
               $timeout(() => {
                   $scope.viewShift('home');
               }, 200);

        });

        // ON-EVENT: RESET TO DEFAULTS AND REMOVE USER TOKEN
        $scope.$on("LOGOUT", () => {
            console.log('logout');
            $scope.currentUser = {};
            $scope.authorized = false;
            TokenService._removeToken();
            $timeout(() => {
                $scope.viewShift(null);
            }, 500);
        });

    }
}
mainCtrl.$inject = ['$scope', '$location','$timeout', 'TokenService', 'toastr'];

export { mainCtrl };