/**
 * Created by Administrator on 2017/7/17.
 */
'use strict';
define(['p_rookie'], function(p_rookie) {
  var http = sxy.common.http,
    DataSourceVO = sxy.common.DataSourceVO,
    HEADERS = DataSourceVO.HEADERS;

  var urls = {
    getUsersByPage: 'http://192.168.3.21:8080/main/getUsersByPage'
    // // getUsersByPage: 'http://www.mefd.cn/curd/rest/user/getUsersByPage',
    // create: 'http://www.mefd.cn/curd/rest/user/create',
    // update: 'http://www.mefd.cn/curd/rest/user/update',
    // delete: 'http://www.mefd.cn/curd/rest/user/delete?id={0}'
  };

  p_rookie.service('UserService', UserService);

  // 根据用户ID获取删除该用户的DataSourceVO
  function getDeleteDataSourceVO(id) {
    var vo = new DataSourceVO();

    vo.type = 'POST';
    vo.url = urls.delete.format(id);
    vo.dataType = 'json';
    vo.headers = HEADERS.JSON;

    return vo;
  }

  function UserService () {
    return {
      addNewUser: function (user, cb) {
        http.postApplicationJson(urls.create, user, cb);
      },
      update: function (user, cb) {
        http.postApplicationJson(urls.update, user, cb);
      },
      delete: function (id, cb) {
        http.postApplicationJson(urls.delete.format(id), null, cb);
      },
      batchDelete: function (userIdList, cb) {
        var deleteVOList = [];
        for (var i = 0, len = userIdList.length; i < len; i++) {
          deleteVOList.push(getDeleteDataSourceVO(userIdList[i]));
        }
        deleteVOList.push(cb);
        http.batchAjax.apply(http, deleteVOList);
      },
      getUsersByPageUrl: urls.getUsersByPage
    };
  }
});
