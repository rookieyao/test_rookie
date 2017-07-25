/**
 * @author:	rookie
 * @since:	2017-7-11 17:3:11
 */

'use strict';
require.config({
    baseUrl: '/scripts',
    waitSeconds: 0,
    paths: {
        webcommon: '../../node_modules/webcommon/dist/js/webcommon'
    },
    shim: {},
    packages: []
});

require(['webcommon'], function (webcommon) {
    if (!window) {
        return;
    }

    webcommon.boostrap(bootstrap);

    function bootstrap () {
        var p_rookie = angular.module("p_rookie", ['SXY_WebComponent']);

        p_rookie.run(userStateHandler);
        p_rookie.run(formUtilHandler);

        define('p_rookie', [], function () {
            return p_rookie;
        });

        // 加载导航数据
        var settings = sxy.common.page.settings;
        settings.setNavigators("scripts/http/navigate.json");
        settings.setEnvironment({
            // 系统语言列表
            listOfSupportedLanguages: {
                'en': 'cn.cywz.common.language.en',
                'zh': 'cn.cywz.common.language.cn'
            },
            // 语言包路径
            path: 'i18n/translations.',
            // 用户定义的语言
            userLang: null
        });

        settings.navigatorsChange(function () {
            require(['routes'], function () {
                angular.bootstrap(document, ['p_rookie']);
                // 加载section工具栏
                sxy.handlePortletTools();
            });
        });
    }

    userStateHandler.$inject = ['$rootScope', '$cookieStore', '$state', '$urlRouter', '$location', '$timeout'];
    function userStateHandler ($rootScope, $cookieStore, $state, $urlRouter, $location, $timeout) {
        var loginState = $state.get('login');

        // 页面跳转前，验证用户是否已经登陆
        $rootScope.$on('$stateChangeStart',function (event, toState, toParams, fromState, fromParams) {
            if (toState.name === 'login') {
                document.body.className = 'login';

                return loginState;
            }

            var LoginUser = $cookieStore.get('LoginUser');
            if (!LoginUser) {
                if (toState.name !== 'login') {
                    // 用户未登录，阻止页面跳转
                    event.preventDefault();

                    $timeout(function () {
                        // 页面跳转的两种办法：
                        // $location.path(loginState.url);
                        $state.go(loginState.name);
                    });
                }

                document.body.className = 'login';

                return loginState;
            } else {
                // 如果用户已登陆，则跳转到主页
                /*if (toState.name === 'login') {
                 event.preventDefault();
                 $timeout(function () {
                 $location.path('/main');
                 });
                 }*/
                document.body.className = "page-header-fixed page-sidebar-closed-hide-logo page-content-white ng-scope";
            }
        });
    }

    formUtilHandler.$inject = ['SxyFormUtil'];
    function formUtilHandler(SxyFormUtil) {
        var inline = SxyFormUtil.formItemHandlers.inline;

        SxyFormUtil.formItemHandlers.loginForm = {
            formGroupTemplate: [
                '<label class="control-label visible-ie8 visible-ie9">{0}</label>',
                '<div class="input-icon right">',
                '<i class="fa"></i>',
                '</div>'
            ].join(''),
            formHeaderTemplate: [
                '<div class="form-title">',
                '<span class="form-title"><sxy-i18n i18n-key = "cn.cywz.login.welcome"></sxy-i18n></span>',
                '<span class="form-subtitle"><sxy-i18n i18n-key = "cn.cywz.login.loginMessage"></sxy-i18n></span>',
                '</div>',
                '<div class="alert alert-danger" ng-show="form.scope.$parent.showErrorMsg">',
                '<button class="close" data-close="alert"></button>',
                '<sxy-i18n i18n-key = "cn.cywz.login.errorMsg"></sxy-i18n>',
                '</div>'
            ].join(''),
            beforeFormItemsCreate: function (form) {
                var element = form.element;

                element.removeClass('form-horizontal').addClass('login-form');

                element.find('.form-header').append($(this.formHeaderTemplate));
            },
            buildFormBody: function (element, op, form) {
                // 构建表单元素主体
                var $input = op.$input,
                    label = op.label,
                    $template;

                $template = $(this.formGroupTemplate.format(label));

                $($template[1]).append($input);
                element.append($template);
            },
            validateSuccess: function (formItem) {
                // 校验通过时，在某个表单元素中显示正确消息
                return inline.validateSuccess(formItem);
            },
            validateError: function (formItem, errorMsg) {
                // 校验失败时，在某个表单元素中显示错误消息
                return inline.validateError(formItem, errorMsg);
            },
            clearValidateMessage: function (formItem) {
                // 在表单重置等方法执行时，通过该方法清除表单元素中显示的校验结果
                return inline.clearValidateMessage(formItem);
            }
        };
    }
});
