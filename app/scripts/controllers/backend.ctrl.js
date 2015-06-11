(function(window, angular, undefined){
'use strict';

angular.module('hrApp.controllers.backend', ['hrApp.services.user'])

.controller('backendCtrl', ['app', '$rootScope', '$http', '$User', function(app, $rootScope, $http, $User){
    var vm = this;

    vm.isShowDemoTip = false;

    vm.popBox = {
        headerEm: false,
        headerBdo: false,
        headerFunc: false
    };

    vm.closePops = function(skip){
        skip = skip || '';
        for(var p in vm.popBox){
            if(vm.popBox.hasOwnProperty(p) && p !== skip){
                vm.popBox[p] = false;
            }
        }

        $rootScope.posDropMenuShow = -1;
        $rootScope.cddDropMenuShow = -1;
    };

    vm.togglePop = function(e, module){
        vm.closePops(module);
        vm.popBox[module] = !vm.popBox[module];
        e.stopPropagation();
    };

    vm.stopBubbling = function(e){
        e.stopPropagation();
    };

    vm.logout = function(){
        LS.remove('userInfo');
        var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
        if(keys){
            for (var i = keys.length; i--;){
                document.cookie=keys[i]+'=0;expires=' + new Date(0).toUTCString();
            }
            console.log(keys)
        }
        window.location.hash = '/loginN';
    };

    vm.goRegister = function(){
        LS.clear();
        window.location.hash = '/register?spm=demo';
    };

    init();

    function init() {
        vm.userInfo = app.$User.userBaseInfo();
        if(!vm.userInfo){
            app.$location.path('/loginN');
        } else {
            vm.userInfo.enterprise._logo ='/images/cp_logo.png';
            getCompanyLogo(vm.userInfo.enterprise.logo);
            $rootScope.userInfo = vm.userInfo;

            if(vm.userInfo.userId === 30488 || vm.userInfo.userId === 45671){
                vm.isShowDemoTip = true;
            }
            getNoteReadCount();
            var msgTimmer = setInterval(getNoteReadCount, 60000);
        }

        vm.avatar = '/images/avatar.png';
        $User.getUserAvatar({
            url: vm.userInfo.userDetail.profile.avatar,
            success: function(url){
                if(vm.userInfo.userDetail.profile.avatar.length != 0){
                    vm.avatar = url;
                }
            }
        });

    }

    function getCompanyLogo(logo) {
        $http({
            url: '/api/common/getCompanyImageUrl',
            method: 'POST',
            params: {uri: logo}
        }).then(function(_rst) {
            if (_rst.data.success) {
                if(logo.length !== 0){
                    vm.userInfo.enterprise._logo = _rst.data.data;
                }
            }
        });
    }

    function getNoteReadCount(){
        app.$User.getNotReadMessageCount({
            success: function(result){
                vm.messageCount = result.data.total;
            }
        });
    }

    return vm;

}]);
})(window, angular);
