/*
* @Author: willclass
* @Date:   2016-09-26 11:25:10
* @Last Modified by:   willclass
* @Last Modified time: 2016-09-26 11:34:39
*/

'use strict';
/* global phantom */
var system = require('system')
var webpage = require('webpage')
var pagetotal = 0,start = 0;
var page = webpage.create()
 

phantom.onError = function(msg, trace) {
  exit(msg || 0);
}

// Load configurations from stdin
var json = JSON.parse(system.stdin.readLine());
var options = json.options;
var html = json.html || "<HTML><body>数据为空</body></HTML>";

page.setContent(html,"http://localhost");
page.

page.onLoadFinished = function(status) {
  // The paperSize object must be set at once
  page.paperSize = definePaperSize(getContent(page), options)
  // Output to parent process
  var fileOptions = {
    type: options.type || 'pdf',
    quality: options.quality || 75
  }

  var filename = options.filename || (options.directory || '/tmp') + '/pdf_' + system.pid + '.' + fileOptions.type
  page.render(filename, fileOptions)
  system.stdout.write(JSON.stringify({
    filename: filename,
    pagetotal:pagetotal
  }))

  exit(null)
}


