//去掉每一行的左边框

//window.onload加载函数
var addLoadEvent = function(func) {
	var oldonload  = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

//调用函数求函数得出的值时加括号，不调用求值不用加括号

//事件处理程序
var EventUtil = {
	addHandler: function(ele, type, handler) {
		if(ele.addEventListener){
			ele.addEventListener(type, handler, false);
		}else if(ele.attachEvent) {
			ele.attachEvent("on"+type, handler);
		}else{
			ele.["on" + type] = handler;
		}
	},
	removeHandler: function(ele, type, handler) {
		if(ele.removeEventListener){
			ele.removeEventListener(type, handler, false);
		}else if(ele.detachEvent) {
			ele.detachEvent("on"+type, handler);
		}else{
			ele.["on" + type] = null;
		}
	}
}

//鼠标划过时的函数
var navDetailAnimation = function() {
	var nav_ul = document.getElementById("nav_ul");
	var nav_li = nav_ul.getElementsByTagName("li");
	for(var i = 0;i < nav_li.length;i++) {
		console.log(this.innerText);
	}
}

EventUntil.add
























