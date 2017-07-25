/**
 * @author:	rookie
 * @since:	2017-7-11 17:3:11
 */

define(['services/login/LoginService', 'angular', 'angular-mocks', 'sxy', 'p_rookie'], function() {
    describe('LoginService test', function() {
        var service;

        beforeEach(module('p_rookie'));

        // 测试用例执行前，通过inject获取UserService服务
        beforeEach(inject(['LoginService', function (LoginService) {
            service = LoginService;
        }]));

        afterEach(function() {
            service = null;
        });

        it('用户登录校验', function(){
            service.login('admin', '123456', function (user) {
                expect(user).toBeDefined();
            });
        });
    });
});
