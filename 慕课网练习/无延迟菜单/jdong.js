$(document).ready(function(){
	var sub=$('#sub');
	var activeRow,
		activeMenu;

	var timer;
	var mouseInsub=false;
	sub.on('mouseenter', function(event) {
		mouseInsub=true;
	}).on('mouseleave', function(event) {
		mouseInsub=false;
	});

	var mouseTrack= [];
	var moveHandler =function (e) {
		mouseTrack.push({
			x:e.pageX,
			y:e.pageY
		});
		if (mouseTrack.length>3) {
			mouseTrack.shift();
		}
	}


	$('#test').on('mouseenter',function(e) {
		sub.removeClass('none');

		$(document).on('mousemove',moveHandler);
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
		$(document).off("mousemove");
	})/*;
	$('#test li').on('mouseenter',function(e) {*///ÔÚjqueryÖÐ£¬mouseenterÊÇÍ¨¹ýmouseoverÊµÏÖµÄ£¬Ö»ÊÇÄ£ÄâÀàËÆ²»Ã°ÅÝ£¬ÆäÊµ»¹ÊÇ¿ÉÒÔÎªÌØ¶¨×ÓÔªËØ°ó¶¨ÊÂ¼þ£¬Ö»²»¹ýÖ»ÄÜÊÇ×ÓÔªËØ±¾Éí´¥·¢ÊÂ¼þ£¬¶ø²»ÊÇËï×ÓÔªËØ
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
					}

					var currMousepos = mouseTrack[mouseTrack.length-1];
					var leftCorner = mouseTrack[mouseTrack.length-2];

					var delay = needDelay(sub,leftCorner,currMousepos);
					
					if (delay) {
					timer=setTimeout(function() {
						if(mouseInsub===true){
							return;
						}
						

						activeRow.removeClass('active');
						activeMenu.addClass('none');

						activeRow=$(e.target);
						activeRow.addClass('active');
						activeMenu=$('#'+activeRow.data('id'));
						activeMenu.removeClass('none');
						timer = null;
						console.log("yes");
					},300);	
				}else{
					activeRow.removeClass('active');
					activeMenu.addClass('none');

					activeRow=$(e.target);
					activeRow.addClass('active');
					activeMenu=$('#'+activeRow.data('id'));
					activeMenu.removeClass('none');
					console.log("no");
				}




				});
				
			}
			

		$('.sub-content').addClass('none');

});