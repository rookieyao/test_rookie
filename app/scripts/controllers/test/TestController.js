/**
 * Created by Administrator on 2017/7/19.
 */

define(['p_rookie'],function (p_rookie) {
  p_rookie.controller('TestController',TestController);
  p_rookie.inject =['$scope'];
  function  TestController($scope) {
    $scope.searchForm={
      originData:{},
      layout:3,
      handler:'inline',
      fields:[{
        name:'account',
        label:'账号'
      },{
        name:'gender',
        label:'性别',
        template:'<sxy-radio initial-data=\'{"男":1,"女":0}\'></sxy-radio>'
      },{
        name:'homeAddress',
        label:'家庭住址'
      },{
        name:'borndateRange',
        label:'生日',
        template:'<sxy-daterangepicker start-date = "1900-1-1" format = "yyyy-MM-dd" today-btn = "true" ng-model = "date3" start = "startBornDate" end = "endBornDate"></sxy-daterangepicker>'
      }],
      registerApi:function (formApi) {
        $scope.searchFormApi=formApi;
      }
    };
  }
});
