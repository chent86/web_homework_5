/* 
姓名: 陈涛
学号: 16340031
组别：晚上班23组
内容：1. 作业的基本要求
      2. 支持键盘输入(右边小键盘，不支持括号, CE对应Delete键)
      3. 禁止括号以外的运算符的连续使用
      4. 小数点前自动补0(.2 -> 0.2)
      5. 精度问题
*/
var str = "0";

window.onload = function() {
	document.getElementById("result").value = str;
	var x = document.getElementsByClassName("number");
	var y = document.getElementsByClassName("operator");
	for (var i = 0; i < x.length; i++)                                   //{fun_number(this.childNodes[0].textContent);};
		x[i].onclick = function(){fun_number(this.childNodes[0].textContent);};  //this指调用函数的那个对象
	for (var i = 0; i < y.length; i++)
		y[i].onclick = function(){fun_operator(this.childNodes[0].textContent);};  //这里是回调函数，方便后面使用，所以并不能用x[i]或者y[i]
	document.getElementById("delete").onclick = fun_delete;
	document.getElementById("equal").onclick = fun_equal;
	document.getElementById("clear").onclick = fun_clear;

document.onkeydown=function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
		if(e && e.keyCode >= 96 && e.keyCode <= 105){
	 		fun_number((e.keyCode-96).toString());
	    }
	    if(e && e.keyCode == 8)
	    	fun_delete();
	    if(e && e.keyCode == 13)
	    	fun_equal();
	    if(e && e.keyCode == 46)
	    	fun_clear();
	    if(e && e.keyCode == 106)
	    	fun_operator("*");
	    if(e && e.keyCode == 107)
	    	fun_operator("+");
	    if(e && e.keyCode == 109)
	    	fun_operator("-");
	    if(e && e.keyCode == 110)
	    	fun_operator(".");
	    if(e && e.keyCode == 111)
	    	fun_operator("/");
}; 
}

function fun_number(a) {
	if(document.getElementById("result").value == "0")
		str = document.getElementById(a).innerHTML;
	else
		str+=document.getElementById(a).innerHTML;
	document.getElementById("result").value = str;
}

function fun_delete() {
	str = str.substring(0, str.length-1);
	if(str.length == 0) {
		str = '0';
		document.getElementById("result").value = str;
	}
	else
		document.getElementById("result").value = str;	
}

function fun_operator(a) {
	if(str == '0' && (a == "("||a == ")"))
		str = document.getElementById(a).innerHTML;
	else{
		if(a == "." && (str[str.length-1] < '0' || str[str.length-1] > '9') && str[str.length-1] != '.')
			str+="0.";                                                            //小数点前面补0
		else
			if(str[str.length-1] != a || a == '(' || a == ')')
				str+=document.getElementById(a).innerHTML;                        //不允许运算符重复（除了括号）
	}
	document.getElementById("result").value = str;	
}

function fun_equal() {
	try {
		if(Math.abs(eval(str)) < 0.00001) {
			answer = "0";
			document.getElementById("result").value = answer;
			str = answer;
			return;
		}
		var answer = eval(str).toString();
	}
	catch(err) {
		alert("非法输入!");
		document.getElementById("result").value = '0';
		str = '0';
		return;
	}
	if(answer.indexOf(".") != -1) {
		if(answer.length-1-answer.indexOf(".") > 6) {
			answer = answer.substr(0, answer.indexOf(".")+6);
			var end = answer.length-1;
			while(answer[end] == '0')
				end--;
			answer = answer.substr(0, end+1);
		}
	}
	document.getElementById("result").value = answer;
	str=answer; //连续计算
}

function fun_clear() {
	document.getElementById("result").value = "";
	str="0";
	document.getElementById("result").value = str;
}