(function(window, angular, undefined){
    'use strict';

    angular.module('hrApp.resources.candidate', [])

        .factory('$_Candidate', ['$resource', function($resource){
            return {
                // 列表
                list: $resource('/api/v1/candidate/queryByConditions'),//candidate/queryCandidate
                //候选人状态
                getStatus: $resource('/api/v1/candidate/query/progressStatus'),

                detail: $resource('/api/v1/candidate/detail'),

                // 保存候选人的优先级
                // { priority, candidateId }
                priority: $resource('/api/v1/candidate/update/priority'),

                // 转移候选人
                // { candidateId, positionId }
                move: $resource('/api/v1/candidate/transfer'),

                // 拒绝候选人
                reject: $resource('/api/v1/candidate/reject'),

                // offer 候选人
                offer: $resource('/api/v1/candidate/offer'),
                
                //去哪儿特殊流程offer候选人
                requestOffer: $resource('/api/v1/candidate/requestOffer'),

                // 待定 候选人
                pendding: $resource('/api/v1/candidate/undetermined'),

                //获取被抢候选人详细
                detailGrab: $resource('/api/v1/candidate/detailGrab'),
                
                //转发简历时，获取邮箱列表
                listEmails: $resource('/api/v1/candidate/listEmails')
            };
        }])

        .factory('$_Interview', ['$resource', function($resource){
            return {
                // 面试详情
                detail: $resource('/api/v1/interview/detail'),
                // 发起面试
                create: $resource('/api/v1/interview/apply'),
                // 特殊流程发起面试
                createSpecial: $resource('/api/v1/interview/applySpecial'),
                // 修改面试
                modify: $resource('/api/v1/interview/modifyInterview'),
                // 取消面试
                cancel: $resource('/api/v1/interview/cancel'),
                // 恢复面试
                reopen: $resource('/api/v1/interview/resumeInterview')
            };
        }])

        .factory('$_Comments', ['$resource', function($resource){
            return {
                //获取备注
                query: $resource('/api/v1/candidate/queryComments'),
                //添加备注
                add: $resource('/api/v1/candidate/addComment'),
                //删除备注
                del: $resource('/api/v1/candidate/delComment'),

                //获取候选人日志
                getLog: $resource('/api/v1/candidate/timePointer/detail')
            };
        }])

        .factory('$_Placement', ['$resource', function($resource){
            return {
                // offer 详情
                detail: $resource('/api/v1/candidate/getPlacement'),

                // 确认到岗
                onboard: $resource('/api/v1/candidate/onboard'),

                //放弃到岗
                giveupOnboard: $resource('/api/v1/candidate/giveUpOnboard'),

                // 已过保
                overGuaranteeTime: $resource('/api/v1/candidate/overGuaranteeTime'),

                // 未过保
                notOverGuaranteeTime: $resource('/api/v1/candidate/notOverGuaranteeTime')
            };
        }]);

})(window, angular);
