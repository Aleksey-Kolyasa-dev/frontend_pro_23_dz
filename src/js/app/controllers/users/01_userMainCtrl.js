class usersMainCtrl {
    constructor($scope){
        this.init($scope);
    }
    init($scope){

        // ON-EVENT => SEND AUTO-LOGIN ( from userRegisterCtrl to userLoginCtrl )
        $scope.$on('REGISTRED', function (event, user) {
            $scope.$broadcast("DoLOGIN", user);
        });

    }
}
usersMainCtrl.$inject = ['$scope'];

export  { usersMainCtrl };