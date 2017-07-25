/**
 * Created by Administrator on 2017/7/17.
 */

define(['p_rookie','services/UserService'],function (p_rookie) {

  p_rookie.controller('GridController',GridController);
  GridController.$inject = ['$scope','UserService'];
  function GridController ($scope,UserService) {
    var DataSource = sxy.common.DataSource,
      DataSourceVO = sxy.common.DataSourceVO,
      HEADERS = DataSourceVO.HEADERS;

    $scope.searchForm = {
      originData: {},
      layout: 3,
      handler: 'inline',
      fields: [{
        name: 'account',
        label: '账号'
      }, {
        name: 'gender',
        label: '性别',
        template: '<sxy-radio initial-data = \'{"男" : 1, "女" : 0}\'></sxy-radio>'
      }, {
        name: 'homeAddress',
        label: '家庭住址'
      }, {
        name: 'borndateRange',
        label: '生日',
        template: '<sxy-daterangepicker start-date = "1900-1-1" format = "yyyy-MM-dd" today-btn = "true" ng-model = "date3" start = "startBornDate" end = "endBornDate"></sxy-daterangepicker>'
      }],
      registerApi: function (formApi) {
        $scope.searchFormApi = formApi;
      }
    };

    var
      // 数据源
      _ds2 = new DataSource(),
      // 分页查询接口
      _pagingVO = new DataSourceVO();

    _pagingVO.type = 'POST';
    _pagingVO.url = UserService.getUsersByPageUrl;
    _pagingVO.dataType = 'json';
    _pagingVO.headers = HEADERS.JSON;

    _pagingVO.setData = function (ds, data) {
      // 获取表单数据
      var _formData = $scope.searchFormApi ? $scope.searchFormApi.form.getData() : null;

      // 保证表单数据不为null
      _formData = _formData || {};

      // 修改borndateRange对象(如果已选择)为接口可使用的属性
      if (_formData.borndateRange) {
        _formData.startBornDate = _formData.borndateRange.startBornDate;
        _formData.endBornDate = _formData.borndateRange.endBornDate;
        delete _formData.borndateRange;
      }

      // 获取当前分页数据
      var pageInfo = $.extend({}, ds._pageInfo);

      _formData.page = pageInfo;
      // 服务器中的页编号为0开始，前端组件编号从1开始
      _formData.page.current--;

      this.data = JSON.stringify(_formData);
    };

// 配置数据转换接口，转换后台返回的数据为组件可使用的数据
    _pagingVO.dataConvert = function (ds, data) {

      // 设置总页数
      ds._pageInfo.totalCount = data.pageVO.totalCount;
      // 设置当前页数据
      ds._data = data.items;
    };

// 配置分页接口到数据源
    _ds2._paging = _pagingVO;

// ui-grid配置
    var remoteGrid = {
      columnDefs: [
        {
          field: 'name',
          displayName: '名字',
          width: '10%',
          enableColumnMenu: false,
          enableHiding: false,
          suppressRemoveSort: true,
          rules: {
            required: true
          },
          enableCellEdit: true
        }, {
          field: 'account',
          displayName: '账号',
          width: '10%',
          enableColumnMenu: false,
          enableHiding: false,
          suppressRemoveSort: true,
          rules: {
            required: true
          },
          enableCellEdit: true
        }, {
          field: 'password',
          displayName: '密码',
          width: '10%',
          enableColumnMenu: false,
          enableHiding: false,
          suppressRemoveSort: true,
          rules: {
            required: true
          },
          enableCellEdit: true
        }, {
          field: 'homeAddress',
          displayName: '联系地址',
          width: '15%',
          enableColumnMenu: false,
          enableHiding: false,
          suppressRemoveSort: true,
          rules: {
            required: true
          },
          enableCellEdit: true
        }, {
          field: 'gender',
          displayName: '性别',
          cellTemplate: '<div ng-bind="row.entity.gender == 1 ? \'男\' : \'女\'"></div>',
          cellEditTemplate: '<sxy-radio initial-data = \'{"男" : 1, "女" : 0}\'></sxy-radio>',
          width: '10%',
          enableColumnMenu: false,
          enableHiding: false,
          suppressRemoveSort: true,
          rules: {
            required: true
          },
          enableCellEdit: true
        }, {
          field: 'bornDate',
          cellTemplate: '<div ng-bind="row.entity.bornDate | date:\'yyyy-MM-dd\'"></div>',
          cellEditTemplate: '<sxy-datepicker format = "yyyy-MM-dd" today-btn = "true"></sxy-datepicker>',
          displayName: '出生年月日',
          width: '10%',
          enableColumnMenu: false,
          enableHiding: false,
          suppressRemoveSort: true,
          rules: {
            required: true
          },
          enableCellEdit: true
        }, {
          field: 'postbox',
          displayName: '联系邮箱',
          width: '12%',
          enableColumnMenu: false,
          enableHiding: false,
          suppressRemoveSort: true,
          rules: {
            required: true
          },
          enableCellEdit: true
        }, {
          field: 'telPhone',
          displayName: '联系电话',
          width: '10%',
          enableColumnMenu: false,
          enableHiding: false,
          suppressRemoveSort: true,
          rules: {
            required: true
          },
          enableCellEdit: true
        }, {
          field: 'option',
          displayName: '操作',
          cellTemplate: [
            '<div class="btn-group">',
            '<a ng-click="grid.appScope.$parent.updateUser(grid, row, col)" class="btn btn-success" ng-disabled = "!row.$$dirty"><i class="fa fa-check"></i>保存</a>',
            '<a ng-click="grid.appScope.$parent.deleteUser(grid, row, col)" class="btn btn-danger"><i class="fa fa-close"></i>删除</a>',
            '</div>'
          ].join('')
        }
      ],
      paginationPageSizes: [5, 10, 15, 20],
      onRegisterApi: function (gridApi) {
        $scope.remoteGrid = gridApi;
      }
    };

// sxy-grid组件配置
    $scope.remoteGridOP = {
      ds: _ds2,
      enableEdite: true,
      uiGrid: remoteGrid
    };

// 新增用户
    $scope.addNewUser = function () {
      sxy.common.modal({
        url: 'views/main/addNewUser.html',
        title: '添加新用户',
        controller: 'UserController',
        paths: {
          UserController: 'controllers/UserController'
        },
        buttons: [
          {
            text: '新增',
            class: 'btn-success',
            fn:'saveUser()'
          }
        ],
        close: function () {
          // 新增用户成功，关闭模态窗口
          $scope.remoteGrid.reload();
        }
      });
    };

// 行内删除按钮删除用户
    $scope.deleteUser = function (grid, row, col) {
      var id = row.entity.id;
      sxy.common.messageBox("提示", "请问是否确认删除？", sxy.common.messageBox.type.error, true, function (choose) {
        if (choose === 'success') {
          UserService.delete(id, function (rs) {
            if (rs.success) {
              $scope.remoteGrid.reload();
            }
          });
        }
      });
    };

// 行内保存按钮更新用户

    $scope.updateUser = function (grid, row, col) {
      if (row.valid()) {
        var data = $.extend({}, row.entity);
        delete data.$$hashKey;
        UserService.update(data, function (rs) {
          if (rs.success) {
            $scope.remoteGrid.reload();
          }
        });
      }
    };

// 点击表格上面的删除按钮批量删除
    $scope.batchDelete = function () {
      // 获取当前选择的全部数据
      var selectedDataList = $scope.remoteGrid.grid.getSelectedData();
      if (!selectedDataList || !selectedDataList.length) {
        return;
      }

      // 询问是否确认删除
      sxy.common.messageBox("提示", "请问是否确认删除？", sxy.common.messageBox.type.error, true, function (choose) {
        if (choose === 'success') {
          var deleteUsers = [];
          // 获取待删除的全部用户的ID存放到集合中
          for (var i = 0, len = selectedDataList.length; i < len; i++) {
            deleteUsers.push(selectedDataList[i].id);
          }

          // 调用批量删除接口
          UserService.batchDelete(deleteUsers, function () {
            // 删除成功，弹窗显示删除成功
            sxy.common.alert({
              container: $scope.remoteGrid.grid.element,
              type: 'success',
              place: 'prepend',
              message: '删除成功',
              focus: false,
              closeInSeconds: 3,
              icon: 'fa fa-smile-o'
            });
            $scope.remoteGrid.reload();
          });
        }
      });
    };
  }
});
