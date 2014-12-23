/**
 * @name Utils
 * @description collection with some useful functions
 * @author Alexey Raspopov, alexey.raspopov@qa-power.com
 */
(function(global){
	'use strict';
	function Utils(){

	}
	Utils.prototype.ajax = function(url, callback, async){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = callback;
		xhr.open('GET', url, async);
		xhr.send(null);
	};
	Utils.prototype.extend = function(sub, sup){
		var F = function(){};
		F.prototype = sup.prototype;
		sub.prototype = new F();
		sub.prototype.constructor = sub;
	};
	Utils.prototype.augment = function(receiving, giving){
		var i, methodName;
		if(arguments[2]){
			for(i = 2; i < arguments.length; i++){
				receiving.prototype[arguments[i]] = giving.prototype[arguments[i]];
			}
		}else{
			for(methodName in giving.prototype){
				receiving.prototype[methodName] = giving.prototype[methodName];
			}
		}
	};
	Utils.prototype.getElement = function(selector){
		var element;
		if(typeof selector === 'string'){
			element = /[\*\.\#\>\+\:\s\[\]\(\)]/.test(selector) ? document.querySelector(selector) : document.getElementById(selector) || document.getElementsByTagName(selector)[0];
		}else if(selector instanceof HTMLElement){
			element = selector;
		}
		return element;
	};
	Utils.prototype.getElements = function(selector){
		var node;
		if(typeof selector === 'string'){
			node = /[\*\.\#\>\+\:\s\[\]\(\)]/.test(selector) ? document.querySelectorAll(selector) : document.getElementsByClassName(selector) || document.getElementsByTagName(selector);
		}else{
			node = selector instanceof HTMLElement ? selector : selector instanceof NodeList ? selector : null;
		}
		return node;
	};
	Utils.prototype.getElementParent = function(element, parentTag){
		element = this.getElement(element);
		parentTag = parentTag.toUpperCase();
		while(element.tagName !== parentTag){
			element = element.parentNode;
			if(element.tagName === 'BODY'){
				return false;
			}
		}
		return element;
	};
	Utils.prototype.getElementOffset = function(element){
		var offsetX = 0, offsetY = 0, elementStyle;
		while(element.tagName !== 'BODY'){
			elementStyle = getComputedStyle(element);
			offsetX += element.offsetLeft;
			offsetY += element.offsetTop;
			if(elementStyle.position === 'relative' || elementStyle.textAlign === 'center'){
				break;
			}
			element = element.parentNode;
		}
		return {
			x: offsetX,
			y: offsetY
		};
	};
	Utils.prototype.getOriginalEvent = function(event){
		if(window.hasOwnProperty('ontouchstart')){
			return event.changedTouches[0];
		}
		return event;
	};
	global.utils = new Utils();
})(window);