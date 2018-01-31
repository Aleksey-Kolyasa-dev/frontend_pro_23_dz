class usersRegisterCtrl {
    constructor($scope, $log, ResourceService, toastr){
        this.init($scope, $log, ResourceService, toastr);
    }
    init($scope, $log, ResourceService, toastr){

        $scope.doRegister = (user) => {
            // Input Validation
           if( !user.login || !user.password || !user.confirmPassword || !user.name  ){
               toastr.error('WRONG INPUT, CHECK AGAIN!');
               return;
           }
           // Passwords Validation
           else if(user.password !== user.confirmPassword){
               toastr.error('PASSWORDS CONFIRMATION ERROR!');
               return;
           }
           // Do Registration
           else{
               ResourceService._ajaxRequest("POST", "user/registration", user).then( (response)=>{
                  if(response.data._id){
                      // EVENT: DO AUTO-LOGIN if REGISTRED (via userMainCtrl to userLoginCtrl)
                      $scope.$emit('REGISTRED', user);
                      $log.log(`User REGISTRED: ${response.data.name}`);
                  }
               }, (err) => {
                   $log.log('ERROR: REGISTRATION FAILED', err);
               });
           }
        }
    }
}
usersRegisterCtrl.$inject = ['$scope', '$log', 'ResourceService', 'toastr'];

export  { usersRegisterCtrl };