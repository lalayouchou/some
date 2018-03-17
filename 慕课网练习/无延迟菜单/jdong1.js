$(document).ready(function(){
	var sub=$('#sub');//取得右边子菜单
	var activeRow,
		activeMenu;//定义变量

	$('#test').on('mouseenter',function(e) {//给#test设置mouseenter事件处理程序，显示右边子菜单
		// 用该事件不冒泡，不会因为子元素发生了该事件而触发父元素的事件，因此移动到子菜单中不会触发事件
		sub.removeClass('none');
	})//链式写法
	.on('mouseleave',function(e) {
		sub.addClass('none');
		if(activeRow){//初始化
			activeRow.removeClass('active');
			activeRow=null;
		}
		if (activeMenu) {
			activeMenu.addClass('none');
			activeMenu=null;
		}
	})
	.on('mouseenter', "li",function(e) {//在jquery中，mouseenter是通过mouseover实现的，只是模拟类似不冒泡，其实还是可以为特定子元素绑定事件，只不过只能是子元素本身触发事件，而不是孙子元素
		if (!activeRow) {//如果变量值不存在，第一次移入，添加变量值
			activeRow=$(e.target);
			activeRow.addClass('active');
			activeMenu=$('#'+activeRow.data('id'));//自定义属性的值，data()方法
			activeMenu.removeClass('none');
			return;
		}

		activeRow.removeClass('active');
		activeMenu.addClass('none');

		activeRow=$(e.target);
		activeRow.addClass('active');
		activeMenu=$('#'+activeRow.data('id'));
		activeMenu.removeClass('none');
	});
		$('.sub-content').addClass('none');//给所有子菜单添加none类

})