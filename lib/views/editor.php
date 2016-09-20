<header class="bg-inverse text-center center-vertically" role="banner">
  <div class="editor-container">
    <div id='threejs-demo'>
	<div id='editor'> </div>
  </div>
  
</header>

<!--Feature Specific Scripts (be sure they load after the js in the footer with document.ready-->
<script src="/vendor/threejs/build/three.js"></script>
<script src="/vendor/threejs/external/OrbitControls.js"></script>
<script src='/vendor/threejs/external/dat.gui.min.js'></script>
<script src="/vendor/threejs/external/stats.min.js"></script>
<script src="/vendor/threejs/external/STLExporter.js"></script>
<script src="/js/3ddemo.js"></script>


<style type="text/css">
	body {
		overflow: hidden;
		color: #000;
		font-family:Monospace;
		font-size:13px;
		text-align:center;
		background-color: #000;
		margin: 0px;
	}
	.dg {margin-top: 5%;}
	.section-footer { display:  none;}
</style>