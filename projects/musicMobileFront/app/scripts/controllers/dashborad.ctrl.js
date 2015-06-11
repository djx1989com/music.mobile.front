(function(window, angular, undefined){
'use strict';

angular.module('hrApp.controllers.backend.dashboard', [])

.controller('dashboardCtrl', dashboardCtrl);

dashboardCtrl.$inject = ['app', '$scope', '$injector', '$rootScope'];

function dashboardCtrl(app, $scope, $injector, $rootScope) {
    var p = app.$stateParams;
    var $Dashboard = $injector.get('$Dashboard'),
        _currentG = {
            group: {
                groupName: '团队'
            },
            users: []
        },
        _currentU = {
            profile: {
                realName: '个人'
            }
        },
        vm = this;
    vm._currentG = _currentG;
    vm._currentU = _currentU;
    vm.showDropMenu = showDropMenu;
    vm.toggleGroup = toggleGroup;
    vm.toggleUser = toggleUser;
    vm.updatePositions = getPositions;
   
    vm.openGroup = function (){
    	if($rootScope.userInfo.isroot){
    		app.$location.path('/ucenter/group');
    	}else{
    		alert('无权限查看组织架构！');
    	}
    }
    init();

    $scope.$on('$viewContentLoaded', function() {
        $injector.get('$rootScope').channel = 'dashboard';
    });

    function showDropMenu(t, e) {
         app.$Base.evt(e);
        vm.menu = vm.menu === t ? undefined : t;
    }

    function toggleGroup(e, g) {
         app.$Base.evt(e);
        // vm._currentG = g || _currentG;
        vm.menu = undefined;
        var hrIds = [];
        if (g !== undefined) {
            vm._currentG = g;
            angular.forEach(g.users, function(v, i) {
                hrIds.push(v.profile.userId);
            });
            getTotalStats(hrIds.join(','));
        } else {
            vm._currentG = _currentG;
            getTotalStats();
        }
    }

    function toggleUser(e, u) {
         app.$Base.evt(e);
        vm.menu = undefined;
        if (u !== undefined) {
            vm._currentU = u;
            getTotalStats(u.profile.userId);
        } else {
            vm._currentU = _currentU;
            toggleGroup(vm._currentG);
        }
    }

    function init() {
        getTotalStats();
        getTeamStats();
        getInterviews();
        getPositions();
        getMessages();
        getCompanyStatus();
        getCompanyGroup();
    }

    function getTotalStats(hrId) {
        var opts = hrId === undefined ? {} : {hrId: hrId},
            prm = $Dashboard.getTotalStats(opts);
        $scope.busy_stats = prm;
        return prm.then(function(totalStats) {
            vm.totalStats = totalStats;
        });
    }

    function getTeamStats() {
        return $Dashboard.getTeamStats().then(function(teamStats) {
            vm.teamStats = teamStats;
        });
    }

    function getInterviews() {
        var filters = {
            start: 0,
            days: 7,
            pageSize: 7,
            startTime: (new Date()).valueOf()
        };
        return $Dashboard.getInterviews(filters).then(function(interviews) {
            vm.interviews = interviews;
        });
    }

    function getPositions() {
        return $Dashboard.getPositions().then(function(positions) {
            vm.positions = positions;
        });
    }

    function getMessages() {
        return $Dashboard.getMessages().then(function(messages) {
            vm.messages = messages;
        });
    }

    function getCompanyStatus() {
        return $Dashboard.getCompanyStatus().then(function(status) {
            vm.companyStatus = status;
        });
    }

    function getCompanyGroup() {
        return $Dashboard.getCompanyGroup().then(function(groups) {
            vm.groups = groups;
        });
    }

    return vm;
}

})(window, angular);
