function sameSign(a,b) {
	return (a^b)>=0;//(a*b)>=0;
}

function vector(a,b){
	return {
		x:b.x - a.x,
		y:b.y - a.y
	};
}

function vertorPfoduct(v1, v2){
	return v1.x * v2.y - v2.x * v1.y;
}

function isPointInTrangle(p,a,b,c){
	var pa = vector(p,a);
	var pb = vector(p,b);
	var pc = vector(p,c);

	var t1 = vertorPfoduct(pa,pb);
	var t2 = vertorPfoduct(pb,pc);
	var t3 = vertorPfoduct(pc,pa);

	return sameSign(t1,t2)&&sameSign(t2,t3);
}

function needDelay(elem,leftCorner,currMousepos){
	var offset=elem.offset();
	
	var topLeft = {
		x :offset.left,
		y:offset.top
	};

	var bottomLeft={
		x:offset.left,
		y:offset.top+elem.height()
	};

	return isPointInTrangle(currMousepos,leftCorner,topLeft,bottomLeft);

}