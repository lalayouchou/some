//图片预加载
(function($) {

	function preLoad(imgs,options){

		this.imgs=(typeof imgs ==='string') ? [imgs] : imgs;
		this.opts =$.extend({},preLoad.DEFAULTS,options);//this.DEFAULTS.extend(options);
		if (this.opts.order === "ordered") {
			this._oredered();
		}else {
			this._unoredered();//加上 下划线_表明方法只在函数内部使用，而不提供外部调用
		}

	}
	preLoad.prototype._oredered = function() {
		var imgs =this.imgs,
		opts=this.opts,
		len=imgs.length,
		i=0;
		function load() {
			var imgobj=new Image();

			$(imgobj).on('load error', function(event) {

				if (count>=len-1) {
					if (opts.all) {opts.all();}//otps.all&&opts.all();
				}else {
					load();//调用自身,实现有序加载
				}
				i++;
				
			});
			imgobj.src=imgs[i];
		}
		load();
	};
	preLoad.prototype._unoredered = function() {//无序加载
		var imgs =this.imgs,
		opts=this.opts,
		count=0;
		$.each(imgs, function(index, val) {
			if(typeof val !== "string"){return;}

			var imgobj =$('<img/>');//var imgobj=new Image();//var imgobj=document.createElement("img");

			imgobj.on('load', function(event) {//$(imgobj).on('load', function(event) {
				if(opts.each){opts.each(count);}
				if (count>=len-1) {
					if (opts.all) {opts.all();}

				}
				count++;
				
			});

			imgobj.get(0).src=val;//imgobj.src=val;
			//只要给定了src值，图片就开始加载，事件函数一定要写在这条语句之前，详情见高程三
		});

	};
	preLoad.DEFAULTS ={
			order:"unoredered",//默认是无序加载
			each:null,//每张图片加载的时候执行
			all:null//所有图片加载完毕后执行
		};

	$.extend({
		preload:function(imgs,opts){
			new preLoad(imgs,opts);
		}
	});//工具方法，直接绑定到jQuery上，前面不用选择节点
	// 一般方法，要选择节点使用，有两种插件绑定方法：
/*	$.fn.prelond=function(imgs,opts){
			new preLoad(imgs,opts);
			return this;//链式调用
		};
	$.fn.extend({prelond:function(imgs,opts){
			new preLoad(imgs,opts);
			return this;//链式调用
		}});*/
	window.preLoad=preLoad;
})(jQuery);

/*有序加载：
var i=0;
function load() {
	var imgobj=new Image();

	$(imgobj).on('load error', function(event) {

		if (count>=len-1) {
			$('.loading').hide();
		}else {
			load();//调用自身,实现有序加载
		}
		i++;
		
	});
	imgobj.src=imgs[i];
}
load();
*/