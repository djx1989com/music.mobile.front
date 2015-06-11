(function(window, angular, undefined){
'use strict';
angular.module('hrApp.services.other', ['hrApp.resources.other'])

.service('$Other', ['app', '$_other', function(app, $_other){
    return {
        /*
         * 检查手机号码是否已经使用
         * @opts
         *  mobilephone 手机号码
         *  success 成功回调
         */
        isPhoneExist: function(opts){
            var check = $_other.phoneExist.get({
                mobilephone: opts.mobilephone
            });

            check.$promise.then(function success(){
                opts.success(check);
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
        getVdCodeN: function(opts){
            var result = $_other.phoneCodeN.get({
                phoneNumber: opts.phoneNumber
            });

            result.$promise.then(function success(){
                opts.success(result);
            });
        },
        /*
         * 找回密码时用的验证码
         * @opts
         *  mobilephone 手机号码
         *  success 成功回调
         */
        phoneCodeFindPass: function(opts){
            var result = $_other.phoneCodeFindPass.get({
                mobilephone: opts.mobilephone
            });

            result.$promise.then(function success(){
                opts.success(result);
            });
        },
        /* 验证找回密码的验证码
         * @opts
         *  mobilephone: 手机号码
         *  verifyCode 验证码
         *  success 成功回调
         */
        getAuthCode: function(opts){
            var result = $_other.getAuthCode.save({
                mobilephone: opts.mobilephone,
                verifyCode: opts.verifyCode
            });

            result.$promise.then(function success(){
                opts.success(result);
            });
        },
        /*
         * 获取城市列表
         * @opts
         *  success 成功回调
         */
        getCitys: function(opts){
            var result = $_other.cityList.get();
        
            function unique(arr)
            {
                var n = []; //一个新的临时数组
                for(var i = 0; i < arr.length; i++) //遍历当前数组
                {
                    //如果当前数组的第i已经保存进了临时数组，那么跳过，
                    //否则把当前项push到临时数组里面
                    if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
                }
                return n;
            }
            result.$promise.then(function success(){
                var province = [],
                    citys = [];
                for(var city in result.data){
                    province.push(result.data[ Number(result.data[city].provinceId + '01') ]);
                    citys.push(result.data[city]);
                }
                province = unique(province);
                if(province[0].name !== '北京'){
                    province.sort(function(a, b){
                        return a.id > b.id;
                    });
                }
                opts.success({
                    provinces: province,
                    citys: citys
                });
            });
        },
        /* 表单验证
         * form 被验证表单
         * cb 验证成功回调
         */
        FormValidate: function (form, cb) {
            if (form.$valid) {
                cb();
            } else {
                angular.forEach(form.$error, function(v, k) {
                    angular.forEach(v, function(_v, i) {
                        // set dirty trick
                        _v.$setViewValue(_v.$viewValue);
                    });
                });
            }
        }
    };
}]);

})(window, angular);
