/* global phantom */
var system = require('system')
var webpage = require('webpage')
var pagetotal = 0;
// Error handler
function exit(error) {
  var message
  if (typeof error === 'string') message = error
  if (error) system.stderr.write('html-pdf: ' + (message || 'Unknown Error ' + error) + '\n')
  phantom.exit(error ? 1 : 0)
}

// Build stack to print
function buildStack(msg, trace) {
  var msgStack = [msg]
  if (trace && trace.length) {
    msgStack.push('Stack:')
    trace.forEach(function(t) {
      msgStack.push('  at ' + t.file || t.sourceURL + ': ' + t.line + ' (in function ' + t.function+')')
    })
  }
  return msgStack.join('\n')
}

phantom.onError = function(msg, trace) {
  exit(buildStack('Script - ' + msg, trace))
}

// Load configurations from stdin
var json= JSON.parse(system.stdin.readLine())
if (!json.html || !json.html.trim()) exit('Did not receive any html')

var options = json.options
var page = webpage.create()
page.setContent(json.html, null)
page.onError = function(msg, trace) {
  exit(buildStack('Evaluation - ' + msg, trace))
}

var timeout = (options.timeout || 120000) + 2000
setTimeout(function() {
  exit('Force timeout')
}, timeout)

page.onLoadFinished = function(status) {
  // The paperSize object must be set at once
 var rest =  getHeight(page, json.ids);
  if (rest instanceof String) {
  	 system.stdout.write(rest);
  }else{
  	 system.stdout.write(JSON.stringify(rest))
  }
  exit(null)
}

function getHeight(page,ids){
	return page.evaluate(function(){
		 var ids = document.querySelectorAll(".getHeight");
		 var arr = [];
		 for(var i=0; i<ids.length; i++){
		 	arr[i] = document.querySelectorAll(".getHeight")[i].clientHeight;
		 }
		return arr;
	})
}