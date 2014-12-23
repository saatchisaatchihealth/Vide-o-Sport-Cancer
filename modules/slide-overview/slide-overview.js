/* ANTHILL MODULE:  SlideOverview
 * A module that will show an overview of all the slides within the presentation
 * NOTE: This is currently hard-coded for the Placebo presentation!
 * */

(function() {
	window.SlideOverview = function() {
	    this._init();
  	};

	SlideOverview.prototype = {
		_init: function(){
			var self = this;
			document.addEventListener("contentLoad",function(){
				if (app.loaded.id === 'placebo') {
					self.overviewButton = document.querySelector("#antlogo");
					self.overviewButton.addEventListener("longTouch",function(e){
						touchy.stop(e);
						app.transPopup.show('slide_overview');
						self._build();
					});
				}
			})
		},
		_build: function(){
			var slideContainer = document.querySelector(".overview-thumb-container");
			var pStoryboard = app.json.storyboard[0];
		    var pSlideshows = app.json.structures[pStoryboard].content;
			var markup = '';

			for (var i = 0; i < pSlideshows.length; i++) {
				var pSlides = app.json.structures[pSlideshows[i]];
				for (var y = 0; y < pSlides.content.length; y++) {
				  markup += '<div class="overview-thumb" data-link="'+pSlideshows[i]+'.'+pSlides.content[y]+'"><img src="content/img/thumbs/'+pSlides.content[y]+'.jpg" /></div>';
				};
			};

			slideContainer.innerHTML = markup;
			this._connect(slideContainer);
		},
		_navigate: function(event){
			var attr, content, ele, linkArr, name, subcontent;
			ele = event.target;
			var pStoryboard = app.json.storyboard[0];
			if (ele.nodeType === 3 || ele.nodeType === 1) ele = ele.parentNode;
			attr = ele.getAttribute('data-link');
			if (attr) {
				linkArr = attr.split('.');
				name = pStoryboard;
				content = linkArr[0] || '';
				subcontent = linkArr[1] || '';
				return app.goTo(name, content, subcontent);
			}
		},
		_connect: function(ele){
			return ele.addEventListener('tap', this._navigate);
		}
	};
})();