/**
 * @author:	rookie
 * @since:	2017-7-11 17:3:11
 */

'use strict';
define([], function() {
  var p_rookie = angular.module('p_rookie'),
      dependencyResolverFor = sxy.dependencyResolverFor;

  p_rookie.config([
        '$stateProvider',
        '$urlRouterProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider,
                 $filterProvider, $provide) {
          p_rookie.controller = $controllerProvider.register;
          p_rookie.directive = $compileProvider.directive;
          p_rookie.filter = $filterProvider.register;
          p_rookie.factory = $provide.factory;
          p_rookie.service = $provide.service;
          // $locationProvider.html5Mode(true);

          $stateProvider.state('login', {
              url:'/login',
              templateUrl: '/views/login/login.html',
              resolve: dependencyResolverFor(['controllers/login/LoginController']),
              controller: 'LoginController'
          }).state("index", {
            url:'',
            // controller: 'IndexController',
            views: {
              '': {
                templateUrl: '/views/index.html',
                resolve: dependencyResolverFor(['controllers/HomeCtrl']),
                controller: 'HomeCtrl'
              },
              'left@index': {
                templateUrl: '/views/left.html',
                resolve: dependencyResolverFor(['controllers/NavController']),
                controller: 'NavController'
              },
              'header@index': {
                templateUrl: '/views/header.html'
              },
              'footer@index': {
                templateUrl: '/views/footer.html'
              }
            }
          }).state("index.main", {
              url:'/main',
              templateUrl: '/views/main/main.html'
          }).state("index.grid",{
              url:'/grid',
              templateUrl:'/views/main/grid.html',
              resolve: dependencyResolverFor(['controllers/GridController']),
              controller: 'GridController'
          }).state("index.test",{
            url:'/test',
            templateUrl:'/views/test/test.html',
            resolve: dependencyResolverFor(['controllers/test/TestController']),
            controller: 'TestController'
          });

          var home = sxy.common.page.settings.getHomeNav(),
              homeIdx = "";
          if (home) {
            homeIdx += home.node.href.replace(".", "/");
          }
          // 默认去首页      $urlRouterProvider.otherwise(homeIdx);

        }
  ]);
});
