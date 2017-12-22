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
			ele["on" + type] = handler;
		}
	},
	removeHandler: function(ele, type, handler) {
		if(ele.removeEventListener){
			ele.removeEventListener(type, handler, false);
		}else if(ele.detachEvent) {
			ele.detachEvent("on"+type, handler);
		}else{
			ele["on" + type] = null;
		}
	}
}

//getElementsByClassName兼容问题解决，返回一个同类名的元素数组
var getElementsByClassName = function(classname) {
    //如果浏览器支持getElementsByClassName，使用现有方法
    if(document.getElementsByClassName) {
        return document.getElementsByClassName(classname);
    }else{
        //定义一个数组保存所要获取的变量
        var results=new Array();
        var elems=document.getElementsByTagName("*");
        for (var i=0;i<elems.length;i++) {
            if(elems[i].className){
                //将className通过空格分开并保存到数组
                var elem_classname = new Array();
                elem_classname = elems[i].className.split(' ');
                for (var j=0;j<elem_classname.length;j++) {
                    //如果传入的类名和循环的类名相同，返回这个元素到results数组
                    if (classname == elem_classname[j]) {
                        results.push(elems[i]);
                    }
                }
            }
        }
        return results;
    }
}

//鼠标划过时的函数	
var navDetailAnimation = function() {
	//定义变量
	var nav_ul = document.getElementById("nav_ul");
	var nav_li = nav_ul.getElementsByTagName("li");
	var nav_detail = getElementsByClassName("nav_detail");
	var goods_nav_left = document.getElementById("goods_nav_left");
	//调用动画
	for(var i = 0;i < nav_li.length;i++) {
		nav_li[i].setAttribute("data-i", i);
		//要实现的动画效果
		var showDetail = function() { 
			var j = this.getAttribute("data-i");
			nav_detail[j].style.display = "block";
			this.style.backgroundColor = "rgba(255,255,255,0.2)";
			//如果nav_detail高度小于480px，设置为480px
			var h = nav_detail[j].offsetHeight;
			if(parseInt(h) < 480){
				nav_detail[j].style.height = "460px";
			}
		}
		var hideDetail = function() {
			for(var j = 0;j < nav_detail.length;j++) {
				EventUtil.addHandler(nav_li[j], "mouseover", showDetail);
				nav_detail[j].style.display = "none";
				this.style.backgroundColor = "#6e6568";
				
			}
		}
		EventUtil.addHandler(nav_li[i], "mouseover", showDetail);
		EventUtil.addHandler(nav_li[i], "mouseout", hideDetail);
	}
}

addLoadEvent(navDetailAnimation);

























