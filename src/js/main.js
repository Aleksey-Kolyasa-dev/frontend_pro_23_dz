// Libs
import angular  from 'angular';
import ngRoute from 'angular-route';
import ngAnimate from 'angular-animate';
import toastr from 'angular-toastr';

// App components
import { index } from './app/index.module';

// Define Main App Module
let app = angular.module('app',['ngRoute', 'ngAnimate', 'toastr', 'index']);

// Routing Configure
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl : '/views/01_pages/00_start_page.html',
    }).when('/home', {
        templateUrl : '/views/01_pages/01_home_page.html',
    }).when('/author', {
        templateUrl : '/views/01_pages/02_author_page.html',
    }).otherwise({
        templateUrl : '/views/01_pages/00_start_page.html',
    });

}]);

// Toastr Configure
app.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        autoDismiss: true,
        containerId: 'toast-container',
        maxOpened: 2,
        newestOnTop: true,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        preventOpenDuplicates: true,
        target: 'body'
    });
});
