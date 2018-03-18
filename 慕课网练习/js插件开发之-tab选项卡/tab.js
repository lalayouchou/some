$(document).ready(function() {
	var tab1= new Tab($(".js-tab").eq(0));
});

(function($) {
	
	var Tab=function (tab) {
		var _this_=this;
		//保存单个tab组件
		this.tab =tab;

		//默认配置参数：
	this.config={
		//用来定义鼠标的触发类型
		"triggerType" :"mouseover",
		//用来定义内容切换效果，是直接切换，还是淡入淡出效果
		"effect":"default",
		//默认展示第几个tab
		"invoke":1,
		//用来定义tab是否自动切换，当指定了时间间隔，就自动切换
		"auto":5000
	}
	//如果配置参数存在，就扩展掉默认的配置参数
	if (this.getConfig()) {

		$.extend(this.config,this.getConfig());
		
	};

	//保存tab标签列表，对应的内容列表
	this.tabItems=this.tab.find('ul li');
	this.contentItems=this.tab.find('.content div');
	console.log(this.getConfig());

	//保存配置参数
	var config=this.config;
	//绑定事件，防止事件写错，设置放错机制
	if (config.triggerType==="click") {
		this.tabItems.on(config.triggerType, function(){
			alert('msg');
		});
	}else if(config.triggerType==="mouseover" || config.triggerType!=="click"){
		this.tabItems.on("mouseover", function(){
			alert('小仙女');
		});
	}

	
	};

	Tab.prototype={

		//获取配置参数：
		getConfig:function() {
			//拿一下tab elem节点上的data-config
			var	config=this.tab.attr('data-config');//this.tab.data('config');测试这个不可以使用
			//确保有配置参数
			if (config&&config!="") {	
				return $.parseJSON(config);
			}else{
				return null;
			}
		}
	}

	window.Tab = Tab;
})(jQuery);//更具实际项目，可以传，但有的项目万一用了其他的库，
/*$可能也代表其他的变量，jQuery传进去，在闭包函数内，$作为形参就表示jQuery*/