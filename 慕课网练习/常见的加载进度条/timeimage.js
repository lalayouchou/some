$(function() {
	var img=$('img');//找到img标签
	var num=0;

	img.each(function(i) {//每个img标签执行函数
		var oImg = new Image();

		oImg.onload=function() {

			oImg.onload=null;//防止重复请求

			num++;

			$('.loading b').html(parseInt(num/$("img").size()*100)+"%");
			if(num>=i) {
				$('.loading').fadeOut();
			}
		}

		oImg.src=img[i].src;
	});
});