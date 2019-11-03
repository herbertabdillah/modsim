var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;
class Bola{
	constructor(x, y, radius) {
		this.x  = x;
		this.y  = y;
		this.vx = 0;
		this.vy = 0;

		this.v = 0;
		this.radius = radius;
		this.m = radius;
	}
	dorong(v0, sudut) {
		this.v = v0;
		this.vx = v0 * Math.cos(sudut * Math.PI / 180);
		this.vy = v0 * Math.sin(sudut * Math.PI / 180);
	}
	jalan() {
		this.x = this.x + this.vx;
		this.y = this.y + this.vy;
	}
}

class Simulasi{
	constructor(){
		this.a = '';
		this.b = '';
	}
}
a = new Bola(10, 200, 10);
b = new Bola(500, 200, 90);
function hitung() {
	a.jalan();
	b.jalan();
}
function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(b.x, b.y, b.radius, 0, 2 * Math.PI);
	ctx.stroke();
}
i = 0;

function deteksiTabrakan(p1x, p1y, r1, p2x, p2y, r2) {
  var a;
  var x;
  var y;

  a = r1 + r2;
  x = p1x - p2x;
  y = p1y - p2y;

  if (a > Math.sqrt((x * x) + (y * y))) {
	console.log('tabrakan');
    return true;
  } else {
    return false;
  }
		}
function tabrakan() {
	var m21,dvx2,aa,x21,y21,vx21,vy21,fy21,sign,vx_cm,vy_cm;
	var m1, m2, x1, x2, y1, y2, vx1, vx2, vy1, vy2;
	var R = 1;
	m1 = a.m;
	m2 = b.m;
	x1 = a.x;
	x2 = b.x;
	y1 = a.y;
	y2 = b.y;
	vx1 = a.vx;
	vx2 = b.vx;
	vy1 = a.vy;
	vy2 = a.vy;
	       m21=m2/m1;
       x21=x2-x1;
       y21=y2-y1;
       vx21=vx2-vx1;
       vy21=vy2-vy1;

       vx_cm = (m1*vx1+m2*vx2)/(m1+m2) ;
       vy_cm = (m1*vy1+m2*vy2)/(m1+m2) ;


//     *** return old velocities if balls are not approaching ***
       if ( (vx21*x21 + vy21*y21) >= 0) return;


//     *** I have inserted the following statements to avoid a zero divide;
//         (for single precision calculations,
//          1.0E-12 should be replaced by a larger value). **************

       fy21=1.0E-12*Math.abs(y21);
       //if ( fabs(x21)<fy21 ) {
                   //if (x21<0) { sign=-1; } else { sign=1;}
                   //x21=fy21*sign;
        //}

	if(Math.abs(x21) < fy21) {
		if(x21 < 0) {
			sign = -1;
		} else {
			sign = 1;
		}
		x21 = fy21 * sign;
	}
//     ***  update velocities ***
       aa=y21/x21;
       dvx2= -2*(vx21 +aa*vy21)/((1+aa*aa)*(1+m21)) ;
       vx2=vx2+dvx2;
       vy2=vy2+aa*dvx2;
       vx1=vx1-m21*dvx2;
       vy1=vy1-aa*m21*dvx2;

//     ***  velocity correction for inelastic collisions ***
       a.vx=(vx1-vx_cm)*R + vx_cm;
       a.vy=(vy1-vy_cm)*R + vy_cm;
       b.vx=(vx2-vx_cm)*R + vx_cm;
       b.vy=(vy2-vy_cm)*R + vy_cm;

       return;
}
function loop(i) {
	if(i > 10000) return;
	setTimeout(function(){
		hitung();
		if(deteksiTabrakan(a.x, a.y, a.radius, b.x, b.y, b.radius)) {
			tabrakan();
			hitung();
		}
		console.log(a.vx + " " + a.vy + " " + b.vx + " " + b.vy);
		render();
		asdf(i+1);
	}, 100);
}
//a.dorong(2, 45);
//b.dorong(4, -135);

a.dorong(4, 45);
b.dorong(4, 135);
loop(0);
