/*!
 * English Sabla Mozilla Firefox Extension
 * http://englishsabla.com/
 *
 * Copyright 2010, Assim Al-Marhuby
 * http://assim.me/
 */

window.addEventListener("load", function() { englishsabla.init(); }, false);

var englishsabla = {

  init: function() {  
    var appcontent = document.getElementById("appcontent");   // browser  
    if(appcontent)  
      appcontent.addEventListener("DOMContentLoaded", englishsabla.onPageLoad, true);  
    var messagepane = document.getElementById("messagepane"); // mail  
    if(messagepane)  
      messagepane.addEventListener("load", function() { englishsabla.onPageLoad(); }, true);  
  },  
  
  onPageLoad: function(aEvent) {  
    var doc = aEvent.originalTarget; // doc is document that triggered "onload" event  
    // do something with the loaded page.  
    // doc.location is a Location object (see below for a link).  
    // You can use it to make your code executed on certain pages only.

    // Check if this page is English Sabla
    if(doc.location.hostname.indexOf("englishsabla.com") >= 0) {

      try {
        const loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
                     .getService(Components.interfaces.mozIJSSubScriptLoader);
        loader.loadSubScript("chrome://englishsabla/content/resources/js/jquery.js");
        loader.loadSubScript("chrome://englishsabla/content/resources/js/content_script.js");

      } catch(e) {
        Components.utils.reportError(e);
      }
    }
      
    // add event listener for page unload   
    aEvent.originalTarget.defaultView.addEventListener("unload", function(){ englishsabla.onPageUnload(); }, true);  
  },  
  
  onPageUnload: function(aEvent) {  
    // do something
  },

  show_popup: function() {
    // Open popup
    window.open("chrome://englishsabla/content/popup.xul", "", "chrome");
  }

};