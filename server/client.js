/**
* class class stored information client's id, nickname, joinDate, and getter,seeters
**/

var client = function(id,name,time){
	this.id = id;
	this.nickname = name;
	this.joinTime = time;
}

client.prototype.getId = function(){
	return this.id;
};

client.prototype.getNickName = function(){
	return this.nickname;
};

client.prototype.getJoinTime = function(){
	return this.joinTime;
};

//exports the class
exports.client = client;
