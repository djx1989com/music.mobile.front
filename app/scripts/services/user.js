(function(window, angular, undefined){
'use strict';

angular.module('hrApp.services.user', ['hrApp.resources.user'])

.constant('OPERATION', {
        STATUS: {
            1: '草稿职位',
            2: '发布职位',
            3: '关闭职位',
            4: '刷新职位',
            5: '暂停职位',
            6: '开启职位',
            7: '修改职位',
            8: '复制职位',
            9: '取消关闭职位',
            10: '职位负责人',
            11: '修改面试',
            12: '转移候选人',
            13: 'offer',
            14: '拒绝候选人',
            15: '取消面试',
            16: '申请面试',
            17: '公司系统设置',
            18: '猎头分类',
            19: '猎头备注'
        }
    }
)

.service('$User', ['app', '$_user', '$http', function(app, $_user, $http){
    var initObj = null;
    return {
        //挂载用户基本信息
        userBaseInfo: function(){
            var userBaseInfo = null;
            try{
                var info = JSON.parse(LS.get('userInfo')),
                    empty = {};
                if(info.valueOf() === empty.valueOf()){
                    userBaseInfo = null;
                }else{
                    userBaseInfo = info;

                    //设置ga User-Id
                    ga('set', '&uid', info.userId);
                }
            }catch(e){
                userBaseInfo = null;
            }
            return userBaseInfo;
        },
        /*
         * 初始化用户session
         */
        init: function(cb){
            var session = $_user.init.get({
                spm: (new Date()).valueOf()
            });
            session.$promise.then(function success(){
                initObj = session.data;
                if(typeof cb !== 'undefined'){
                    cb(initObj);
                }
            });
        },
        /*
         * 用户登陆
         * @opts
         *  memberName 会员名
         *  loginName 用户名
         *  password 密码
         *  success 成功回调
         */
        login: function(opts){
            var memberName = $.trim(opts.memberName.toLowerCase()),
                loginName = $.trim(opts.loginName.toLowerCase()),
                password = opts.password,

                getAuthorizeCode = function(input){
                    var ha1 = memberName + ':' +
                        loginName + ':' +
                        initObj.realm + ':' +
                        input,
                    ha2 = 'POST:/hr/ucenter/login',
                    authorizeCode = '',
                    nonce = initObj.nonce;
                    ha1 = md5(ha1);
                    ha2 = md5(ha2);
                    authorizeCode = ha1 + ':' + initObj.nonce + ':' + ha2;
                    authorizeCode = md5(authorizeCode);
                    return authorizeCode;
                };

            var authorizeCode = md5(password),
                twoAuthorizeCode = authorizeCode;

            authorizeCode = getAuthorizeCode(authorizeCode);
            twoAuthorizeCode = md5(twoAuthorizeCode + '5OGP56W65A6D6LSD') + 'x';
            twoAuthorizeCode = getAuthorizeCode(twoAuthorizeCode);

            var loginResult = $_user.login.send({
                loginName: loginName,
                memberName: memberName,
                authorizeCode: authorizeCode,
                twoAuthorizeCode: twoAuthorizeCode
            });
            loginResult.$promise.then(function success(){
                if(loginResult.success){
                    var user = loginResult.data || {};
                    LS.set('userInfo', JSON.stringify(user));

                    app.storage(C.FDF.STORAGE.CURRENT, {
                        "id": user.userId,
                        "name": app.prop("userDetail.profile.realName", user),
                        "os": user.os,
                        "companyId": user.enterpriseId,
                        "companyName": app.prop("enterprise.name", user),
                        "token": user.TOKEN
                    });
                }
                opts.success(loginResult);
            });
        },
        loginN: function(opts){
            var loginName = $.trim(opts.loginName.toLowerCase()),
                password = opts.password,

                getAuthorizeCode = function(input){
                    var ha1 = loginName + ':' +
                        initObj.realm + ':' +
                        input,
                    ha2 = 'POST:/hr/ucenter/login',
                    authorizeCode = '',
                    nonce = initObj.nonce;
                    ha1 = md5(ha1);
                    ha2 = md5(ha2);
                    console.log("ha1:  "+ha1+"\n h2:  "+ha2);
                    authorizeCode = ha1 + ':' + initObj.nonce + ':' + ha2;
                    authorizeCode = md5(authorizeCode);
                    return authorizeCode;
                };

            var authorizeCode = md5(password),
                twoAuthorizeCode = authorizeCode;

            authorizeCode = getAuthorizeCode(authorizeCode);
            twoAuthorizeCode = md5(twoAuthorizeCode + '5OGP56W65A6D6LSD') + 'x';
            twoAuthorizeCode = getAuthorizeCode(twoAuthorizeCode);

            var loginResult = $_user.login.send({
                loginName: loginName,
                authorizeCode: authorizeCode,
                twoAuthorizeCode: twoAuthorizeCode
            });


            loginResult.$promise.then(function success(){
                if(loginResult.success){
                    var user = loginResult.data || {};
                    LS.set('userInfo', JSON.stringify(user));

                    app.storage(C.FDF.STORAGE.CURRENT, {
                        "id": user.userId,
                        "name": app.prop("userDetail.profile.realName", user),
                        "os": user.os,
                        "companyId": user.enterpriseId,
                        "companyName": app.prop("enterprise.name", user),
                        "token": user.TOKEN
                    });
                }
                opts.success(loginResult);
            });
        },
        /* 用户注册
         * @opts
         *  password 密码
         *  loginName 用户名
         *  realName 真实姓名
         *  email 邮箱
         *  mobilePhone 手机
         *  officePhone 办公电话
         *  enterpriseName 公司名称
         *  enterPriseAddress 公司地址
         *  veriPhone 手机验证码
         *  veriImage 图片验证码
         *  success 成功回调
         */
        register: function(opts){
            return app.$Tools.throughResource({
                list: [
                    'password',
                    'loginName',
                    'realName',
                    'email',
                    'mobilePhone',
                    'officePhone',
                    'enterpriseName',
                    'enterPriseAddress',
                    'veriPhone',
                    'provinceId',
                    'cityId',
                    'veriImage'
                ],data: opts,
                resource: $_user.register.save
            });
        },
        registerN: function(opts){
            return app.$Tools.throughResource({
                list: [
                    'password',
                    'realName',
                    'mobilePhone',
                    'enterpriseName',
                    'verifyCode'
                ],data: opts,
                resource: $_user.register.save
            });
        },
        regImprove: function(opts){
            return app.$Tools.throughResource({
                list: [
                    'userId',
                    'enterpriseId',
                    'email',
                    'enterpriseAddress',
                    'provinceId',
                    'cityId',
                    'officePhone'
                ],data: opts,
                resource: $_user.regImprove.save
            });
        },
        /* 获取账号列表
         * @opts
         *  #ids hrid列表，多个用逗号分割
         *  #start 起始位置
         *  #pageSize 每页显示条数
         */
        getAccounts: function(opts){
            app.$Tools.throughResource({
                list: ['ids', 'start', 'pageSize'],
                data: opts,
                resource: $_user.accounts.get
            });
        },
        /* 获取事业部
         * @opts
         *  #ids hrid列表，多个用逗号分割
         *  #start 起始位置
         *  #pageSize 每页显示条数
         */
        getDivisions: function(opts){
            app.$Tools.throughResource({
                list: ['start', 'pageSize'],
                data: opts,
                resource: $_user.divisions.get
            });
        },
        /* 获取用户详细信息
         * @opts
         *  userId 用户编号
         *  success 成功回调
         */
        getDetail: function(opts){
            app.$Tools.throughResource({
                list: ['userId'],
                data: opts,
                resource: $_user.detail.get
            });
        },
        /* 添加组用户
         * @opts
         *  userId 用户id
         *  groupId 组id
         *  success 成功回调
         */
        addGroupUser: function(opts){
            app.$Tools.throughResource({
                list: ['userId', 'groupId'],
                data: opts,
                resource: $_user.addGroupUser.save
            });
        },
        /* 删除组用户
         * @opts
         *  userId 用户id
         *  groupId 组id
         *  success 成功回调
         */
        deleteGroupUser: function(opts){
            app.$Tools.throughResource({
                list: ['userId', 'groupId'],
                data: opts,
                resource: $_user.deleteGroupUser.save
            });
        },
        /* 添加用户组
         * @opts
         *  name 名称
         *  parentId 父组id
         *  success 成功回调
         */
        addGroup: function(opts){
            app.$Tools.throughResource({
                list: ['name', 'parentId'],
                data: opts,
                resource: $_user.addGroup.save
            });
        },
        /* 删除用户组
         * @opts
         *  groupId 组编号
         *  success 成功回调
         */
        removeGroup: function(opts){
           app.$Tools.throughResource({
                list: ['groupId'],
                data: opts,
                resource: $_user.removeGroup.get
            });
        },
        /* 重命名用户组
         * @opts
         *  groupId 组编号
         *  groupName 组名称
         *  success 成功回调
         */
        renameGroup: function(opts){
            app.$Tools.throughResource({
                list: ['groupId', 'groupName'],
                data: opts,
                resource: $_user.renameGroup.save
            });
        },
        /* 获取子账号列表 信息多
         * @opts
         *  #ids hrid列表，多个用逗号分割
         *  #start 起始位置
         *  #pageSize 每页显示条数
         */
        getSubAccounts: function(opts){
            app.$Tools.throughResource({
                list: ['ids', 'start', 'pageSize'],
                data: opts,
                resource: $_user.subAccounts.get
            });
        },
        /* 获取所有操作
         * @opts
         *  success 成功回调
         */
        getAllOperation: function(opts){
            app.$Tools.throughResource({
                list: [],
                data: opts,
                resource: $_user.getAllOperation.get
            });
        },
        /* 获取用户所有操作
         * @opts
         *  userId 用户编号
         *  success 成功回调
         */
        getUserOperation: function(opts){
            app.$Tools.throughResource({
                list: ['userId'],
                data: opts,
                resource: $_user.getUserOperation.get
            });
        },
        /* 保存用户所有权限
         * @opts
         *  userId 用户编号
         *  operationIds 操作编号列表
         *  success 成功回调
         */
        saveUserOperation: function(opts){
            app.$Tools.throughResource({
                list: ['userId', 'operationIds'],
                data: opts,
                resource: $_user.saveUserOperation.save
            });
        },
        /* 获取组所有操作
         * @opts
         *  groupId 用户编号
         *  success 成功回调
         */
        getGroupOperation: function(opts){
            app.$Tools.throughResource({
                list: ['groupId'],
                data: opts,
                resource: $_user.getGroupOperation.get
            });
        },
        /* 保存组所有权限
         * @opts
         *  groupId 用户编号
         *  operationIds 操作编号列表
         *  success 成功回调
         */
        saveGroupOperation: function(opts){
            app.$Tools.throughResource({
                list: ['groupId', 'operationIds'],
                data: opts,
                resource: $_user.saveGroupOperation.save
            });
        },
        /* 获取交流信息
         * @opts
         *  start 开始位置
         *  pageSize 每页条数
         *  success 成功回调
         */
        getExMessage: function(opts){
            app.$Tools.throughResource({
                list: ['start', 'pageSize'],
                data: opts,
                resource: app.$_Msg.getEx.get
            });
        },
        /* 获取系统信息
         * @opts
         *  start 开始位置
         *  pageSize 每页条数
         *  success 成功回调
         */
        getSysMessage: function(opts){
            app.$Tools.throughResource({
                list: ['start', 'pageSize'],
                data: opts,
                resource: app.$_Msg.getSys.get
            });
        },
        /* 获发件统信息
         * @opts
         *  start 开始位置
         *  pageSize 每页条数
         *  success 成功回调
         */
        getOutMessage: function(opts){
            app.$Tools.throughResource({
                list: ['start', 'pageSize'],
                data: opts,
                resource: app.$_Msg.getOut.get
            });
        },
        /* 获取信息详情
         * @opts
         *  messageId 消息编号
         *  success 成功回调
         */
        getMessageDetail: function(opts){
            app.$Tools.throughResource({
                list: ['messageId'],
                data: opts,
                resource: app.$_Msg.getDetail.get
            });
        },
        /* 发送信息
         * @opts
         *  receiverId 收件人编号
         *  positionId 职位编号
         *  candidateId 候选人编号
         *  #replyId 回复消息的编号
         *  subject 主题
         *  content 内容
         *  success 成功回调
         */
        sendMessage: function(opts){
            app.$Tools.throughResource({
                list: ['receiverId', 'positionId', 'candidateId',
                        'replyId', 'subject', 'content'],
                data: opts,
                resource: app.$_Msg.send.save
            });
        },
        /* 获取未读消息条数
         * @opts
         *  success 成功回调
         */
        getNotReadMessageCount: function(opts){
            app.$Tools.throughResource({
                list: [],
                data: opts,
                resource: app.$_Msg.getNotRead.get
            });
        },
        /* 获取未读消息条数详情
         * @opts
         *  success 成功回调
         */
        getNotReadMessageDetailCount: function(opts){
            app.$Tools.throughResource({
                list: [],
                data: opts,
                resource: app.$_Msg.getCounts.get
            });
        },
        /* 将消息表记为已读
         * @opts
         *  ids 消息编号列表
         *  success 成功回调
         */
        markRead: function(opts){
            app.$Tools.throughResource({
                list: ['ids'],
                data: opts,
                resource: app.$_Msg.markRead.save
            });
        },
        /* 添加子账号
         * @opts
         *  loginName 登录名
         *  realName 真实姓名
         *  gender 性别
         *  title 职位
         *  mobilePhone 手机号码
         *  memberName 会员名称
         *  email 邮箱
         *  subAccountPassword 自账号密码
         *  reSubAccountPassword 重复密码
         *  success 成功回调
         */
        addSubAccount: function(opts){
            app.$Tools.throughResource({
                list: ['loginName', 'realName', 'gender',
                        'title', 'mobilePhone',
                        'email', 'subAccountPassword', 'reSubAccountPassword'],
                data: opts,
                resource: $_user.addSubAccounts.save
            });
        },
        /* 删除子账号
         * @opts
         *  userId 用户id编号
         *  success 成功回调
         */
        deleteSubAccounts: function(opts){
            app.$Tools.throughResource({
                list: ['userId'],
                data: opts,
                resource: $_user.deleteSubAccounts.save
            });
        },
        /* 检查用户密码
         * @opts
         *  password 用户密码
         *  success 成功回调
         */
        checkPass: function(opts){
            app.$Tools.throughResource({
                list: ['password'],
                data: opts,
                resource: $_user.checkPass.save
            });
        },
        /* 批量删除消息
         * @opts
         *  ids 消息编号列表
         *  success 成功回调
         */
        del: function(opts){
             app.$Tools.throughResource({
                list: ['ids'],
                data: opts,
                resource: app.$_Msg.del.save
            });
        },
        /* 批量删除已发消息
         * @opts
         *  ids 消息编号列表
         *  success 成功回调
         */
        delOut: function(opts){
             app.$Tools.throughResource({
                list: ['ids'],
                data: opts,
                resource: app.$_Msg.delOut.save
            });
        },
        /* 获取公司组
         * @opts
         *  success 成功回调
         */
        getGroup: function(opts){
             app.$Tools.throughResource({
                list: [],
                data: opts,
                resource: $_user.getGroup.get
            });
        },
        /* 修改密码
         * @opts
         *  success 成功回调
         */
        changePwd: function(opts){
            app.$Tools.throughResource({
                list: ['oldPassword', 'newPassword', 'reNewPassword'],
                data: opts,
                resource: $_user.changePwd.save
            });
        },
        /* 修改公司信息
         * @opts
         *  success 成功回调
         */
        updateCorporateInfo: function(opts){
            app.$Tools.throughResource({
                list: ['id', 'shortName', 'logo', 'scale', 'style', 'industryId', 'otherIndustryId', 'provinceId', 'cityId', 'address', 'website', 'introduce'],
                data: opts,
                resource: $_user.updateCorporateInfo.save
            });
        },
        /* 修改个人信息
         * @opts
         *  success 成功回调
         */
        updatePersonalInfo: function(opts){
            app.$Tools.throughResource({
                list: ['userId', 'realName', 'firstName', 'lastName', 'gender', 'title', 'mobilePhone', 'email', 'avatar', 'provinceId', 'cityId', 'address', 'officePhone', 'qq', 'loginName', 'experience'],
                data: opts,
                resource: $_user.updatePersonalInfo.save
            });
        },
        /* 忘记密码
         * @opts
         *  memberName 会员名
         *  loginName 登陆名
         *  veriImage 验证码
         *  success 成功回调
         */
        forgotPass: function(opts){
            app.$Tools.throughResource({
                list: ['memberName', 'loginName', 'veriImage'],
                data: opts,
                resource: $_user.forgotPass.save
            });
        },
        /* 检查授权码是否有效
         * @opts
         *  authCode 授权码
         *  success 成功回调
         */
        checkAuthCode: function(opts){
            app.$Tools.throughResource({
                list: ['authCode'],
                data: opts,
                resource: $_user.checkAuthCode.get
            });
        },
        /* 重置用户密码
         * @opts
         *  newPassword 新密码
         *  reNewPassword 重复新密码
         *  success 成功回调
         */
        resetPass: function(opts){
            app.$Tools.throughResource({
                list: ['newPassword', 'reNewPassword'],
                data: opts,
                resource: $_user.resetPass.save
            });
        },
        /* 获取订阅设置
         * @opts
         *  success 成功回调
         */
        getSubscribe: function(opts){
            return app.$Tools.throughResource({
                list: [],
                data: opts,
                resource: $_user.getSubscribe.get
            });
        },
        /* 获取订阅设置
         * @opts
         *  success 成功回调
         */
        queryEnterpriseInfo: function(opts){
            return app.$Tools.throughResource({
                list: [],
                data: opts,
                resource: $_user.queryEnterpriseInfo.get
            });
        },
        /* 更新订阅设置
         * @opts
         *  listSubscript 父类型value值:子类型值(多个用,分割){大分类用 | 分割}列如邮箱：3:1,2,3
         *  success
         */
        updateSubscribe: function(opts){
            return app.$Tools.throughResource({
                list: ['listSubscript'],
                data: opts,
                resource: $_user.updateSubscribe.save
            });
        },
        /* 变更手机号码
         * @opts
         *  success 成功回调
         */
        updatePhoneNo: function(opts){
            return app.$Tools.throughResource({
                list: ['mobilePhone', 'veriPhone'],
                data: opts,
                resource: $_user.updatePhoneNo.save
            });
        },
        /* 修改公司设置
         * @opts
         *  success 成功回调
         */
        updateEnterpriseSetting: function(opts) {
            return app.$Tools.throughResource({
                list: ['candidateIntervalMonth'],
                data: opts,
                resource: $_user.updateEnterpriseSetting.save
            });
        },
        /* 获取用户头像
         * @opts
         *  url 头像文件名
         *  success 成功回调
         */
        getUserAvatar: function(opts){
            $http({
                url: '/api/common/getUserImageUrl',
                method: 'POST',
                params: {uri: opts.url}
            }).then(function(_rst) {
                if (_rst.data.success) {
                       opts.success(_rst.data.data);
                }
            });
        },
        /* 获取公司logo
         * @opts
         *  url logo文件名
         *  success 成功回调
         */
        getCompanyImage: function(opts){
            $http({
                url: '/api/common/getCompanyImageUrl',
                method: 'POST',
                params: {uri: opts.url}
            }).then(function(_rst) {
                if (_rst.data.success) {
                       opts.success(_rst.data.data);
                }
            });
        },
        /* 判断用户有无某个权限
         * @opts
         *  operationId 权限Id
         *  success 成功回调
         */
        hasOperation: function(opts){
            this.getUserOperation({
                userId: ~~JSON.parse(LS.get('userInfo')).userId,
                success: function(result){
                    var flag = false;
                    result.data.forEach(function(opt, index, list){
                        if(opt.operationId == opts.operationId){
                            flag = true;
                        }
                    });
                    return opts.success(flag);
                }
            });
        }
    };
}]);

})(window, angular);
