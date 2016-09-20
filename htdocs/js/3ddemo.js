function readyFunction(){

	/*global variables*/
	var scene, camera, renderer;
	var controls, guiControls, datGUI;
	var stats;
	var spotLight, hemi;
	var SCREEN_WIDTH, SCREEN_HEIGHT;
	var loader, model;
	

	function init(){
		/*creates empty scene object and renderer*/
		scene = new THREE.Scene();
		camera =  new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 500);
		renderer = new THREE.WebGLRenderer({antialias:true});
		
		renderer.setClearColor(0x333300);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMapEnabled= true;
		renderer.shadowMapSoft = true;
		
		/*add controls*/
		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.addEventListener( 'change', render );
					
		camera.position.x = 200;
		camera.position.y = 200;
		camera.position.z = 200;    
		camera.lookAt(scene.position);

		/*datGUI controls object*/
		guiControls = new function(){
			this.Bone_0 = 0.0;
			this.Bone_1 = 0.0;
			this.Bone_2 = 0.0;
			this.Bone_3 = 0.0;
			
			this.rotationX  = 0.0;
			this.rotationY  = 0.0;
			this.rotationZ  = 0.0;
			
			this.lightX = 131;
			this.lightY = 107;
			this.lightZ = 180;
			this.intensity = 1.5;       
			this.distance = 373;
			this.angle = 1.6;
			this.exponent = 38;
			this.shadowCameraNear = 34;
			this.shadowCameraFar = 2635;
			this.shadowCameraFov = 68;
			this.shadowCameraVisible=false;
			this.shadowMapWidth=512;
			this.shadowMapHeight=512;
			this.shadowBias=0.00;
			this.shadowDarkness=0.11;
			
			this.scene = function(){
				console.log(scene);
			};		   
		}
		
		//add some nice lighting
		hemi = new THREE.HemisphereLight( 0xff0090, 0xff0011 );
		scene.add(hemi);
		//add some fog
		scene.fog = new THREE.Fog( 0xffff90, .01, 500 );
  
		/*adds spot light with starting parameters*/
		spotLight = new THREE.SpotLight(0xffffff);
		spotLight.castShadow = true;
		spotLight.position.set (20, 35, 40);
		spotLight.intensity = guiControls.intensity;        
		spotLight.distance = guiControls.distance;
		spotLight.angle = guiControls.angle;
		spotLight.exponent = guiControls.exponent;
		spotLight.shadowCameraNear = guiControls.shadowCameraNear;
		spotLight.shadowCameraFar = guiControls.shadowCameraFar;
		spotLight.shadowCameraFov = guiControls.shadowCameraFov;
		spotLight.shadowCameraVisible = guiControls.shadowCameraVisible;
		spotLight.shadowBias = guiControls.shadowBias;
		spotLight.shadowDarkness = guiControls.shadowDarkness;
		scene.add(spotLight);
		
		/*add loader call add model function*/
		loader = new THREE.JSONLoader();
		loader.load( '/test/models/human3.js', addModel );
		
		/*adds controls to scene*/
		datGUI = new dat.GUI();
		
		/*edit bones*/
		datGUI.add(guiControls, "scene");
		var cfolder = datGUI.addFolder('Controls');
		
		cfolder.add(guiControls, 'Bone_0',-3.14, 3.14);     
		cfolder.add(guiControls, 'Bone_1',-3.14, 3.14);
		cfolder.add(guiControls, 'Bone_2',-3.14, 3.14);      
		cfolder.add(guiControls, 'Bone_3',-3.14, 3.14);         
		

		
		var lfolder = datGUI.addFolder('Lights');
		lfolder.add(guiControls, 'lightX',-60,400); 
		lfolder.add(guiControls, 'lightY',0,400);   
		lfolder.add(guiControls, 'lightZ',-60,400);
		
		lfolder.add(guiControls, 'intensity',0.01, 5).onChange(function(value){
			spotLight.intensity = value;
		});     
		lfolder.add(guiControls, 'distance',0, 1000).onChange(function(value){
			spotLight.distance = value;
		}); 
		lfolder.add(guiControls, 'angle',0.001, 1.570).onChange(function(value){
			spotLight.angle = value;
		});     
		lfolder.add(guiControls, 'exponent',0 ,50 ).onChange(function(value){
			spotLight.exponent = value;
		});
		lfolder.add(guiControls, 'shadowCameraNear',0,100).name("Near").onChange(function(value){       
			spotLight.shadowCamera.near = value;
			spotLight.shadowCamera.updateProjectionMatrix();        
		});
		lfolder.add(guiControls, 'shadowCameraFar',0,5000).name("Far").onChange(function(value){
			spotLight.shadowCamera.far = value;
			spotLight.shadowCamera.updateProjectionMatrix();
		});
		lfolder.add(guiControls, 'shadowCameraFov',1,180).name("Fov").onChange(function(value){
			spotLight.shadowCamera.fov = value;
			spotLight.shadowCamera.updateProjectionMatrix();
		});
		lfolder.add(guiControls, 'shadowCameraVisible').onChange(function(value){
			spotLight.shadowCameraVisible = value;
			spotLight.shadowCamera.updateProjectionMatrix();
		});
		lfolder.add(guiControls, 'shadowBias',0,1).onChange(function(value){
			spotLight.shadowBias = value;
			spotLight.shadowCamera.updateProjectionMatrix();
		});
		lfolder.add(guiControls, 'shadowDarkness',0,1).onChange(function(value){
			spotLight.shadowDarkness = value;
			spotLight.shadowCamera.updateProjectionMatrix();
		});
		datGUI.close();
		$("#editor").append(renderer.domElement);
		/*stats*/
		stats = new Stats();        
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';     
		$("#editor").append( stats.domElement );
	}
	var set = [];
	var helpset = [];
	var scaleVal = 3;
	function addModel( geometry,  materials ){
  
		for (var i = 0;i < 1; i++){
			materials[0].skinning = true;

			var cs = 15;
			
			set[i]= new THREE.SkinnedMesh( geometry, new THREE.MeshFaceMaterial(materials) );
			set[i].position.set(0,0,0);
			set[i].scale.set (cs, cs, cs);
			set[i].castShadow = true;
			set[i].receiveShadow = true;
			
			scene.add(set[i]);
			helpset[i] = new THREE.SkeletonHelper(set[i]);
			//scene.add(helpset[i]);
		   
		}        

	}
		
	function render() { 
		spotLight.position.x = guiControls.lightX;
		spotLight.position.y = guiControls.lightY;
		spotLight.position.z = guiControls.lightZ;

		scene.traverse(function(child){
			if (child instanceof THREE.SkinnedMesh){
				
				/*child.skeleton.bones[0].rotation.z = guiControls.Bone_0;
				child.skeleton.bones[1].rotation.z = guiControls.Bone_1;
				child.skeleton.bones[2].rotation.z = guiControls.Bone_2;
				child.skeleton.bones[3].rotation.z = guiControls.Bone_3;  */              
			}
			else if  (child instanceof THREE.SkeletonHelper){
				child.update();
			}
		});

	}
	
	function animate(){
		requestAnimationFrame(animate);
    render();
    stats.update();
    renderer.render(scene, camera);
    }
    
    init();
    animate();
    
    
    $(window).resize(function(){
        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;
        camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    });	

    window.poseModel = function(){
    	pose = getTestPose()
    	console.log(pose)
    	scene.traverse(function(child){
			if (child instanceof THREE.SkinnedMesh){
				for (var j = 0; j < child.skeleton.bones.length; j++){
					var bone = child.skeleton.bones[j]
					// Todo: Have the blender script store bones as <name>:<quat> entries in a dictionary to avoid this loop.
					for (var i = 0; i < pose.bones.length; i++){
						if (bone.name == pose.bones[i].bone_name){
							//bone.use_quaternion = false
							bone.rotation.x = pose.bones[i].rotation[0];
							bone.rotation.z = pose.bones[i].rotation[1];
							bone.rotation.y = pose.bones[i].rotation[2];
							console.log(bone.name + ": ")
							console.log(bone.rotation)
							break;
						}
					}
				}
			}
		});
    }

    function getTestPose(){
    	return JSON.parse(
    	'{"pose_name":"test", "bones":[{"bone_name":"Bone", "rotation":[0.0, -0.0, 0.0]}, {"bone_name":"Bone.001", "rotation":[-0.5169146656990051, 2.3667515091307066e-15, -1.5015154003234377e-15]}, {"bone_name":"Bone.002", "rotation":[-0.38898542523384094, -8.905615800358646e-09, -4.5210114762994635e-08]}, {"bone_name":"Bone.003", "rotation":[-0.46276766061782837, 1.2870769395065132e-15, 1.5151210787969467e-15]}, {"bone_name":"Bone.004", "rotation":[-0.7267451882362366, -6.508269765061431e-16, -8.131977926597537e-15]}, {"bone_name":"Bone.005", "rotation":[-0.034132782369852066, -1.346892237663269, 0.033223312348127365]}, {"bone_name":"Bone.006", "rotation":[0.0, -0.0, 0.0]}, {"bone_name":"Bone.007", "rotation":[0.0, -0.0, 0.0]}, {"bone_name":"Bone.008", "rotation":[0.03229135274887085, -1.8860628604888916, -0.00625944696366787]}, {"bone_name":"Bone.009", "rotation":[0.0, -0.0, 0.0]}, {"bone_name":"Bone.010", "rotation":[0.0, -0.0, 0.0]}, {"bone_name":"Bone.011", "rotation":[-1.1781902313232422, -5.2043148457414645e-08, -7.788023737020922e-08]}, {"bone_name":"Bone.012", "rotation":[-0.9935380220413208, -1.3527398756707498e-08, -2.497913342836e-08]}, {"bone_name":"Bone.013", "rotation":[-1.1429895162582397, 0.01410286221653223, -0.010143972933292389]}, {"bone_name":"Bone.014", "rotation":[-1.6192706823349, -3.9927246689330786e-05, -1.51184349306277e-05]}, {"bone_name":"Bone.017", "rotation":[-1.251051664352417, -3.201615618309006e-05, 1.672415601206012e-05]}, {"bone_name":"Bone.018", "rotation":[-0.5709238052368164, -1.7374009985360317e-05, 1.307887305301847e-05]}, {"bone_name":"Bone.015", "rotation":[0.9189460873603821, 1.0137181050140498e-07, -2.170802417822415e-07]}, {"bone_name":"Bone.016", "rotation":[0.6754739284515381, -1.902861335167927e-08, 5.472164232855903e-08]}, {"bone_name":"Bone.019", "rotation":[0.6843975186347961, -1.811793204353762e-08, 5.583206075243652e-08]}, {"bone_name":"Bone.020", "rotation":[0.483955055475235, 1.734193588731614e-08, -7.02543445640913e-08]}]}'
    	);
    }
}

$(document).ready(readyFunction);