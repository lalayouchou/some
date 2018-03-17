$(document).ready(function(){
	var sub=$('#sub');
	var activeRow,
		activeMenu;

	var timer;
	var mouseInsub=false;//添加开关
	sub.on('mouseenter', function(event) {
		mouseInsub=true;//如果移入sub菜单，打开开关，移出关闭
	}).on('mouseleave', function(event) {
		mouseInsub=false;
	});

	$('#test').on('mouseenter',function(e) {
		sub.removeClass('none');
	})
	.on('mouseleave',function(e) {
		sub.addClass('none');
		if(activeRow){
			activeRow.removeClass('active');
			activeRow=null;
		}
		if (activeMenu) {
			activeMenu.addClass('none');
			activeMenu=null;
		}
	})/*;
	$('#test li').on('mouseenter',function(e) {*///在jquery中，mouseenter是通过mouseover实现的，只是模拟类似不冒泡，其实还是可以为特定子元素绑定事件，只不过只能是子元素本身触发事件，而不是孙子元素
	// .on("mouseenter",'li',function(e) {
	var lis=document.getElementsByTagName('li');
	for (var i = 0; i < lis.length; i++) {
			lis[i].addEventListener('mouseenter', function(e) {

					if (!activeRow) {
						activeRow=$(e.target);
						activeRow.addClass('active');
						activeMenu=$('#'+activeRow.data('id'));
						activeMenu.removeClass('none');
						return;
					}

					if (timer) {
						clearTimeout(timer);
					}//防抖技术，如果列表中有没有执行的计时器，则清除掉

					timer=setTimeout(function() {
						if(mouseInsub===true){
							return;/*如果鼠标在sub子菜单中，则不进行操作*/
						}
						

						activeRow.removeClass('active');
						activeMenu.addClass('none');

						activeRow=$(e.target);
						activeRow.addClass('active');
						activeMenu=$('#'+activeRow.data('id'));
						activeMenu.removeClass('none');
						timer = null;//每次执行以后，都设置为空对象
					},300);


				});
				
			}
			

		$('.sub-content').addClass('none');

});