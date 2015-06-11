(function(window, angular, undefined){
'use strict';
angular.module('hrApp.services.hh', ['hrApp.resources.hh'])

.service('$Hh', ['app', '$_Hh', function(app, $_Hh){
    var _service = {
        getDetail: getDetail,
        getHhByHr:getHhByHr,
        getRadarData: getRadarData,
        addNotes: addNotes,
        getNotes: getNotes,
        getRecommendStatistics: getRecommendStatistics,
        getCustomHhCategories: getCustomHhCategories,
        addToCategory: addToCategory,
        addToCustomCategory: addToCustomCategory,

        getAssessmentList: getAssessmentList,
        addAssessment: addAssessment,
        getHhAssessments: getHhAssessments
    };

    function getDetail(hhId) {
        return $_Hh.detail.get({headhunterUserId: hhId}).$promise.then(function(rst) {
            if (rst.success) {
                return processDetail(rst.data);
            } else {
                return null;
            }
        });
    }
    
    function getHhByHr(opts) {
        return $_Hh.getHhByHr.get(opts).$promise.then(function(rst) {
            var hunters = rst.data || [];
            return hunters;
        });
    }
    
    function getRadarData(opts){
        app.$Tools.throughResource({
            list: ['headhunterId'],
            data: opts,
            resource: $_Hh.radarData.get
        });
    }

    function getCustomHhCategories() {
        return $_Hh.customHhCategories.get().$promise.then(function(rst) {
            var data = angular.isArray(rst.data) ? rst.data : [];
            return data.map(function(c) {
                return {
                    id: c.id,
                    name: c.categoryName
                };
            });
        });
    }

    function addToCategory(params) {
        return $_Hh.addToCategory.save(params).$promise.then(function(rst) {
            return rst;
        });
    }

    function addToCustomCategory(params) {
        return $_Hh.addToCustomCategory.save(params).$promise.then(function(rst) {
            return rst;
        });
    }

    function processDetail(data) {
        var coNature = ['外资（欧美）', '外资（非欧美）', '合资（欧美）', '合资（非欧美）', '国企/上市公司', '民营/私营企业', '外企代表处', '其他性质'],
            coScale = ['1-10人', '10-50人', '50-100人', '100-500人', '500人以上'];

        data.industryOne = data.industry1 ? data.industry1.childIndustryName : '' ;
        data.industryTwo = data.industry2 ? data.industry2.childIndustryName : '' ;
        data.user.experience = data.user.experience ? data.user.experience : 0;
        data.company.scale = coScale[data.company.companyScale];
        data.company.nature = coNature[data.company.companyNature];
        data.user.hhImage = data.user.avatar ? data.user.avatar : 'http://placehold.it/80x100/CCCCCC&text=No';
        return data;
    }

    /* 添加猎头备注
     * @opts
     *  content 备注内容
     *  hhUserId 猎头id
     *  title N 备注标题
     *  success 成功回调
     */
    function addNotes(opts){
        app.$Tools.throughResource({
            list: ['content', 'hhUserId', 'title'],
            data: opts,
            resource: $_Hh.addNotes.save
        });
    }
    /* 获取备注列表
     * @opts
     *  start N 起始条数
     *  pageSize N 每页条数
     *  hhUserId 猎头编号
     *  success 成功回调
     */
    function getNotes(opts){
        app.$Tools.throughResource({
            list: ['start', 'pageSize', 'hhUserId'],
            data: opts,
            resource: $_Hh.getNotes.get
        });
    }
    /* 获取猎头合作职位的统计信息
     * @opts
     *  headhunterId 猎头编号，
     *  success 成功回调
     */
    function getRecommendStatistics(opts){
        return app.$Tools.throughResource({
            list: ['headhunterId'],
            data: opts,
            resource: $_Hh.getRecommendStatistics.get
        });
    }
    /* 获取评价列表
     * @opts
     *  status 评价状态
     *      0 已评
     *      1 未评价
     *      -1 全部
     *  start 起始条数
     *  pageSize 每页条数
     *  success 成功回调
     */
    function getAssessmentList(opts){
        return app.$Tools.throughResource({
            list: ['status', 'start', 'pageSize'],
            data: opts,
            resource: $_Hh.getAssessmentList.get
        });
    }
    /* 评价猎头
     * @opts
     *  candidateId 候选人编号
     *  content 评价内容
     *  level 评价等级
     *      1好 2中 3差
     *  type 是否匿名
     *      0公开 1匿名
     *  success 成功回调
     */
    function addAssessment(opts){
        return app.$Tools.throughResource({
            list: ['candidateId', 'content', 'level', 'type'],
            data: opts,
            resource: $_Hh.addAssessment.save
        });
    }
    /* 获取猎头相关评价
     * @opts
     *  hdId 猎头编号
     *  enterpriseId 企业编号
     *  start 起始条数
     *  evaluationLevel 等级
     *  pageSize 每页条数
     *  success
     */
    function getHhAssessments(opts){
        return app.$Tools.throughResource({
            list: ['hdId', 'enterpriseId', 'start', 'evaluationLevel', 'pageSize'],
            data: opts,
            resource: $_Hh.getHhAssessments.get
        });
    }


    return _service;
}]);

})(window, angular);
