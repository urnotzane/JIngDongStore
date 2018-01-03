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
	var nav_a = getElementsByClassName("nav_a");
	var nav_li = getElementsByClassName("nav_li");
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
				this.style.backgroundColor = "rgba(255,255,255,1)";
				nav_detail[j].style.display = "none";
				this.style.backgroundColor = "#6e6568";
				
			}
		}
		EventUtil.addHandler(nav_li[i], "mouseover", showDetail);
		EventUtil.addHandler(nav_li[i], "mouseout", hideDetail);
	}
}

addLoadEvent(navDetailAnimation);

var img_menu = document.getElementById("img_menu");
var menu_div = img_menu.getElementsByTagName("div");
var goods_nav_img = document.getElementById("goods_nav_img");
var pageover = getElementsByClassName("pageover");
//白点切换图片
var picToggleAnimation = function() {
	
	//如果没有红点第一个白点为红点或者当前鼠标最后经过的白点 
	//3秒钟切换一次图片，分离图片地址字符串，根据数字确定哪张图片
	var k = 0;
	var timer1;
	var picToggle = function() {
		if(k >= menu_div.length) {
			k = 0;
		}
		menu_div[k].style.backgroundColor = "rgb(200,12,34)";
		src = menu_div[k].getAttribute("data-src");
		goods_nav_img.getElementsByTagName("img")[0].setAttribute("src", src);
		//鼠标移出后将该红点设置为白色
		var j = k - 1;
		if( j < 0) {
			j = 7;
		}
		menu_div[j].style.backgroundColor = "rgb(255,255,255)";
		k++;
	}
	//定时切换图片，一个函数不要定义太多内含的定时器，很难控制！
	var timerPicToggle = function(){
		timer1 = setInterval(function(){
			picToggle();
			},3000);
	}
	timerPicToggle();
	//进入图片窗口取消定时器
	var clearTimer = function() {
		window.clearInterval(timer1);
	}
	EventUtil.addHandler(goods_nav_img, "mouseover",clearTimer);
	EventUtil.addHandler(goods_nav_img, "mouseout",timerPicToggle);
	//动画效果
	var showPic  = function() {
		for(var i = 0;i < menu_div.length; i++) {
			menu_div[i].style.backgroundColor = "rgb(255,255,255)";
		}
		this.style.backgroundColor = "rgb(200,12,34)";
		var src = this.getAttribute("data-src");
		//更换图片区域图片地址
		goods_nav_img.getElementsByTagName("img")[0].setAttribute("src", src);
	}
	//鼠标移出红点后获取白点位置赋值于K
	var hidePic  = function() {
		k = this.getAttribute("data-src").split("")[4]-1;
	}
	
	//翻页键的使用
	//上一页
	var preKey = function(){
		for(var i = 0;i < menu_div.length; i++) {
			menu_div[i].style.backgroundColor = "rgb(255,255,255)";
		}
		k--;
		if(k < 0){
			k = 7;
		}
		menu_div[k].style.backgroundColor = "rgb(200,12,34)";
		var src = menu_div[k].getAttribute("data-src");
		goods_nav_img.getElementsByTagName("img")[0].setAttribute("src", src);
		clearTimer();
	}
	EventUtil.addHandler(pageover[0], "click", preKey);
	//下一页
	var nextKey = function() {
		for(var i = 0;i < menu_div.length; i++) {
			menu_div[i].style.backgroundColor = "rgb(255,255,255)";
		}
		k++;
		if(k > 7){
			k = 0;
		}
		menu_div[k].style.backgroundColor = "rgb(200,12,34)";
		var src = menu_div[k].getAttribute("data-src");
		goods_nav_img.getElementsByTagName("img")[0].setAttribute("src", src);
		clearTimer();
	}
	EventUtil.addHandler(pageover[1], "click", nextKey);
	//给每个白点添加事件
	for (var i = 0;i < menu_div.length;i++) {
		EventUtil.addHandler(menu_div[i], "mouseover",showPic);
		EventUtil.addHandler(menu_div[i], "mouseout",hidePic);
		EventUtil.addHandler(menu_div[i], "mouseover",clearTimer);
	}
}

addLoadEvent(picToggleAnimation);

//图片翻页键
var pageToggle  = function() {
	var goods_nav_midt = document.getElementById("goods_nav_midt");
	
	//翻页键显示与隐藏
	var keyShow = function() {
		pageover[0].style.display = "block";
		pageover[1].style.display = "block";
	}
	var keyHide = function() {
		pageover[0].style.display = "none";
		pageover[1].style.display = "none";
	}
	
	EventUtil.addHandler(goods_nav_midt, "mouseover",keyShow);
	EventUtil.addHandler(goods_nav_midt, "mouseout",keyHide);
	
}

addLoadEvent(pageToggle);

var divShow = function(obj) {
	//var myJingD = document.getElementById(id).getElementsByTagName("li")[num];  
	var myJDid = obj.getAttribute("data-id");
	var myJD = document.getElementById(myJDid);
	var current = obj.offsetParent.offsetLeft;
	var eleLeft = obj.offsetLeft + current;
	obj.style.backgroundColor = "#fff";
	obj.style.border = "1px solid #ccc";
	myJD.style.display = "block";
	myJD.style.left = eleLeft+"px";	
	
}
var divHide = function(obj) {
	//var myJingD = document.getElementById(id).getElementsByTagName("li")[num];  
	var myJDid = obj.getAttribute("data-id");
	var myJD = document.getElementById(myJDid);
	myJD.style.display = "none";
	obj.style.backgroundColor = "rgb(227,228,229)";
	obj.style.border = "1px solid rgb(227,228,229)";
}

var divAmination = function() {
	var myJingD = document.getElementById("t_ul").getElementsByTagName("li");
	for(var i = 0;i < myJingD.length; i++) {
		var data_id = myJingD[i].getAttribute("data-id");
		if(data_id){
			var liShow = function() {
				divShow(this);
			}
			var liHide = function() {
				divHide(this);
			}
			EventUtil.addHandler(myJingD[i], "mouseover",liShow);
			EventUtil.addHandler(myJingD[i], "mouseout",liHide);
			
		}
	}
	
}
addLoadEvent(divAmination);

















