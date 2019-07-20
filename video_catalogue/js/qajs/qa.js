var myQaObj = new Qa_Session();
myQaObj.quizObj = new quiz_Session();


var isAutoLogin = false;

$(document).ready(function()
    {
        
    
        //for contentAdmin Button
    
        
        //initial view setup
        $("#boardDiv").hide();
        $("#createManageDiv").hide();
        $("#menuMyTask").hide();
       // $(".tooltip-content").hide();
        //to start create-manage-div for quiz/assignment/question/class/school etc
        $("#createQuiz").click(function(){
			//getStructure('createQuiz'); //to change later if we seperate the structure loading for each tab
			startManageDiv('NAMED_QUIZ');
          });
		$("#manageQuiz").click(function(){
			//getStructure('createQuiz'); //to change later if we seperate the structure loading for each tab		
			startManageDiv('NAMED_QUIZ');
          });
		$("#manageSchool").click(function(){
			//getStructure('manageSchool'); //to change later if we seperate the structure loading for each tab
			startManageDiv('SCHOOL');
            
          });
        $("#manageClass").click(function(){
			//getStructure('manageClass'); //to change later if we seperate the structure loading for each tab
			startManageDiv('CLASS');
          });
        $("#manageAssignment").click(function(){
            //getStructure('manageAssignment'); //to change later if we seperate the structure loading for each tab
			startManageDiv('ASSIGNMENT');
        });
        $("#manageReviewQuestion").click(function(){
            //getStructure('manageReviewQuestion'); //to change later if we seperate the structure loading for each tab
			startManageDiv('REVIEW QUESTION');
        });
        $("#manageMyReviewQuestion").click(function(){
            //getStructure('manageMyReviewQuestion'); //to change later if we seperate the structure loading for each tab
			startManageDiv('MYREVIEW QUESTION');
        });
		//manageSchool
        
        //--------------Ajax calls--------------------------------
         $("#btn_notification").click(function(){
             getMyCourses(); //this will make ajax call to get courses and then will display in appropriate template
          });
		
		//binding global events for ajax calls to ahow and hide progress/sync indicator. 
		$("#syncIndicator").bind("ajaxSend", function(){
   			$(this).show();
			}).bind("ajaxComplete", function(){
				$(this).hide();
		}).bind("ajaxError", function(){
			$(this).hide();
		});
		
	//adding a jquery method to get centre position of a screen
    jQuery.fn.center = function () {
        this.css("position","absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                    $(window).scrollTop()) + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                    $(window).scrollLeft()) + "px");
        return this;
    }
    
    jQuery.fn.activityBoardCenter = function () {
        this.css("position","absolute");
        this.css({top:$('#activity-board').offset().top + $("#activity-board").height()/2,left:$('#activity-board').offset().left + $("#activity-board").width()/2,margin:'-'+(this.height() / 2)+'px 0 0 -'+(this.width() / 2)+'px'});
        return this;
    }
    //search widget
	//$("#searchWidget").hide();
	
        //----------start - Login panel
            $("#logOutPanel").hide();
            
			var isLoginPanelActive = false;
			$("#loginPanel").click(function()
				{
					if(isLoginPanelActive == false)
					{
						isLoginPanelActive = true;
						//$("#big").stop().animate({'margin-top': '200px'}, 1500);
						$("#loginWidget").slideDown();
                        backToLogin();
						//$('#loginPanelWidget').slideUp();
					}
					else
					{
						isLoginPanelActive = false;
						$("#loginWidget").slideUp();
						//$("#loginPanelWidget").slideDown();
					}
					
					});
        $("#logOutPanel").click(function() {
            if(myQaObj.loginType == "FB")
            {
                buttonLogout.click();
            }
            else
            {
                setCookie("userid",null,365);
                setCookie("userpwd",null,365);
                //window.open('/quizacademy_root','_self');
                window.open('http://www.quizacademy.org/modules/login/logout.php','_self');
            }
			//hide "DASHBOARD/HOME" link which loads and displays user dashboard
			//$("#myHomeLink").hide();
			//$("#mySpaceLink").hide();
           // $("#myProfileTab").hide(); 
                                
        });
        
        $("#goToSignUp").click(function()
				{
					if(isLoginPanelActive == false)
					{
						isLoginPanelActive = true;
						//$("#big").stop().animate({'margin-top': '200px'}, 1500);
						$("#loginWidget").slideDown();
						showSignUpForm();
					}
					else
					{
                        showSignUpForm();
						/*isLoginPanelActive = false;
						$("#loginWidget").slideUp();*/
						//$("#loginPanelWidget").slideDown();
					}
					
					});
		
        
        $("#closeCross").click(function()
			{
               // $(this).parent().slideup(); //not working yet
                if(isLoginPanelActive == true)
                   {
                      isLoginPanelActive = false;  
                   }
				$("#loginWidget").slideUp();	
            });
		
		$("#closeCrossOnSearch").click(function()
			{
				$("#searchResultDisplayWidget").hide();	
            });
    //---------------end - login panel -------------------  

		$("#small").mouseenter(function()
            {
				$("#big").slideDown();
				$('#small').slideUp();
            });

		$("#big").mouseleave(function()
			{
				$("#big").slideUp();
				$("#small").slideDown();
            });
		$("#wwFooter").click(function()
			{
				window.open('http://www.moinee.com','_blank');		
            });
		$("#wwCEElink").click(function()
			{
				window.open('http://www.mnit.ac.in/new/dept_cree/index.php','_blank');		
            });
	});


//method for loading and displaying dashboard from any page
function loadMyDashboard()
{
	
	
    //it is getting everything fresh.
    //getRoleAccessDetails(); //TODO - check the placement and rebuild the menu as per the deails recieved in this object.done
    if(myQaObj.courseListJsonText == null)
    {
        console.log("a a a");
        getMyCourses(); //get course data and load courses in activity board
    }
    else
    {
        console.log("b b b");
        loadMyCoursesTemplate(myQaObj.courseListJsonText);
    }
   
    
	//now cleanup is done...lets load and display home page elements
	/*loadMyCoursesTemplate(myQaObj.courseListJsonText);
	loadMyTestsTemplate(myQaObj.testsScheduleListJson);
    getMyAssignmentList(myQaObj.userId);*/ //lets get this fresh
    //loadMyAssignmentTemplate(myQaObj.assignmentListJson); /////
    
}

//method to display messgae box
function displayMessageBox(message)
{
	$('#messageDiv').html(message);
	$('#messageDiv').animate({left:'50px'},"slow");
}

//method to hide messgae box
function hideMessageBox(message,timeDelay)
{
	$('#messageDiv').html(message);
	$('#messageDiv').delay(timeDelay).animate({left:'-500px'},"slow");
}

//to be replaced by generic method in search_util.js // done...testing
function showSearchResult()
{
	//alert("here i am");
	myQaObj.currentSearchKey = "";
	myQaObj.currentSearchResult = "";
	
	myQaObj.currentSearchKey = document.getElementById("global-search").value.trim(); //??
	//alert(myQaObj.currentSearchKey);
	//console.log(">> " + myQaObj.currentSearchKey);
	if(myQaObj.currentSearchKey.length>2)
	{
		$("#searchWidget").html(" Loading...");
		//check whether the data for current search key is already available or nor
		if(myQaObj.currentSearchKey == myQaObj.ajaxSearchCriteria)
		{
			$("#searchResultDisplayWidget").hide();
			//alert("same result");
			
			callCreateCategoryArrayAndLoadTemplateMethods("NO");

			$("#searchResultDisplayWidget").show();
		}
		else if(myQaObj.ajaxSearchCriteria == myQaObj.currentSearchKey.substring(0,myQaObj.ajaxSearchCriteria.length) )
		{
			$("#searchResultDisplayWidget").hide();
			//alert("same result but after filteration");
			
			callCreateCategoryArrayAndLoadTemplateMethods("YES");
			$("#searchResultDisplayWidget").show();
		}
		else
		{
			$("#searchResultDisplayWidget").hide();
			//$("#searchWidget").html("");
			myQaObj.ajaxSearchCriteria = myQaObj.currentSearchKey;
			//alert("ajax will be called");
			//reset last result json
				myQaObj.searchResultJson = ""; //result.substring(result.indexOf("{"));
				//reset last result json obj
				myQaObj.searchResultJsonObj = ""; //JSON.parse(myQaObj.searchResultJson);
			getSearchResultAjax(myQaObj.currentSearchKey); //ajax call to get result from db and set current search result, ajax search criteria.
			$("#searchResultDisplayWidget").show();
		}
	}
	else
	{
		$("#searchResultDisplayWidget").hide();
	}
}
//----------------------------- Ajax methods (which can be called on need basis by various events -----------------------------------------



function getMyCourses()
{
     $.ajax({url:"modules/courses/getCourseList.php",
			 beforeSend:function(){
				displayMessageBox("Loading courses...");
				//$('#messageDiv').html("Loading courses...");
				//$('#messageDiv').animate({left:'0px'},"slow");
			 },
			 success:function(result){
               // return result.substring(result.indexOf("{"));
                loadMyCoursesTemplate(result.substring(result.indexOf("{")));
               // alert("sddddddddddddd");
				//$('#messageDiv').html("loaded succssfully...");
				//$('#messageDiv').delay(1000).animate({left:'-300px'},"slow");
            },
			 complete:function(jqXHR,textStatus){
				hideMessageBox(textStatus,2000);
				//$('#messageDiv').html("course loading status - "+textStatus);
				//$('#messageDiv').delay(2000).animate({left:'-500px'},"slow");
			 }
			 
			});
    /*getMyTestsList(myQaObj.userId);
    getMyAssignmentList(myQaObj.userId);*/ //MOVIN OUTSIDE THIS METHOD IN aaa
}

//this will fetch list of all tests assigned to a user and display it on the dashboard.
function getMyTestsList(userId)
{
     $.ajax({url:"modules/test/getAllTestsSchedulesForUserId.php?USER_ID=" + userId,
			 beforeSend:function(){
				//displayMessageBox("Loading T...");
			 },
			 success:function(result){
                loadMyTestsTemplate(result.substring(result.indexOf("{")));
             },
			 complete:function(jqXHR,textStatus){
				//hideMessageBox(textStatus,2000);
			 }
			 
			});
}
//this method will get the list of all assigned activites to a user and display it on the dashboard..

//
function getCourseSubTopicList(courseId)
{
    var reviewAllow="notAllow";
    if(isReviewAllowAsJrSme())
    {
      reviewAllow="allow";
    }
    $.ajax({url:"modules/courses/getCourseSubTopicList.php?COURSE_ID=" + courseId+"&REVIEW_ALLOW="+reviewAllow,async:true,success:function(result){
				//storing result of ajax IN GLOBAL OBJ
                //AT - adding following two lines to reset topicName and subtopic name from previously played quiz
                myQaObj.selectedTopicName = null;
                myQaObj.selectedSubTopicName = null;
				myQaObj.topicSubTopicListJson = result.substring(result.indexOf("{"));
				//myQaObj.selectedCourseId = courseId; //DONE IN PREVIOUS STEP
			    //create array of topics with their relevant subtopics
                
                if(JSON.parse(myQaObj.topicSubTopicListJson).success == 1)
                {
                   // var topicSubTopicListJsonObj = JSON.parse(topicSubTopicListJsonText);
                } 
                else 
                {
                    showMessageBox("No Topic");
                    return false;
                }
				var topicsListArray = getTopicListArrayFromSubTopicJson(myQaObj.topicSubTopicListJson);
				loadTopicListTemplate(topicsListArray); //loading the template in appropriate div
            }});
}
//method for displaying subtopics on default click of topic item from the list.
function getTopicSubTopicList()
{
   //// alert("aa " + myQaObj.selectedTopicName);
   // myQaObj.selectedTopicName = selectedTopicName; //ALREADY STORED IN GLOBAL IN PREVIOUS STEP
	var subTopicsListArray = getSubTopicListArrayFromSubTopicJson(myQaObj.topicSubTopicListJson, myQaObj.selectedTopicName);
  ////  alert("bb " + myQaObj.selectedTopicName);
	loadSubTopicListTemplate(subTopicsListArray);
}

//method to derive topic list from subtopicjson txt. now returning sorted list.
function getTopicListArrayFromSubTopicJson(topicSubTopicListJsonText)
{
	var topicSubTopicListJsonObj = JSON.parse(topicSubTopicListJsonText);
    
	var topicArray = [];
	var topicString = "";
	for(var i=0;i<topicSubTopicListJsonObj.subtopics.length;i++)
    {
		
        var thisItem = topicSubTopicListJsonObj.subtopics[i];
		//alert (topicArray.indexOf(thisItem.topicName));
		if(topicArray.indexOf(thisItem.topicName) >-1)
		{
			//do nothing
		}
		else
		{
			topicArray.push(thisItem.topicName);
			//alert (topicArray.length);
			topicString = topicString+thisItem.topicName+"<br>";
		}
    }
	//alert(topicString);
	return topicArray.sort(); //added sort option
}


function getSubTopicListArrayFromSubTopicJson(topicSubTopicListJsonText, selectedTopicName)
{
	//alert ('22');
	//get the object of json
	var SubTopicListJsonObj = JSON.parse(topicSubTopicListJsonText);
    //var subTopicIdsString = "";
	var subTopicArray = [];
	var subTopicString = "";
	//create an array of the subtopics for the selected topic
	//alert ('3'+SubTopicListJsonObj.subtopics.length);
	for(var i=0;i<SubTopicListJsonObj.subtopics.length;i++)
    {
		//alert ('4');
		var thisItem = SubTopicListJsonObj.subtopics[i];
		if(thisItem.topicName == selectedTopicName)
		{
			//alert ('5');
			//var subTopicObj = new Object();
			//subTopicObj.id = thisItem.subtopicId;
			subTopicArray.push(thisItem);
           // subTopicIdsString = subTopicIdsString + "," + thisItem.subtopicId;
////			subTopicArray.push(thisItem.subtopicId,thisItem.subtopicName);
////			alert (subTopicArray[0][0]);
			subTopicString = subTopicString+" ["+thisItem.subtopicId+","+thisItem.subtopicName+"]<br>";
		}
	}
    //subTopicIdsString = subTopicIdsString.substring(1);
    //myQaObj.selectedTopic_SubTopicIdsString = subTopicIdsString;
	//return this array
	//alert (subTopicIdsString);
	return subTopicArray;
}

function deriveSubTopicIdsStringForTopic() //WORKING SO REMOVING ALL ALERTS
{
    //get the object of json
	var SubTopicListJsonObj = JSON.parse(myQaObj.topicSubTopicListJson);
    var subTopicIdsString = "";

	//create STRING OF IDS of the subtopics for the selected topic
	for(var i=0;i<SubTopicListJsonObj.subtopics.length;i++)
    {
		var thisItem = SubTopicListJsonObj.subtopics[i];
		if(thisItem.topicName == myQaObj.selectedTopicName)
		{
            subTopicIdsString = subTopicIdsString + "," + thisItem.subtopicId;
		}
	}
    subTopicIdsString = subTopicIdsString.substring(1);
    myQaObj.selectedTopic_SubTopicIdsString = subTopicIdsString; //SETTING THE STRING ON GLOBAL OBJECT
}

/*function initiateDynamicQuiz(subTopicIdString) {

//1. This method will check the starting point like topic or subtopic //DESCOPED no need for this
//2. derive subtopic id list/s from subtopic json //WE GET THIS A METHOD PARAM.
    alert("sdsd 22222 - " + subTopicIdString);
    alert("testing..,...........");
    var quizObj1 = myQaObj.quizObj;
    alert(myQaObj.quizObj.TotalQuestionsInQuiz + " - " + myQaObj.selectedTopicName); //myQaObj is not accessible here
//3. get number of questions per quiz from session object instance (myQaObj) //WE HAVE IT IN OBJECT SO NO NEED FOR SEPERATE VARIABLE    
//4. get question set from server.
////     $.ajax({url:"modules/courses/getQuestionSet.php?SUBTOPIC_ID_LIST=" + subTopicIdString + "&QUESTION_COUNT=" + myQaObj.TotalQuestionsInQuiz + "&quizType=" + myQaObj.quizType + "&userId=" + myQaObj.userId + "&sessionId=" + myQaObj.sessionId + "&courseId=" + myQaObj.selectedCourseId + "&topicName=" + myQaObj.selectedTopicName ,success:function(result){

//5. if question set is successfully recieved then set questionJSON & session value in myQaObj
//6. maintain in_progress quiz session values.
//7. once this is done get the question to load and construct the screen options and set values.
//    like setQuestionText(), constructOptions, setResponseButton()
}*/

function backToTopicList()
{
	//resetting variables for topics and subtopics
	//myQaObj.topicSubTopicListJson = "";
    myQaObj.selectedTopicId = "";
    myQaObj.selectedTopicName = "";
    myQaObj.selectedTopic_SubTopicIdsString = "";
    myQaObj.selectedSubTopicId = "";
    myQaObj.selectedSubTopicName = "";
	try
    {
	   //diaplaying topic list for current course
	   var topicsListArray = getTopicListArrayFromSubTopicJson(myQaObj.topicSubTopicListJson);
	   loadTopicListTemplate(topicsListArray); //loading the template in appropriate div
    }
    catch(err) //incase of an error to to dashboard
    {
        //console.log("in error");
        //console.log(err.message);
        loadMyDashboard();
    }
}

function backToCourseList()
{
	myQaObj.selectedCourseId = ""; 
    myQaObj.selectedCourseName = "";
    myQaObj.topicSubTopicListJson = "";
    myQaObj.selectedTopicId = "";
    myQaObj.selectedTopicName = "";
    myQaObj.selectedTopic_SubTopicIdsString = "";
    myQaObj.selectedSubTopicId = "";
    myQaObj.selectedSubTopicName = "";
	myQaObj.quizObj.quizSessionId = 0;
	//myQaObj.selectedCourseId = 0;
	loadMyCoursesTemplate(myQaObj.courseListJsonText);
}

//method to hide answer alert box
function hideAnswerAlertBox()
{
	$("#answerAlert").hide();
}

//ajax call to get search result //to be replace with generic method to handle multiple types of search


//this method will get list of categories obtained from ajax search result
//Need clear documentation on this method. - Arvind


// method to sort category array based on course,subtopic,studylink etc.
function sortCategoryArray(categoryArray)
{
    var sortedArray=[];
    for(var i=0 ; i<categoryArray.length ;i++)
    {
        var temp="";
        var temp2="";
        if(categoryArray[i]=="Course")
        {
           if (i>0)
           {
               //call the swap function
              temp=categoryArray[0];
              categoryArray[0]=categoryArray[i];
              categoryArray[i]=temp;
           }
          else
          {
          
          }
        }
        else
        {
        }
    }
    for(var i=0 ; i<categoryArray.length ;i++)
    {
      var temp3="";
      if(categoryArray[i]=="Sub-Topic")
      {
          if(categoryArray[0]=="Course")
          {
              if(i==1)
              {
              }
              else
              {
                  temp2=categoryArray[1];
                  categoryArray[1]=categoryArray[i];
                  categoryArray[i]=temp2;
              }
          }
          else
          {
                if (i>0)
               {
                   //call the swap function
                  temp3=categoryArray[0];
                  categoryArray[0]=categoryArray[i];
                  categoryArray[i]=temp3;
               }
              else
              {

              }  
          }
      }
        else{}
    }
    return categoryArray;
}

// method to call methods of creating array of categories (topic, course, subtopic, quizes etc)
function callCreateCategoryArrayAndLoadTemplateMethods(filterStatus)
{
	//if json of ajax search result returns success = 1 i.e. json text is not null, has some search result.
	if(myQaObj.searchResultJsonObj.success == 1)
        {
            myQaObj.categoryListArray = getCategoryListArrayFromSearchResultJson(filterStatus);
            //console.log("category list array length "+myQaObj.categoryListArray.length);
            
            //if category array(course, topic, subtopic) is not empty i.e. it has atleast one element
            if(myQaObj.categoryListArray.length > 0)
            {
                myQaObj.filterCheckBoxTracker="firstTimeCall";
                loadSearchResultTemplate(myQaObj.categoryListArray); //loading the template in appropriate div
            }
            
            //if category array is empty
            else
            {
                $("#searchWidget").html("");
              //  $("#checkBoxesForFilter").html("");
                var dashText = "";
                dashText = dashText + "<br><div>No Result Found</div>";
                $("#searchWidget").html(dashText);
                //$("#searchResultDisplayWidget").show();
                /*setTimeout(function() {
                    $("#searchWidget").hide();
                }, 3000);*/
            }
        }

//if json text of ajax search result returns success == 0 i.e. json text is null, it doesnot have any search result.
        else //when no data recieved from server on ajax search. ie success is not equal to 1
        {
            if ($.active > 0) 
            {
                    //console.log("Ajax On");
            }
            else 
            {
                $("#searchWidget").html("");
                var dashText = "";
                dashText = dashText + "<br><div>No Result Found</div>";
                $("#searchWidget").html(dashText);
               // $("#checkBoxesForFilter").html("");
                //$("#searchResultDisplayWidget").show();
                /*setTimeout(function() {
                        $("#searchWidget").hide();
                    }, 3000);*/
            }
        }
}



//----------------------START :  for role access ------------can be moved in specific file ----------------------------------
// this method will fetch roles and access right of the user should be called after successfull login based on this user menus will be populated
// retirieved information can be use for populating the school class list based on the role access right roles.


function checkUserName()
{
   //
    $.ajax({url:"modules/login/checkNameOfUser.php?userId="+myQaObj.userId+"&action=checkNameOfuser",success:function(result)
                {
                    if(result=="")
                    {
                        var htmlContentForAddDetailsNotification="";
   htmlContentForAddDetailsNotification='<div class="col_12 center">Name:<input type="text" id="userName"/></br></br><button class="medium blue" onclick="updateNameOfUser()">Submit</button><br><label id="errorBox" style="display:none"></label></div>';
    getJsPanelModalForHtmlContent(htmlContentForAddDetailsNotification,'User Details','300px','25 0px');
                        
                    }
                    else
                    {
                       //do nothing
                        myQaObj.userName=result;
                    }
                }});
  
}


function reportError(action)
{
    var htmlContent="";
    if(action=='update')
    {
        htmlContent="Fill The Name Field";
    }
    else if(action=="Password not match")
    {
        htmlContent="Password not match"
    }
    else if(action=="db Pswd not match")
    {
        htmlContent="Current Password is wrong, Try again."    
    }
    else if(action=="newOldPwdSame")
    {
        htmlContent="Password Cannot reset, as old and new passwords are same."
    }
    else if(action=="nameError")
    {
        htmlContent="Name may only consist of letters.";
    }
    else if(action=="pwdDigiTError")
    {
        htmlContent="Password should be at least six characters </br>or should be alphanumeric !!";
    }
    else if(action=="workingTotalError")
    {
    
        htmlContent="Working Computers Cannot be greater than Total Computers !!";
    }
    else if(action=="infraDetailsFill")
    {
        htmlContent="Infra Details Filled Successfully, make sure the updation !!";
    
    }
    else
    {
        htmlContent="Please Fill All the Details!!";
    }
    $('#errorBox').html(htmlContent);
    $('#errorBox').show();
    var iReportDownloadAlert = setTimeout(function(){$('#errorBox').hide();},2000);
}
//----------------------END :  for role access ------------can be moved in specific file ----------------------------------
//------------------ START : For HTML 5 browser checks -----------------------
function isHtml5Supported(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}

/*for check back button or refresh page event*/
window.onbeforeunload = function()
{
    return "Leaving this page will take you out of QuizAcademy !!!";
};

//------------------ START : For account section ui -----------------------

function unique(list) 
{
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
}
function checkValuesExistsInObjectArray(name,arr) 
{
  //var arr = myQaObj.roleAccessObjArray;
  var id = arr.length + 1;
  var found = arr.some(function (el) {
    return el.role === name;
  });
  if (!found) 
  { 
	return false;
  }
  return found;
}
