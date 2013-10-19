<?php /* load config */ include('../config/config.php');?>
<!DOCTYPE html>
<html lang="en" ng-app="zbierak">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Collection of funny pictures found in web">
    <meta name="author" content="Pawel 'Wolv' Nejczew">
    <!-- <link rel="shortcut icon" href="<?=CDN_URL?>/assets/ico/favicon.png"> -->

    <title>Zbierak 2.0</title>

    <!-- Bootstrap core CSS -->
    <link href="<?=CDN_URL?>css/bootstrap.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="<?=CDN_URL?>css/starter-template.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="../../assets/js/html5shiv.js"></script>
      <script src="../../assets/js/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>
    <shortcut></shortcut>
    <div class="container row-fluid" style="height: 100%;">
        <div ng-view class="row-fluid span12 " style="height: 100%; display: block;"></div>
    </div><!-- /.container -->

    <script type="text/javascript">
        var APP_URL = "<?=APP_URL?>"; 
        var IMAGES_URL = "<?=IMAGES_URL?>"; 
        var CDN_URL = "<?=CDN_URL?>"; 
        var ENVIRONMENT = "<?=ENVIRONMENT?>"; 
    </script>

    <script src="http://code.jquery.com/jquery-1.10.1.min.js" type="text/javascript"></script>
    <script src="<?=CDN_URL?>lib/angular/angular.min.js" type="text/javascript"></script>

    <link href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" rel="stylesheet">

    <script src="<?=CDN_URL?>lib/angular/angular-resource.min.js"></script>
    <script src="<?=CDN_URL?>lib/angular/angular-route.min.js"></script>
    <script src="<?=CDN_URL?>lib/angular/angular-animate.min.js"></script>
    <script src="<?=CDN_URL?>lib/angular/angular-cookies.min.js"></script>

    <script src="<?=CDN_URL?>lib/ui-bootstrap/ui-bootstrap-0.6.0.min.js"></script>

    <script src="<?=CDN_URL?>js/app.js" type="text/javascript"></script>
    <script src="<?=CDN_URL?>js/services.js" type="text/javascript"></script>
    <script src="<?=CDN_URL?>js/controllers.js" type="text/javascript"></script>
    <script src="<?=CDN_URL?>js/filters.js" type="text/javascript"></script>
    <script src="<?=CDN_URL?>js/directives.js" type="text/javascript"></script>

    <script src="<?=CDN_URL?>js/jquery-ui.min.js" type="text/javascript"></script>
    <script src="<?=CDN_URL?>js/slider.js" type="text/javascript"></script>
    <script src="<?=CDN_URL?>js/ui-bootstrap-tpls-0.6.0.js"></script>

    <script src="<?=CDN_URL?>lib/screenfull.js" type="text/javascript"></script>
  </body>
</html>
