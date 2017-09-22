var http = require("http");
var fs = require("fs");
var opn = require('opn');
function start() {
  function onRequest(request, response) {
    var path = request.url;
	if(path == "/develop"){
		path = "/src/view/develop.html";
	}else if(path == "/"){
        path = "/src/view/index.html";
	}
	sendFile(response,path);
  }
  function sendFile(res,path){
	var path = process.cwd()+path;
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
  var port = 8887;
  http.createServer(onRequest).listen(port);
  console.log("Server has started.");
  opn('http://localhost:' + port + "/develop");
}
 
exports.start = start;

