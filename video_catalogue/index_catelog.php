<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <!-- SITE META -->
    <title>Content Channel | Om Server</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="keywords" content="">

    <!-- FAVICONS -->
    <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="57x57" href="images/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="images/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="images/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="images/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="images/apple-touch-icon-152x152.png">

    <!-- BOOTSTRAP STYLES -->
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <!-- TEMPLATE STYLES -->
    <link rel="stylesheet" type="text/css" href="style.css">
    <!-- RESPONSIVE STYLES -->
    <link rel="stylesheet" type="text/css" href="css/responsive.css">
    <!-- COLORS STYLES -->
    <link rel="stylesheet" type="text/css" href="css/colors.css">
    <!-- CUSTOM STYLES -->
    <link rel="stylesheet" type="text/css" href="css/custom.css">

    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>
<body>
<?php

//get variable for root folder and title of the page
$rootFolder = "../recordings/";
//echo $rootFolder;
$pageTitle = "Archived Videos";  
$fftime = '1';

if (isset($_GET['fft'])) {
    if (empty($_GET['fft'])) {
        $fftime = '1';
    } else { 
        $fftime = $_GET['fft'];
    }
}

//$fftime = $_GET['fft']; 
 
?>
<script>
//set javascript variables
    var rootFolder = '<?php echo $rootFolder; ?>';
	var pageTitle = '<?php echo $pageTitle; ?>';
	var fftime = '<?php echo $fftime; ?>';
    //alert(rootFolder);
</script>
<?php
include 'loadfile.php';
?>	
    <!-- PRELOADER -->
        <div class="cssload-container">
            <div class="cssload-loader"></div>
        </div>
    <!-- end PRELOADER -->

    <!-- ******************************************
    START SITE HERE
    ********************************************** -->

    <div id="wrapper">
        <div class="page-title section lb" style="background-color:#6ecbf5">
            <div class="container">
                <div class="clearfix">
                <div class="title-area pull-left">
                    <h2><?php echo ($pageTitle) ?> <small>EXPLORE | LEARN | SHARE</small></h2>
                </div><!-- /.pull-right -->
                <div class="pull-right hidden-xs">
                    <div class="bread">
                        <ol class="breadcrumb">
                            <li><a href="#"> </a></li>
                            <li class="active"> </li>
                        </ol>
                    </div><!-- end bread -->
                </div><!-- /.pull-right -->
                </div><!-- end clearfix -->
            </div>
        </div><!-- end page-title -->

        <div class="section">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="our-team-content">
                            <div id="dynalist" class="row">
                                <!--start loop -->
                                <!-- end loop -->
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- end container -->
        </div><!-- end section -->

        <footer class="copyrights">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <div class="copylinks">
                            <p>Copyrights &copy; 2017-19 <a href="http://omserver.org/"> OmServer Pvt Ltd</a> All Rights Reserved.</p>
                        </div><!-- end links -->
                    </div><!-- end col -->

                    <div class="col-md-6 col-sm-12">
                        <div class="footer-social text-right">
                            <a class="dmtop" href="#"><i class="fa fa-angle-up"></i></a>
                        </div>
                    </div><!-- end col -->
                </div><!-- end row -->
            </div><!-- end container -->
        </footer><!-- end copyrights -->
    </div><!-- end wrapper -->

    <!-- ******************************************
    /END SITE
    ********************************************** -->

    <!-- ******************************************
    DEFAULT JAVASCRIPT FILES
    ********************************************** -->
    <script src="js/all.js"></script>
    <script src="js/custom.js"></script>
	<script>
	var dynalisttext = "";
	var all3itemsarrray = fullinfo.split("$$");
var contentlocation = all3itemsarrray[0];
var filelisttemp = all3itemsarrray[2];
var filelistarray = filelisttemp.split("|");
//filelistarray = filelistarray.splice(0,1);
    
	for(var i=1; i<filelistarray.length; i++)
	{
	     var currentfilename = filelistarray[i].trim();
		 var fullpath = contentlocation+currentfilename;
		 var currentfilename_woext = currentfilename.substr(0,currentfilename.lastIndexOf("."));
		 dynalisttext += '<div class="col-md-4 col-sm-6 col-xs-12"> <div class="single-team-member" style="padding:5px;padding-bottom:10px;"> <div class="team-member-img"> <video width="320" height="240" controls style="margin-left: auto;margin-right: auto;display: block"> <source src="'+fullpath+'#t='+fftime+'" type="video/mp4"> Your browser does not support the video tag. </video> </div> <div class="team-member-name" style="padding:10px;font-size:12;height:60px;"> <p>'+currentfilename_woext+'</p> </div> </div> </div>'
	}
	
	console.log(dynalisttext);
	$("#dynalist").html(dynalisttext);
	</script>
</body>

<!-- Mirrored from psdconverthtml.com/live/edupress/page-team.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 24 Apr 2017 12:47:03 GMT -->
</html>
