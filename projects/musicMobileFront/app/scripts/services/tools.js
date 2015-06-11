(function(window, angular, undefined){
'use strict';
angular.module('hrApp.services.tools', [])

.service('$Tools', ['app', function(app){
    var setParams = function(opts){
        var params = {};
        opts.list.forEach(function(parm, index, list){
            if(typeof opts.data[parm] !== 'undefined' && opts.data[parm] !== null && opts.data[parm] !== ''){
                if(opts.data[parm] instanceof Array){
                    opts.data[parm] = opts.data[parm].join(',');
                }
                params[parm] = opts.data[parm];
            }
        });
        return params;
    };
    return {
        /*设置请求参数
         * @opts
         *  list 可能参数列表 数组
         *  data 实际数据 对象
         */
        setParams : setParams,
        /*操作resource
         * @opts
         *  list 可能参数列表 数组
         *  data 实际数据 对象
         *  resource 资源对象
         */
        throughResource: function(opts){
            // console.log(opts)
            var result = opts.resource(
                setParams({
                    list: opts.list,
                    data: opts.data
                })
            );
            result.$promise.then(function success(){
                opts.data.success(result);
            });
            return result;
        },
        /* 状态补全
         * @input 输入
         * @type 类型 position cdd
         */
        completionStats: function(input, type){
            var posStats = [
                {
                    count: 0,
                    id: '1',
                    value: '开放职位'
                },
                {
                    count: 0,
                    id: '2',
                    value: '无职调'
                },
                {
                    count: 0,
                    id: '3',
                    value: '无候选人'
                },
                {
                    count: 0,
                    id: '4',
                    value: '暂停'
                },
                {
                    count: 0,
                    id: '5',
                    value: '申请关闭'
                },
                {
                    count: 0,
                    id: '6',
                    value: '已关闭'
                },
                {
                    count: 0,
                    id: '7',
                    value: '草稿'
                }
            ],
            cddStats = [
                {
                    count: 0,
                    id: '0',
                    value: '新推荐'
                },
                {
                    count: 0,
                    id: '1',
                    value: '评估中'
                },
                {
                    count: 0,
                    id: '8',
                    value: '面试申请'
                },
                {
                    count: 0,
                    id: '3',
                    value: '确认面试'
                },
                {
                    count: 0,
                    id: '9',
                    value: '取消面试'
                },
                {
                    count: 0,
                    id: '4',
                    value: '已offer'
                },
                {
                    count: 0,
                    id: '5',
                    value: '已撤销'
                },
                {
                    count: 0,
                    id: '6',
                    value: '已入职'
                },
                {
                    count: 0,
                    id: '7',
                    value: '已过保'
                },
                {
                    count: 0,
                    id: '2',
                    value: '已拒绝'
                }
            ],
            theStats = type === 'position' ? posStats : cddStats,
            findIndex = function(id){
                for(var i = 0; i < theStats.length; i++){
                    if(theStats[i].id == id){
                        return i;
                    }
                }
            },
            index = 0;

            for(var i = 0; i < input.length; i++){
                index = findIndex(input[i].id);
                theStats[index] = input[i];
            }
            return theStats;
        },
        /* 状态数组排序
         * @input 未排序的状态数组
         */
        sortStatus: function(input){
            var output = input.sort(function(a, b){
                return a.id - b.id;
            });
            return output;
        }
    };
}]);
})(window, angular);
