
// Todo: thumbs
(function(){
    var currentThumbs;
    var Thumbs = function(){
        var self = this;
        currentThumbs = this;

        var isTouch = 'ontouchstart' in window;

	    self.start = isTouch ? 'touchstart' : 'mousedown';
	    self.move = isTouch ? 'touchmove' : 'mousemove';
	    self.end = isTouch ? 'touchend' : 'mouseup';

        // Todo: Events determination
        document.addEventListener('contentLoad', this.collectionLoad);

        window.addEventListener('slideEnter',function(){
            self.slideSlideEnter();
        });

        window.addEventListener('slideExit',function(){
            self.slideExit();
        });

        window.addEventListener('sectionEnter',function(){
            self.sectionEnter();
        });

        window.addEventListener('sectionExit',function(){
            self.sectionExit();
        });
        
    };

    Thumbs.prototype.callEvent = function(eventName){
        var event = document.createEvent("UIEvents");
        event.initEvent(eventName, false, false);
        document.dispatchEvent(event);
    };

    Thumbs.prototype.collectionLoad = function(){
        var self = currentThumbs;

        document.removeEventListener('contentLoad', currentThumbs.collectionLoad);

        if (self.firstInited){
            return;
        }

        self.firstInited = true;

        self.thumbElement = document.getElementById('thumbs');
        self.thumbButton = document.querySelector('#mainfooter .thumb-button');
        self.thumbButtonPlaceholder = document.querySelector('#mainfooter .thumb-button-placeholder');
        self.previewElement = document.createElement('ul');
        self.previewElement.className = 'preview-container';
        self.thumbElement.appendChild(self.previewElement);
        self.indicatorElement = document.querySelector('#mainfooter .indicators');

        self.thumbButton.addEventListener(self.start,function(e){
            e.stopPropagation();
            e.preventDefault();
            self.openClose(e);
        },false);

        self.thumbElement.addEventListener(self.start, function(e){
            e.stopPropagation();
            e.preventDefault();
        },false);

        self.callEvent('thumbLoad');
    };

    Thumbs.prototype.showThumb = function(){
        var self = this;

        window.util.addClass(self.thumbButton, 'show');
        window.util.addClass(self.thumbElement, 'transition');
    };



    Thumbs.prototype.openClose = function(){
        var self = this;

        if (window.util.hasClass(self.thumbButton, 'on')) {
            self.callEvent('thumbClosed')
            window.util.removeClass(self.thumbButton, 'on');
            window.util.removeClass(self.thumbElement, 'active');
            
        } else {
            self.callEvent('thumbOpened');
            window.util.addClass(self.thumbButton, 'on');
            window.util.addClass(self.thumbElement, 'active');

        }
    };

    Thumbs.prototype.hideThumb = function(){
        var self = this;

        window.util.removeClass(self.thumbButton, 'show');
        window.util.removeClass(self.thumbButton, 'on');
        window.util.removeClass(self.thumbElement, 'active');
        window.util.removeClass(self.thumbElement, 'transition');
    };

    Thumbs.prototype.buildPreview = function(){
        var self = this;

        var len = app.slideshow.content.length;

        for (var i = 0; i < len; i++){
            var li = document.createElement('li'),
                name = app.slideshow.content[i];
            
            li.setAttribute('data-name', name);
            self.previewElement.appendChild(li);

            var indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.setAttribute('data-ind-name', name);

            self.indicatorElement.appendChild(indicator);

            li.innerHTML = '<img src="content/img/thumbs/'+name+'.jpg" data-slide="' + name + '" alt="' + name + '" />';
            
            li.addEventListener(self.start,function(e){
                e.stopPropagation();
                e.preventDefault();

                var name = this.getAttribute('data-name');
                if (name != app.slideshow.current) {
                    app.slideshow.scrollTo(name);
                } else {
                    self.openClose();
                }

            },false)
        }
    };

    Thumbs.prototype.changeActive = function(index){
        var self = this;

        var name = app.slideshow.content[index],
            inds = self.indicatorElement.querySelectorAll('.indicator'),
            lis = self.thumbElement.querySelectorAll('li');
        
        for (var i = 0; i < inds.length; i++){
            if (name != inds[i].getAttribute('data-ind-name')){
                window.util.removeClass(inds[i], 'active');
                window.util.removeClass(lis[i], 'active');
            } else {
                window.util.addClass(inds[i], 'active');
                window.util.addClass(lis[i], 'active');
            }
        }

    };

    Thumbs.prototype.destroyPreview = function(){
        var self = this;

        self.previewElement.innerHTML = '';
        self.indicatorElement.innerHTML = '';
    };

    Thumbs.prototype.slideSlideEnter = function(){
        var self = this;

        if (app.slideshow.content.length > 1){
            self.changeActive(app.slideshow.currentIndex);
        }
    };

    Thumbs.prototype.slideExit = function(){

    };

    Thumbs.prototype.sectionEnter = function(){
        var self = this;

        if (app.slideshow.content.length > 1){
            self.showThumb();
            self.buildPreview();
        }
        else{
            window.util.addClass(self.thumbButtonPlaceholder, 'show');
        }        
    };

    Thumbs.prototype.sectionExit = function(){
        var self = this;

        self.hideThumb();
        self.destroyPreview();  
    };

    window.thumbs = new Thumbs();

})();

