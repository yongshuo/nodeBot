//declare socket io listen at port
var io = require('socket.io').listen(8080);
var siteAdmin = "blueblue";

//chat namesapce
var chatNS = '/chat';

/**
* Array to stroe all clients object
**/
var clients = new Array();

/**
* ClientModule use the external exported client class
*/
var ClientModule = require('./client');

//transport the browser
io.set('transports', [ 'websocket', 'xhr-polling' ]);

/**
** Namespace /chat for the user chat
*/
var chat = io
	.of(chatNS)
	.on('connection',function(socket){
		loadPreviousClient(socket);

		socket.on('connect',function(data){
			connect(socket,data);
		});

		socket.on('message',function(data){
			messaging(socket,data);
		});

		socket.on('disconnect',function(){
			disconnect(socket);
		});
	});
	
/**
* loadPrevious client, is when new client coming, show all the online clients
**/	
function loadPreviousClient(socket){
	
	for(var key in clients)
		socket.emit('loadPrevClient',{socketId : clients[key].getId(), client : clients[key].getNickName()});
}

/**
* when new user connect to the chatting
**/
function connect(socket,data){
	//create client object
	var client = new ClientModule.client(socket.id,data['nickname'],getCurrent());
	
	//push to array
	clients.push(client);
	
	//show the connected user
	var msg = client.getNickName() + " join the chatting!";
	
	//broadcast to all user the user connected
	io.of(chatNS).emit("connected",{socketId : client.getId(), clientNum : clients.length, client: client.getNickName(), admin : siteAdmin, message : msg});
}

/**
* messaging is broadcasting message
*/
function messaging(socket,data){	
	var index = getClient(socket.id);
	if(index != -1)
		io.of(chatNS).sockets[socket.id].broadcast.emit("message",{client : clients[index].getNickName() , message : data["message"],current:getCurrent()});
	else
		socket.emit('error',{admin:siteAdmin,message:'You may be disconnected from server, please close browser join again!'});	
}

/**
* when user disconnected the chatting
*/
function disconnect(socket){
	//get clients index in array
	var index = getClient(socket.id);
	
	if(index != -1){
		//show the disconnected user
		var msg = clients[index].getNickName() + " left the chatting!";

		//broadcast to all user the user disconnected
		io.of(chatNS).emit("disconnected",{socketId : clients[index].getId(), clientNum:clients.length, admin : siteAdmin, message : msg});
		//delete from array, free memory
		clients.splice(index,1);
	}else{
		socket.emit('error',{admin:siteAdmin,message:'You may be disconnected from server, please close browser join again!'});	
	}
}

/*
*function get the client index by socket id
*/
function getClient(socketId){
	for(var key in clients)
		if(clients[key].getId() == socketId){
			return key;
		}
	return -1;
}

function getCurrent(){
	var time = new Date();
	
	return time.getDate()+'/'+(time.getMonth()+1)+'/'+time.getFullYear()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
}

/**
* Namespace news for broadcasting news
*/

var news = io
	.of('/news')
	.on('connection',function(socket){
		socket.emit('broadcast', {'news': 'This is news part'})	
	});
