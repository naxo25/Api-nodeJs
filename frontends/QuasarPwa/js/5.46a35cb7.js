(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{5976:function(t,e,n){"use strict";var r=n("f068"),i=n.n(r);i.a},e1dc:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-layout",{staticStyle:{margin:"auto","text-align":"left"},attrs:{view:"lHh Lpr lFf"}},[n("div",{staticClass:"animate-bottom absolute-center",staticStyle:{display:"block"},attrs:{id:"loader"}}),n("div",{staticClass:"full-width",staticStyle:{display:"none"},attrs:{id:"myDiv"}},[n("q-page-container",[n("router-view")],1)],1)])},i=[],o=(n("8e6e"),n("8a81"),n("ac6a"),n("cadf"),n("06db"),n("456d"),n("7f7f"),n("6762"),n("2fdb"),n("9523")),a=n.n(o),s=n("2f62");function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){a()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var u={data:function(){return{noimg:"https://labs357.com/nuevo/wp-content/themes/consultix/images/no-image-found-360x250.png",info:!1,tab:"mails"}},computed:l(l({},Object(s["e"])("store",["userDetails"])),{},{title:function(){var t=this.$route.fullPath;return t.includes("/chat")?this.otherUserDetails.name:"/Agregar"==t?"solicitudes":"/Perfil"==t?"cuenta":"/"==t?"chats":void 0}}),created:function(){this.loader()},methods:l(l({},Object(s["d"])("store",["exit"])),{},{loader:function(){function t(){document.getElementById("loader").style.display="none",document.getElementById("myDiv").style.display="block"}setTimeout(t,2e3),this.$q.notify({message:"Bienvenido",color:"blue",position:"top"})},salir:function(){this.exit()}})},f=u,d=(n("5976"),n("2877")),p=Object(d["a"])(f,r,i,!1,null,null,null);e["default"]=p.exports},f068:function(t,e,n){}}]);