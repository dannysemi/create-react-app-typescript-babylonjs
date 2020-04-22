import {Engine,Scene, SceneLoader,Animation} from '@babylonjs/core';
import '@babylonjs/loaders'
console.log("Hello from worker!")

var canvas;
var engine;
onmessage = function(evt) {

    if (evt.data.canvas) {
        canvas = evt.data.canvas;

        engine = new Engine(canvas, true);
        //engine.enableOfflineSupport = false;
        var scene = createScene();
        
        engine.runRenderLoop(function() {
            engine.resize();
            if (scene.activeCamera) {
                scene.render();
            }
        });
    } else {
        canvas.width = evt.data.width;
        canvas.height = evt.data.height;
    }
}

var createScene = function () {
    
    var scene = new Scene(engine);  

    //SceneLoader.ImportMesh("", "/assets/", "flightHelmet.glb", scene, function (meshes) {  
    SceneLoader.ImportMesh("", "https://models.babylonjs.com/", "flightHelmet.glb", scene, function (meshes) {          
        scene.createDefaultCameraOrLight(true, true, true);
		scene.createDefaultEnvironment();
		
        meshes[0].rotationQuaternion = null;        
		Animation.CreateAndStartAnimation("turnTable", meshes[0], "rotation.y", 60, 480, 0, Math.PI * 2);
    });

    return scene;
};