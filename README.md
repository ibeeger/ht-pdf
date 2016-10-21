<a href="https://nodei.co/npm/ht-pdf/"><img src="https://nodei.co/npm/ht-pdf.png"></a>
#使用说明

var pdf = require("ht-pdf");

头部 底部 img 必须是 base64 

<pre>
pdf.create(html,options).toFile(filename,callback);
pdf.create(html,options).toBuffer(callback);
</pre>


callback has two argument
1、错误
2、pdf 
3、pdf 的 张数



<pre>
var pdf = require("../");
var fs = require("fs");
var html = fs.readFileSync(__dirname+"/a.html").toString();
var opts = {
	width: "1060px",
	height: "1500px",
	type: "pdf",
	phantomPath: "/usr/local/bin/phantomjs",
	margin: {
		top: "30px",
		left: "35px",
		right: "15px",
		bottom: "0px"
	},
	timeout: 15000,
	header: {
		height: "315px",
		contents: null
	},
	footer: {
		height: "124px",
		contents: null
	}
};

pdf.create(html, opts).toBuffer(function(err,res,total){
	console.log(total)
})
</pre>

###1.0.10
增加新页码字段 {{pagenum}} 从1开始

###1.0.7 

增加了起始页码
影响字段{{page}}
options.start = 10
默认是 0

###1.0.5
获得  html 结构中 所有 class="getHeight" 的 clientHeight; 
<pre>
   pdf.create(html,opts).getHeight(function(){
	console.log(arguments);
})</pre>
