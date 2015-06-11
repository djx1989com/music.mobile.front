(function(window, angular, undefined){
'use strict';

angular.module('hrApp.resources.position', [])

.factory('$_position', ['$resource', function($resource){
    return {
        //列表
        list: $resource('/api/v1/position/queryPositions'),
        //查找当前用户有权限查看的职位
        validList: $resource('/api/v1/position/getPositions'),
        //状态
        status: $resource('/api/v1/position/query/stats'),
        //统计详情
        statusDetail: $resource('/api/v1/position/query/stats/detail'),
        //优先级
        priority: $resource('/api/v1/position/update/priority'),
        //暂停
        pend: $resource('/api/v1/position/pend'),
        //恢复暂停
        unpend: $resource('/api/v1/position/unpend'),
        //申请关闭
        applayClose: $resource('/api/v1/position/applyClose'),
        //转移候选人
        transform: $resource('/api/v1/position/changePositions'),
        //将一个hr的职位转移给另一个hr
        transformU2U: $resource('/api/v1/position/changePosiAssignByHr'),
        //期望到岗日期
        setExpectFillDate: $resource('/api/v1/position/refresh'),
        //添加备注
        addNote: $resource('/api/v1/position/replenish/add'),
        //详情
        detail: $resource('/api/v1/position/detail'),
        //日志
        sysLog: $resource('/api/v1/position/timePointer/detail'),
        //获取职位下的猎头 
        hunters: $resource('/api/v1/position/getAssignHeadhunters'),
        //行业
        industry: $resource('/api/common/queryAllIndu'),
        //职能
        funcitons: $resource('/api/common/functions'),
        //行业佣金
        chargeInfo: $resource('/api/v1/position/getRewardStats'),
        //获取用户自定义佣金类型
        customRewardTypes: $resource('/api/v1/position/getCustomReward'),
        //发布职位
        publish: $resource('/api/v1/position/publish'),
        modify: $resource('/api/v1/position/modify'),
        //删除草稿
        delDraft: $resource('/api/v1/position/delDraftPosition'),
        newDraft: $resource('/api/v1/position/draft'),

        // !-- mizi.20141211
        // 获得最简职位列表信息
        simple: $resource('/api/v1/position/query/name'),
        //抢人才－转移候选人
        transferGrab: $resource('/api/v1/candidate/transferGrab')
    };
}]);
})(window, angular);
