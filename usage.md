## **使用说明** ##


### **常用命令：** ###
#### 启动开发服务器： ####
	grunt serve
#### 构建测试环境应用： ####
	grunt build:dev
#### 构建生产环境应用： ####
	grunt build:prod
#### 自动化单元测试： ####
	npm test
#### 升级项目架构： ####
	grunt update:proj
#### 升级森鑫源私有库相关依赖： ####
	grunt update:framework
	
	说明：使用该命令可以升级项目中的森鑫源相关依赖库如webcommon等
#### 升级全部 ####
	grunt update

	说明：升级以前请先做好app/templates/app/styles/main.scss、app/templates/app/styles/partials/_home.scss、app/templates/app/styles/modules/_variables.scss文件的备份。

---

## **系统说明：** ##
* 系统默认登陆用户：admin/123456

 可以在app/scripts/services/login/LoginService.js文件中修改默认登陆用户

* 系统的相关文档可以在http://www.ckwind.com查看
