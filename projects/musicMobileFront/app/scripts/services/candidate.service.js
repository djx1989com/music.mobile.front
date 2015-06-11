(function(window, angular, undefined){
'use strict';
/*
var CANDIDATE = {
    STATUS: {
        0: '新推荐',
        1: '评估中',
        2: '已拒绝',
        3: '面试中',
        4: '已录用',
        5: '已撤销'
    }
};*/
angular.module('hrApp.services.candidate', ['hrApp.resources.candidate'])

.constant('CANDIDATE', {
        STATUS: {
            0: '新推荐',
            1: '评估中',
            2: '已拒绝',
            3: '面试中',
            4: '已录用',
            5: '已撤销',
            // 6: '',
            7: '待定'
        }
    }
)

.service('$Candidate', ['app', '$_Candidate', '$_Interview', '$_Comments', 'CANDIDATE', function(app, $_Candidate, $_Interview, $_Comments, CANDIDATE){
    var _service = {
        actions: function(cddStatus, ivStatus, plStatus){
            var actions = {
                'views': '查看候选人',
                'offer': 'OFFER',
                'reject': '拒绝',
                'move': '转移到其他岗位',
                'forward': '转发简历',
                'msg': '找猎头聊聊',
                'vgrab': '查看抢人链接',

                'ivRequest': '安排面试',
                'ivCancel': '取消面试申请',
                'ivNext': '发起下轮面试',
                'ivReopen': '恢复面试',
                'ivModify': '修改面试',

                'pendding': '待定',
                'priority': '优先级',
                'onboard': '是否到岗',
                'offerPass': '是否过保'
            };

            var actionTypes = {
                'views': 'views',
                'offer': 'offer',
                'reject': 'reject',
                'move': 'move',
                'forward': 'forward',
                'msg': 'msg',
                'vgrab': 'vgrab',

                'ivRequest': 'interview',
                'ivCancel': 'interview',
                'ivNext': 'interview',
                'ivReopen': 'interview',
                'ivModify': 'interview',

                'pendding': 'pendding',
                'priority': 'priority',
                'onboard': 'onboard',
                'offerPass': 'offerPass'
            };

            /**
             * n : no interview
             * r : request
             * ne : iv next
             * re : iv reopen
             *
             * pno: no onboard
             * po: onboard
             * pnp: no pass (未过保）
             * pp: pass
             */
            var statusEvts = {
                '0n': ['priority','ivRequest', 'offer', 'reject', 'move', 'forward', 'msg', 'vgrab'],
                '1n': ['priority', 'ivRequest', 'reject', 'pendding', 'offer', 'move', 'forward', 'msg', 'vgrab'],
                '2n': ['priority', 'ivRequest','offer', 'move', 'forward', 'msg', 'vgrab'],
                '2re': ['priority', 'ivReopen', 'offer', 'move', 'forward', 'msg', 'vgrab'],
                '3r': ['priority', 'ivCancel', 'ivModify', 'reject', 'offer', 'move', 'forward', 'msg', 'vgrab'],
                '3ne': ['priority', 'ivNext', 'ivCancel', 'ivModify', 'reject', 'pendding', 'offer', 'move', 'forward', 'msg', 'vgrab'],
                '3re': ['priority', 'ivReopen', 'reject',  'offer', 'move', 'forward', 'msg', 'vgrab'],
                '4n': ['priority', 'msg'],
                '4pn': ['priority', 'onboard', 'forward', 'msg', 'offer'],
                '4po': ['priority', 'offerPass', 'msg', 'offer'],
                '5n': ['priority', 'msg'],
                '6n': ['priority', 'msg'],
                '7n': ['priority', 'ivRequest', 'reject', 'offer', 'move', 'forward', 'msg', 'vgrab'],
                '7r': ['priority', 'ivRequest', 'reject', 'msg', 'vgrab'],
                '7re': ['priority', 'ivReopen', 'reject', 'offer', 'move', 'forward', 'msg', 'vgrab']
            };

            var ivType = 'n';

            switch(ivStatus){
                case 0:
                    ivType = "r";
                    break;
                case 1:
                    ivType = "ne";
                    break;
                case 2:
                case 3:
                case 7:
                case 8:
                case 9:
                    ivType = "re";
                    break;
            }

            switch(cddStatus){
                case 0:
                case 1:
                case 4:
                case 5:
                case 6:
                    ivType = "n";
                    break;
            }

            switch(plStatus){
                case 0:
                    ivType = "pn";
                    break;
                case 1:
                    ivType = "po";
                    break;
                case 2:
                case 3:
                case 4:
                    ivType = "n";
                    break;
            }

            var act = cddStatus + ivType;

            var rst = statusEvts[act];
            if(~~JSON.parse(LS.get('userInfo')).specialType === 1){
                rst = _.reject(rst, function(e){ return e == "ivReopen" || e == "ivModify"; });
            }
            if(rst){
                rst = app.map(rst, function(key){
                    return {
                        evt: key,
                        name: actions[key],
                        type: actionTypes[key]
                    };
                });
            }

            return rst;
        },
        getDetail: function(params) {
            return $_Candidate.detail.get(params).$promise.then(function(rst) {
                if (rst.success) {
                    // rst.data._statusText = CANDIDATE.STATUS[rst.data.status];
                    rst.data.StatusText = CANDIDATE.STATUS;
                    rst.data.actions = _service.actions(rst.data.status, rst.data.interviewStatus, rst.data.placementOnboard);
                    return rst.data;
                } else {
                    return null;
                }
                // return rst.success ? (rst.data._statusText = CANDIDATE.STATUS[rst.data.status], rst.data) : null;
            });
        },
        /* 获取面试详情
         * @opts
         *  candidateId 候选人编号
         *  success 成功回调
         */
        getInterview: function(opts) {
            app.$Tools.throughResource({
                list: ['candidateId'],
                data: opts,
                resource: $_Interview.detail.get
            });
        },
        /* 获取备注列表
         * @opts
         *  candidateId 候选人编号
         *  success 成功回调
         */
        getComments: function(opts){
            app.$Tools.throughResource({
                list: ['candidateId'],
                data: opts,
                resource: $_Comments.query.get
            });
        },
        /* 添加备注
         * @opts
         *  commentContent 备注内容
         *  candidateId 候选人编号
         *  success 成功回调
         */
        addComments: function(opts){
            app.$Tools.throughResource({
                list: ['commentContent', 'candidateId'],
                data: opts,
                resource: $_Comments.add.save
            });
        },
        /* 删除备注
         * @opts
         *  commentId 备注编号
         *  success 成功回调
         */
        delComments: function(opts){
            app.$Tools.throughResource({
                list: ['commentId'],
                data: opts,
                resource: $_Comments.del.save
            });
        },
        /* 获取候选人日志
         * @opts
         *  candidateId 候选人编号
         *  start 开始位置
         *  pageSize 每页条数
         *  success 成功回
         */
        getLog: function(opts){
            app.$Tools.throughResource({
                list: ['candidateId', 'start', 'pageSize'],
                data: opts,
                resource: $_Comments.getLog.get
            });
        },
        /**
         * 获取被抢候选人详细
         * @param opts
         *  candidateId
         */
        getDetailGrab: function(opts){
            app.$Tools.throughResource({
                list: ['candidateId'],
                data: opts,
                resource: $_Candidate.detailGrab.get
            });
        }
    };
    return _service;
}]);

})(window, angular);
