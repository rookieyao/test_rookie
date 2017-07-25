/**
 * @author:	rookie
 * @since:	2017-7-11 17:3:11
 */

'use strict';
define(['p_rookie'], function(p_rookie) {

  p_rookie.controller('NavController', ["$scope", function(scope) {
    scope.menuOp = {
      showSearchBar: true
    };
  }]);
});
