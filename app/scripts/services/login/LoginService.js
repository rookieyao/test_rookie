/**
 * @author:	rookie
 * @since:	2017-7-11 17:3:11
 */

'use strict';
define(['p_rookie'], function(p_rookie) {
    var http = sxy.common.http;

    var users = [{
        id: 1,
        name: '系统管理员',
        uname: 'admin',
        upwd: '123456'
    }];

    p_rookie.service('LoginService', LoginService);

    function LoginService () {
        return {
            login: login
        };
    }

    function login (uname, upwd, callback) {
        var u = null;

        for (var i = 0, len = users.length; i < len; i++) {
            var user = users[i];
            if ((user.uname === uname) && (user.upwd === upwd)) {
                u = user;
                break;
            }
        }

        callback && callback(u);
    }

    LoginService.$inject = [];
});
