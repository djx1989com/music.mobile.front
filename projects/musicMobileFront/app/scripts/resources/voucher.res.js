(function(window, angular, undefined){
'use strict';

angular.module('hrApp.resources.voucher', [])

.factory('$_voucher', ['$resource', function($resource){
    return {
        getVoucher: $resource('/api/v1/coupon/receive'),
        getNewVoucher: $resource('/api/v1/coupon/receiveAgain'),
        list: $resource('/api//v1/coupon/list'),
        position: $resource('/api/v1/coupon/position'),
        cdd: $resource('/api/v1/coupon/candidate'),

        cityList: $resource('/api/common/queryAllCitys'),

        //邀请注册
        invite: $resource('/api/v1/invite/invite'),
        getInviteList: $resource('/api/v1/invite/inviteList'),
        invRegister: $resource('/api/ucenter/inviteRegister')
    };
}]);
})(window, angular);
