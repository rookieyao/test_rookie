/**
 * @author:	rookie
 * @since:	2017-7-11 17:3:11
 */

"use strict";

var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// 加载所有的测试脚本，去掉其中的base路径/base/app/scripts
Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        normalizedTestModule = file.replace(/^\/app\/|\.js$/g, '');
        normalizedTestModule = file.replace(/^\/scripts\/|\.js$/g, '');
        allTestFiles.push(normalizedTestModule);
    }
});

// require.js配置
require.config({
    // 由于karma启动的测试服务器，默认根目录为/base，故此处设置根目录为/base/app/scripts
    baseUrl: '/base/app/scripts',

    paths:{
        "i18nLoader": "../../node_modules/webcommon/src/js/i18nLoader",
        "dependencyResolverFor": "../../node_modules/webcommon/src/js/dependencyResolverFor",
        'jquery': '../../bower_components/jquery/dist/jquery',
        "jquery.validate": "../../bower_components/jquery-validation/dist/jquery.validate",
        'LOGGER': '../../node_modules/webcommon/src/js/LOGGER',
        'Util': '../../node_modules/webcommon/src/js/Util',
        'AOP': '../../node_modules/webcommon/src/js/AOP',
        'sxy':'../../node_modules/webcommon/src/js/sxy',
        'defineClass': '../../node_modules/webcommon/src/js/defineClass',
        "bootstrap": "../../bower_components/bootstrap/dist/js/bootstrap",
        'navigate':'http/navigate.json',
        'angular': '../../bower_components/angular/angular',
        "angular-translate": "../../bower_components/angular-translate/angular-translate",
        "angular-cookies": "../../bower_components/angular-cookies/angular-cookies",
        'angular-mocks': '../../bower_components/angular-mocks/angular-mocks',
        "angular-ui-router": "../../bower_components/angular-ui-router/release/angular-ui-router",
        "ui-grid": "../../node_modules/ui-grid/ui-grid",
        "SXY_WebComponent": "../../node_modules/webcommon/src/js/SXY_WebComponent"
    },
    shim:{
        angular: {
            deps: [
                'jquery'
            ]
        },
        Util: {
            deps: [
                'LOGGER',
                'jquery'
            ]
        },
        AOP: {
            deps: [
                'LOGGER',
                'jquery'
            ]
        },
        defineClass: {
            deps: [
                'LOGGER',
                'jquery',
                'Util'
            ]
        },
        sxy: {
            deps: [
                'LOGGER',
                'Util',
                'AOP',
                'defineClass',
                'jquery'
            ]
        },
        'angular-ui-router': {
            deps: [
                'angular'
            ]
        },
        bootstrap: {
            deps: [
                'jquery'
            ],
            exports: 'Bootstrap'
        },
        'jquery.validate': {
            deps: [
                'jquery'
            ]
        },
        'angular-mocks': {
            deps: [
                'angular'
            ],
            exports: 'angular.mock'
        },
        'angular-translate': {
            deps: [
                'angular'
            ]
        },
        'angular-cookies': {
            deps: [
                'angular'
            ]
        },
        'ui-grid': {
            deps: [
                'angular'
            ]
        },
        SXY_WebComponent: {
            deps: [
                'jquery.validate',
                'angular',
                'angular-cookies',
                "ui-grid",
                "i18nLoader",
                "angular-ui-router",
                "bootstrap",
                "angular-translate",
                "sxy"
            ]
        }
    },

    deps: allTestFiles
    // 自动加载测试
    /*,callback: window.__karma__.start*/
});

// 配置环境变量
var Environment = {
    // 设置国际化资源文件路径
    langPath: 'i18n'
};

// 创建sxy_component_demo模块，启动web项目
define('p_rookie', ['jquery', 'sxy', 'angular', 'SXY_WebComponent'], function () {
    // 可以使用完整uri加载导航模块
    // sxy.common.page.settings.setNavigators("http://localhost:9876/base/app/scripts/http/navigate.json");
    sxy.common.page.settings.setNavigators("base/app/scripts/http/navigate.json");

    sxy.common.page.settings.setEnvironment({
        // 系统语言列表
        listOfSupportedLanguages: {
            'en': 'cn.cywz.common.language.en',
            'zh': 'cn.cywz.common.language.cn'
        },
        // 语言包路径
        path: 'i18n',
        // 用户定义的语言
        userLang: null
    });

    angular.module('p_rookie', ['SXY_WebComponent']);

    sxy.common.page.settings.navigatorsChange(function () {
        angular.bootstrap(document, ['p_rookie']);
        // 加载section工具栏
        sxy.handlePortletTools();
        // 页面加载成功，启动测试
        window.__karma__.start();
    });

    return angular.module('p_rookie');
});
