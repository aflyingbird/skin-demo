var http = require("http");
var fs = require("fs");
 
function start(route) {
  function onRequest(request, response) {
    var path = request.url;	
	console.log("path1: "+path)
	if(path == "/"){
		path = "/view/login.html";
	}else if(path == "/index"){
		path = "/view/index.html";
	}else{
		path = "/view/index.html";
	}
	sendFile(response,path);
  }
  function sendFile(res,path){
	var path = process.cwd()+path;
	console.log(path)
	fs.readFile(path,function(err,stdout,stderr){
		if(!err){
			var data = stdout;
			var type = path.substr(path.lastIndexOf(".")+1,path.length)
			res.writeHead(200,{'Content-type':"text/"+type});	//在这里设置文件类型，告诉浏览器解析方式
			res.write(data);
		}
		res.end();
	})
  }
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}
 
exports.start = start;
