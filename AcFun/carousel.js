(function($) {

function carousel(data) {
	// 保存this
	var _this_=this;
	this.config={
		alt:[]//默认不存在
	};
	// 合并对象
	if(data&&data.imgs.length===data.herf.length&&data.herf.length===data.b.length){
		$.extend(this.config,data);
	}else{alert("数据错误");}

	this.index=0;
	// 定时器开关
	this.on=true;
	// 根据数据创建HTML结构
	this.addcarousel();
	// 自动轮播动画
	this.anim();

	// 添加事件，小按钮的点击事件，窗口的移入移出事件，鼠标在窗口内部，停止轮播，鼠标在窗口外部，继续从当前位置开始轮播
	var A=null;//这里A一定要设置在外面，不然if语句判断的时候A还未定义
	// 这里A在构造函数执行的时候，事件处理程序中有了A的引用，所以每次执行的时候，可以调用A，实际事件本身的作用域是和绑定的元素有关系
	$('div.carousel').on('mouseenter', function(event) {
		_this_.on=false;
	});

	$('div.carousel').on('mouseleave', function(event) {
		// 防抖技术，如果列表中还有定时器，则去除，保留最后一个

		if(A){
			clearTimeout(A);
			console.log(this);//这里的this指的是$('div.carousel')
		}

		A=setTimeout(function(){
				_this_.on=true;
				_this_.anim();
				console.log(this);//windows
			A=null;	
				},3000);

	});

	$('div.carousel-nav').on('click', function(event) {
		if(event.target.nodeName.toLowerCase()==="span"){
			if(A){
				clearTimeout(A);
				console.log(this);//这里的this指的是$('div.carousel')
			}

			A=setTimeout(function(){
				_this_.index=$(event.target).index();//获取点击的具体节点
				_this_.on=true;//开启开关，这里因为触发了mouseenter事件，默认是关闭的；
				_this_.anim();
				_this_.on=false;//这里执行完点击事件后，就把动画函数给关闭，只执行一次
				A=null;	
					},300);//太低执行不过来，300比较合适

		}
	});


	}




carousel.prototype={
	addcarousel:function () {
		var config=this.config;
		var div=$('div.carousel');
		var divNav=$('div.carousel-nav');
		var ul=$("<ul class='clearfix' ></ul>");
		var lis=[];//把节点结构存在数组中
		// 创建结构
		for (var i = 0 ; i<=config.imgs.length - 1; i++) {
			// 判断alt的值，没有值就取一个默认值
			var alts=config.alt[i];
			if(!alts){
				alts="' '";
			}

			var liHtml="<li><a href="+config.herf[i]+"><img src="+config.imgs[i]+" alt="+alts+"><span><b>"+config.b[i]+"</b></span></a></li>";
			ul.append(liHtml);
			var spanHtml='<span>'+i +'</span>';
			divNav.append(spanHtml);
		}
		div.append(ul);
	},

	anim:function () {
		var config=this.config;
		var _this_=this;
		var div=$('div.carousel');
		var span=$('div.carousel-nav span');

		function animate(on){//事件执行开关
			if(!on){
				clearTimeout(setTimeout(function(){animate(_this_.on);},3000));
				return ;}
			// 小组件按钮轮播：
			if(_this_.index>=config.imgs.length){_this_.index=0;}
			span.removeClass('active');
			$(span[_this_.index]).addClass('active');

			// 获取相对的节点
			var li=div.find('ul');
			var L=(-508*_this_.index)+"px";
			$(li).animate({marginLeft:L}, 1000);//这里要用大写
			// 调用自身
			_this_.index++;
			setTimeout(function(){animate(_this_.on);},3000);
		}
		animate(_this_.on);
	},

};


 window.carousel=carousel;
})(jQuery);