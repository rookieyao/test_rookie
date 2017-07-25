/**
 * @author:	rookie
 * @since:	2017-7-11 17:3:11
 */

'use strict';
define(['p_rookie', 'services/login/LoginService'], function(p_rookie) {
    var userNameReg = /^[a-zA-Z][a-zA-Z0-9]{3,8}$/,
        upwdNameReg = /^[\w]{5,15}$/;
    jQuery.validator.addMethod('unameValidate', function (value, element, param) {
        return userNameReg.test(value);
    }, '用户名填写不正确！');

    jQuery.validator.addMethod('upwdValidate', function (value, element, param) {
        return upwdNameReg.test(value);
    }, '密码填写不正确！');

    p_rookie.controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$scope', 'LoginService', '$location', '$cookieStore', '$timeout'];
    function LoginController ($rootScope, $scope, LoginService, $location, $cookieStore, $timeout) {
        $scope.loginFormOp = {
            layout: '',
            handler: 'loginForm',
            fields: [{
                name: 'uname',
                label: '用户名',
                template: '<input type="text" sxy-shortcut="alt+n" />',
                rules: {
                    required: true,
                    unameValidate: true
                }
            }, {
                name: 'upwd',
                label: '密码',
                template: '<input type="password" sxy-shortcut="alt+p" />',
                rules: {
                    required: true,
                    upwdValidate: true
                }
            }],
            registerApi: function (formApi) {
                $scope.formApi = formApi;
            }
        };

        $scope.changeRememberMe = function (e) {
            $scope.rememberMe = sxy.util.EventUtil.getTarget(e).checked;
        };

        $scope.doLogin = function () {
            if ($scope.formApi.form.validate()) {
                var data = $scope.formApi.form.getData();
                LoginService.login(data.uname, data.upwd, function (user) {
                    if (user) {
                        $cookieStore.put('LoginUser', user);
                        $rootScope.userName = user.name;
                        $location.path('/main');
                    } else {
                        sxy.angular.safeApply(function () {
                            $scope.showErrorMsg = true;
                            // 自动删除登陆失败信息
                            /*$timeout(function () {
                                $scope.showErrorMsg = false;
                            }, 4000);*/
                        });
                    }
                });
            }
        };

        $timeout(function () {
            $scope.showLogin = true;
        });
    }
});
