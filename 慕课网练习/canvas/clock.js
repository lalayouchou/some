var dom = document.getElementById('clock');
var ctx = dom.getContext('2d');//调用2d上下文
var width= ctx.canvas.width;/*获取宽高*/
var height=ctx.canvas.height;
var r=width/2;//设置半径
var rem=width/200;//比例，按200绘制，放大到600px,即有数值放大

function drawBackground() {
	ctx.save();//保存之前设置，即默认设置

	ctx.translate(r,r);//移动原点
	ctx.lineWidth=5*rem;//设置线宽
	ctx.beginPath();//开始绘制路径
	ctx.arc(0,0,r-5*rem,0 ,2*Math.PI,false);//画圆
	ctx.stroke();//描边方法

	var hourNumbers =[3,4,5,6,7,8,9,10,11,12,1,2];//设置数组，圆的绘制是从x轴正方向开始，即3时方向

	ctx.font=18*rem+"px Arial";
	ctx.textAlign='center';//水平对齐方式
	ctx.textBaseline='middle';//竖直对齐方式
	hourNumbers.forEach(function(number,i){//为数组每一个值设置函数
		var rad=2*Math.PI/12*i;
		var x=(r-30*rem)*Math.cos(rad);
		var y=(r-30*rem)*Math.sin(rad);
		ctx.fillText(number,x,y);//根据坐标绘制文字
	});

	for (var i = 0; i < 60; i++) {
		var rad=2*Math.PI/60*i;
		var x=(r-18*rem)*Math.cos(rad);
		var y=Math.sin(rad)*(r-18*rem);

		ctx.beginPath();//开始绘制路径
		if(i%5==0){//整点数
			ctx.fillStyle='#000';
			ctx.arc(x,y,3*rem,0,2*Math.PI,false);
		}else{
		ctx.fillStyle='#ccc';
		ctx.arc(x,y,2*rem,0,2*Math.PI,false);
		}
		ctx.fill();		
	}
}

function drawHour(hour,minute){
	ctx.save();//必须添加，相当于建立一个小的图层

	ctx.beginPath();
	var rad=2*Math.PI/12*(hour+minute/60);
	ctx.rotate(rad);//旋转画布，在绘制之前旋转，就是在lineTo()方法之前绘制。

	ctx.lineWidth=6*rem;//线宽
	ctx.lineCap='round';//设置线型为圆形

	ctx.moveTo(0,10*rem);//移动绘制点，不绘制图形
	ctx.lineTo(0,-r/2);//绘制直线
	ctx.stroke();//描边方法

	ctx.restore();//退回到原来的绘制环境
}

function drawMinute(minute,second){
	ctx.save();

	ctx.beginPath();
	var rad=2*Math.PI/60*(minute+second/60);
	ctx.rotate(rad);//旋转画布，在绘制之前旋转，就是在lineTo()方法之前绘制。

	ctx.lineWidth=3*rem;
	ctx.lineCap='round';

	ctx.moveTo(0,10*rem);
	ctx.lineTo(0,-r+30*rem);
	ctx.stroke();

	ctx.restore();
}

function drawSecond(second,millisecond){
	ctx.save();


	ctx.fillStyle="red";
	ctx.beginPath();

	var rad=2*Math.PI/60*(second+millisecond/1000);
	ctx.rotate(rad);//旋转画布，在绘制之前旋转，就是在lineTo()方法之前绘制。

	ctx.moveTo(2*rem,20*rem);
	ctx.lineTo(-2*rem,20*rem);
	ctx.lineTo(-1*rem,-r+18*rem);
	ctx.lineTo(1*rem,-r+18*rem);
	ctx.closePath();

	ctx.fill();

	ctx.restore();
}

function drawDot() {
	ctx.beginPath();
	ctx.fillStyle="#fff";
	ctx.arc(0,0,3*rem,0,2*Math.PI,false);
	ctx.fill();
}



// drawBackground();
// drawHour(4,30);
// drawMinute(30);
// drawSecond(60);
// drawDot();

function draw() {

	ctx.clearRect(0,0,width,height);//清除整个时钟

	var now=new Date();
	var hour=now.getHours();
	var minute=now.getMinutes();
	var second=now.getSeconds();
	var millisecond=now.getMilliseconds();
	drawBackground();
	drawHour(hour,minute);
	drawMinute(minute,second);
	drawSecond(second,millisecond);
	drawDot();
	ctx.restore();//这里是为了回到默认，即把原点重新移回0，0点

	setTimeout(draw,20);
	
}

draw();
