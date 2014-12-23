(function(global) {
 
  //debug();

  // Creating our presentation and global namespace "app"
  global.app = new Presentation({
    globalElements: ['mainmenu', 'mainfooter', 'slidePopup', 'popupBackButton'],
    type: 'json',
    manageMemory: true
  });
  
  // Initiate modules
  app.scroller = new Slidescroller();
  app.slidePopup = new SlidePopup('slidePopup','popupBackButton');
  app.analytics.init({
    version: '0.92',
    offsetChapters: 1
  });
  // app.pager = new Pager({
  //   appendTo: 'mainmenu'
  // });
  // app.menu = new AutoMenu({
  //  attachTo: ['api_demo']
  // });
  
    app.slideOverview = new SlideOverview();

  // Initialize presentation
  app.init();
  
})(window);


// Prevent vertical bouncing of slides
document.ontouchmove = function(e) {
   e.preventDefault();
};