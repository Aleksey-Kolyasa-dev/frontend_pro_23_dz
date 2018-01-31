class usersLogoutCtrl {
    constructor($scope, $log, ResourceService, toastr) {
        this.init($scope, $log, ResourceService, toastr);
    }

    init($scope, $log, ResourceService, toastr) {
        $scope.doLogout = () => {

            ResourceService._ajaxRequest("PUT", `user/${$scope.currentUser._id}/logout/`, null).then(
                (success) => {
                    if (success) {
                        toastr.info(`GOOD BYE, ${$scope.currentUser.name}!`);
                        $log.log(`GOOD BYE, ${$scope.currentUser.name}!`);

                        // EVENT: USER LOGOUT => ( to mainCtrl)
                        $scope.$emit('LOGOUT');
                    }
                }, (err) => {
                    $log.log('ERROR: LOGOUT FAILED', err);
                    toastr.error('ERROR: LOGOUT FAILED');
                });

        }
    }
}
usersLogoutCtrl.$inject = ['$scope', '$log', 'ResourceService', 'toastr'];

export  {usersLogoutCtrl};