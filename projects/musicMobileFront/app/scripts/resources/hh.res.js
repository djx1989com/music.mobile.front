(function(window, angular, undefined){
    'use strict';

    angular.module('hrApp.resources.hh', [])

        .factory('$_Hh', ['$resource', function($resource){
            return {
                // 猎头页面头部统计
                queryCount : $resource('/api/v1/headhunter/queryCount'),
                // 常用猎头
                fly: $resource('/api/v1/headhunter/queryFlyHeadhunter'),
                // 合作猎头
                coop: $resource('/api/v1/headhunter/queryCoopHeadhunter'),
                // hr查询猎头
                getHhByHr: $resource('/api/v1/headhunter/selectHhByHr'),
                // 申请合作
                req: $resource('/api/v1/headhunter/queryRequestHeadhunter'),
                // 平台猎头
                platform: $resource('/api/v1/headhunter/query'),
                // 自有猎头
                special: $resource('/api/v1/headhunter/queryKaOrTopHeadhunter'),
                // 查询猎头公司列表
                company: $resource('/api/v1/headhunter/queryByCompany'),
                // 查询猎头公司列表
                queryCompany: $resource('/api/v1/headhunter/queryKaOrTopHeadhunterCompany'),
                // 根据猎头公司id查询猎头
                queryCompanyHh: $resource('/api/v1/headhunter/queryHeadhuntersByCompany'),
                // 公司下的猎头数据统计列表
                queryHeadhuntersStatsticsByCompany: $resource('/api/v1/headhunter/queryHeadhuntersStatsticsByCompany'),

                // 雷达图
                radarData: $resource('/api/v1/headhunter/getAbility'),

                //批量移除靠谱猎头
                // {ids: String -> '1,3,5' }
                removeWhites: $resource('/api/v1/headhunter/removeWhites'),

                //获取评价列表
                getAssessmentList: $resource('/api/v1/evaluation/listByHr'),
                //评价猎头
                addAssessment: $resource('/api/v1/evaluation/evaluated'),
                //获取猎头相关评价
                getHhAssessments: $resource('/api/v1/evaluation/evaluationDetail'),

                //批量添加靠谱猎头
                // {ids: String -> '1,3,5' }
                addWhites: $resource('/api/v1/headhunter/addWhites'),
                //同意申请合作
                acceptReq: $resource('/api/v1/position/approveRequest'),
                //拒绝申请合作
                rejectReq: $resource('/api/v1/position/rejectRequest'),

                //获取猎头合作职位统计
                getRecommendStatistics: $resource('/api//v1/headhunter/getHhRecommendStatistics'),
                //获取猎头详情
                detail: $resource('/api/v1/headhunter/queryHeadhunterDetail'),
                //添加猎头备注
                addNotes: $resource('/api/v1/headhunter/addHhComment'),
                //获取备注列表
                getNotes: $resource('/api/v1/headhunter/getHhComments'),
                // 获取猎头自定义分类
                customHhCategories: $resource('/api/v1/headhunter/getCustomHhCategories'),
                // 添加猎头到分类
                addToCategory: $resource('/api/v1/headhunter/addHunterIntoCategory'),
                // 添加猎头至新的分类
                addToCustomCategory: $resource('/api/v1/headhunter/addCustomHhCategoryAndHunter')
            };
        }]);


})(window, angular);
