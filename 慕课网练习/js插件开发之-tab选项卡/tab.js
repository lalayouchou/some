$(document).ready(function() {
/*	var tab1= new Tab($(".js-tab").eq(0));*/
/*	Tab.init($('.js-tab'));---2*/
$('.js-tab').tab();//扩展jQuery插件法

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
			//事件切换函数
			_this_.invoke($(this));
			console.log(this);

		});
	}else if(config.triggerType==="mouseover" || config.triggerType!=="click"){
		this.tabItems.on("mouseover", function(){
			_this_.invoke($(this));
			console.log(this);
		});
	}

	//自动切换功能，当配置了时间，我们就根据时间间隔进行自动切换
	if (config.auto) {

		//定义一个全局的定时器
		this.timer = null;
		//计数器,如果传入的不是1-4，则默认为0;
		if (/[1-4]/.test(config.invoke)) {
			this.loop = config.invoke-1;
		}else{
			this.loop = 0;
		}
		

		this.autoPlay();

		this.tab.hover(function() {
			window.clearInterval(_this_.timer);
		}, function() {
			_this_.autoPlay();
		});
	
	}
				//设置初始显示页面
		this.invoke(this.tabItems.eq(this.loop));


	}


	Tab.prototype={

		//自动间隔时间切换
		autoPlay:function(){
			var _this_=this,
			tabItems=this.tabItems,//临时保存tab列表
			tabLength = tabItems.length,//tab的个数
			config = this.config;

			this.timer = window.setInterval(function () {
				_this_.loop++;
				if(_this_.loop>=tabLength){
					_this_.loop = 0;
				}
				tabItems.eq(_this_.loop).trigger(config.triggerType);
			},config.auto);

		},

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
		},


		// 事件驱动函数	
		invoke:function(currentTab) {
			var _this_=this;

			/*要执行Tab的选中状态，当前选中的加上actived(标记为白底)
			切换对应的tab内容，根据配置参数的effect是default还是fade*/
			var index=currentTab.index()
			//tab选中状态
			currentTab.addClass('active').siblings().removeClass();//链式调用
			//切换内容选中区域
			
			var effect=this.config.effect;
			var conItems=this.contentItems;
			if (effect==="default"||effect!=="fade") {

				conItems.eq(index).addClass("active-con").siblings().removeClass("active-con");

			}else if (effect==="fade") {
				conItems.eq(index).fadeIn().siblings().fadeOut();
			}

			// 如果设置了自动切换，记得把当前的loop的值设置为当前tab的index
			if (this.config.auto) {
				this.loop =index;
			}
		}
	}

/*页面中有多个js-tab时，统一使用构造函数--方法一*/
/*	Tab.init=function(tabs){

		tabs.each(function() {
			
			new Tab($(this));

		});
	}--2*/
/*页面中有多个js-tab时，统一使用构造函数--方法二*/
	$.fn.extend({
		tab:function(){
			this.each(function() {
				new Tab($(this));
			});

			return this;
		}
	});
	



	window.Tab = Tab;//在函数外也可以访问到函数内部的方法，变量
})(jQuery);//更具实际项目，可以传，但有的项目万一用了其他的库，
/*$可能也代表其他的变量，jQuery传进去，在闭包函数内，$作为形参就表示jQuery*/