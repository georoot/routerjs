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
			this.map[key]();
			break;
		}
	}
};

router.prototype.run = function() {
	this.navigate();
};


function home(){
	console.log("i am home");
};

function index(){
	console.log("i am index");
};


var r = new router();
r.bind({"^/home$":home,"^/":index});
r.run();