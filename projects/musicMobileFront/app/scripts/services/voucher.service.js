(function(window, angular, undefined){
'use strict';
angular.module('hrApp.services.voucher', [])

.service('$Voucher', ['app', '$_voucher', function(app, $_voucher){
    return {
        /*
         * 获取代金券
         * @opts
         *  success 成功回调
         */
        getVoucher: function(opts){
            app.$Tools.throughResource({
                list: [],
                data: opts,
                resource: $_voucher.getVoucher.get
            });
        },
        /* 获取新的优惠券
         * @opts
         *  success 成功回调
         */
        getNewVoucher: function(opts){
            app.$Tools.throughResource({
                list: [],
                data: opts,
                resource: $_voucher.getNewVoucher.get
            });
        },
        /*
         * 获取代金券列表
         * @opts
         *  start 起始条数
         *  pageSize 每页条数
         *  success 成功回调
         */
        getVoucherList: function(opts){
            app.$Tools.throughResource({
                list: ['start', 'pageSize'],
                data: opts,
                resource: $_voucher.list.get
            });
        },
        /*
         * 获取代金券关联信息
         * @opts
         *  vouchers 优惠券列表
         *  success 成功回调
         */
        getRelateInfo: function(opts){
            var ids = [];
            opts.vouchers.forEach(function(voucher){
                ids.push(voucher.serialNumber);
            });
            ids = ids.join(',');
            app.$Tools.throughResource({
                list: ['serialNumber'],
                data: {
                    serialNumber: ids,
                    success: function(posRst){
                        app.$Tools.throughResource({
                            list: ['serialNumber'],
                            data: {
                                serialNumber: ids,
                                success: function(cddRst){
                                    opts.vouchers.forEach(function(voucher){
                                        voucher.position = posRst.data[voucher.serialNumber];
                                        voucher.cdd = cddRst.data[voucher.serialNumber];
                                    });
                                    opts.success(opts.vouchers);
                                }
                            },
                            resource: $_voucher.cdd.get
                        });
                    }
                },
                resource: $_voucher.position.get
            });
        },
        /*
         * 邀请用户注册
         * @opts
         *  inviteeIdentity 邮件
         *  word 附加内容
         *  success 成功回调
         */
        inviteRegByMail: function(opts){
            return app.$Tools.throughResource({
                list: ['inviteeIdentity', 'word'],
                data: opts,
                resource: $_voucher.invite.save
            });
        },
        /*
         * 获取邀请列表
         * @opts
         *  start 起始位置
         *  pageSize 每页条数
         *  success 成功回调
         */
        getInviteList: function(opts){
             return app.$Tools.throughResource({
                list: ['start', 'pageSize'],
                data: opts,
                resource: $_voucher.getInviteList.get
            });
        },
        /* 邀请注册
         * @opts
         *  userId 被邀请用户编号
         *  inviteCode 邀请码
         *  success 成功回调
         */
        invRegister: function(opts){
            return app.$Tools.throughResource({
                list: ['userId', 'inviteCode'],
                data: opts,
                resource: $_voucher.invRegister.save
            });
        }
    };
}]);

})(window, angular);
