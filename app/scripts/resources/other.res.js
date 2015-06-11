(function(window, angular, undefined){
'use strict';

angular.module('hrApp.resources.other', [])

.factory('$_other', ['$resource', function($resource){
    return {
        phoneCode: $resource('/api/ucenter/phoneVeriCode'),
        phoneCodeN: $resource('/api/ucenter/phoneVeriCodeValidate'),
        phoneCodeFindPass: $resource('/api/ucenter/forgotPwdPhoneCode'),
        phoneExist: $resource('/api/common/mobilephoneExists'),
        getAuthCode: $resource('/api/ucenter/preforgotpassByMobile'),
        cityList: $resource('/api/common/queryAllCitys')
    };
}]);
})(window, angular);
