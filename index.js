"use strict";

var router = function(){
	this.url = window.location.hash;
	if(this.url == ""){
		window.location = "/#/";
		this.url = "/";
	}else{
		this.url = this.url.substr(1,this.url.length);
	}
	var currentInstance = this;
	window.addEventListener("hashchange",function(){currentInstance.navigate();});
};

router.prototype.bind = function(map) {
	this.map = map;
};

router.prototype.navigate = function() {
	this.url = window.location.hash.substr(1,window.location.hash.length);
	for (var key in this.map){
		var re = new RegExp(key);
		if(re.test(this.url)){
			this.map[key](this);
			break;
		}
	}
};

router.prototype.run = function() {
	this.navigate();
};

router.prototype.xhr = function(url,data,clb) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST",url,true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(data);
	xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      clb(xhttp.responseText);
    }
  };
};

function data(d){
	console.log(d);
}

function home(instance){
	instance.xhr("/","",data);
};

function index(instance){
	console.log("i am index");
};


var r = new router();
r.bind({"^/home$":home,
	"^/":index});
r.run();