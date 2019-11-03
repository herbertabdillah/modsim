function simulasi(xa, ya, ma, xb, yb, mb, va, da, vb, db) {
	a = new Bola(xa, ya, ma);
	b = new Bola(xb, yb, mb);

	a.dorong(va, da);
	b.dorong(vb, db);

	loop(0);
}

function mulai(){
	apakahBerhenti = false;

	var xa = Number(document.getElementById("xa").value);
	var ya = Number(document.getElementById("ya").value);
	var ma = Number(document.getElementById("ma").value);
	var xb = Number(document.getElementById("xb").value);
	var yb = Number(document.getElementById("yb").value);
	var mb = Number(document.getElementById("mb").value);
	var va = Number(document.getElementById("va").value);
	var da = Number(document.getElementById("da").value);
	var vb = Number(document.getElementById("vb").value);
	var db = Number(document.getElementById("db").value);

	console.log(xa, ya, ma, xb, yb, mb, va, da, vb, db);
	simulasi(xa, ya, ma, xb, yb, mb, va, da, vb, db);
}
function berhenti(){
	apakahBerhenti = true;
}
function contoh() {
	apakahBerhenti = false;
	simulasi(10, 200, 10, 500, 200, 90, 4, 45, 4, 135);
}
