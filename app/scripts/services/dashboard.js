;(function(window, angular, undefined) {
    'use strict';
    angular.module('hrApp.services.dashboard', [])
    .service('$Dashboard', Dashboard);

    Dashboard.$inject = ['$resource', '$http', '$filter'];
    function Dashboard($resource, $http, $filter) {
        var _service = {
            getTotalStats: getTotalStats,
            getTeamStats: getTeamStats,
            getInterviews: getInterviews,
            getPositions: getPositions,
            getMessages: getMessages,
            getCompanyStatus: getCompanyStatus,
            getCompanyGroup: getCompanyGroup
            //getCompanyStatus: getCompanyStatus,
            //getGroup: getGroup
        };

        ////////////////////
        /**
         * [getTotalStats description]
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        function getTotalStats(opts) {
            return $resource('/api/v1/statistic/dashboard').get(opts).$promise.then(function(rst) {
                return rst.success ? rst.data : rst.success;
                // return rst.message;
            });
        }

        /**
         * 获取职位统计数据
         * @return {object} promise
         */
        function getTeamStats() {
            return $resource('/api/v1/statistic/companyTeam').get().$promise.then(function(rst) {
                return rst.success ? rst.data : null;
            });
        }

        /**
         * 获取面试列表
         * @opts
         *  startTime 起始时间
         *  days 天数
         *  start 开始位置
         *  pageSize 每页条数
         * @return {object} promise
         */
        function getInterviews(opts) {
            return $resource('/api/v1/interview/effective').get(opts).$promise.then(function(rst) {
                /*return rst.success ? rst.data : null;*/
                var interviews = rst.data.interviews || [];
                angular.forEach(interviews, function(v, i) {
                    var _int = v.interview;
                    _int._class = getPanelStyle(_int.confirmTime);
                });
                return interviews;
            });
        }

        /**
         * 获取职位列表
         * @return {object} promise
         */
        function getPositions() {
            return $resource('/api/v1/position/query/publish').get({start: 0, pageSize: 5}).$promise.then(function(rst) {
                var positions = rst.data.positions || [];
                angular.forEach(positions, function(v, i) {
                    v._deadline = (v.expectFillDate - new Date()) / 86400000 <= 10;
                });
                return positions;
            });
        }

        /**
         * 获取职位动态
         * @return {object} promise
         */
        function getMessages() {
            return getSystemMessages().then(getExchangeMessages);
        }

        /**
         * 获取公司状态
         * @return {object} promise
         */
        function getCompanyStatus() {
            return $resource('/api/v1/ucenter/queryCompanyStatus').get().$promise.then(function(rst) {
                return rst.success ? rst.data : null;
            });
        }

        /**
         * 获取团队列表
         * @return {object} promise
         */
        function getCompanyGroup() {
            return $resource('/api/v1/group/querySubGroup').get().$promise.then(function(rst) {
                return rst.success ? rst.data : null;
            });
        }

        /** Help Function **/
        ////////////////////
        /**
         * 获取系统消息
         * @return {object} promise
         */
        function getSystemMessages() {
            return $resource('/api/v1/ucenter/querySysMessage').get({start: 0, pageSize: 5}).$promise.then(function(rst) {
                //return rst.success ? rst.data.msgs : [];
                var msgs = [];
                angular.forEach(rst.data.msgs, function(v, i) {
                    v.message.senderName = v.senderName;
                    v.message.receiverName = v.receiverName;
                    v.message.candidateName = v.candidateName;
                    v.message.positionTitle = v.position === null ? '' : v.position.title;
                    msgs.push(v.message);
                });
                return msgs;
            });
        }

        /**
         * 获取交流消息
         * @param  {array} systemMessages 系统消息
         * @return {object}               promise
         */
        function getExchangeMessages(systemMessages) {
            return $resource('/api/v1/ucenter/queryExchangeMessage').get({start: 0, pageSize: 5}).$promise.then(function(rst) {
                //var messageArray = rst.data.
                var msgs = systemMessages;
                angular.forEach(rst.data.msgs, function(v, i) {
                    v.message.senderName = v.senderName;
                    v.message.receiverName = v.receiverName;
                    v.message.candidateName = v.candidateName;
                    v.message.positionTitle = v.position === null ? '' : v.position.title;
                    msgs.push(v.message);
                });
                return msgs.sort(function(a, b) {return b.lastModifyTime - a.lastModifyTime;}).slice(0, 5);
            });
        }

        function isToday(t) {
            return new Date(t).toDateString() === new Date().toDateString; 
        }

        function isTomorow(t) {
            var to = +new Date() + 24 * 3600000;
            return new Date(t).toDateString === new Date(to).toDateString;
        }
        
        function getPanelStyle(t) {
            if ($filter('niceTimeNew')(t) == '今天') {
                if (t > Date.now()) {
                    return 'panel-g';
                }
                return 'panel-p';
            } else if ($filter('niceTimeNew')(t) == '明天') {
                return 'panel-g';
            } else {
                return 'panel-b';
            }
        }
        
        return _service;
    }
})(window, angular);
