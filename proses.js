var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//ctx.canvas.height = window.innerHeight;
//ctx.canvas.width = window.innerWidth;
ctx.canvas.height = 500;
ctx.canvas.width = 800;

class Bola {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;

    this.v = 0;
    this.radius = radius;
    this.m = radius;
  }
  dorong(v0, sudut) {
    this.v = v0;
    this.vx = v0 * Math.cos((sudut * Math.PI) / 180);
    this.vy = v0 * Math.sin((sudut * Math.PI) / 180);
  }
  jalan() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
  }
  hitungV() {
    var sq = Math.pow(this.vx, 2) + Math.pow(this.vy, 2);
    var rt = Math.sqrt(sq);
    return rt;
  }
}

function hitung() {
  a.jalan();
  b.jalan();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  // Gambar lingkaran A
  ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI);
  ctx.stroke();

  // Gambar lingkaran B
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.radius, 0, 2 * Math.PI);
  ctx.stroke();
}

function deteksiTabrakan(p1x, p1y, r1, p2x, p2y, r2) {
  var a;
  var x;
  var y;

  a = r1 + r2;
  x = p1x - p2x;
  y = p1y - p2y;

  if (a > Math.sqrt(x * x + y * y)) {
    console.log('tabrakan');
    return true;
  } else {
    return false;
  }
}

function tabrakan() {
  var m21, dvx2, grad, x21, y21, vx21, vy21, fy21, sign, vx_cm, vy_cm;
  var R = 1;

  m21  = b.m / a.m;
  x21  = b.x - a.x;
  y21  = b.y - a.y;
  vx21 = b.vx - a.vx;
  vy21 = b.vy - a.vy;

  vx_cm = (a.m * a.vx + b.m * b.vx) / (a.m + b.m);
  vy_cm = (a.m * a.vy + b.m * b.vy) / (a.m + b.m);

  //if (vx21 * x21 + vy21 * y21 >= 0) return;
  // Avoid divide by zero
  fy21 = 1.0e-12 * Math.abs(y21);

  if (Math.abs(x21) < fy21) {
    if (x21 < 0) {
      sign = -1;
    } else {
      sign = 1;
    }
    x21 = fy21 * sign;
  }

  // Update kecepatan
  grad = y21 / x21;
  dvx2 = (-2 * (vx21 + grad * vy21)) / ((1 + grad * grad) * (1 + m21));
  b.vx = b.vx + dvx2;
  b.vy = b.vy + grad * dvx2;
  a.vx = a.vx - m21 * dvx2;
  a.vy = a.vy - grad * m21 * dvx2;

  // Kecepatan untuk lenting sebagian
  a.vx = (a.vx - vx_cm) * R + vx_cm;
  a.vy = (a.vy - vy_cm) * R + vy_cm;
  b.vx = (b.vx - vx_cm) * R + vx_cm;
  b.vy = (b.vy - vy_cm) * R + vy_cm;
}
var apakahberhenti = false;
function loop(i) {
  if (apakahBerhenti) return;
  setTimeout(function() {
    hitung();
    if (deteksiTabrakan(a.x, a.y, a.radius, b.x, b.y, b.radius)) {
      tabrakan();
      hitung();
    }
    console.log(
      'a : v ',
      a.hitungV(),
      ' vx ',
      a.vx,
      ' vy ',
      a.vy,
      ' x ',
      a.x,
      ' y ',
      a.y,
    );
    console.log(
      'b : v ',
      b.hitungV(),
      ' vx ',
      b.vx,
      ' vy ',
      b.vy,
      ' x ',
      a.x,
      ' y ',
      a.y,
    );
    console.log();
    render();
    loop(i + 1);
  }, 100);
}
