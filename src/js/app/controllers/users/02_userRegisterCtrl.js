class usersRegisterCtrl {
    constructor($scope, $log, ResourceService, toastr){
        this.init($scope, $log, ResourceService, toastr);
    }
    init($scope, $log, ResourceService, toastr){

        $scope.doRegister = (user) => {
            // Input Validation
           if( !user.login || !user.password || !user.confirmPassword || !user.name  ){
               toastr.error('WRONG INPUT, CHECK AGAIN!');
               throw new Error('INVALID INPUT');
           }
           // Passwords Validation
           else if(user.password !== user.confirmPassword){
               toastr.error('PASSWORDS CONFIRMATION ERROR!');
               console.log('PASSWORDS CONFIRMATION ERROR!');
           }
           // Do Registration
           else{
               ResourceService._ajaxRequest("POST", "users/registration", user).then( (response)=>{
                  if(response.data._id){

                      // EVENT: DO AUTO-LOGIN if REGISTRED (via userMainCtrl to userLoginCtrl)
                      $scope.$emit('REGISTRED', user);
                      $log.log(`User REGISTRED: ${response.data.name}`);

                  } else {
                      $log.log('ERROR: SUCH LOGIN IS OCCUPIED');
                      toastr.error('ERROR: SUCH LOGIN IS OCCUPIED');
                  }
               }, (err) => {
                   $log.log('ERROR: REGISTRATION FAILED', err);
                   toastr.error('ERROR: REGISTRATION FAILED');
               });
           }
        }
    }
}
usersRegisterCtrl.$inject = ['$scope', '$log', 'ResourceService', 'toastr'];

export  { usersRegisterCtrl };