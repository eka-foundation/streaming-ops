<?php
/*
 Folder Tree with PHP and jQuery.

 R. Savoul Pelister
 http://techlister.com

*/

//echo $characters[0]->DISPLAY_NAME;
class treeview {

	private $files;
	private $folder;
	
	function __construct( $path ) {
		
		$files = array();	
		
		if( file_exists( $path)) {
			if( $path[ strlen( $path ) - 1 ] ==  '/' )
				$this->folder = $path;
			else
				$this->folder = $path . '/';
			
			$this->dir = opendir( $path );
			//--------------
			/*
			$files = scandir($path);
			foreach ($files as $file) {
				$filename = iconv ( "windows-1251" , "UTF-8", $file );
				echo $filename ."\n";
			}
			*/
			//---------------
			while(( $file = readdir( $this->dir ) ) != false )
			{
				//echo ",,".$file;
				$this->files[] = $file;
			}
			closedir( $this->dir );
		}
	}

	function create_tree( ) 
	{
		/*$url = 'courseTopicSubTopicJson.json'; // path to your JSON file
		$data = file_get_contents($url); // put the contents of the file into a variable
		for ($i = 0; $i <= 31; ++$i) 
		{ 
			$data = str_replace(chr($i), "", $data); 
		}
		$data = str_replace(chr(127), "", $data);

		// This is the most common part
		// Some file begins with 'efbbbf' to mark the beginning of the file. (binary level)
		// here we detect it and we remove it, basically it's the first 3 characters 
		if (0 === strpos(bin2hex($data), 'efbbbf'))
		{
		   $data = substr($data, 3);
		}
		$characters = json_decode($data); // decode the JSON feed*/
		if( count( $this->files ) > 2 ) { /* First 2 entries are . and ..  -skip them */
		//print_r($this->files);
			natcasesort( $this->files );
			//$list = '<ul class="filetree" style="display: block;"><div class="custom_div">';
			$list = '';
			$currentfolder = $this->folder;
			$folderlist = '';
			$filelist = '';

			// Group folders first
			foreach( $this->files as $file ) {
				if( file_exists( $this->folder . $file ) && $file != '.' && $file != '..' && is_dir( $this->folder . $file )) {
					//$list .= '<li class="folder collapsed"><a href="#" rel="' . htmlentities( $this->folder . $file ) . '/">' . htmlentities( $file ) . '</a></li>';
					//$list .= '';
					$folderlist .= '|'.htmlentities( $file );
				}
				/* else if( $file != '.' && $file != '..' ) {
					$list .= '<li class="folder collapsed"><a href="#" rel="' . htmlentities( 'Sample\Folder1 (???)' ) . '/">' . 'Folder1 (???)' . '</a></li>';
				} */

			}
			// Group all files
			foreach( $this->files as $file ) {
				if( file_exists( $this->folder . $file ) && $file != '.' && $file != '..' && !is_dir( $this->folder . $file )) {
				    $filelist .= '|'.htmlentities( $file );
					/*$ext = preg_replace('/^.*\./', '', $file);
					checkQaFileExistense($characters,htmlentities( $file ),htmlentities($this->folder ));
					if($ext=="qa")
					{
						$paraMeterString=getParameterString($characters,htmlentities( $file ),htmlentities($this->folder ));
						//will get pipeline separated array (chapter name|chapter id|coursename|courseid|subject 
						$paramArray=explode("|",$paraMeterString);
                        //print_r($paramArray);
						$userId="studyLinks@omserver.lan";
						$qaLiteUrl="http://localhost/qaLite/quiz.php?cid=".$paramArray[1]."&cname=".$paramArray[0]."&course=".$paramArray[2]."&subject=".$paramArray[4]."&userId=".$userId;
						//echo $qaLiteUrl;
						//$list .= '<li class="file ext_' . $ext . '"><div style="height: 100px; width: 200px; background-color: powderblue"><a href="#" rel="'.$qaLiteUrl.'">' . htmlentities( $file ) . '</a></div></li>';
                        $list .= '<div style="height: 100px; width: 200px; background-color: powderblue; margin:10px"><a href="#" rel="'.$qaLiteUrl.'">' . htmlentities( $file ) . '</a></div>';
					}else if($ext=="mp4")
					{
                        //$list .= '<li class="file ext_' . $ext . '"><a href="#" rel="' . htmlentities( $this->folder . $file ) . '">' . htmlentities( $file ) . '</a></li>';
                        $list .= '<div style="margin:10px"><video width="320" height="240" controls>  <source src="' . htmlentities( $this->folder . $file ) . '" type="video/mp4"> Your browser does not support the video tag.</video>' . htmlentities( $file ) . '</div>';
					}
					else
					{
                        //$list .= '<li class="file ext_' . $ext . '"><a href="#" rel="' . htmlentities( $this->folder . $file ) . '">' . htmlentities( $file ) . '</a></li>';
                        $list .= '<div style="height: 100px; width: 200px; background-color: powderblue; margin:10px"><a href="#" rel="' . htmlentities( $this->folder . $file ) . '">' . htmlentities( $file ) . '</a></div>';
					}*/
				}
			}
			//$list .= '</ul>';
            //$list .= '</div></ul>';
//echo("<script> var jsList = '$list'</script>");			
			//return $list;
			echo ('<script> var fullinfo = "'.$currentfolder.'$$'.$folderlist.'$$'.$filelist.'";</script>');
			//return ($currentfolder.'$$'.$folderlist.'$$'.$filelist);
		}
	}
}

//$path = urldecode( $_REQUEST['dir'] );
//echo $path;
$tree = new treeview( $rootFolder );
echo $tree->create_tree();

?>
