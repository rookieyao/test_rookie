/**
 * @author:	rookie
 * @since:	2017-7-11 17:3:11
 */

define(['controllers/login/LoginController', 'angular', 'angular-mocks', 'sxy', 'p_rookie'], function() {
    /**************************************************
     *
     * 定义测试套件。测试套件可以嵌套定义
     *
     * 测试套件中：
     *    it:         定义测试用例
     *    beforeEach: 测试用例执行前执行的方法
     *    afterEach:  定义的测试用例执行完毕之后调用的方法
     *
     **************************************************/
    describe('LoginController test', function() {
        var scope, ctrl;

        // 载入demo应用
        beforeEach(module('p_rookie'));

        // 测试用例执行前，实例化作用域对象scope，以及控制器对象ctrl
        beforeEach(inject(['$rootScope', '$controller', function ($rootScope, $controller) {
            scope = $rootScope.$new();
            ctrl = $controller('LoginController', {$scope: scope});
        }]));

        afterEach(function() {
            scope = null;
            ctrl = null;
        });
    });
});
