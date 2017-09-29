var str = "0";

window.onload = function() {
	document.getElementById("result").value = str;
}

function fun(a) {
	str+=document.getElementById(a).innerHTML;
	document.getElementById("result").value = str;
}

function fun1() {
	var answer = eval(str);
	document.getElementById("result").value = answer;
	str=answer;
}

function fun2() {
	document.getElementById("result").value = "";
	str="0";
	document.getElementById("result").value = str;
}