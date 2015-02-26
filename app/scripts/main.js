'use strict';

/**
 * @fileoverview MonoBand のメインスクリプト（エントリポイント）です。
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


(function() {

  // Canvas を生成
  var canvas = document.createElement('canvas');
  document.getElementById('canvas-container').appendChild(canvas);

  // PixiJS レンダラーを初期化（Canvas のサイズが「スクリーンサイズ x 端末のピクセル比」になる）
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {view: canvas, resolution: window.devicePixelRatio});

  // 端末のピクセル比に合わせて Canvas 縮小
  if(navigator.isCocoonJS) {
    // CocoonJS ならこれでスクリーンにフィットされる
    canvas.screencanvas = true;
  } else {
    // ブラウザでは CSS Transform で縮小させる
    var canvasScale = 1 / window.devicePixelRatio;
    canvas.style.webkitTransform = 'scale3d(' + canvasScale + ',' + canvasScale + ',' + canvasScale + ')';
    canvas.style.webkitTransformOrigin = '0 0';
    canvas.style.transform = 'scale3d(' + canvasScale + ',' + canvasScale + ',' + canvasScale + ')';
    canvas.style.transformOrigin = '0 0';
  }
  
  // PixiJS ステージ生成（ここに追加された要素が画面に表示される）
  var stage = new PIXI.Stage(0x222222);

  // 毎フレームごとに画面を描画
  var animate = function() {
    window.requestAnimFrame(animate);
    renderer.render(stage);
  };
  animate();


  // シーン管理オブジェクトを生成
  var sceneManager = new FrontCore.SceneManager(stage);

  // TODO: MonoBand で使われるシーンを登録
  sceneManager.addScene('topMenu', new MonoBand.Scenes.TopMenu());
//   sceneManager.addScene('selectInstrument', new MonoBand.Scenes.SelectInstrument());
//   sceneManager.addScene('selectKey', new MonoBand.Scenes.SelectKey());
//   sceneManager.addScene('selectTempo', new MonoBand.Scenes.SelectTempo());
//   sceneManager.addScene('playGuitar', new MonoBand.Scenes.PlayGuitar());
//   sceneManager.addScene('playBass', new MonoBand.Scenes.PlayBass());
//   sceneManager.addScene('playKeyboard', new MonoBand.Scenes.PlayKeyboard());
//   sceneManager.addScene('playDrum', new MonoBand.Scenes.PlayDrum());
//   ...

  // プレローディング用のシーンを設定
  sceneManager.preloadScene = new MonoBand.Scenes.Preload();
  
  // デバッグ用（シーンが正常に切り替わったらログが出力される）
  sceneManager.addEventListener(FrontCore.SceneManager.EventType.SCENE_CHANGED, function(event) {
    console.debug(event);
  });

  // プレローディング用のシーンがロードされたら最初のシーン表示
  sceneManager.preloadScene.addEventListener(
   FrontCore.Scene.EventType.LOAD_COMPLETE, function() {

    if(!navigator.isCocoonJS) {
      // ブラウザで実行される時はスプラッシュスクリーンを非表示してから
      
      var fadeTime = 600; // スプラッシュスクリーンのフェードアウト時間
      var displayTime = 600; // スプラッシュスクリーンを表示させる最低限の時間

      // TODO: スクリプトが既にキャッシュされてたらスプラッシュスクリーンが一瞬で消えてしまうのでちょっと待たせる
//       var splashDelay = displayTime + fadeTime - (Date.now() - window.splashImageShownTime);
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

  // プレローディング用のシーンをロード
  sceneManager.preloadScene.load();


  // Window がリサイズされた時の処理
  window.addEventListener('resize', function() {
    console.debug('window.resize');

    // PixiJS のレンダラーをスクリーンサイズにフィット
    renderer.resize(window.innerWidth, window.innerHeight);

    // TODO: SceneManager に持たせて方が良い？
    if(sceneManager.getCurrentScene()) {
      sceneManager.getCurrentScene().updateLayout();
    }
  }, false);


  // 画面向きが変わった時の処理
  window.addEventListener('window.orientationchange', function() {
    if(90 === window.orientation || -90 === window.orientation) {
      console.debug('window.orientationchange(landscape)');

      // TODO: CocoonJS では Landcape を検知できない？

      // iOS Safari の Landcape バグ対応
      document.body.scrollTop = 0;
    } else {
      console.debug('window.orientationchange(portrait)');
    }

    // PixiJS のレンダラーをスクリーンサイズにフィット
    renderer.resize(window.innerWidth, window.innerHeight);

    // TODO: SceneManager に持たせて方が良い？
    if(sceneManager.getCurrentScene()) {
      sceneManager.getCurrentScene().updateLayout();
    }
  }, false);

})();