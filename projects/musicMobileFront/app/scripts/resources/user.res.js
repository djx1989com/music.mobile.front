(function(window, angular, undefined){
'use strict';

angular.module('hrApp.resources.user', [])

.factory('$_user', ['$resource', function($resource){
    return {
        init: $resource('/api/ucenter/link'),
        login: $resource('/api/ucenter/login', null, {'send': {
            method: 'POST'
        }}),
        //login: $resource('/api/ucenter/login'),
        register: $resource('/api/ucenter/register'),
        regImprove: $resource('/api/ucenter/complete'),
        accounts: $resource('/api/v1/ucenter/queryAccounts'),
        divisions: $resource('/api/common/divisions'),
        subAccounts: $resource('/api/v1/ucenter/querySubAccounts'),

        checkPass: $resource('/api/v1/ucenter/checkPass'),
        addSubAccounts: $resource('/api/v1/ucenter/addSubAcco'),
        deleteSubAccounts: $resource('/api/v1/ucenter/deleteSubAccount'),
        addGroupUser: $resource('/api/v1/group/addGroupUser'),
        deleteGroupUser: $resource('/api/v1/group/deleteGroupUser'),
        addGroup: $resource('/api/v1/group/create'),
        removeGroup: $resource('/api/v1/group/delete'),
        renameGroup: $resource('/api/v1/group/updateGroupName'),

        getGroup: $resource('/api/v1/group/query'),

        getAllOperation: $resource('/api/common/queryOperation'),
        getUserOperation: $resource('/api/v1/ucenter/queryGroupOperation'),
        saveUserOperation: $resource('/api/v1/ucenter/updateUserOperation'),
        getGroupOperation: $resource('/api/v1/group/queryGroupOperation'),
        saveGroupOperation: $resource('/api/v1/group/updateGroupOperation'),

        forgotPass: $resource('/api/ucenter/preforgotpass'),
        resetPass: $resource('/api/ucenter/resetPass'),
        checkAuthCode: $resource('/api/ucenter/emailLink'),

        //订阅设置
        getSubscribe: $resource('/api/v1/ucenter/querySubscription'),
        queryEnterpriseInfo: $resource('/api/v1/ucenter/queryEnterpriseInfo'),
        updateSubscribe: $resource('/api/v1/ucenter/updateSubSett'),

        // 用户信息
        // { userId }
        detail: $resource('/api/v1/ucenter/queryPersInfo'),
        //settings
        changePwd: $resource('/api/v1/ucenter/updatePassword'),
        updateCorporateInfo: $resource('/api/v1/ucenter/updateEnterpriseInfo'),
        updatePersonalInfo: $resource('/api/v1/ucenter/updatePersonalInfo'),
        updatePhoneNo: $resource('/api/v1/ucenter/changeMobilePhone'),
        updateEnterpriseSetting: $resource('/api/v1/ucenter/updateEnterpriseSetting')
    };
}]);
})(window, angular);
