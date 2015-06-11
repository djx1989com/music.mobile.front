(function(window, angular, undefined){
    'use strict';

    angular.module('hrApp.resources.msg', [])
        .run(['app', function(app){
            app.$_Msg = app.$injector.get('$_Msg');
        }])

        .factory('$_Msg', ['$resource', function($resource){
            return {
                //获取交流信息
                //start 开始为止
                //pageSize 每页条数
                getEx: $resource('/api/v1/ucenter/queryExchangeMessage'),
                //获取系统信息
                //---^
                getSys: $resource('/api/v1/ucenter/querySysMessage'),
                //获取发件箱信息
                //--^
                getOut: $resource('/api/v1/ucenter/queryOutbox'),
                //获取未读消息统计
                getCounts: $resource('/api/v1/ucenter/queryNoReadCount'),

                getDetail: $resource('/api/v1/ucenter/queryMessage'),

                getNotRead: $resource('/api/v1/ucenter/queryCountMessage'),

                markRead: $resource('/api/v1/ucenter/tagRead'),

                del: $resource('/api/v1/ucenter/delInbox'),
                delOut: $resource('/api/v1/ucenter/delOutbox'),

                //发信
                //receiverId: cdd.hunter.id,
                //positionId: cdd.positionId,
                //candidateId: cdd.id,
                //subject: scope.subject,
                //content: scope.content
                send: $resource('/api/v1/ucenter/sendMessage'),

                //转发简历
                //emails: vm.emails,
                //candidateId: vm.cdd.id
                forward: $resource('/api/v1/candidate/forward')
            };
        }]);


})(window, angular);
