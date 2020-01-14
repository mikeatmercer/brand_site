require('es6-object-assign').polyfill();
require('nodelist-foreach-polyfill');

import "./style.css";

import App from "./App";
import habitat from "preact-habitat";
import $ from "jquery";





let _habitat = habitat(App);

(function () {

 
  if(document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value == 1) {
    return false; 
  }
  //$("#contentRow").attr("style", "display: none !important");
  $("#contentRow .community-name, #contentRow .social-like, #contentRow .page-title").remove();
  
  $(document).ready(function(){
    $("#contentRow").before("<div id='preact-widget-container' />");
    _habitat.render({
      selector: '#preact-widget-container',
      clean: true
    })
  })

}());

//js-webpart-titleCell
//Welcome to Brighter - topsection