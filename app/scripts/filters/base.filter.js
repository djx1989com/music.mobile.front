(function(window, angular, undefined){
'use strict';
angular.module('hrApp.filters.base', [])
    .filter('niceTime', ['$filter',
        function ($filter) {
            var dt = {
                second: '秒',
                minute: '分',
                hour: '时',
                day: '天',
                month: '月',
                year: '年',
                fullD: 'yyyy年MM月dd日 HH:mm',
                shortD: 'MM-dd HH:mm',
                yearAgo: '年前',
                dayAgo: '天前',
                theDayBeforeYesterday: '前天',
                yesterday: '昨天',
                hourAgo: '小时前',
                minuteAgo: '分钟前',
                secondAgo: '刚刚',
                tomorrow: '明天',
                theDayAfterTomorrow: '后天',
                yearAfter: '年后',
                dayAfter: '天后',
                hourAfter: '小时后',
                minuteAfter: '分钟后'
            };

            return function (date, full) {
                var o = Date.now() - date,
                    dateFilter = $filter('date');
                if (full) {
                    return dateFilter(date, dt.fullD);
                } else if (o > 86400000 * 365) {
                    return 1 + dt.yearAgo;
                } else if (o > 86400000) {
                    var ago = Math.floor(o / 86400000);
                    if(ago == 1){
                        return dt.yesterday;
                    }
                    if(ago == 2 ){
                        return dt.theDayBeforeYesterday;
                    }
                    return  ago + dt.dayAgo;
                } else if (o > 3600000) {
                    return Math.floor(o / 3600000) + dt.hourAgo;
                } else if (o > 60000) {
                    return Math.floor(o / 60000) + dt.minuteAgo;
                } else if (o < -86400000 * 365) {
                    return 1 + dt.yearAfter;
                } else if (o < -86400000) {
                    var after = Math.floor(-o / 86400000);
                    if(after == 1){
                        return dt.tomorrow;
                    }
                    if(after == 2 ){
                        return dt.theDayAfterTomorrow;
                    }
                    return  after+ dt.dayAfter;
                } else if (o <- 3600000) {
                    return Math.floor(-o / 3600000) + dt.hourAfter;
                } else if (o <- 60000) {
                    return Math.floor(-o / 60000) + dt.minuteAfter;
                } else {
                    return dt.secondAgo;
                }
            };
        }
    ])

    .filter('mdate', ['$filter', function($filter){
        return function(date, format){
            if (!date) {
                return;
            }
            return $filter('date')(new Date(date), format || 'yyyy-MM-dd');
        };
    }])

    .filter('nbToCh', function(){
	    function changeNumMoneyToChinese(money) {
	        var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
	        var cnIntRadice = new Array("", "拾", "佰", "仟");
	        var cnIntUnits = new Array("", "万", "亿", "兆");
	        var cnDecUnits = new Array("角", "分", "毫", "厘");
	        var cnInteger = "";
	        var cnIntLast = "";
	        var maxNum = 1000000000000000;
	        var IntegerNum;
	        var DecimalNum;
	        var ChineseStr = "";
	        var parts;
	        if (money == "") {
	            return "";
	        }
	        money = parseFloat(money);
	        if (money >= maxNum) {
	            return "";
	        }
	        if (money == 0) {
	            ChineseStr = cnNums[0] + cnIntLast + cnInteger;
	            return ChineseStr;
	        }
	        money = money.toString();
	        if (money.indexOf(".") == -1) {
	            IntegerNum = money;
	            DecimalNum = "";
	        } else {
	            parts = money.split(".");
	            IntegerNum = parts[0];
	            DecimalNum = parts[1].substr(0, 4);
	        }
	        if (parseInt(IntegerNum, 10) > 0) {
	            var zeroCount = 0;
	            var IntLen = IntegerNum.length;
	            for (var i = 0; i < IntLen; i++) {
	                var n = IntegerNum.substr(i, 1);
	                var p = IntLen - i - 1;
	                var q = p / 4;
	                var m = p % 4;
	                if (n == "0") {
	                    zeroCount++;
	                } else {
	                    if (zeroCount > 0) {
	                        ChineseStr += cnNums[0];
	                    }
	                    zeroCount = 0;
	                    ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
	                }
	                if (m == 0 && zeroCount < 4) {
	                    ChineseStr += cnIntUnits[q];
	                }
	            }
	            ChineseStr += cnIntLast;
	        }
	        if (DecimalNum != "") {
	            var decLen = DecimalNum.length;
	            for (var i = 0; i < decLen; i++) {
	                var n = DecimalNum.substr(i, 1);
	                if (n != "0") {
	                    ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
	                }
	            }
	        }
	        if (ChineseStr == "") {
	            ChineseStr += cnNums[0] + cnIntLast + cnInteger;
	        } else {
	            if (DecimalNum == "") {
	                ChineseStr += cnInteger;
	            }
	        }
	        return ChineseStr;
	    };
	
	    return  function(input){
	        var rst = '';
	        rst = changeNumMoneyToChinese(input);
	        return rst;
	    };
	})
	
	.filter('showLineBr', ['$sce',
	    function($sce){
	        return function(input) {
	            input = input || '';
	            return $sce.trustAsHtml(input.replace(/\n/gi, '<br/>').replace(/\r\n/gi, '<br/>'));
	        };
	    }
	]);
})(window, angular);
