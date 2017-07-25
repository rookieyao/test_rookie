/**
 * Created by Administrator on 2017/7/17.
 */
'use strict';
define(['p_rookie', 'jquery', 'services/UserService'], function(webComponent, $) {
  var userNameReg = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/,
    userPwdReg = /^[\w]{6,32}$/,
    postAddrReg = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/,
    telphoneReg = /^1[3578]\d{9}$/;

  $.validator.addMethod('userAccountValidate', function (value, element, param) {
    return userNameReg.test(value);
  }, '用户名填写不正确！');

  $.validator.addMethod('userPasswordValidate', function (value, element, param) {
    return userPwdReg.test(value);
  }, '密码填写不正确！');

  $.validator.addMethod('userPostboxValidate', function (value, element, param) {
    return postAddrReg.test(value);
  }, '请输入正确的邮箱！');

  $.validator.addMethod('telPhoneValidate', function (value, element, param) {
    return telphoneReg.test(value);
  }, '请输入正确的手机号码！');

  webComponent.controller('UserController', ['$scope', 'UserService', function($scope, UserService) {
    $scope.userOP = {
      originData: {},
      layout: 1,
      handler: 'inline',
      fields: [{
        name: 'name',
        label: '姓名',
        rules: {
          required: true
        }
      }, {
        name: 'account',
        label: '账号',
        rules: {
          required: true,
          userAccountValidate: true
        }
      }, {
        name: 'password',
        label: '密码',
        rules: {
          required: true,
          userPasswordValidate: true
        }
      }, {
        name: 'gender',
        label: '性别',
        template: '<sxy-radio initial-data = \'{"男" : 1, "女" : 0}\'></sxy-radio>',
        rules: {
          required: true
        }
      }, {
        name: 'homeAddress',
        label: '家庭住址',
        rules: {
          required: true
        }
      }, {
        name: 'bornDate',
        label: '生日',
        template: '<sxy-datepicker format = "yyyy-MM-dd" today-btn = "true"></sxy-datepicker>',
        rules: {
          required: true
        }
      }, {
        name: 'postbox',
        label: '联系邮箱',
        rules: {
          required: true,
          userPostboxValidate: true
        }
      }, {
        name: 'telPhone',
        label: '联系电话',
        rules: {
          required: true,
          telPhoneValidate: true
        }
      }],
      registerApi: function (formApi) {
        // formApi中的form对象，以及form中的formItem对象相关方法参考相关API文档。
        $scope.formApi = formApi;
      }
    };

    $scope.saveUser = function () {
      if ($scope.formApi.form.validate()) {
        var data = $scope.formApi.form.getData();
        UserService.addNewUser(data, function () {
          $scope.$closeDialog();
        });
      }
    };
  }]);
});
