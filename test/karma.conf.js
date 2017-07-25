/**
 * @author:	rookie
 * @since:	2017-7-11 17:3:11
 */

module.exports = function(config) {
    config.set({
        basePath: '../',
        frameworks: ['jasmine', 'requirejs'],
        files: [
            {pattern: 'bower_components/**/*.js', included: false},
            {pattern: 'node_modules/webcommon/**', included: false},
            {pattern: 'node_modules/ui-grid/**', included: false},
            {pattern: 'app/scripts/*.js', included: false},
            {pattern: 'app/scripts/**/**.js', included: false},
            {pattern: 'app/scripts/http/*.json', included: false},
            {pattern: 'app/views/**/**.js', included: false},
            {pattern: 'test/**/*_spec.js', included: false},
            'test/test-main.js'
        ],
        exclude: [
        ],
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app/**/*.js': ['coverage']
        },
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'coverage', 'spec-as-html', 'kjhtml'],
        specAsHtmlReporter : {
            dir : "dist",              // 测试报告文件路径
            outputFile: "spec.html"    // 测试报告文件名
        },
        coverageReporter: {
            type: 'html',
            dir: 'dist/coverage'
        },
        port: 9876,
        colors: true,
        // 可选值: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        // 开启自动监控
        autoWatch: true,
        // 测试使用的浏览器，可多选
        browsers: [
            // 'Chrome',
            // 'Firefox',
            // 'IE',
            'PhantomJS'
        ],
        singleRun: false,
        concurrency: Infinity
    });
};
