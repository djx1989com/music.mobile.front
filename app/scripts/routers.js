(function(window, angular, undefined){
'use strict';

angular.module('musicApp.config.routers', ['ui.router'])

.run(['app', '$state', '$stateParams', '$rootScope', '$location', '$http',
    function (app, $state, $stateParams, $rootScope, $location, $http) {
        /*app.$state = $state;
        app.$stateParams = $stateParams;

        app.$rootScope.$state = $state;
        app.$rootScope.$stateParams = $stateParams;

        app.$User = app.$injector.get('$User');

        if(!app.$User.userBaseInfo()){
            if ($location.url().indexOf('/candidate/dg') != -1) {
                LS.set('redirectUrl', $location.url());
            }

            if($location.url().indexOf('/register') == -1 && $location.url().indexOf('/forgotPass') == -1){
                app.$location.path('/loginN');
            }
        }

        //ga发送
        $rootScope.$on('$locationChangeSuccess', function(evt){
            ga('send', 'pageview', {page: $location.url()});

            if (!app.$User.userBaseInfo() && $location.url().indexOf('/candidate/dg') != -1) {
                LS.set('redirectUrl', $location.url());
            }
        });*/
    }
])

.config(['app', '$stateProvider', '$urlRouterProvider', '$httpProvider',
    function(app, $stateProvider, $urlRouterProvider, $httpProvider){

        $urlRouterProvider
            .when("/hh//list", "/hh/fly/list")
            .otherwise('/index');

        $stateProvider
            .state('user.order', {
                url: '/user/order',
                views: {
                    'order@': {
                        templateUrl: 'views/user/order/order-head.html'
                    }
                }
            })

            .state('user.order.list',{
                url: '^/:status',
                views: {
                    '@order': {
                        templateUrl: 'views/user/order/order-list.html',
                        controller: 'userOrderCtr as uoc'
                    }
                }
            })
        ;

        $httpProvider.interceptors.push('errorCatch');
    }
])

.factory('errorCatch', ["$rootScope", function ($rootScope) {
    /*var isAtFrontApp = function(){
        var lcHash = window.location.hash.split("?")[0];
        return (lcHash == '#/login' || lcHash == '#/loginN' || lcHash == '#/registerN' || lcHash == '#/forgotPass' || lcHash == '#/regSuccessN');
    };
    var interceptor = {
        request: function (config) {
            $rootScope.loading = true;
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: function (response) {
            $rootScope.loading = false;
            response.config.responseTimestamp = new Date().getTime();
            //登录过期
            if(response.data.errCode == '100004'){
                if(!isAtFrontApp()){
                    LS.remove('userInfo');
                    window.location.reload();
                }
            }
            //link超时
            if(response.data.errCode == '200000'){
                if(isAtFrontApp()){
                    window.location.reload();
                }
            }
            return response;
        }
    };
    return interceptor;*/
}]);

})(window, angular);

