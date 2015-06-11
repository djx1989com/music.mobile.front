(function(window, angular, undefined){
'use strict';
angular.module('hrApp.services.position', ['hrApp.resources.position'])

.service('$Position', ['app', '$_position', '$_user', function(app, $_position){
    return {
        /*
         * 获取职位列表
         * @opts
         *  query 搜索关键字
         *  start 开始位置
         *  pageSize 每页条数
         *  hrId HR编号
         *  groupId 组编号
         *  cityid 城市编号
         *  status 职位状态
         *  success 成功回调
         */
        getList: function(opts){
            return app.$Tools.throughResource({
                list: [
                    'query',
                    'start',
                    'pageSize',
                    'hrId',
                    'groupId',
                    'cityId',
                    'status'
                ],data: opts,
                resource: $_position.list.get
            });
        },
        /*
         * 查找当前用户有权限查看的职位
         * @opts
         *  query 搜索关键字
         *  start 开始位置
         *  pageSize 每页条数
         *  status 职位状态
         *  success 成功回调
         */
        getValidList: function(opts){
            return app.$Tools.throughResource({
                list: [
                       'start',
                       'pageSize',
                       'status',
                       'query'
                   ],data: opts,
                   resource: $_position.validList.get
            });
        },
        /* 获取职位详情
         * @opts
         *  positionId 职位编号
         *  success 成功回调
         */
        getDetail: function(opts){
            app.$Tools.throughResource({
                list: ['positionId'],
                data: opts,
                resource: $_position.detail.get
            });
        },
        /*
         * 获取职位相关信息统计信息
         * @opts
         *  positionId 职位编号，多个用逗号分割
         *  success 成功回调
         */
        getStatus: function(opts){
            app.$Tools.throughResource({
                list: ['positionId'],
                data: opts,
                resource: $_position.status.get
            });
        },
        /* 
         * @opts
         *  positionId 职位编号
         *  success 成功回调
         */
        getStatusDetail: function(opts){
            return app.$Tools.throughResource({
                list: ['positionId'],
                data: opts,
                resource: $_position.statusDetail.get
            });
        },
        /*
         * 获取手机验证码
         * @opts
         *  phoneNumber 手机号码
         *  success 成功回调
         */
        getVdCode: function(opts){
            var result = $_other.phoneCode.get({
                phoneNumber: opts.phoneNumber
            });

            result.$promise.then(function success(){
                opts.success(result);
            });
        },
        /* 设置职位优先级
         * @opts
         *  positionId 职位编号
         *  priority 优先级
         *  success 成功回调
         */
        savePriority: function(opts){
            app.$Tools.throughResource({
                list: [
                    'positionId',
                    'priority'
                ],data: opts,
                resource: $_position.priority.save
            });
        },
        /* 暂停职位
         * @opts
         *  positionId 职位编号
         *  reason 暂停理由
         *  success 成功回调
         */
        pend: function(opts){
            app.$Tools.throughResource({
                list: ['positionId', 'reason'],
                data: opts,
                resource: $_position.pend.get
            });
        },
        /* 恢复暂停职位
         * @opts
         *  positionId 职位编号
         *  success 成功回调
         */
        unpend: function(opts){
            app.$Tools.throughResource({
                list: ['positionId'],
                data: opts,
                resource: $_position.unpend.get
            });
        },
        /* 申请关闭职位
         * @opts
         *  positionId 职位编号
         *  reason 理由
         *  success 成功回调
         */
        applyClose: function(opts){
            app.$Tools.throughResource({
                list: ['positionId', 'reason'],
                data: opts,
                resource: $_position.applayClose.save
            });
        },
        /* 变更负责人
         * @opts
         *  positionIds 职位编号 多个用逗号分割
         *  positionAssignId 被制定人id
         *  success 成功回调
         */
        transform: function(opts){
            app.$Tools.throughResource({
                list: ['positionIds', 'positionAssignId'],
                data: opts,
                resource: $_position.transform.save
            });
        },
        /* 将一个hr的职位转移给另一个hr
         * @opts
         *  hrIds 转出hrid
         *  positionAssignId 转入hrid
         *  success 成功回调
         */
        transformU2U: function(opts){
            app.$Tools.throughResource({
                list: ['hrIds', 'positionAssignId'],
                data: opts,
                resource: $_position.transformU2U.save
            });
        },
        /* 添加补充说明
         * @opts
         *  notifyRange 发送类型
         *      0:仅猎头 1:职位合作猎头 2:公司合作猎头
         *  positionId 职位编号
         *  content 备注内容
         *  success 成功回调
         */
        addNote: function(opts){
            app.$Tools.throughResource({
                list: ['notifyRange', 'positionId', 'content'],
                data: opts,
                resource: $_position.addNote.save
            });
        },
        /* 修改期望到岗日期
         * @opts
         *  positionId 职位编号
         *  expectFillDate 期望到岗日期
         *  success 成功回调
         */
        setExpectFillDate: function(opts){
            app.$Tools.throughResource({
                list: ['positionId', 'expectFillDate'],
                data: opts,
                resource: $_position.setExpectFillDate.get
            });
        },
        /* 获取职位动态
         * @opts
         *  positionId 职位编号
         *  start 开始位置
         *  pageSize 每页条数
         *  success 成功回调
         */
        getSysLog: function(opts){
            app.$Tools.throughResource({
                list: ['positionId', 'start', 'pageSize'],
                data: opts,
                resource: $_position.sysLog.get
            });
        },
        /* 获取职位猎头
         * @opts
         *  positionId 职位编号
         *  start 开始位置
         *  pageSize 每页条数
         *  success 成功回调
         */
        getHunters: function(opts){
            app.$Tools.throughResource({
                list: ['positionId', 'start', 'pageSize'],
                data: opts,
                resource: $_position.hunters.get
            });
        },
        /* 获取行业列表
         * @opts
         *  success 成功回调
         */
        getIndustrys: function(opts){
            app.$Tools.throughResource({
                list: [],
                data: opts,
                resource: $_position.industry.get
            });
        },
        /* 获取职能列表
         * @opts
         *  success 成功回调
         */
        getFunctions: function(opts){
            app.$Tools.throughResource({
                list: [],
                data: opts,
                resource: $_position.funcitons.get
            });
        },
        /* 获取行业佣金比例
         * @opts
         *  functionId 职能id
         *  industryId 行业id
         *  annualSalary 预计年薪
         *  success
         */
        getChageInfo: function(opts){
            app.$Tools.throughResource({
                list: ['functionId', 'industryId', 'annualSalary'],
                data: opts,
                resource: $_position.chargeInfo.get
            });
        },
        /* 获取用户自定义佣金类型
         * @opts
         *  success
         */
        getCustomRewardTypes: function(opts){
            app.$Tools.throughResource({
                list: [],
                data: opts,
                resource: $_position.customRewardTypes.get
            });
        },
        /* 发布职位
         * @opts
         *  title 职位名称
         *  internalCode 内部编号
         *  positionAssignId 职位负责人
         *  provinceId 省
         *  cityId 市
         *  location 地址
         *  headCount 招聘人数
         *  professionTypeParentId 行业
         *  professionTypeId 职能
         *  expectFillDate 预计到岗
         *  department 所属部门
         *  reportpo 汇报对象
         *  subordinate 下属团队
         *  annualSalary 年薪
         *  salaryDescription 薪资描述
         *  jobDescription 职位描述
         *  jobRequirement 职位要求
         *  prompt 职位调研
         *  positionType 开放雷鑫
         *  rewardType 佣金类型
         *  fixedRewardAmount 固定金额
         *  percentageNumbric 百分比
         *  hhIds 猎头id
         *  success 成功回调
         */
        publish: function(opts){
            app.$Tools.throughResource({
                list: [
                    'title', 'internalCode', 'positionAssignId',
                    'provinceId', 'cityId', 'location',
                    'headCount', 'professionTypeParentId', 'professionTypeId',
                    'expectFillDate', 'department', 'reportpo',
                    'subordinate', 'annualSalary', 'salaryDescription',
                    'jobDescription', 'jobRequirement', 'prompt',
                    'positionType', 'rewardType', 'fixedRewardAmount',
                    'percentageNumbric', 'hhIds', 'customRewardId', 'remark','id','divisionId'
                ],data: opts,
                resource: $_position.publish.save
            });
        },
        modify: function(opts){
            app.$Tools.throughResource({
                list: [
                    'id', 'title', 'internalCode', 'positionAssignId',
                    'provinceId', 'cityId', 'location',
                    'headCount', 'professionTypeParentId', 'professionTypeId',
                    'expectFillDate', 'department', 'reportpo',
                    'subordinate', 'annualSalary', 'salaryDescription',
                    'jobDescription', 'jobRequirement', 'prompt',
                    'positionType', 'rewardType', 'fixedRewardAmount',
                    'percentageNumbric', 'hhIds', 'customRewardId', 'remark','divisionId'
                ],data: opts,
                resource: $_position.modify.save
            });
        },
        /* 删除草稿
         * @opts
         *  positionId 职位编号
         *  success 成功回调
         */
        delDraft: function(opts){
            app.$Tools.throughResource({
                list: ['positionId'],
                data: opts,
                resource: $_position.delDraft.save
            });
        },
        /* 新增职位草稿
         * @opts
         *  同发布职位
         */
        newDraft: function(opts){
            app.$Tools.throughResource({
                list: [
                    'title', 'internalCode', 'positionAssignId',
                    'provinceId', 'cityId', 'location',
                    'headCount', 'professionTypeParentId', 'professionTypeId',
                    'expectFillDate', 'department', 'reportpo',
                    'subordinate', 'annualSalary', 'salaryDescription',
                    'jobDescription', 'jobRequirement', 'prompt',
                    'positionType', 'rewardType', 'fixedRewardAmount',
                    'percentageNumbric', 'hhIds', 'customRewardId', 'remark'
                ],data: opts,
                resource: $_position.newDraft.save
            });
        },
        /**
         * 抢人才－转移候选人
         * @param opts
         *  positionId
         *  newPositionId
         *  candidateId
         */
        transferGrab: function(opts){
            app.$Tools.throughResource({
                list: [
                    'positionId',
                    'newPositionId',
                    'candidateId'
                ],data: opts,
                resource: $_position.transferGrab.save
            });
        }
    };
}]);

})(window, angular);
