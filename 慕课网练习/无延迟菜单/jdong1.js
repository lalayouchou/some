$(document).ready(function(){
	var sub=$('#sub');
	var activeRow,
		activeMenu;

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
	})
	.on('mouseenter', "li",function(e) {//在jquery中，mouseenter是通过mouseover实现的，只是模拟类似不冒泡，其实还是可以为特定子元素绑定事件，只不过只能是子元素本身触发事件，而不是孙子元素
		if (!activeRow) {
			activeRow=$(e.target);
			activeRow.addClass('active');
			activeMenu=$('#'+activeRow.data('id'));
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
		$('.sub-content').addClass('none');

})