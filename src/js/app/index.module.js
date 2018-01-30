import {
    mainCtrl,
    usersMainCtrl,
    usersRegisterCtrl,
    usersLoginCtrl,
    usersLogoutCtrl,
    mapsCtrl,
    ResourceService,
    TokenService
} from './index';


let index = angular.module('index',[]);

index.controller('mainCtrl', mainCtrl);
index.controller('usersMainCtrl', usersMainCtrl);
index.controller('usersRegisterCtrl', usersRegisterCtrl);
index.controller('usersLoginCtrl', usersLoginCtrl);
index.controller('usersLogoutCtrl', usersLogoutCtrl);
index.controller('mapsCtrl', mapsCtrl);

index.service('ResourceService', ResourceService);
index.service('TokenService', TokenService);


export { index };