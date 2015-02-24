/* global PIXI:false, FrontCore:false, MonoBand:false */

'use strict';

/**
 * @fileoverview Entry point.
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */

// TODO: Find JSDoc best practice !
// TODO: Define coding conventions.

(function() {

  // Create a canvas.
  var canvas = document.createElement('canvas');
  document.getElementById('canvas-container').appendChild(canvas);

  // Set canvas scale for pixel ratio.
  if(navigator.isCocoonJS) {
    canvas.screencanvas = true;
  } else {
    var canvasScale = 1 / window.devicePixelRatio;
    canvas.style.webkitTransform = 'scale3d(' + canvasScale + ',' + canvasScale + ',' + canvasScale + ')';
    canvas.style.webkitTransformOrigin = '0 0';
    canvas.style.transform = 'scale3d(' + canvasScale + ',' + canvasScale + ',' + canvasScale + ')';
    canvas.style.transformOrigin = '0 0';
  }


  // Create a Pixi.js renderer.
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {view: canvas, resolution: window.devicePixelRatio});

  // Create a stage.
  var stage = new PIXI.Stage(0x222222);

  // Render screen in every animation frame.
  var animate = function() {
    window.requestAnimFrame(animate);
    renderer.render(stage);
  };
  animate();


  // Initialize scene manager.
  var sceneManager = new FrontCore.SceneManager(stage);

  // TODO: Initialize Scenes.
  sceneManager.addScene('topMenu', new MonoBand.Scenes.TopMenu());
//   sceneManager.addScene('selectInstrument', new MonoBand.Scenes.SelectInstrument());
//   sceneManager.addScene('selectKey', new MonoBand.Scenes.SelectKey());
//   sceneManager.addScene('selectTempo', new MonoBand.Scenes.SelectTempo());
//   sceneManager.addScene('playGuitar', new MonoBand.Scenes.PlayGuitar());
//   sceneManager.addScene('playBass', new MonoBand.Scenes.PlayBass());
//   sceneManager.addScene('playKeyboard', new MonoBand.Scenes.PlayKeyboard());
//   sceneManager.addScene('playDrum', new MonoBand.Scenes.PlayDrum());
//   ...

  // ↓はサンプル
  // sceneManager.addScene('intro', new MonoBand.Scenes.Menu());
  // sceneManager.addScene('menu', new MonoBand.Scenes.Menu());

  // Set prelaod scene.
  sceneManager.preloadScene = new MonoBand.Scenes.Preload();

  sceneManager.addEventListener(FrontCore.SceneManager.EventType.SCENE_CHANGED, function(event) {
    console.debug(event);
  });


  // Adjust renderer size when window resized.
  window.addEventListener('resize', function() {
    console.debug('window.resize');

    renderer.resize(window.innerWidth, window.innerHeight);

    // TODO: SceneManager に持たせて方が良い？
    if(sceneManager.getCurrentScene()) {
      sceneManager.getCurrentScene().updateLayout();
    }
  }, false);


  // Adjust renderer size when orientation changed.
  window.addEventListener('window.orientationchange', function() {
    if(90 === window.orientation || -90 === window.orientation) {
      console.debug('window.orientationchange(landscape)');

      // TODO: CocoonJS can not detect landscape ?

      // Workarounds for iOS Safari landscape bug.
      document.body.scrollTop = 0;
    } else {
      console.debug('window.orientationchange(portrait)');
    }

    renderer.resize(window.innerWidth, window.innerHeight);

    // TODO: SceneManager に持たせて方が良い？
    if(sceneManager.getCurrentScene()) {
      sceneManager.getCurrentScene().updateLayout();
    }
  }, false);

  sceneManager.preloadScene.addEventListener(
   FrontCore.Scene.EventType.LOAD_COMPLETE, function(event) {

    // Hide splash screen when first scene ready.
    if(!navigator.isCocoonJS) {
      var fadeTime = 600;
      var displayTime = 800;

      // TODO: Restore splash delay.
      // var splashDelay = displayTime + fadeTime - (Date.now() - window.splashImageShownTime);
      var splashDelay = 0;

      setTimeout(function() {
        document.getElementById('splash-screen').classList.add('hide');

        setTimeout(function() {
          document.body.removeChild(document.getElementById('splash-screen'));
          sceneManager.gotoScene('topMenu');
        }, fadeTime);
      }, splashDelay);
    } else {
      sceneManager.gotoScene('topMenu');
    }

   }.bind(this));

  sceneManager.preloadScene.load();

})();