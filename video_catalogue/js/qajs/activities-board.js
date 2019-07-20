





//-------------------function to load courses ------------------------

function loadMyCoursesTemplate(courseListJsonText) 
{
  //load the list of courses
}

//method for loading topic list
function loadTopicListTemplate(topicListArray)
{
    //load topicList
}

function loadSubTopicListTemplate(subTopicObjListArray)
{
    //var isAllow=isReviewAllow();
    //console.log(isAllow);
    $("#info-board").html("");
	var dashText="";
   // var teacherArray = getNameValuePairByRoleAccess("SCHOOL","teacher");
	dashText = dashText + "<h4>Sub Topics</h4><ul class=\"alt\">";
    
	dashText = dashText + "<div><label id=\"breadcrum\" class=\"col_10\" style=\"text-align:left\"><span>"+myQaObj.selectedCourseName+"&nbsp;>>&nbsp;"+myQaObj.selectedTopicName+"</span></label>";
	dashText = dashText + "<label id=\"label_backToTopicList\" class=\"col_2\" style=\"text-align:right\"><a href=\"#\" onclick=\"backToTopicList();\">Back</a></label></div>";
	//dashText = dashText + "<div id=\"label_backToTopicList\" style=\"text-align:right\"><a href=\"#\" onclick=\"backToTopicList();\">Back</a></div>";
	//alert ('loading sub topics'+subTopicObjListArray.length);
	for(var i=0;i<subTopicObjListArray.length;i++)
    {
		//var isReviewAllow=isReviewAllowAsJrSme();
        if(subTopicObjListArray[i].status=="IN_PROGRESS")
        {
                subTopicObjListArray[i].subtopicDisplayName=subTopicObjListArray[i].subtopicDisplayName+" [In Progress]";
        }
        //icon design for studylinks,play quiz
        var  dashTextForStudyLinks = "<label id=\"testingIcon\" name=\""+subTopicObjListArray[i].subtopicId+"\" onclick=\"openPopOverForMedia("+subTopicObjListArray[i].subtopicId+",'"+escapeSingleQuote(subTopicObjListArray[i].subtopicDisplayName)+"','"+myQaObj.userId+"')\" class=\"col_1\"><i class=\"icon-book tooltip\" title=\"Study Links\"></i></label>";
        var dashTextForStartQuiz = "<label id=\"dropdown\" name=\""+subTopicObjListArray[i].subtopicId+"\" class=\"col_1\" onclick=\"toGetQuestionsForQuiz("+subTopicObjListArray[i].subtopicId+",'"+escapeSingleQuote(subTopicObjListArray[i].subtopicDisplayName)+"','"+subTopicObjListArray[i].isLearningActive+"','dropdown')\"><i class=\"icon-play tooltip\" title=\"Start Quiz\"></i></label>";
        
         dashTextForStartQuiz = dashTextForStartQuiz+"<label id=\"kbcIcon\" name=\""+subTopicObjListArray[i].subtopicId+"\" class=\"col_1\" onclick=\"toGetQuestionsForQuiz("+subTopicObjListArray[i].subtopicId+",'"+escapeSingleQuote(subTopicObjListArray[i].subtopicDisplayName)+"','"+subTopicObjListArray[i].isLearningActive+"','kbcIcon')\"><i class=\"icon-money tooltip right\" title=\"Start KBC (Beta Release)\" ></i></label></div></li> ";
        
        if(isReviewAllowAsJrSme())
        {
            if(subTopicObjListArray[i].isLearningActive=="0")
            {
                 dashText = dashText + "<li><div id=\"btn_logo\" ><label id=\"action\" name=\""+subTopicObjListArray[i].subtopicId+"\" class=\"col_8 tooltip\" title=\"Start Quiz\" onclick=\"toGetQuestionsForQuiz("+subTopicObjListArray[i].subtopicId+",'"+escapeSingleQuote(subTopicObjListArray[i].subtopicDisplayName)+"','"+subTopicObjListArray[i].isLearningActive+"','action')\"><i class=\"icon-cogs\"></i> " + escapeSingleQuote(subTopicObjListArray[i].subtopicDisplayName) + "</label>";
            }
            else
            {
                 dashText = dashText + "<li><div id=\"btn_logo\" ><label id=\"action\" name=\""+subTopicObjListArray[i].subtopicId+"\" class=\"col_8 tooltip\" title=\"Start Quiz\" onclick=\"toGetQuestionsForQuiz("+subTopicObjListArray[i].subtopicId+",'"+escapeSingleQuote(subTopicObjListArray[i].subtopicDisplayName)+"','"+subTopicObjListArray[i].isLearningActive+"','action')\"><i class=\"icon-cogs\"></i> " + escapeSingleQuote(subTopicObjListArray[i].subtopicDisplayName) + " <i class='icon-lightbulb' title='Learning Workflow Active'></i></label>";
            }
           
            
            dashText=dashText+dashTextForStudyLinks;
            
            dashText = dashText + "<label id=\"testingIcon\" name=\""+subTopicObjListArray[i].subtopicId+"\" onclick=\"toGetModalForAddQuestion("+subTopicObjListArray[i].subtopicId+",'"+escapeSingleQuote(subTopicObjListArray[i].subtopicDisplayName)+"','forInsertScreen','insert')\" class=\"col_1\"><i class=\"icon-plus tooltip\" title=\"Add Question\"></i></label>";
            dashText=dashText+dashTextForStartQuiz;
         
        }
        else
        {
            if(subTopicObjListArray[i].isLearningActive=="0")
            {
                dashText = dashText + "<li><div id=\"btn_logo\" ><label id=\"action\" name=\""+subTopicObjListArray[i].subtopicId+"\" class=\"col_9 tooltip\" title=\"Start Quiz\"  onclick=\"toGetQuestionsForQuiz("+subTopicObjListArray[i].subtopicId+",'"+escapeSingleQuote(subTopicObjListArray[i].subtopicDisplayName)+"','"+subTopicObjListArray[i].isLearningActive+"','action')\"><i class=\"icon-cogs\"></i> " +escapeSingleQuote(subTopicObjListArray[i].subtopicDisplayName)+ "</label>";
            }
            else
            {
                dashText = dashText + "<li><div id=\"btn_logo\" ><label id=\"action\" name=\""+subTopicObjListArray[i].subtopicId+"\" class=\"col_9 tooltip\" title=\"Start Quiz\"  onclick=\"toGetQuestionsForQuiz("+subTopicObjListArray[i].subtopicId+",'"+escapeSingleQuote(subTopicObjListArray[i].subtopicDisplayName)+"','"+subTopicObjListArray[i].isLearningActive+"','action')\"><i class=\"icon-cogs\"></i> " +escapeSingleQuote(subTopicObjListArray[i].subtopicDisplayName)+ " <i class='icon-lightbulb' title='Learning Workflow Active'></i></label>";
            }
        
            
        dashText=dashText+dashTextForStudyLinks;
            
        dashText=dashText+dashTextForStartQuiz;
        }
        
    }
    dashText = dashText + "</ul>";
//display on screen
    //console.log(dashText);
    $("#dashboard").html(dashText);	
}

function toGetQuestionsForQuiz(subTopicId,subTopicName,isLearningActive,clickAction)
{
    myQaObj.selectedSubTopicId = subTopicId;
    myQaObj.selectedSubTopicName = subTopicName;
    myQaObj.isLearningActive="0";
    myQaObj.quizMode="Revision2";
    //var clickAction = $('label[name="'+subTopicId+'"]')[0].id ;
    console.log(subTopicId+subTopicName+isLearningActive+clickAction);
    if(clickAction == "action")
    {
        //loadQuizViewTemplate();//implement the next step...i believe it will be initiate quiz
        myQaObj.quizObj.quizType="QUIZ";
        
        if(isLearningActive=="1")
        {
            //modal pop up section for options
            myQaObj.isLearningActive=isLearningActive;
            var htmlContentForUpdateDetailsNotification="";
            var learningType="'Learn'";
            var practiceType="'Practice'";
            var revisionType="'Revision'";
   htmlContentForAddDetailsNotification='<div class="col_12 center"><div class="col_4" style="cursor:pointer" onclick="initiateDynamicQuiz('+myQaObj.selectedSubTopicId+','+learningType+')"><div class="card"> <div class="header"><img src="learn.png" style="width:70px;height:70px"></div> <div class="container"><h5>Learn</h5></div> </div></div><div class="col_4" style="cursor:pointer" onclick="initiateDynamicQuiz('+myQaObj.selectedSubTopicId+','+practiceType+')" ><div class="card"> <div class="header"> <img src="practice.png" style="width:70px;height:70px"></div> <div class="container"><h5>Practice</h5></div> </div></div><div class="col_4" style="cursor:pointer" onclick="initiateDynamicQuiz('+myQaObj.selectedSubTopicId+','+revisionType+')"><div class="card"> <div class="header"><img src="revision.png" style="width:70px;height:70px"></div> <div class="container"><h5>Revision</h5></div> </div></div></div>';
    getJsPanelModalForQuizType(htmlContentForAddDetailsNotification,'Select Quiz Type','600','300');
        }
        else
        {
            initiateDynamicQuiz(myQaObj.selectedSubTopicId,'Revision2');
        }
       // initiateDynamicQuiz(myQaObj.selectedSubTopicId);
    } 
    else if (clickAction == "dropdown")
    {

        //alert("on ST dropdown");
        //todo .... implement the behaviour
        myQaObj.quizObj.quizType="QUIZ";
        initiateDynamicQuiz(myQaObj.selectedSubTopicId,'Revision2');
    }
    else if(clickAction=="kbcIcon")
    {
        console.log("KBC ICON CLICKED");
        initiateDynamicKBC(myQaObj.selectedSubTopicId);
    }
    
}

function loadQuizViewTemplate()
{
    //alert("in quiz view....");
    var currentQuestion = myQaObj.quizObj.currentQuestionObj;
    var dashText = ""; //uncommented from vinay's code
    if(myQaObj.quizObj.quizType == "QUIZ")
	{
        
        /*Start For info board*/
     
        /*End For Info board*/
        
		dashText = dashText + "<div><label id=\"questionDisplay\" style=\"text-align:left\"><h5>Play Quiz </h5> </label>";
        dashText = dashText + "<label id=\"breadcrum\" style=\"text-align:right\"><span>&nbsp;&nbsp;  (";
		if(myQaObj.selectedCourseName != "" && myQaObj.selectedTopicName != "")
		{
			dashText = dashText + myQaObj.selectedCourseName+"&nbsp;>>&nbsp;"+myQaObj.selectedTopicName;
		}
		else if(myQaObj.selectedCourseName == "" && myQaObj.selectedTopicName == "" && myQaObj.selectedSubTopicName != null)
		{
			dashText = dashText + myQaObj.selectedSubTopicName;
		}
		
		if(myQaObj.selectedCourseName != "" && myQaObj.selectedTopicName != "" && myQaObj.selectedSubTopicName != null)
		{
			dashText = dashText + "&nbsp;>>&nbsp;"+myQaObj.selectedSubTopicName;
		}
		dashText = dashText + ")</span></label></div>";
	}
    
	else
	{
		dashText = dashText + "<div><div id=\"questionDisplay\" class=\"col_8\" style=\"text-align:left\"><h5>Test</h5></div>";
		//displaying dropdown for question lists
		dashText = dashText + "<div><select id=\"questionListDD\" class=\"col_4\" style=\"text-align:right\">";
		dashText = dashText + "<option value=\"\">Select a question</option>";
		for(var ii = 0; ii < myQaObj.quizObj.questionSetArray.length; ii++)
		{
			//alert ("in for loop");
			//console.log(ii);
			var currentQuestionNoForDD = ii + 1;
			dashText = dashText + "<option value=\""+ currentQuestionNoForDD +"\">" + currentQuestionNoForDD + " ( " +myQaObj.quizObj.questionStatus + " )</option>";
		}
		dashText = dashText + "</select></div></div>";
		//alert (""+infoText);
		//console.log(dashText);
	}
//------------start : testing (done n working)
    browserCheck();
    dashText = dashText + "<div id=\"QnOGroup\">"; //new QnOGroup div closure
    dashText = dashText + "<label class=\"col_8\" id=\"questionCountText\">Choose the correct option(Question - "+(myQaObj.quizObj.currentQuestionIndex+1)+"/"+myQaObj.quizObj.questionSetArray.length+")&nbsp:&nbsp;<i class=\"icon-volume-up tooltip\" title=\"AutoSpeak is automated speech feature and is in beta version.  If you do not want any sound than please mute your systems speakers or headphone. Right now its working in only Google Chrome & Firefox Browser\">(&beta;eta)</i></label>";
		//displaying dropdown for question lists
		dashText = dashText + "<label class=\"col_4\" style=\"text-align:right\"><a class=\"jfontsize-button\" id=\"jfontsize-m2\" href=\"#\">A-</a> <a class=\"jfontsize-button\" id=\"jfontsize-d2\" href=\"#\">A</a> <a class=\"jfontsize-button\" id=\"jfontsize-p2\" href=\"#\">A+</a></label>";
//------------end :  testing  (done n working)  
    
    //dashText = dashText + "<label id=\"questionCountText\">Choose the correct option(Question - "+(myQaObj.quizObj.currentQuestionIndex+1)+"/"+myQaObj.quizObj.questionSetArray.length+")</label>";
    //dashText= dashText + "<a class=\"jfontsize-button\" id=\"jfontsize-m2\" href=\"#\">A-</a> <a class=\"jfontsize-button\" id=\"jfontsize-d2\" href=\"#\">A</a> <a class=\"jfontsize-button\" id=\"jfontsize-p2\" href=\"#\">A+</a>";
    dashText= dashText + "<div id=\"textarea1\" class=\"quizCompleteView questionTextStyle\"></div>";
    //dashText = dashText + "<div data-role=\"content\">";
  //  dashText = dashText + "<div data-role=\"fieldcontain\">";
  //  dashText = dashText + "<fieldset data-role=\"controlgroup\" data-type=\"vertical\">";
    //dashText = dashText + "<legend>Choose: </legend>";
    dashText = dashText + "<div id=\"questionOptionGrp\" class=\"quizCompleteView\">";
	dashText = dashText + getCurrentOptionHtml();
    dashText = dashText + "</div><br><br>";
    dashText = dashText + "</div>" //new QnOGroup div closure
	
  
        
	if(myQaObj.quizObj.quizType == "QUIZ")
	{
		dashText = dashText + "<input id=\"nextButton\" type=\"button\" value=\"Next\" class=\"blue pill\" style=\"width:200px;\"/>";
	}

  dashText = dashText + "</div>";
	
	
//display on screen
    //before display let's bind a method for math formula processing with this
    //$("#dashboard").ready(function(){console.log("aaabbb"); M.parseMath(dashboard);});
    //<script>$(\"#textarea1\").change(function(){M.parseMath(textarea1);});</script>
    
    //now display on screen..??what event is triggered?
    $("#dashboard").html(dashText);
    //M.parseMath(QnOGroup);
//--------------------------------
fontResize('quizCompleteView');
   /* var d = $.Deferred();    
    M.parseMath(dashboard);
    d.resolve();*/
//---------------------------------	
	

//setting value of radio button or answer text box with selected value.	
	if(myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].selectedOption != null)
	{
	var previousSelectedValue = myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].selectedOption; //htmlEscape(currentQuestion.option1.trim()); //
	//alert("previous Selected Value - "+previousSelectedValue);
		if(myQaObj.quizObj.questionDisplayMode == "OBJECTIVE")
		{
			var $radios = $('input:radio[name=optionGroup]');
			if($radios.is(':checked') === false)
				$radios.filter("[value='"+previousSelectedValue+"']").prop('checked', true);
		}
		else if(myQaObj.quizObj.questionDisplayMode == "NON-OBJECTIVE")
		{	$("#answerTextBox").val(myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].selectedOption);
		}
		else //for future
		{
			
		}	
	}
	
	//currently not in use.
	/*if(myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].selectedOption != null)
	{
		var previousSelectedValue = myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].selectedOption; //htmlEscape(currentQuestion.option1.trim()); //
		//alert("previous Selected Value - "+previousSelectedValue);
		var $radios = $('input:radio[name=optionGroup]');
		if($radios.is(':checked') === false)
			$radios.filter("[value='"+previousSelectedValue+"']").prop('checked', true);
	}*/
	
	$("#info-board").html("");
    if(myQaObj.quizObj.quizType == "QUIZ")
	{
        
        /*Start For info board*/
        $("#info-board").html("");
        //create method to set the details in studyLinks accordion along with other buttons
        //if is learning active then online will work on this interface
        //if learning active and there are no studylinks then will show to try the different mode wala option
        if(myQaObj.isLearningActive=="1")
        {
             var htmlTextForStudyLinks='<div class="accordion_example4" id="accordionMasterDiv"><div class="accordion_in"> <div class="acc_head">Try Different Mode on QuizAcademy</div><div class="acc_content"><button class="green square buttonQMode1" onclick="initiateDifferentModeOfQuiz('+"'Practice'"+')">Practice</button>    <button class="green square buttonQMode1" onclick="initiateDifferentModeOfQuiz('+"'Written'"+')">Written Type</button></div><div class="acc_content"><button class="button button2">Written Type</button></div></div></div>';
             $("#info-board").html(htmlTextForStudyLinks);
            //if we have practice mode than we should not show the studylinks
             if(myQaObj.quizMode=="Practice")
             {
                 var htmlTextForStudyLinks='<div class="accordion_example4" id="accordionMasterDiv"><div class="accordion_in"> <div class="acc_head">Try Different Mode on QuizAcademy</div><div class="acc_content"><button class="green square buttonQMode1" onclick="initiateDifferentModeOfQuiz('+"'Learn'"+')">Learn</button>    <button class="green square buttonQMode1" onclick="initiateDifferentModeOfQuiz('+"'Written'"+')">Written Type</button></div><div class="acc_content"><button class="button button2">Written Type</button></div></div></div>';
                 htmlTextForStudyLinks= htmlTextForStudyLinks + "<div class='col_12' id='scoreBoardDiv'></div>";
                    $("#info-board").html(htmlTextForStudyLinks);
                    $(".accordion_example4").smk_Accordion({
                        closeAble: true //boolean
                        //closeOther: false, //boolean
                    });
             }
            else if(myQaObj.quizMode=="Revision")
            {
                
                 var htmlTextForStudyLinks='<div class="accordion_example4" id="accordionMasterDiv"><div class="accordion_in"> <div class="acc_head">Try Different Mode on QuizAcademy</div><div class="acc_content"><button class="green square buttonQMode1" onclick="initiateDifferentModeOfQuiz('+"'Learn'"+')">Learn</button>  <button class="green square buttonQMode1" onclick="initiateDifferentModeOfQuiz('+"'Practice'"+')">Practice</button>    <button class="green square buttonQMode1" onclick="initiateDifferentModeOfQuiz('+"'Written'"+')">Written Type</button></div><div class="acc_content"><button class="button button2">Written Type</button></div></div></div>';
                 htmlTextForStudyLinks= htmlTextForStudyLinks + "<div class='col_12' id='scoreBoardDiv'></div>";
                    $("#info-board").html(htmlTextForStudyLinks);
                    $(".accordion_example4").smk_Accordion({
                        closeAble: true //boolean
                        //closeOther: false, //boolean
                    });
            }
            else
            {
                 getStudyLinkDetailsForSelectedSubtopic(myQaObj.selectedSubTopicId);
            }
            
                
        }
       
        
        /*var htmlTextForStudyLinks='<div class="accordion_example4"> <div class="accordion_in"> <div class="acc_head">eBooks</div> <div class="acc_content"> </div> </div>  <div class="accordion_in"> <div class="acc_head">Youtube Videos</div> <div class="acc_content"> </div> </div> <div class="accordion_in"> <div class="acc_head">Simulations</div> <div class="acc_content"> </div> </div> <div class="accordion_in"> <div class="acc_head">Practice Quiz</div> <div class="acc_content"> </div> </div><div class="accordion_in"> <div class="acc_head">Written Practice</div> <div class="acc_content"> </div> </div>  </div>';
        console.log(htmlTextForStudyLinks);
        $("#info-board").html(htmlTextForStudyLinks);
        console.log($("#info-board").html());
        $(".accordion_example4").smk_Accordion({
				closeAble: true, //boolean
				//closeOther: false, //boolean
			});*/

        

			// Demo text. Let's save some space to make the code readable. ;)
			
    }
    //now add info board section as per the quiz type
    if(myQaObj.quizObj.quizType=="KBC")
    {
        
        //create 50 50 and double dip and quit button
        //score section
        //help comments section
        var kbcDashBoardText="";
        kbcDashBoardText=kbcDashBoardText+"<fieldset><div id=\"scoreAndQuitButton\" class=\"col_12 center\"><h4>KBC DashBoard</h4><div id=\"scoreView\" class=\"col_12 center\">Score:<label id=\"kbcScoreLabel\">0</label></div></div>";
        kbcDashBoardText=kbcDashBoardText+"<div id=\"helpSection\" class=\"col_12 center\"><label id=\"dynamicHelp\"></label></div></div>";
         kbcDashBoardText=kbcDashBoardText+"<div id=\"lifeLineDiv\" class=\"col_12 center\"><div class=\"col_4\"><button class=\"blue pill\" id=\"fiftyFifty\" onclick=\"implement5050Feature()\" title=\"This lifeline is active for use\">50-50</button></div><div class=\"col_4\"><button class=\"blue pill\"  id=\"doubleDip\" onclick=\"implementDoubleDipFeature()\" title=\"This lifeline is active for use\">Double Dip</button></div><div class=\"col_4\"><button class=\"blue pill\" id=\"quitButton\" title=\"To leave the KBC game\" onclick=\"implementQuitFeature()\">Quit</button></div></div><div class=\"kbcHelpText\" style=\"display:none\"><label >"+CONSTANT_KBC.get('CONS_KBC_HELPTEXT1')+"</label></br><label><i class=\"icon-hand-right\"></i>"+CONSTANT_KBC.get('CONS_KBC_HELPTEXT2')+"</label></br><label><i class=\"icon-hand-right\"></i>"+CONSTANT_KBC.get('CONS_KBC_HELPTEXT3')+"</label></br><label><i class=\"icon-hand-right\"> </i>"+CONSTANT_KBC.get('CONS_KBC_HELPTEXT4')+"</label></div></fieldset>";
        $("#info-board").append(kbcDashBoardText);
    }
	//console.log(currentQuestion.questionText.trim());
	//console.log(htmlEscape(currentQuestion.questionText.trim()));
	//console.log("<pre>" + htmlEscape(currentQuestion.questionText.trim()) + "</pre>");
   var questionText=currentQuestion.questionText;
                    //console.log(questionText);
                    questionText=questionText.replace(/'/g,"");
                    questionText=questionText.replace(/&#39;/g,"");
                    questionText=questionText.replace(/&#10;/g,"");
                    questionText=questionText.trim();
                    questionText=questionText.replace(/(<([^>]+)>)/ig,"");
                    questionText = questionText.replace(/"/g,'');
                    questionText=  questionText.trim();
                    questionText = questionText.replace(/(\r\n|\n|\r)/gm,"");
                    //console.log(questionText);
                    questionText="'"+questionText+"'";
   var htmlText="";
  
   if($.browser.chrome==true || $.browser.mozilla ==true )
   {
        if($.browser.safar==true)
       {

       }
       else
       {
          htmlText ='<label style=\"float:right;cursor:pointer;\" onclick=\"speakVoice('+questionText+')\"><i class=\"icon-volume-up tooltip\" title=\"Speak Question\"></i></label> '; 
       }
         
   }
    var htmlTextForParentQuestion="";
    if(currentQuestion.parentQId!="0")
    {
        htmlTextForParentQuestion='<label style=\"float:right;cursor:pointer;\" onclick=\"getParentQuestionModal('+currentQuestion.parentQId+')\"><i class=\"icon-info-sign tooltip\" title=\"Show Parent Question\"></i></label>';
    }
    else
    {
        //do nothing
    }
    $("#textarea1").html("<pre>" + htmlText + (currentQuestion.questionText) + htmlTextForParentQuestion + "</pre>");
    if(currentQuestion.questionText.indexOf("<MathFormula/>") > -1)
        M.parseMath(QnOGroup); //#1
    myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].quesionStartTime = new Date();
	
	//testing for specific question display
	$("#questionListDD").change(function() //THIS IS ON CLICK OF Next button of Quiz
                        {
							var e = document.getElementById("questionListDD");
							var strUser = e.options[e.selectedIndex].value - 1;
							myQaObj.quizObj.isReviewActive = true;
							myQaObj.quizObj.selectedReviewQuestionNo = strUser;
							$("#nextButton").click();
						});
	
	//for back button
	$("#backButton").click(function() //THIS IS ON CLICK OF Next button of Quiz
                        {
							if(myQaObj.quizObj.currentQuestionIndex == 0)
							{
								alert("You are on first question.");
							}
							else
							{
								myQaObj.quizObj.isReviewActive = true;
								myQaObj.quizObj.selectedReviewQuestionNo = -1;
								/*if(myQaObj.quizObj.isBackButtonHit)
									alert("Back called");*/
								$("#nextButton").click();
							}
						});
	//disable submit button
	$("#submitButton").attr("disabled","disabled");
	
	$("#submitButton").click(function() //THIS IS ON CLICK OF Next button of Quiz
                        {
        
                            // check for the not attempt questions alert
                            var notAttemptCount=0;
                            $("#questionListDD> option").each(function() {
                                   // alert(this.text + ' ' + this.value);
                                 if(this.text.indexOf("Not Attempted") > -1)
                                 {
                                    notAttemptCount++;
                                 }
                                });
                            if(notAttemptCount > 0)
                            {
                                var alertNotAttempt = confirm("You have not  attempt "+notAttemptCount+" questions in your test. Press OK to submit Or Cancel to resume test...");
                            }
							//on click of submit button, a confirmation popup will appear... 
                            else
                            {
                                var submitConfirmationPopUp = confirm("You are going to submit your test. Press OK to continue...");
                            }
                            if (submitConfirmationPopUp == true || alertNotAttempt==true )
                            {
                                myQaObj.quizObj.isAnswerChanged = false;
                                if(myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].selectedOption == $("input:radio[name='optionGroup']:checked").val())
                                {
                                    myQaObj.quizObj.isAnswerChanged = true;
                                    console.log("myQaObj.quizObj.isAnswerChanged - "+myQaObj.quizObj.isAnswerChanged);
                                }
                                myQaObj.quizObj.isSubmitActive = true;
                                $("#nextButton").click();
                                //getTestStatsForUserId(myQaObj.userId,myQaObj.testStatObj.testId); // will have to test
                                loadTestCompletionTemplate();
                            }

                            else
                            {
                                //do nothing
                            }
							//alert("Submit called");
						});
    
	//now lets setup event listeners...
     $("#nextButton").click(function() //THIS IS ON CLICK OF Next button of Quiz
                        {
							//if quiz type is test and based on question display mode and any option is selected or answerTestBox is not blank then set the text of dropdown option as "Attempted"
                            
							if(myQaObj.quizObj.quizType == "TEST")
							{
								//question display mode is OBJECTIVE
								if(myQaObj.quizObj.questionDisplayMode == "OBJECTIVE")
								{
									//option is selected
									if($("input:radio[name='optionGroup']").is(':checked'))
									{
										var e = document.getElementById("questionListDD");
										for(var jj = 0; jj <= myQaObj.quizObj.questionSetArray.length; jj++)
										{
											if(e.options[jj].value == myQaObj.quizObj.currentQuestionIndex + 1)
											{
												e.options[jj].text = e.options[jj].value + " ( Attempted )";
											}
										}
									}
								}
								//question display mode is NON-OBJECTIVE
								else if(myQaObj.quizObj.questionDisplayMode == "NON-OBJECTIVE")
								{
									//answer text box is empty
									if($("#answerTextBox").val().trim() != "")
									{
										var e = document.getElementById("questionListDD");
										for(var jj = 0; jj <= myQaObj.quizObj.questionSetArray.length; jj++)
										{
											if(e.options[jj].value == myQaObj.quizObj.currentQuestionIndex + 1)
											{
												e.options[jj].text = e.options[jj].value + " ( Attempted )";
											}
										}
									}
								}
								//for more question display mode cases
								else
								{
									
								}
							}
							
                            //set questionEndTime and calculate duration
                            myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].quesionEndTime = new Date(); //ToDo
                            myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].timeToAttempt = timeDiff(myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].quesionStartTime, myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].quesionEndTime);
							
							//check if question display mode is "OBJECTIVE"
							if(myQaObj.quizObj.questionDisplayMode == "OBJECTIVE")
								{
									//check if option is checked or not
									if($("input:radio[name='optionGroup']").is(':checked'))
									   {
                                           //first ceck if answer value is same or caned 
									   		//set value of selected option
						myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].selectedOption = scriptEscape($("input:radio[name='optionGroup']:checked").val());
									   }
									else
									   {
									   		//in case of quiz type = quiz, display "select an option" alert
									   		if(myQaObj.quizObj.quizType == "QUIZ")
											{
												alert("Please select an option.");
                                				return;
											}
                                            else if(myQaObj.quizObj.quizType == "KBC")
                                            {
                                                if(myQaObj.quizObj.isQuit==true)
                                                    {
                                                        //do nothing
                                                    }
                                                    else
                                                    {
                                                        alert("Please select an option.");
                                				        return;
                                                    }
                                            }
									   }
								}
							
							//check if question display mode is "NON-OBJECTIVE"
							else if(myQaObj.quizObj.questionDisplayMode == "NON-OBJECTIVE")
								{
								//check if answer text box is filled or not
									if($("#answerTextBox").val().trim() != "")
									   {
									   		//set value of text box in selected option
						myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].selectedOption = scriptEscape($("#answerTextBox").val().trim());
									   }
									else
									   {
									   		//in case of quiz type = quiz, display "type an answer" alert
									   		if(myQaObj.quizObj.quizType != "TEST")
											{
												alert("Please type an answer.");
                                				return;
											}
										   	else
											{							myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].selectedOption = $("#answerTextBox").val().trim();
											}
									   }
								}
							
							// for other question display mode cases
							else
								{
									
                                }
                            
                            //.capture details in in_progress strings. capture time details as well
                               // prepareInProgressStrings(); //TODO - pending implementation
                            myQaObj.quizObj.userResponseText = updateQuizProgressString(myQaObj.quizObj.userResponseText, myQaObj.quizObj.questionSetArray.length, myQaObj.quizObj.currentQuestionIndex+1, myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].selectedOption); //for response;
                            var rOwValue = isCorrectAnswer() ? "R" : "W";
                           //// alert("rOw = " + rOwValue)
	
                            //if question display mode is OBJECTIVE and no option is selected then set rOwValue = "N"
                            if(myQaObj.quizObj.questionDisplayMode == "OBJECTIVE")
                            {
                                if($("input:radio[name='optionGroup']").is(':checked')==false)
                                {
                                    rOwValue = "N";
                                }
                            }
                            //else if question display mode is NON-OBJECTIVE and answer text box is empty then set rOwValue = "N"
                            if(myQaObj.quizObj.questionDisplayMode == "NON-OBJECTIVE")
                            {
                                if($("#answerTextBox").val().trim() == "")
                                {
                                    rOwValue = "N";
                                }
                            }
                            //else for other question display mode cases
                            else
                            {

                            }
                            //console.log(1);
	                       //--code for kbc and quit mode
                            if(myQaObj.quizObj.quizType=="KBC")
                            {
                                //console.log(2);
                                if(myQaObj.quizObj.isQuit==true)
                                {
                                    rOwValue="Q";
                                   // console.log(3);
                                    //myQaObj.quizObj.isQuit=false;
                                }
                            }
                            myQaObj.quizObj.rightOrWrong = updateQuizProgressString(myQaObj.quizObj.rightOrWrong, myQaObj.quizObj.questionSetArray.length, myQaObj.quizObj.currentQuestionIndex+1,rOwValue);
                            
                              myQaObj.quizObj.timePerQuestion = updateQuizProgressString(myQaObj.quizObj.timePerQuestion, myQaObj.quizObj.questionSetArray.length, myQaObj.quizObj.currentQuestionIndex+1, myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].timeToAttempt);
                           
                            //if quiz type is not test then prompt user if right or wrong and send a async ajax call to update progress of quiz_stat
                            if(myQaObj.quizObj.quizType != "TEST")
							{
								    if(isCorrectAnswer()==true)
                                    {
                                        if(myQaObj.quizObj.quizType=="KBC")
                                        {
                                            //calculateKBCScore();
                                            if(myQaObj.quizObj.isDoubleDipActive==true)
                                            {
                                                myQaObj.quizObj.isDoubleDipActive=false;
                                            }
                                        }
                                        myQaObj.quizObj.NoOfCorrectAnswers++;
                                        document.getElementById("answerAlert").innerHTML = "<i class=\"icon-thumbs-up\"></i>&nbsp;&nbsp;Correct Answer!";
                                        //$("#answerAlert").center();
                                        openModalPopUp();
                                        //$("#answerAlert").activityBoardCenter();
                                        /*if($.browser.chrome==true)
                                        {
                                            speakVoice("Correct Answer");
                                        }*/
                                        /*$("#answerAlert").fadeIn("fast");
                                        $("#answerAlert").delay(1000).fadeOut("fast");*/
                                        //case1 if first attempt and answer is correct than go usual and make double dip inactive
                                        //
                                        if(myQaObj.quizObj.quizType=="KBC")
                                        {
                                            calculateKBCScore();
                                        }
                                    }
								else 
                                {
                                    if(myQaObj.quizObj.quizType=="KBC" && myQaObj.quizObj.isQuit==false)
                                    {
                                        
                                        if(myQaObj.quizObj.isDoubleDipActive==true)
                                        {
                                            $("#dynamicHelp").text(CONSTANT_KBC.get('CONS_DOUBLEDIP_SECOND_ATTMPT'));
                                            animateSwing50ById("dynamicHelp");
                                            myQaObj.quizObj.isDoubleDipActive=false;
                                            //make selected radio button disable;
                                            var selectedOptionText=$('input[name=optionGroup]:checked').val();
                                            if($("#radio1").val()==selectedOptionText)
                                            {
                                                $("#radio1").prop('checked', false);
                                                $("#radio1").attr('disabled',true);
                                                $("#radioLabel1").css("text-decoration", "line-through");
                                                $('#radioLabel1').css('cursor','auto');
                                            }
                                            else if($("#radio2").val()==selectedOptionText)
                                            {
                                                $("#radio2").prop('checked', false);
                                                $("#radio2").attr('disabled',true);
                                                $("#radioLabel2").css("text-decoration", "line-through");
                                                $('#radioLabel2').css('cursor','auto');
                                            }
                                            else if($("#radio3").val()==selectedOptionText)
                                            {
                                                $("#radio3").prop('checked', false);
                                                $("#radio3").attr('disabled',true);
                                                $("#radioLabel3").css("text-decoration", "line-through");
                                                $('#radioLabel3').css('cursor','auto');
                                            }
                                            else if($("#radio4").val()==selectedOptionText)
                                            {
                                                $("#radio4").prop('checked', false);
                                                $("#radio4").attr('disabled',true);
                                                $("#radioLabel4").css("text-decoration", "line-through");
                                                $('#radioLabel4').css('cursor','auto');
                                            }
                                            return;
                                        }
                                        /*else
                                        {
                                            loadQuizScoreTemplate();
                                            $("#dynamicHelp").text("");
                                        }*/
                                    }
									document.getElementById("answerAlert").innerHTML = "<i class=\"icon-thumbs-down\"></i>&nbsp;&nbsp;Wrong Answer<br>[ Correct answer: " + myQaObj.quizObj.currentQuestionObj.answer + "]";
									//$("#answerAlert").center();
                                    openModalPopUp();
                                    //$("#answerAlert").activityBoardCenter();
                                    
									//$("#answerAlert").fadeIn("fast");
                                    var answerVoice="Wrong Answer, Correct Answer Was"+myQaObj.quizObj.currentQuestionObj.answer;
                                    answerVoice=answerVoice.replace(/'/g,"");
                                    answerVoice=answerVoice.replace(/&#39;/g,"");
                                    answerVoice=answerVoice.replace(/&#10;/g,"");
                                    answerVoice=answerVoice.trim();
                                    answerVoice=answerVoice.replace(/(<([^>]+)>)/ig,"");
                                    answerVoice=answerVoice.replace(/"/g,'');
                                    answerVoice=answerVoice.trim();
                                    answerVoice=answerVoice.replace(/(\r\n|\n|\r)/gm,"");
                                    //console.log(questionText);
                                    answerVoice="'"+answerVoice+"'";
                                    /*if($.browser.chrome==true)
                                    {
                                         speakVoice(answerVoice);
                                    }*/
									//$("#answerAlert").delay(2000).fadeOut("fast");
									//alert("Wrong Answer [ Correct answer: " + $('<div />').html(myQaObj.quizObj.currentQuestionObj.answer).text()+" ]");
								}
							}
							else if(myQaObj.quizObj.quizType == "TEST")
							{                                
								if(isCorrectAnswer()==true && myQaObj.quizObj.isAnswerChanged==true)  //error todo - check if the asnwer is not changed before submit.
                                {
                                    console.log("myQaObj.quizObj.isAnswerChanged(if true) - "+myQaObj.quizObj.isAnswerChanged);
									myQaObj.quizObj.NoOfCorrectAnswers++;
								}
							}
                            // make ajax to update quizStat table
                            updateQuizStats();
                            ////now lets go to next question or score view
                            //first check if this was last question or not..
                                //if last question then display score card
                            
							if(myQaObj.quizObj.isReviewActive)
                            {
								myQaObj.quizObj.isReviewActive = false; //resetting to default as the work is done
								if((myQaObj.quizObj.currentQuestionIndex == (myQaObj.quizObj.questionSetArray.length-1)) && (myQaObj.quizObj.quizType == "TEST"))
								{
									$("#submitButton").addClass("blue pill");
									$("#submitButton").removeAttr("disabled");	
								}
								
								//check weather have to move to last question or some specific question
								if(myQaObj.quizObj.selectedReviewQuestionNo == -1)
                                	myQaObj.quizObj.currentQuestionIndex--;
								else
									myQaObj.quizObj.currentQuestionIndex = myQaObj.quizObj.selectedReviewQuestionNo;
								
                              	//alert(myQaObj.quizObj.currentQuestionIndex+" Back Button Hit");
                                //get current question
                                myQaObj.quizObj.currentQuestionObj = myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex];
                                //populate current question on screen.
                                //1. set question text and questionCountText
                                //$("#textarea1").html(myQaObj.quizObj.currentQuestionObj.questionText);
								//$("#textarea1").html("<pre>" + htmlEscape(myQaObj.quizObj.currentQuestionObj.questionText.trim()) + "</pre>");
                                
                                $("#textarea1").html("<pre>" + myQaObj.quizObj.currentQuestionObj.questionText.trim() + "</pre>");
                                $("#questionCountText").html("Choose the correct option(Question - "+(myQaObj.quizObj.currentQuestionIndex+1)+"/"+myQaObj.quizObj.questionSetArray.length+")");
                                //2. set options 
                                $("#questionOptionGrp").html(getCurrentOptionHtml());
                                if(myQaObj.quizObj.currentQuestionObj.questionText.indexOf("<MathFormula/>") > -1)
                                    M.parseMath(QnOGroup); //#2
								//setting value of radio button with selected value.
								if(myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].selectedOption != null)
								{
									var previousSelectedValue = myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].selectedOption; //htmlEscape(currentQuestion.option1.trim()); //
									//alert("previous Selected Value - "+previousSelectedValue);
									if(myQaObj.quizObj.questionDisplayMode == "OBJECTIVE")
									{
										var $radios = $('input:radio[name=optionGroup]');
										if($radios.is(':checked') === false)
											$radios.filter("[value='"+previousSelectedValue+"']").prop('checked', true);
									}
									else if(myQaObj.quizObj.questionDisplayMode == "NON-OBJECTIVE")
									{	$("#answerTextBox").val(myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].selectedOption);
									}
									// for other question display mode cases
									else
									{
										
									}
								}
                                
								
								//3. set starttime
                                myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].quesionStartTime = new Date();
                            }
	
							else if(myQaObj.quizObj.currentQuestionIndex == (myQaObj.quizObj.questionSetArray.length-1))
                            {
								if(myQaObj.quizObj.quizType == "QUIZ")
								{
									//go to score card view.
                                    
									//loadQuizScoreTemplate();
								}
                                else if(myQaObj.quizObj.quizType == "KBC")
                                {
                                    loadQuizScoreTemplate();
                                    $("#dynamicHelp").text("");
                                }
								else if(myQaObj.quizObj.quizType == "TEST")
								{
									$("#submitButton").addClass("blue pill");
									$("#submitButton").removeAttr("disabled");
								}
								
                            }
                            /*else if(myQaObj.quizObj.quizType=="KBC")
                            {
                                if(isCorrectAnswer()==false)
                                {
                                    loadQuizScoreTemplate();
                                    $("#dynamicHelp").text("");
                                }
                            }*/
                            else
                            {
                                if(myQaObj.quizObj.quizType=="KBC")
                                {
                                    //clear the help text firstly
                                    $("#dynamicHelp").text("");
                                    //calculateKBCScore();
                                    $("#kbcScoreLabel").text(myQaObj.quizObj.kbcScore);
                                    if(isCorrectAnswer()==false)
                                    {
                                        loadQuizScoreTemplate();
                                        $("#dynamicHelp").text("");
                                        return;
                                    }
                                    processNextQuestionInQuiz();
                                    
                                }
                                else if(myQaObj.quizObj.quizType=="TEST")
                                {
                                    processNextQuestionInQuiz();
                                }
                                /*if()*/
                                /*if(myQaObj.isLearningActive=="1")
                                {
                                    
                                }
                                else
                                {
                                     processNextQuestionInQuiz();
                                }*/
                               
                            }
                                
                                
                        });
}
function processNextQuestionInQuiz()
{
    $("#myModal").hide(); 
    myQaObj.quizObj.currentQuestionIndex++;
                              	//alert(myQaObj.quizObj.currentQuestionIndex);
                                //get current question
                                myQaObj.quizObj.currentQuestionObj = myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex];
                                //populate current question on screen.
                                //1. set question text and questionCountText
                                //$("#textarea1").html(myQaObj.quizObj.currentQuestionObj.questionText);
								//$("#textarea1").html("<pre>" + htmlEscape(myQaObj.quizObj.currentQuestionObj.questionText.trim()) + "</pre>");
                    var questionText=myQaObj.quizObj.currentQuestionObj.questionText;
                    //console.log(questionText);
                    questionText=questionText.replace(/'/g,"");
                    questionText=questionText.replace(/&#39;/g,"");
                    questionText=questionText.replace(/&#10;/g,"");
                    questionText=questionText.trim();
                    questionText=questionText.replace(/(<([^>]+)>)/ig,"");
                    questionText = questionText.replace(/"/g,'');
                    questionText=  questionText.trim();
                    questionText = questionText.replace(/(\r\n|\n|\r)/gm,"");
                    //console.log(questionText);
                    questionText="'"+questionText+"'";
                                //questionText = questionText.replace(/(<([^>]+)>)/ig,"");
                                //questionText=processTextForSpeak(questionText);
                               //questionText = questionText.replace(/(<([^>]+)>)/ig,"");
                              
                                //questionText = questionText.trim();
                               //questionText = questionText.replace(/'/g, '');
                                
                                   var htmlText="";
  
                                   if($.browser.chrome==true || $.browser.mozilla ==true )
                                   {
                                       console.log($.browser.chrome);
                                        if($.browser.safar==true)
                                       {
                                           console.log($.browser.chrome);
                                       }
                                       else
                                       {
                                          htmlText ='<label style=\"float:right;cursor:pointer;\" onclick="speakVoice('+questionText+')"><i class=\"icon-volume-up tooltip\" title=\"Speak Question\"></i></label>';
                                       }

                                   }
                                 var htmlTextForParentQuestion="";
                                if(myQaObj.quizObj.currentQuestionObj.parentQId!="0")
                                {
                                    htmlTextForParentQuestion='<label style=\"float:right;cursor:pointer;\" onclick=\"getParentQuestionModal('+ myQaObj.quizObj.currentQuestionObj.parentQId+')\"><i class=\"icon-info-sign tooltip\" title=\"Show Parent Question\"></i></label>';
                                }
                                else
                                {
                                    //do nothing
                                }
                                $("#textarea1").html("<pre>" + htmlText +  myQaObj.quizObj.currentQuestionObj.questionText.trim()  + htmlTextForParentQuestion + "</pre>");
                                $("#questionCountText").html("Choose the correct option(Question - "+(myQaObj.quizObj.currentQuestionIndex+1)+"/"+myQaObj.quizObj.questionSetArray.length+")&nbsp:&nbsp;<i class=\"icon-volume-up tooltip\" title=\"AutoSpeak is automated speech feature and is in beta version.  If you do not want any sound than please mute your systems speakers or headphone. Right now its working in only Google Chrome & Firefox Browser\">(&beta;eta)</i>");
                                //2. set options 
                                $("#questionOptionGrp").html(getCurrentOptionHtml());
                                if(myQaObj.quizObj.currentQuestionObj.questionText.indexOf("<MathFormula/>") > -1)
                                    M.parseMath(QnOGroup); //#3
								//setting value of radio button with selected value.
								if(myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].selectedOption != null)
                                {
                                var previousSelectedValue = myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].selectedOption; //htmlEscape(currentQuestion.option1.trim()); //
                                //alert("previous Selected Value - "+previousSelectedValue);
                                    if(myQaObj.quizObj.questionDisplayMode == "OBJECTIVE")
                                    {
                                        var $radios = $('input:radio[name=optionGroup]');
                                        if($radios.is(':checked') === false)
                                            $radios.filter("[value='"+previousSelectedValue+"']").prop('checked', true);
                                    }
                                    else if(myQaObj.quizObj.questionDisplayMode == "NON-OBJECTIVE")
                                    {
                            $("#answerTextBox").val(myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].selectedOption);
                                    }
                                    else
                                    {
                                        
                                    }	
                                }
                                //3. set starttime
                                myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].quesionStartTime = new Date();
}
function loadQuizScoreTemplate()
{
  /* $(function() {    		
			$('#starRating').click(function() {
				$('#starRating').html('<span class="stars">'+parseFloat(((myQaObj.quizObj.NoOfCorrectAnswers*5)/myQaObj.quizObj.questionSetArray.length))+'</span>');
				$('span.stars').stars();
			});    		
			$('#starRating').click();
		});*/
$("#myModal").hide(); 
		$.fn.stars = function() {
			return $(this).each(function() {
				$(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).html())))) * 16));
			});
		}
    
	var dashText = "";
    //var scoreObj="";
    if(myQaObj.quizObj.quizType=="KBC")
    {
        $("#info-board").html("");
        //safeLanding Value
        //check if isQuit is true than normal case another wise use safeLandingvalue
       if(myQaObj.quizObj.isQuit==true)
       {
           myQaObj.quizObj.kbcScore=myQaObj.quizObj.scoreObj[myQaObj.quizObj.NoOfCorrectAnswers]; 
       }
       else
       {
        //console.log("1");
        calculateSafeLandingScore(myQaObj.quizObj.NoOfCorrectAnswers);
        myQaObj.quizObj.kbcScore=myQaObj.quizObj.scoreObj[myQaObj.quizObj.safeLandingValue];
        //alert(myQaObj.quizObj.scoreObj[myQaObj.quizObj.safeLandingValue]);
        //console.log(myQaObj.quizObj.kbcScore);
        //console.log("3");
       }
        dashText = dashText + "<center><h3>KBC Score</h3>";
    }
    //if
    else
    {
	      dashText = dashText + "<center><h3>Quiz Score</h3>";
    }
    dashText = dashText + "<table class=\"striped tight sortable\" style=\"text-align:center\">";
    dashText = dashText + "<tr><td style=\"text-align:center\">";
    dashText = dashText + "<p id=\"starRating\"><center><span class=\"stars\" style=\"text-align:left\">"+((myQaObj.quizObj.NoOfCorrectAnswers*5)/myQaObj.quizObj.questionSetArray.length)+"</span></center></p>";
    dashText = dashText + "</td></tr><tr><td style=\"text-align:center\">";
    //dashText = dashText + "<h5>You scored "+myQaObj.quizObj.NoOfCorrectAnswers +" out of "+ myQaObj.quizObj.questionSetArray.length +"("+((myQaObj.quizObj.NoOfCorrectAnswers*5)/myQaObj.quizObj.questionSetArray.length)+")</h5><br>";
     if(myQaObj.quizObj.quizType=="KBC")
    {
      
       dashText = dashText + "<h5>Your score: "+myQaObj.quizObj.kbcScore+"</h5>";
       //case of lost and quit..noOfCorrectAnswer is less than quizSize
        if(myQaObj.quizObj.NoOfCorrectAnswers<myQaObj.quizObj.questionSetArray.length)
        {
            //case of quit
            if(myQaObj.quizObj.isQuit==true)
            {
                    if (myQaObj.quizObj.NoOfCorrectAnswers==0)
					{
						dashText = dashText + "<label>Opps!! You seems to have quit without a try.</label>";
					}
					else
					{
						dashText = dashText + "<label>Congratulations!! It must be a wise call.</label>"; 
					} 
            }
            //case of lost
            else
            {
                
                     if(myQaObj.quizObj.NoOfCorrectAnswers==0)
					 {
						 dashText = dashText + "<label>Oh!! That was wrong answer. It seems you could not make use of lifelines. Try again.</label>";
					 }
					 else
					 {
						  dashText = dashText + "<label>Opps!! That was a wrong Answer. Try again as you can do better than this.</label>";
					 }
            }
        }
        else
        {
            dashText = dashText + "<label>Congratulations!! YOU ARE THE BEST. You have got full-on score.</label>"
        }
    }
    //if
    else
    {
	  dashText = dashText + "<h5>You scored "+myQaObj.quizObj.NoOfCorrectAnswers +" out of "+ myQaObj.quizObj.questionSetArray.length+"</h5>"; 
    }
	
     //formatDashText(dashText);
        dashText = dashText +"</td></tr><tr><td class=\"center\" style=\"text-align:center\"><div class=\"center\"id=\"closureCriteriaBox\" style=\"width:100%;padding:20px\"></div>";
    dashText = dashText + "</td></tr><tr><td style=\"text-align:center\"><br><button id=\"backToTopics\" class=\"blue pop\" style=\"width:90%\"> Back To Topics </button> <br><br>";
      //if assignment than instead of playAgain change the button to go back to Dashboard
    if(myQaObj.quizObj.assignMentId!=undefined)
    {
        dashText = dashText + "<button id=\"backToDashboard\" class=\"blue pop\" style=\"width:90%\"> Back To Dashboard </button><br><br><br>";
    }
    else //standard functionality
    {
        dashText = dashText + "<button id=\"playAgain\" class=\"blue pop\" style=\"width:90%\"> Play Again </button><br><br><br>";
    }
     // added new onclick for going back to dashboard when assginment is attempted
   
    //dashText = dashText + "<button id=\"playAgain\" class=\"blue pop\" style=\"width:90%\"> Play Again </button><br><br><br>";
    if(myQaObj.quizObj.quizType=="KBC")
    {
        dashText = dashText + "Share this kbc with your friends:<br><br><button class=\"button blue \" onclick=\"shareUrl('twitter')\" style=\"width:25%\"><i class=\"icon-twitter\"></i> twitter</button>&nbsp;&nbsp;";
    }
    else
    {
        dashText = dashText + "Share this quiz with your friends:<br><br><button class=\"button blue \" onclick=\"shareUrl('twitter')\" style=\"width:25%\"><i class=\"icon-twitter\"></i> twitter</button>&nbsp;&nbsp;";
    }
    
    dashText = dashText + "<button class=\"button blue \" onclick=\"shareUrl('facebook')\" style=\"width:25%\"><i class=\"icon-facebook\"></i> facebook</button>&nbsp;&nbsp;";
     dashText = dashText + "<button class=\"button blue \" onclick=\"shareUrl('gplus')\" style=\"width:25%\"><i class=\"icon-google-plus\"></i> googlePlus</button>";
    dashText = dashText + "<br><br>";
    dashText = dashText + "</td></tr>";
    dashText = dashText + "</table></center>";
//display on screen
    $("#dashboard").html(dashText);
	//$("#playAgain").hide(); //why did we hid it??? commenting it -AT 3Jan
    //$('#starRating').html('<span class="stars">'+parseFloat(((myQaObj.quizObj.NoOfCorrectAnswers*5)/myQaObj.quizObj.questionSetArray.length))+'</span>');
	$('span.stars').stars();
   // displayStarRating();
	//now lets setup event listeners...
    /*$('#starRating').html('<span class="stars">'+((myQaObj.quizObj.NoOfCorrectAnswers*5)/myQaObj.quizObj.questionSetArray.length)+'</span>');
    $('#starRating').each(function() {
				$(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).html())))) * 16));
    }*/
/*    $('span.stars').stars();
    $.fn.stars = function() {
			return $(this).each(function() {
				$(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).html())))) * 16));
			});*/
/*    $("label").click(function() //THIS IS ON CLICK OF SUB-TOPIC LIST
                        {
                            alert($(this).attr('id') + " -st- " + $(this).attr('name'));
                            myQaObj.selectedSubTopicId = $(this).attr('name');
                            myQaObj.selectedSubTopicName = $(this).text();
                            if($(this).attr('id') == "action") {
                                //loadQuizViewTemplate();//implement the next step...i believe it will be initiate quiz
                                initiateDynamicQuiz( myQaObj.selectedSubTopicId);
                            } else if ($(this).attr('id') == "dropdown") {
                                alert("on ST dropdown");
                                //todo .... implement the behaviour
                                initiateDynamicQuiz( myQaObj.selectedSubTopicId);
                            }
                        });*/
	$("#backToTopics").click(function() {
		backToTopicList();
        $("info-board").html("");
});
	
	$("#playAgain").click(function() {
		playNewQuiz();
});
    
     $("#backToDashboard").click(function() {
		loadMyDashboard();
    });
    
 
    //check this if its assignment then format thad dashtext according to track closoure criteria
    if(myQaObj.quizObj.assignMentId!=undefined)
    {

        closureCriteriaStatusDisplayText();
    }
    //closureCriteriaStatusDisplayText();
    if(parseInt(myQaObj.selectedSubTopicId) > 0) 
    {
        getPracticeQuestionSet();
    }

}





//function for checking assignment closure criteria status and other stats

var resultArray=getClosureCriteriaStatsArray(2, 70);

function browserCheck()
{
    $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
}
//function animateSt
