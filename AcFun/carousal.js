(function() {

function carousel(data) {
	// 保存this
	var _this_=$(this);
	this.config={
		alt:[]//默认不存在
	};
	if(data&&data.imgs.length===data.herf.length&&data.herf.length===data.b.length){
		$.extend(this.config,data);
	}else{alert("数据错误");}

	// 合并对象
	// 根据数据创建HTML结构
	this.addcarousel();





	}




carousel.prototype={
	addcarousel:function () {
		var config=this.config;
		var div=$('div.carousel');
		var ul=$("<ul class='clearfix' ></ul>");
		var lis=[];//把节点结构存在数组中

		for (var i = config.imgs.length - 1; i >= 0; i--) {
			var alts=config.alt[i];
			if(!alts){
				alts="";
			}
			var liHtml="<li><a href="+config.herf[i]+"><img src="+val+" alt="+alts+"><span><b>"+config.b[i]"</b></span></a></li>";
			ul.append(liHtml);
		}
		div.append(ul);
		}
	}

}


 window.carousel=carousel;
})()