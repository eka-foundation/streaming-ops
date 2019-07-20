var urlTextTemp = "temp";
/**
1. This method will check the starting point like topic or subtopic
2. derive subtopic id list/s from subtopic json
3. get number of questions per quiz from session object instance (myQaObj)
4. get question set from server.
5. if question set is successfully recieved then set questionJSON & session value in myQaObj
6. maintain in_progress quiz session values.
7. once this is done get the question to load and construct the screen options and set values.
    like setQuestionText(), constructOptions, setResponseButton()
*/
function playNewQuiz()
{
	//alert (myQaObj.selectedTopic_SubTopicIdsString);
	//alert (myQaObj.selectedSubTopicId);
    try
    {
        if(myQaObj.selectedSubTopicId != null)
            initiateDynamicQuiz(myQaObj.selectedSubTopicId,myQaObj.quizMode);
        else
            initiateDynamicQuiz(myQaObj.selectedTopic_SubTopicIdsString,'Revision2');
    }
    catch(err) //incase of an error to to dashboard
    {
        //console.log("in error");
        //console.log(err.message);
        loadMyDashboard();
    }
}
function  initiateDynamicKBC(subTopicIdString)
{
 //console.log(subTopicIdString);
  myQaObj.quizObj.quizType="KBC";
  initiateDynamicQuiz(subTopicIdString,'Revision2');
  //console.log(myQaObj.quizObj.quizType);
    
}
function initiateDynamicQuiz(subTopicIdString,modeOfQuiz)
{
    resetQuiz();
//1. This method will check the starting point like topic or subtopic //DESCOPED no need for this
//2. derive subtopic id list/s from subtopic json //WE GET THIS A METHOD PARAM.
    //alert("sdsd sdfsd - " + subTopicIdString);
   // alert("testing..,.,,,,......" + "modules/questions/getQuestionSet.php?SUBTOPIC_ID_LIST=" + subTopicIdString + "&QUESTION_COUNT=" + myQaObj.quizObj.TotalQuestionsInQuiz + "&quizType=" + myQaObj.quizObj.quizType + "&userId=" + myQaObj.userId + "&sessionId=" + myQaObj.userSessionId + "&courseId=" + myQaObj.selectedCourseId + "&topicName=" + myQaObj.selectedTopicName);
    //var quizObj1 = myQaObj.quizObj;
   // alert(myQaObj.quizObj.TotalQuestionsInQuiz + " - " + myQaObj.userId); //FINALLY THIS IS WORKING SOMEHOW :)
//3. get number of questions per quiz from session object instance (myQaObj) //WE HAVE IT IN OBJECT SO NO NEED FOR SEPERATE VARIABLE    
//4. get question set from server.
    
          if(modeOfQuiz=="Learn"||modeOfQuiz=="Practice"||modeOfQuiz=="Revision")
            {
                if(testHtmlContentPanelModal)
                {
                     testHtmlContentPanelModal.close();
                }
                myQaObj.quizMode=modeOfQuiz;
            }
	
     $.ajax({url:"modules/questions/getQuestionSet.php?SUBTOPIC_ID_LIST=" + subTopicIdString + "&QUESTION_COUNT=" + myQaObj.quizObj.TotalQuestionsInQuiz + "&quizType=" + myQaObj.quizObj.quizType + "&userId=" + myQaObj.userId + "&sessionId=" + myQaObj.userSessionId + "&courseId=" + myQaObj.selectedCourseId + "&topicName=" + myQaObj.selectedTopicName+"&modeOfQuiz="+modeOfQuiz,success:function(result){
             //alert("tested..,..go questions.........");
		 //alert (myQaObj.userId+" - "+myQaObj.quizObj.quizType);
//5. if question set is successfully recieved then set questionJSON & session value in myQaObj
             //lets convert it into json object
            var questionSetJsonString = result.substring(result.indexOf("{"));
           // alert("JSON String - " + questionSetJsonString);   
            var questionSetJsonObj = JSON.parse(questionSetJsonString);
           // alert("Sucess alue - " + questionSetJsonObj.success);
            if( questionSetJsonObj.success == 1)
            {
                myQaObj.quizObj.questionSetJsonString = questionSetJsonString;
                myQaObj.quizObj.quizSessionId = questionSetJsonObj.quiz_id;
            } else 
            {
                showMessageBox("NoQuestion");
                return false;
            }
//5.1 populate question object for each question in question_set.
		 	myQaObj.quizObj.questionSetArray = new Array();
            for(var i=0; i < questionSetJsonObj.QUESTION_SET.length; i++)
            {
                var tempQestionObj = new QuestionObject();
                tempQestionObj.questionText = questionSetJsonObj.QUESTION_SET[i].QUESTION_TEXT;
                tempQestionObj.option1 = questionSetJsonObj.QUESTION_SET[i].OPT1;
                tempQestionObj.option2 = questionSetJsonObj.QUESTION_SET[i].OPT2;
                tempQestionObj.option3 = questionSetJsonObj.QUESTION_SET[i].OPT3;
                tempQestionObj.option4 = questionSetJsonObj.QUESTION_SET[i].OPT4;
                tempQestionObj.option5 = questionSetJsonObj.QUESTION_SET[i].OPT5;
                tempQestionObj.answer = questionSetJsonObj.QUESTION_SET[i].ANSWER;
                tempQestionObj.kbcLevel = questionSetJsonObj.QUESTION_SET[i].KBC_LEVEL;
                tempQestionObj.parentQId = questionSetJsonObj.QUESTION_SET[i].PARENT_Q_ID;
                tempQestionObj.questionId= questionSetJsonObj.QUESTION_SET[i].Q_ID;
                tempQestionObj.selectedOption;
                tempQestionObj.timeToAttempt;
                //PUT IT GLOBALLY IN QUIZ OBJECT QUESTIONSETARRAY
                myQaObj.quizObj.questionSetArray.push(tempQestionObj);
            }
    //SET REST OF THE QUIZ OBJECT PARAMS
            myQaObj.quizObj.currentQuestionIndex = 0;
            myQaObj.quizObj.currentQuestionObj = myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex];
           // alert("before date....");        
    myQaObj.quizObj.startTime = new Date();
//6. maintain in_progress quiz session values.    
            setDefaultProgressString(questionSetJsonObj.QUESTION_SET.length); //SETTING DEFAULT VALUES FOR IN_PROGRESS STRINGS FOR QUIZ
           // myQaObj.quizObj.currentQues =  myQaObj.quizObj.questionSetArray[2];
            myQaObj.quizObj.currentQuestionObj.selectedOption = "";
           // alert("ksksk- " + myQaObj.quizObj.currentQuestionObj.selectedOption + " - " + myQaObj.quizObj.currentQuestionObj.questionText);

//7. once this is done get the question to load and construct the screen options and set values.
//    like setQuestionText(), constructOptions, setResponseButton()
            loadQuizViewTemplate() //THIS IS TO DISPLAY QUIZ INTERFACE FOR FIRST TIME AND LOAD FIRST QUESTION 
            
        }//CLOSE OF AJAX SUCCESS FUNCTION()
    }); //CLOSE OF AJAX CALL
}
function resetQuiz()
{
    //this.quizSessionId; //I
    //this.TotalQuestionsInQuiz = 10; //default
    //this.quizType = "QUIZ"; //default
    //this.questionSetJsonString; //I
    myQaObj.quizObj.questionSetArray = []; //I
    
    
    //this.currentQuestionIndex; //I
    //this.currentQuestionObj; //I
    //myQaObj.quizObj.quizType = "QUIZ"; //setting to default
    
    myQaObj.quizObj.NoOfCorrectAnswers = 0;
	myQaObj.quizObj.isSubmitActive = false;
    
    myQaObj.quizObj.isQuit=false;
    
    //this.startTime; //I
    //this.endTime;
    //this.duration;
    
   // myQaObj.quizObj.userResponseText = "";
   // myQaObj.quizObj.rightOrWrong = "";
   // myQaObj.quizObj.timePerQuestion = "";
}
function timeDiff(startTime, endTime) {
    /*start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], start[2]);
    var endDate = new Date(0, 0, 0, end[0], end[1], end[2]);
    var diff = endDate.getTime() - startDate.getTime();*/
    var diff = endTime.getTime() - startTime.getTime();
    return Math.floor(diff / 1000); //it will return difference in seconds
    /*var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    diff -= minutes * 1000 * 60;
    var seconds = Math.floor(diff / 1000);*/
    
   // return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes + ":" + (seconds < 9 ? "0" : "") + seconds;
}

function setDefaultProgressString()
{
    var noOfQuestions = myQaObj.quizObj.questionSetArray.length;
    var defaultProgString = "";
    for(var i=0; i < noOfQuestions; i++)
    {
        defaultProgString = defaultProgString + "|B";
    }
    defaultProgString = defaultProgString.substring(1);
    //alert(defaultProgString);
    
    myQaObj.quizObj.userResponseText = defaultProgString;
    myQaObj.quizObj.rightOrWrong = defaultProgString;
    myQaObj.quizObj.timePerQuestion = defaultProgString;
}
function getCurrentOptionHtml()
{
	var optionNoCounter = 0;
    var currentQuestion = myQaObj.quizObj.currentQuestionObj; 
    var dashText = "";
    /*if(currentQuestion.option1.trim() != '' || currentQuestion.option1.trim() != 'noVal')
        dashText = dashText + "<input id=\"radio1\" name=\"optionGroup\" value=\""+currentQuestion.option1+"\" type=\"radio\" />  " + currentQuestion.option1 + "<br>";
    if(currentQuestion.option2.trim() != '' || currentQuestion.option1.trim() != 'noVal')
        dashText = dashText + "<input id=\"radio2\" name=\"optionGroup\" value=\""+currentQuestion.option2+"\" type=\"radio\" />  " + currentQuestion.option2 + "<br>";
    if(currentQuestion.option3.trim() != '' || currentQuestion.option1.trim() != 'noVal')
        dashText = dashText + "<input id=\"radio3\" name=\"optionGroup\" value=\""+currentQuestion.option3+"\" type=\"radio\" />  " + currentQuestion.option3 + "<br>";
    if(currentQuestion.option4.trim() != '' || currentQuestion.option1.trim() != 'noVal')
        dashText = dashText + "<input id=\"radio4\" name=\"optionGroup\" value=\""+currentQuestion.option4+"\" type=\"radio\" />  " + currentQuestion.option4 + "<br>";
    if(currentQuestion.option5.trim() != '' || currentQuestion.option1.trim() != 'noVal')
        dashText = dashText + "<input id=\"radio5\" name=\"optionGroup\" value=\""+currentQuestion.option5+"\" type=\"radio\" />  " + currentQuestion.option5 + "<br>";*/
	
	
	/*if(cleanValueCheck(currentQuestion.option1.trim()))
        dashText = dashText + "<input id=\"radio1\" name=\"optionGroup\" value=\""+currentQuestion.option1+"\" type=\"radio\" />  " + currentQuestion.option1 + "<br>";
    if(cleanValueCheck(currentQuestion.option2.trim()))
        dashText = dashText + "<input id=\"radio2\" name=\"optionGroup\" value=\""+currentQuestion.option2+"\" type=\"radio\" />  " + currentQuestion.option2 + "<br>";
    if(cleanValueCheck(currentQuestion.option3.trim()))
        dashText = dashText + "<input id=\"radio3\" name=\"optionGroup\" value=\""+currentQuestion.option3+"\" type=\"radio\" />  " + currentQuestion.option3 + "<br>";
    if(cleanValueCheck(currentQuestion.option4.trim()))
        dashText = dashText + "<input id=\"radio4\" name=\"optionGroup\" value=\""+currentQuestion.option4+"\" type=\"radio\" />  " + currentQuestion.option4 + "<br>";
    if(cleanValueCheck(currentQuestion.option5.trim()))
        dashText = dashText + "<input id=\"radio5\" name=\"optionGroup\" value=\""+currentQuestion.option5+"\" type=\"radio\" />  " + currentQuestion.option5 + "<br>";*/
	
	//user click on text will also select radio button
	
	var htmlText ='';
	if(cleanValueCheck(currentQuestion.option1.trim()))
	{
        var option1=currentQuestion.option1;
        option1=option1.replace(/'/g,"");
        option1=option1.replace(/&#39;/g,"");
        option1=option1.replace(/&#10;/g,"");
        option1=option1.trim();
        option1=option1.replace(/(<([^>]+)>)/ig,"");
        option1=option1.replace(/"/g,'');
        option1=option1.trim();
        option1=option1.replace(/(\r\n|\n|\r)/gm,"");
        //console.log(questionText);
        option1="'"+option1+"'";
   
       if($.browser.chrome==true || $.browser.mozilla ==true )
       {
            if($.browser.safar==true)
           {

           }
           else
           {
              htmlText ='<label style=\"float:right;cursor:pointer;\" onclick="speakVoice('+option1+')"><i class=\"icon-volume-up tooltip\" title=\"Speak Option\"></i></label>';
           }

       }
		optionNoCounter++;
        dashText = dashText + "<label id=\"radioLabel1\" class=\"optionRadioStyle\"><input id=\"radio1\" name=\"optionGroup\" value=\"" + htmlEscape(currentQuestion.option1.trim()) + "\" type=\"radio\" /> " + htmlText +  htmlEscape(currentQuestion.option1.trim()) + "</label><br>";
	}
    if(cleanValueCheck(currentQuestion.option2.trim()))
	{
         var option2=currentQuestion.option2;
        option2=option2.replace(/'/g,"");
        option2=option2.replace(/&#39;/g,"");
        option2=option2.replace(/&#10;/g,"");
        option2=option2.trim();
        option2=option2.replace(/(<([^>]+)>)/ig,"");
        option2=option2.replace(/"/g,'');
        option2=option2.trim();
        option2=option2.replace(/(\r\n|\n|\r)/gm,"");
        //console.log(questionText);
        option2="'"+option2+"'";
        if($.browser.chrome==true || $.browser.mozilla ==true )
       {
            if($.browser.safar==true)
           {

           }
           else
           {
              htmlText ='<label style=\"float:right;cursor:pointer;\" onclick="speakVoice('+option2+')"><i class=\"icon-volume-up tooltip\" title=\"Speak Option\"></i></label>';
           }

       }
		optionNoCounter++;
        dashText = dashText + "<label id=\"radioLabel2\" class=\"optionRadioStyle\"><input id=\"radio2\" name=\"optionGroup\" value=\""  + htmlEscape(currentQuestion.option2.trim()) + "\" type=\"radio\" />  " + htmlText +  htmlEscape(currentQuestion.option2.trim()) + "</label><br>";
	}
    if(cleanValueCheck(currentQuestion.option3.trim()))
	{
         var option3=currentQuestion.option3;
        option3=option3.replace(/'/g,"");
        option3=option3.replace(/&#39;/g,"");
        option3=option3.replace(/&#10;/g,"");
        option3=option3.trim();
        option3=option3.replace(/(<([^>]+)>)/ig,"");
        option3=option3.replace(/"/g,'');
        option3=option3.trim();
        option3=option3.replace(/(\r\n|\n|\r)/gm,"");
        //console.log(questionText);
        option3="'"+option3+"'";
         if($.browser.chrome==true || $.browser.mozilla ==true )
       {
            if($.browser.safar==true)
           {

           }
           else
           {
              htmlText ='<label style=\"float:right;cursor:pointer;\" onclick="speakVoice('+option3+')"><i class=\"icon-volume-up tooltip\" title=\"Speak Option\"></i></label>';
           }

       }
		optionNoCounter++;
        dashText = dashText + "<label id=\"radioLabel3\" class=\"optionRadioStyle\"><input id=\"radio3\" name=\"optionGroup\" value=\"" + htmlEscape(currentQuestion.option3.trim()) + "\" type=\"radio\" /> " + htmlText +  htmlEscape(currentQuestion.option3.trim()) + "</label><br>";
	}
    if(cleanValueCheck(currentQuestion.option4.trim()))
	{
         var option4=currentQuestion.option4;
        option4=option4.replace(/'/g,"");
        option4=option4.replace(/&#39;/g,"");
        option4=option4.replace(/&#10;/g,"");
        option4=option4.trim();
        option4=option4.replace(/(<([^>]+)>)/ig,"");
        option4=option4.replace(/"/g,'');
        option4=option4.trim();
        option4=option4.replace(/(\r\n|\n|\r)/gm,"");
        //console.log(questionText);
        option4="'"+option4+"'";
        if($.browser.chrome==true || $.browser.mozilla ==true )
       {
            if($.browser.safar==true)
           {

           }
           else
           {
              htmlText ='<label style=\"float:right;cursor:pointer;\" onclick="speakVoice('+option4+')"><i class=\"icon-volume-up tooltip\" title=\"Speak Option\"></i></label>';
           }

       }
		optionNoCounter++;
        dashText = dashText + "<label id=\"radioLabel4\" class=\"optionRadioStyle\"><input id=\"radio4\" name=\"optionGroup\" value=\"" + htmlEscape(currentQuestion.option4.trim()) + "\" type=\"radio\" />   " + htmlText +  htmlEscape(currentQuestion.option4.trim()) + "</label><br>";
	}
	
	//if more than one option display all options with radio buttons
	if(optionNoCounter>1)
	{
		myQaObj.quizObj.questionDisplayMode = "OBJECTIVE";
		//console.log("more than 1 option");
	}
	//if only one option then display editable textbox
	else if(optionNoCounter == 1)
	{
		myQaObj.quizObj.questionDisplayMode = "NON-OBJECTIVE";
		dashText = "";
		dashText = dashText + "<br><br><input id=\"answerTextBox\" type=\"text\" style=\"width:70%;\" value=\"\" placeholder=\"Type your answer here\" autofocus><script>setLableForNonObjective(); $(\"#answerTextBox\").keyup(function (e) {if (e.keyCode == 13) { $(\"#nextButton\").click(); } });</script>";
		//console.log("only 1 option");
	}
	else
	{
		//do nothing
	}
    /*if(cleanValueCheck(currentQuestion.option5.trim()))
        dashText = dashText + "<label><input id=\"radio5\" name=\"optionGroup\" value=\"" + htmlEscape(currentQuestion.option5.trim()) + "\" type=\"radio\" />" + htmlEscape(currentQuestion.option5.trim()) + "</label><br>";*/
    
    return dashText;
}

//$(".input1").keyup(function (e) {if (e.keyCode == 13) {// Do something } });

function cleanValueCheck(value)
{
	var isValueClean = true;
	if(value != '' && value != 'noVal' && value != null)
		return isValueClean;
	else 
	{
		isValueClean = false;
		return isValueClean;
	}
}

function isCorrectAnswer()
{
    if($('<div />').html(myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].selectedOption).text().toLowerCase() == $('<div />').html(myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex].answer.trim()).text().toLowerCase())
        return true;
    else
        return false;
}

function updateQuizProgressString(lastUpdatedString, noOfQuestions, qNo, valueToBeReplacedWith) //WORKING
{
       var preTxt = "";
       var postTxt = "";
       var finalString = "";
       for(var i=1; i <noOfQuestions+1; i++)
       {
               if(i == 1)
               {
                       postTxt = lastUpdatedString;
               }
               else
               {
                       preTxt = preTxt + postTxt.substring(0, postTxt.indexOf("|")+1);
                       postTxt = postTxt.substring(postTxt.indexOf("|")+1);
               }
              // alert ("update - [Pre - "+preTxt+"] [Post - "+postTxt+"]");
               if(i==qNo && i != noOfQuestions)
               {
                       postTxt = postTxt.substring(postTxt.indexOf("|"));
                       finalString = preTxt+valueToBeReplacedWith+postTxt;
               //        alert ("update1 - [final String - "+finalString+"]");
                       return finalString;
               }
               else if(i==qNo && i == noOfQuestions)
               {
                       finalString = preTxt+valueToBeReplacedWith;
               //        alert ("update2 - [final String - "+finalString+"]");
                       return finalString;
               }
       }        
       return finalString;
}

function updateQuizStats() 
{   
    //alert(myQaObj.quizObj.userResponseText);
    var stat_responses = encodeURIComponent(myQaObj.quizObj.userResponseText); //this works properly and takes care of '&'
    //var stat_responses = myQaObj.quizObj.userResponseText; //this will not work properly and will not escape special charectors like '&'
   // alert(myQaObj.quizObj.userResponseText);
    var stat_rightOrWrong = myQaObj.quizObj.rightOrWrong;
    var stat_timePerQuestion = myQaObj.quizObj.timePerQuestion;
    var quizId = myQaObj.quizObj.quizSessionId;
    var TAG_QUIZ_PROGRESS = "progress";
    
    var TAG_QUIZ_COMPLETE = "complete";
	var correctAnswers = 0;
    correctAnswers = myQaObj.quizObj.NoOfCorrectAnswers; //pending method myQaObj.quizObj.NoOfCorrectAnswers

    
    var isQuizComplete = false;
    // Start add new code for update quiz record after fix question index
    if(myQaObj.quizObj.currentQuestionIndex == (myQaObj.quizObj.questionSetArray.length-1))
        isQuizComplete = true;
    
	
	//if submit button is clicked irrespective of current question no.
	if(myQaObj.quizObj.isSubmitActive == true)
	{
		myQaObj.quizObj.isSubmitActive = false; //work is done so resetting it back to false	
		myQaObj.quizObj.endTime = new Date();
        myQaObj.quizObj.duration = timeDiff(myQaObj.quizObj.startTime, myQaObj.quizObj.endTime);
        var quizDuration = myQaObj.quizObj.duration;     
           
		var ajaxSuccessCheck = 0;
		$.ajax({url:"modules/quiz/updateQuizStats.php?responseString="+stat_responses+"&rightOrWrongString="+stat_rightOrWrong+"&timePerQuestionString="+stat_timePerQuestion+"&quizId="+quizId+"&correctAnswers="+correctAnswers+"&quizStatus="+TAG_QUIZ_COMPLETE+"&userId="+myQaObj.userId+"&quizDuration="+quizDuration,
				async: false,
				success:function(result) {},
				error:function(result) { ajaxSuccessCheck = -1;}
		});
		if(ajaxSuccessCheck == -1)
		{
			alert("Network Error. Please check your network connectivity and then try to submit again.");
			throw new Error('Network Error');
		}
	}
    // if not the last question of the quiz
    /*else if(isQuizComplete == false) 
    {
         urlTextTemp = "modules/quiz/updateQuizStats.php?responseString="+stat_responses + "&rightOrWrongString="+stat_rightOrWrong+ "&timePerQuestionString="+stat_timePerQuestion+"&quizId="+quizId+"&userId="+myQaObj.userId+ "&quizStatus="+TAG_QUIZ_PROGRESS;
         ////  alert ("modules/quiz/updateQuizStats.php?responseString="+stat_responses + "&rightOrWrongString="+stat_rightOrWrong+ "&timePerQuestionString="+stat_timePerQuestion+"&quizId="+quizId+ "&quizStatus="+TAG_QUIZ_PROGRESS);
        
           $.ajax({url:"modules/quiz/updateQuizStats.php?responseString="+stat_responses+"&rightOrWrongString="+stat_rightOrWrong+"&timePerQuestionString="+stat_timePerQuestion+"&quizId="+quizId+"&userId="+myQaObj.userId+"&quizStatus="+TAG_QUIZ_PROGRESS ,
				   global:false,
				   success:function(result) { },
					error:function(result) {}   
      });
    }*/
    
    else if(isQuizComplete == false) 
    {
         //right now its hard coded for question no 20 or question no 40 ..in future we can automated this based on calculation
        if(myQaObj.quizObj.currentQuestionIndex==19 || myQaObj.quizObj.currentQuestionIndex==39)
        {
             urlTextTemp = "modules/quiz/updateQuizStats.php?responseString="+stat_responses + "&rightOrWrongString="+stat_rightOrWrong+ "&timePerQuestionString="+stat_timePerQuestion+"&quizId="+quizId+"&userId="+myQaObj.userId+ "&quizStatus="+TAG_QUIZ_PROGRESS;
        
            $.ajax({url:"modules/quiz/updateQuizStats.php?responseString="+stat_responses+"&rightOrWrongString="+stat_rightOrWrong+"&timePerQuestionString="+stat_timePerQuestion+"&quizId="+quizId+"&userId="+myQaObj.userId+"&quizStatus="+TAG_QUIZ_PROGRESS ,
				   global:false,
				   success:function(result) { },
					error:function(result) {}   
                });
        }
        
    }
    
    //end code for update on server
    // if last question of the quiz
    else
    {
        myQaObj.quizObj.endTime = new Date();
        myQaObj.quizObj.duration = timeDiff(myQaObj.quizObj.startTime, myQaObj.quizObj.endTime);
        var quizDuration = myQaObj.quizObj.duration;
        //quizEndTime = new Date().getTime(); //TODO
       //var quizDuration = quizEndTime - quizStartTime;
        //alert ("quiz start time : "+quizStartTime+" quiz end time : "+quizEndTime);
     ////   alert ("modules/quiz/updateQuizStats.php?responseString="+stat_responses+"&rightOrWrongString="+stat_rightOrWrong+"&timePerQuestionString="+stat_timePerQuestion+"&quizId="+quizId+"&correctAnswers="+correctAnswers+"&quizStatus="+TAG_QUIZ_COMPLETE+"&quizDuration="+quizDuration);
                   
           $.ajax({url:"modules/quiz/updateQuizStats.php?responseString="+stat_responses+"&rightOrWrongString="+stat_rightOrWrong+"&timePerQuestionString="+stat_timePerQuestion+"&quizId="+quizId+"&correctAnswers="+correctAnswers+"&quizStatus="+TAG_QUIZ_COMPLETE+"&userId="+myQaObj.userId+"&quizDuration="+quizDuration ,async:false,success:function(result) {},
		error:function(result) {} 	
      });
    }
   // alert ("executed");
}

//method for sharing quiz link on social network and other media
function shareUrl(action)
{
       var text = "";
       var url = "";
       if (action == "twitter")
       {
               text = "Just played an interesting quiz. Follow the below given link to play. http://www.quizacademy.org/?"+myQaObj.quizObj.quizSessionId;
               url = "https://twitter.com/intent/tweet?source=webclient&text="+text;
       }
       else if (action == "facebook")
       {
           //replace below code with proper function
           var topicTxt = "";
           if(myQaObj.selectedCourseName != "")
               topicTxt += myQaObj.selectedCourseName + " - ";
           if(myQaObj.selectedSubTopicName != "")
               topicTxt += myQaObj.selectedSubTopicName;
               
            //text = "http://www.moinee.com/quizacademy/?"+myQaObj.quizObj.quizSessionId; //at - removed text as facebook acceptes only URLs. tested and working
           text = "http://www.quizacademy.org/share4fb.php?PARAM=SQZ|"+myQaObj.userId+"|"+myQaObj.quizObj.quizSessionId+"|"+topicTxt+"|"+myQaObj.quizObj.NoOfCorrectAnswers;
           
           url = "http://www.facebook.com/sharer/sharer.php?u="+text;
       }
       else if (action == "gplus")
       {
               text = "Just played an interesting quiz. Follow the below given link to play.<br> http://www.quizacademy.org/?"+myQaObj.quizObj.quizSessionId;
               url = "https://plus.google.com/share?url="+text;
       }
       else if (action == "mail")
       {
               //tbd
           console.log("mail feature to be implemented yet");
       }
       //return url;
       window.open(url,'_blank');
}
 
function displayStarRating() 
{
    return $(this).each(function() 
    {
        $(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).html())))) * 16));
    });
}
/**
this could be a jquery function which will first check for which button is clicked and when. 
post that it will process the next step as per the behaviour of the button.

*/
function onClickQuiz(clickedButton) {
    
}
//******************************* common / util methods start ******************************************

function getQuizDetailsOfStaticQuiz(quizId)
{
    $.ajax({url:"modules/quiz/getQuizDetailsOfQuizId.php?QUIZ_ID=" + quizId, success:function(result){
			setMyQaObjForStaticQuiz(result.substring(result.indexOf("{")));
		   }
		   });
}

function setMyQaObjForStaticQuiz(staticQuizDetailsJson){

	myQaObj.staticQuizDetailsJson = staticQuizDetailsJson;
	var staticQuizDetailsObj = JSON.parse(myQaObj.staticQuizDetailsJson);
	var subTopicIdStringFromDb = staticQuizDetailsObj.staticQuizDetails[0].subTopicIdList;
	myQaObj.selectedCourseName = staticQuizDetailsObj.staticQuizDetails[0].courseName;
	myQaObj.selectedTopicName = staticQuizDetailsObj.staticQuizDetails[0].topicName;
    myQaObj.quizObj.quizType = staticQuizDetailsObj.staticQuizDetails[0].quizType;
									
	if(subTopicIdStringFromDb.indexOf(",")>0)
	   myQaObj.selectedTopic_SubTopicIdsString = subTopicIdStringFromDb;
	else
	{
		myQaObj.selectedSubTopicName = staticQuizDetailsObj.staticQuizDetails[0].subTopicName;
		myQaObj.selectedSubTopicId = subTopicIdStringFromDb;
	}	
}

function initiateAssignmentActivity(namedQuizId,trackClosureRule,completionStatus,userIdString,assignmentId,questionSetSize,questionSetOrder,assignmentType)
{
     myQaObj.quizObj.isAssignment="";   
    myQaObj.quizObj.assignMentId="";
    myQaObj.quizObj.assignedUserIdList="";

//new variables added/handelled for order(ramdom or not), variable questionSize and assignmentType(to cover test also)
    myQaObj.quizObj.questionSetOrder="";
    myQaObj.quizObj.TotalQuestionsInQuiz="";;
    myQaObj.quizObj.assignMentType="";;
    //myQaObj.quizObj.noOfAttempt=noOfAttempt;
    //myQaObj.quizObj.maxPercentage=maxPercentage;
    myQaObj.quizObj.noOfTurns="";
    myQaObj.quizObj.percentageToHit="";
    myQaObj.quizObj.condition="";
    myQaObj.quizObj.isAssignment="True";   
    myQaObj.quizObj.assignMentId=assignmentId;
    myQaObj.quizObj.assignedUserIdList=userIdString;

//new variables added/handelled for order(ramdom or not), variable questionSize and assignmentType(to cover test also)
    myQaObj.quizObj.questionSetOrder=questionSetOrder;
    myQaObj.quizObj.TotalQuestionsInQuiz=questionSetSize;
    myQaObj.quizObj.assignMentType=assignmentType;
    //myQaObj.quizObj.noOfAttempt=noOfAttempt;
    //myQaObj.quizObj.maxPercentage=maxPercentage;
    myQaObj.quizObj.noOfTurns="";
    myQaObj.quizObj.percentageToHit="";
    myQaObj.quizObj.condition="";
    getTrackClosureRuleText(trackClosureRule);
    /*if(trackClosureRule!=""||trackClosureRule!=null)*/
    if(trackClosureRule!="")
    {
        myQaObj.quizObj.isTrackClosure="True";
        myQaObj.quizObj.trackClosureRule=trackClosureRule;
        myQaObj.quizObj.completionStatus=completionStatus;  
    }
    
    if(assignmentType=="Quiz")
    {
        initiateStaticQuiz(namedQuizId);
    }
    else if(assignmentType=="Test")
    {
        initiateStaticTest(namedQuizId);
    }
}


function initiateStaticQuiz(quizId)
{
    resetQuiz();
    var urlString;
    if(myQaObj.quizObj.isAssignment=="True") //this could have been done usin quizType 
    {
        //urlString="modules/questions/getQuestionSetForNamedQuiz.php?NAMED_QUIZ_ID=" + quizId +"&assignMentId="+myQaObj.quizObj.assignMentId+ "&userId=" + myQaObj.userId +"&sessionId=" + myQaObj.userSessionId;
      urlString="modules/questions/getQuestionSetForNamedQuiz.php?NAMED_QUIZ_ID=" + quizId +"&assignMentId="+myQaObj.quizObj.assignMentId+ "&userId=" + myQaObj.userId +"&sessionId=" + myQaObj.userSessionId+"&questionSetSize="+myQaObj.quizObj.TotalQuestionsInQuiz+"&questionSetOrder="+myQaObj.quizObj.questionSetOrder+"&assignMentType="+myQaObj.quizObj.assignMentType;
 
    }
    else
    {
        urlString="modules/questions/getQuestionSetForQuiz.php?QUIZ_ID=" + quizId + "&userId=" + myQaObj.userId +"&sessionId=" + myQaObj.userSessionId;
    }
     $.ajax({url:urlString, success:function(result){
             //alert("tested..,..go questions.........");
//5. if question set is successfully recieved then set questionJSON & session value in myQaObj
             //lets convert it into json object
            var questionSetJsonString = result.substring(result.indexOf("{"));
           // alert("JSON String - " + questionSetJsonString);
            var questionSetJsonObj = JSON.parse(questionSetJsonString);
           // alert("Sucess value - " + questionSetJsonObj.success);
            if( questionSetJsonObj.success == 1)
            {
                myQaObj.quizObj.questionSetJsonString = questionSetJsonString;
                myQaObj.quizObj.quizSessionId = questionSetJsonObj.quiz_id;
            } else {
            
            }
//5.1 populate question object for each question in question_set.
            myQaObj.quizObj.questionSetArray = []; //AT added to reset questionSetArray to start as empty
            for(var i=0; i < questionSetJsonObj.QUESTION_SET.length; i++)
            {
                var tempQestionObj = new QuestionObject();
                tempQestionObj.questionText = questionSetJsonObj.QUESTION_SET[i].QUESTION_TEXT;
                tempQestionObj.option1 = questionSetJsonObj.QUESTION_SET[i].OPT1;
                tempQestionObj.option2 = questionSetJsonObj.QUESTION_SET[i].OPT2;
                tempQestionObj.option3 = questionSetJsonObj.QUESTION_SET[i].OPT3;
                tempQestionObj.option4 = questionSetJsonObj.QUESTION_SET[i].OPT4;
                tempQestionObj.option5 = questionSetJsonObj.QUESTION_SET[i].OPT5;
                tempQestionObj.answer = questionSetJsonObj.QUESTION_SET[i].ANSWER;
                tempQestionObj.kbcLevel = questionSetJsonObj.QUESTION_SET[i].KBC_LEVEL;
                tempQestionObj.selectedOption;
                tempQestionObj.timeToAttempt;
                //PUT IT GLOBALLY IN QUIZ OBJECT QUESTIONSETARRAY
                myQaObj.quizObj.questionSetArray.push(tempQestionObj);
            }
    //SET REST OF THE QUIZ OBJECT PARAMS
            
            myQaObj.quizObj.currentQuestionIndex = 0;
            myQaObj.quizObj.currentQuestionObj = myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex];
           // alert("before date....");        
    myQaObj.quizObj.startTime = new Date();
//6. maintain in_progress quiz session values.    
            setDefaultProgressString(questionSetJsonObj.QUESTION_SET.length); //SETTING DEFAULT VALUES FOR IN_PROGRESS STRINGS FOR QUIZ
           // myQaObj.quizObj.currentQues =  myQaObj.quizObj.questionSetArray[2];
            myQaObj.quizObj.currentQuestionObj.selectedOption = "";
           // alert("ksksk- " + myQaObj.quizObj.currentQuestionObj.selectedOption + " - " + myQaObj.quizObj.currentQuestionObj.questionText);

//7. once this is done get the question to load and construct the screen options and set values.
//    like setQuestionText(), constructOptions, setResponseButton()
            loadQuizViewTemplate() //THIS IS TO DISPLAY QUIZ INTERFACE FOR FIRST TIME AND LOAD FIRST QUESTION 
        }//CLOSE OF AJAX SUCCESS FUNCTION()
    }); //CLOSE OF AJAX CALL
}

function initiateStaticTest(quizId) {
    resetQuiz();
    var urlString;
    if(myQaObj.quizObj.isAssignment=="True") //this could have been done usin quizType 
    {
        urlString="modules/questions/getQuestionSetForNamedQuiz.php?NAMED_QUIZ_ID=" + quizId +"&assignMentId="+myQaObj.quizObj.assignMentId+ "&userId=" + myQaObj.userId +"&sessionId=" + myQaObj.userSessionId+"&questionSetSize="+myQaObj.quizObj.TotalQuestionsInQuiz+"&questionSetOrder="+myQaObj.quizObj.questionSetOrder+"&assignMentType="+myQaObj.quizObj.assignMentType;
    }
    else
    {
        urlString="modules/questions/getQuestionSetForQuiz.php?QUIZ_ID=" + quizId + "&userId=" + myQaObj.userId +"&sessionId=" + myQaObj.userSessionId;
    }
     $.ajax({url:urlString,success:function(result){
     //$.ajax({url:"modules/questions/getQuestionSetForQuiz.php?QUIZ_ID=" + quizId + "&userId=" + myQaObj.userId + "&sessionId=" + myQaObj.userSessionId,success:function(result){
             //alert("tested..,..go questions.........");
//5. if question set is successfully recieved then set questionJSON & session value in myQaObj
             //lets convert it into json object
            var questionSetJsonString = result.substring(result.indexOf("{"));
           // alert("JSON String - " + questionSetJsonString);
            var questionSetJsonObj = JSON.parse(questionSetJsonString);
           // alert("Sucess value - " + questionSetJsonObj.success);
            if( questionSetJsonObj.success == 1)
            {
                myQaObj.quizObj.questionSetJsonString = questionSetJsonString;
                myQaObj.quizObj.quizSessionId = questionSetJsonObj.quiz_id;
            } else {
            
            }
//5.1 populate question object for each question in question_set.
		 	myQaObj.quizObj.questionSetArray = new Array();
            for(var i=0; i < questionSetJsonObj.QUESTION_SET.length; i++)
            {
                var tempQestionObj = new QuestionObject();
                tempQestionObj.questionText = questionSetJsonObj.QUESTION_SET[i].QUESTION_TEXT;
                tempQestionObj.option1 = questionSetJsonObj.QUESTION_SET[i].OPT1;
                tempQestionObj.option2 = questionSetJsonObj.QUESTION_SET[i].OPT2;
                tempQestionObj.option3 = questionSetJsonObj.QUESTION_SET[i].OPT3;
                tempQestionObj.option4 = questionSetJsonObj.QUESTION_SET[i].OPT4;
                tempQestionObj.option5 = questionSetJsonObj.QUESTION_SET[i].OPT5;
                tempQestionObj.answer = questionSetJsonObj.QUESTION_SET[i].ANSWER;
                tempQestionObj.kbcLevel = questionSetJsonObj.QUESTION_SET[i].KBC_LEVEL;
                tempQestionObj.selectedOption;
                tempQestionObj.timeToAttempt;
                //PUT IT GLOBALLY IN QUIZ OBJECT QUESTIONSETARRAY
                myQaObj.quizObj.questionSetArray.push(tempQestionObj);
            }
    //SET REST OF THE QUIZ OBJECT PARAMS
		 	myQaObj.quizObj.quizType = "TEST";
            myQaObj.quizObj.currentQuestionIndex = 0;
            myQaObj.quizObj.currentQuestionObj = myQaObj.quizObj.questionSetArray[myQaObj.quizObj.currentQuestionIndex];
           // alert("before date....");        
    myQaObj.quizObj.startTime = new Date();
//6. maintain in_progress quiz session values.    
            setDefaultProgressString(questionSetJsonObj.QUESTION_SET.length); //SETTING DEFAULT VALUES FOR IN_PROGRESS STRINGS FOR QUIZ
           // myQaObj.quizObj.currentQues =  myQaObj.quizObj.questionSetArray[2];
           // myQaObj.quizObj.currentQuestionObj.selectedOption = "thanvi_arvind";
           // alert("ksksk- " + myQaObj.quizObj.currentQuestionObj.selectedOption + " - " + myQaObj.quizObj.currentQuestionObj.questionText);

//7. once this is done get the question to load and construct the screen options and set values.
//    like setQuestionText(), constructOptions, setResponseButton()
            loadQuizViewTemplate() //THIS IS TO DISPLAY QUIZ INTERFACE FOR FIRST TIME AND LOAD FIRST QUESTION 
        }//CLOSE OF AJAX SUCCESS FUNCTION()
    }); //CLOSE OF AJAX CALL
}

//function to check the schedule of tests assigned to a user
function isTestSchedule()
{
	//alert ("aaa");
	var currentTime=new Date();
	//console.log(currentTime + " - " + myQaObj.quizObj.startTime + " - " + myQaObj.quizObj.endTime);
	var uStartTime = ((myQaObj.quizObj.startTime).split("-")).join("/");
	var uEndTime = ((myQaObj.quizObj.endTime).split("-")).join("/");
	//console.log(">> "+currentTime + " - " + uStartTime + " - " + uEndTime);
	var testStartTime = new Date(uStartTime); //(myQaObj.quizObj.startTime);
	var testEndTime = new Date(uEndTime); //(myQaObj.quizObj.endTime);
	//console.log(currentTime + " - " + testStartTime + " - " + testEndTime);
    //if currentTime is less than start time than msg=test is not active yet
    if(currentTime < testStartTime)
	{
		myQaObj.quizObj.testStatus = "INACTIVE";
	}
    //else if currentTime is greater than start time and less than end time than msg=test is active
    else if(currentTime > testStartTime  && currentTime < testEndTime)
	{
		myQaObj.quizObj.testStatus = "ACTIVE";
	}
    //else msg = test has expired
    else if(currentTime > testEndTime)
	{
		myQaObj.quizObj.testStatus = "EXPIRED";	
	}
	else
	{
		console.log("invalid test status...please check with admin - " + currentTime + " - " + testStartTime + " - " + testEndTime);
        return false;
	}
    return true;
}

//added seperate method for assignment -AT 3Jan
function isAssignmentScheduled() //sets the testStatus value
{
	//console.log("checking and setting assignment status...");
	var currentTime=new Date();
	var uStartTime = ((myQaObj.quizObj.startTime).split("-")).join("/");
	var uEndTime = ((myQaObj.quizObj.endTime).split("-")).join("/");
	//console.log(">> "+currentTime + " - " + uStartTime + " - " + uEndTime);
	var testStartTime = new Date(uStartTime); //(myQaObj.quizObj.startTime);
	var testEndTime = new Date(uEndTime); //(myQaObj.quizObj.endTime);
	//console.log(currentTime + " - " + testStartTime + " - " + testEndTime);
    //if currentTime is less than start time than msg=test is not active yet
    if(currentTime < testStartTime)
	{
		myQaObj.quizObj.testStatus = "INACTIVE";
	}
    //else if currentTime is greater than start time and less than end time than msg=test is active
    else if(currentTime > testStartTime  && currentTime < testEndTime)
	{
		myQaObj.quizObj.testStatus = "ACTIVE";
	}
    //else msg = test has expired
    else if(currentTime > testEndTime)
	{
		myQaObj.quizObj.testStatus = "EXPIRED";	
	}
	else
	{
		console.log("invalid test status...please check with admin - " + currentTime + " - " + testStartTime + " - " + testEndTime);
	}
}


//util methods - this will change the label if question display is NON-OBJECTIVE
function setLableForNonObjective()
{
	var txt = $("#questionCountText").html();
	var newTxt = "Answer the question below" + txt.substring(txt.indexOf("("));
	$("#questionCountText").html(newTxt);
}

//util methods - this will display stats summary in the given div for the question set array provided
function displayStatsForQuestionSetArray(questionSetArray, divName)
			{
				//buildTopicArray
				var topicArray = Array();
				var topicObj = {};
				//buildSubtopicArray
				var subTopicArray = Array();
				var subTopicObj = {};
				//loop thru the questionset array
				for(var i=0; i < questionSetArray.length; i++)
				{
					//get topic value...check if it is in topicArray...if Y then add one to its count...else add the topic with count value 1.
					//if(topicArray.indexOf(questionSetArray[i]) != -1)
					if(topicObj[questionSetArray[i].TOPIC])
					{
						topicObj[questionSetArray[i].TOPIC]['COUNT'] = topicObj[questionSetArray[i].TOPIC]['COUNT'] + 1;
						//console.log(topicObj[questionSetArray[i].TOPIC]['COUNT']);
					}
					else
					{
						//console.log("2222222222222");
						//add in object and array
						topicArray.push(questionSetArray[i].TOPIC);
						topicObj[questionSetArray[i].TOPIC] = {};
						topicObj[questionSetArray[i].TOPIC]['TOPIC'] = questionSetArray[i].TOPIC;
						topicObj[questionSetArray[i].TOPIC]['COUNT'] = 1;
					}
					//similarly get subtopic value...check if it is in subTopicArray...if Y then add one to it's count...else add the subtopic with count value 1 and it's topic value.
					if(subTopicObj[questionSetArray[i].SUBTOPIC])
					{
						subTopicObj[questionSetArray[i].SUBTOPIC]['COUNT'] = subTopicObj[questionSetArray[i].SUBTOPIC]['COUNT'] + 1;
						//console.log(subTopicObj[questionSetArray[i].SUBTOPIC]['COUNT']);
					}
					else
					{
						//console.log("2222222222222");
						//add in object and array
						subTopicArray.push(questionSetArray[i].SUBTOPIC);
						subTopicObj[questionSetArray[i].SUBTOPIC] = {};
						subTopicObj[questionSetArray[i].SUBTOPIC]['SUBTOPIC'] = questionSetArray[i].SUBTOPIC;
						subTopicObj[questionSetArray[i].SUBTOPIC]['COUNT'] = 1;
						subTopicObj[questionSetArray[i].SUBTOPIC]['TOPIC'] = questionSetArray[i].TOPIC;
					}
					
				}
				
				var statHtml = "<table><tr>";
				//loop topic and each subtopic of that topic
				for(var j=0; j < topicArray.length; j++)
				{
					//console.log(topicObj[topicArray[j]]['TOPIC']+" - "+topicObj[topicArray[j]]['COUNT']);
					statHtml += "<td><h5>"+topicObj[topicArray[j]]['TOPIC']+" - "+topicObj[topicArray[j]]['COUNT']+"</h5><br>";
					for(var k=0; k < subTopicArray.length; k++)
					{
						if(topicObj[topicArray[j]]['TOPIC'] == subTopicObj[subTopicArray[k]]['TOPIC'])
						{
							//console.log(subTopicObj[subTopicArray[k]]['TOPIC']+" - "+subTopicObj[subTopicArray[k]]['SUBTOPIC']+" - "+subTopicObj[subTopicArray[k]]['COUNT']);	
							statHtml += ""+subTopicObj[subTopicArray[k]]['TOPIC']+" - "+subTopicObj[subTopicArray[k]]['SUBTOPIC']+" - "+subTopicObj[subTopicArray[k]]['COUNT']+"<br>";
						}
						
					}
					statHtml += "</td>";
				}
				//end table
				statHtml += "</tr></table>";
				$("#"+divName).html(statHtml);
			}

///////////////////////////////////..............KBC FEATURES..............//////////////////////////////////////////
function implement5050Feature()
{
   //console.log("Fifty Fifty Button Clicked");
   $("#dynamicHelp").text("");
   if(myQaObj.quizObj.isDoubleDipActive==true)
   {
        $("#dynamicHelp").text("Lifeline cannot be activated, as Double Dip is in progress.");
        animateSwing50ById("dynamicHelp");
        return false;
       
   }
   if(!cleanValueCheck(myQaObj.quizObj.currentQuestionObj.option4.trim()))
   //if(myQaObj.quizObj.currentQuestionObj.option4.trim()=="")
   {
    $("#dynamicHelp").text(CONSTANT_KBC.get('CONS_FIFTYFIFY_ERROR'));
   }
   else
   {
       $("#dynamicHelp").text(CONSTANT_KBC.get('CONS_FIFTYFIFY_USED'));
       animateSwing50ById("dynamicHelp");
       $("#fiftyFifty").attr('disabled',true);
       $("#fiftyFifty").attr('class','grey pill');
       //remove the hover behaviour
       $("#fiftyFifty").css('cursor','auto');
       $("#fiftyFifty").attr('title','50-50 is used');
       //for disable two option
       var i = 0;
       var firstOptionNumber;
        while(i<2)
        {
            //take a random number from 1 to 5
            var optionNumber;
            optionNumber = Math.round( Math.random() * 4 );
            if(i==0)
            {
                firstOptionNumber = optionNumber;
            } 
            else if (i==1 && firstOptionNumber == optionNumber)
            {
                optionNumber = 0;
            }

            //run a switch case on each option.
            switch(optionNumber)
            {
                case 1: 
                    if (myQaObj.quizObj.currentQuestionObj.option1.toLowerCase() != myQaObj.quizObj.currentQuestionObj.answer.toLowerCase())
                    {
                        $("#radio1").prop('checked', false);
                        $("#radio1").attr('disabled',true);
                        $("#radioLabel1").css("text-decoration", "line-through");
                        $('#radioLabel1').css('cursor','auto');
                       // myQaObj.quizObj.currentQuestionObj.option1.strike();
                        //lbl_RB_opt1.enabled = false;
                        i++;
                    }
                    break;
                case 2: 
                    if (myQaObj.quizObj.currentQuestionObj.option2.toLowerCase() != myQaObj.quizObj.currentQuestionObj.answer.toLowerCase())
                    {
                        $("#radio2").prop('checked', false);
                        $("#radio2").attr('disabled',true);
                        $("#radioLabel2").css("text-decoration", "line-through");
                        $('#radioLabel2').css('cursor','auto');
                        //lbl_RB_opt2.enabled = false;
                        i++;
                    }
                    break;
                case 3: 
                    if (myQaObj.quizObj.currentQuestionObj.option3.toLowerCase() != myQaObj.quizObj.currentQuestionObj.answer.toLowerCase())
                    {
                        $("#radio3").prop('checked', false);
                        $("#radio3").attr('disabled',true);
                        $("#radioLabel3").css("text-decoration", "line-through");
                        $('#radioLabel3').css('cursor','auto');
                        //lbl_RB_opt3.enabled = false;
                        i++;
                    }
                    break;
                case 4: 
                    if (myQaObj.quizObj.currentQuestionObj.option4.toLowerCase() != myQaObj.quizObj.currentQuestionObj.answer.toLowerCase())
                    {
                        $("#radio4").prop('checked', false);
                        $("#radio4").attr('disabled',true);
                        $("#radioLabel4").css("text-decoration", "line-through");
                        $('#radioLabel4').css('cursor','auto');
                        //lbl_RB_opt4.enabled = false;
                        i++;
                    }
                    break;

                default : 
            }
        }
       
       this.isFiftyFiftyUsed=true;
   }
}

function implementDoubleDipFeature()
{
   $("#dynamicHelp").text("");
   if(!cleanValueCheck(myQaObj.quizObj.currentQuestionObj.option4.trim()))
  // if(myQaObj.quizObj.currentQuestionObj.option4=="")
   {
    $("#dynamicHelp").text(CONSTANT_KBC.get('CONS_DOUBLEDIP_ERROR'));
    animateSwing50ById("dynamicHelp");
   }
   else
   {
     
        myQaObj.quizObj.isDoubleDipActive=true;
       // console.log("Double Dip Clicked");
        $("#dynamicHelp").text(CONSTANT_KBC.get('CONS_DOUBLEDIP_USED'));
        animateSwing50ById("dynamicHelp");
        $("#doubleDip").attr('disabled',true);
        $("#doubleDip").attr('class','grey pill');
        $("#doubleDip").attr('title','Double Dip is used');
        $("#doubleDip").css('cursor','auto');
   }
}

function implementQuitFeature()
{
    var quitConfirmationPopUp = confirm("You are going to quit KBC game. Press OK to continue...");
    if (quitConfirmationPopUp == true)
    {
        myQaObj.quizObj.isQuit=true;
        //invoke next button click button
        $("#nextButton").click();
      //  myQaObj.quizObj.isQuit=false;
        //make sure score template is loaded and change the behaviour if quiz type is KBC
        loadQuizScoreTemplate();
    }
    else
    {
        //do nothing
    }
}

function calculateSafeLandingScore(noOfCorrectAnswer)
{
    if(noOfCorrectAnswer<2)	{ myQaObj.quizObj.safeLandingValue = 0;	}
    else if((noOfCorrectAnswer>1) && (noOfCorrectAnswer <5))	{ myQaObj.quizObj.safeLandingValue = 2;	}
    else if((noOfCorrectAnswer>4) && (noOfCorrectAnswer <8))	{ myQaObj.quizObj.safeLandingValue = 5;	}
    else if((noOfCorrectAnswer>7) && (noOfCorrectAnswer <10))	{ myQaObj.quizObj.safeLandingValue = 8;	}
    else if((noOfCorrectAnswer>9) && (noOfCorrectAnswer <15))	{ myQaObj.quizObj.safeLandingValue = 10;}
    else if((noOfCorrectAnswer>14) && (noOfCorrectAnswer <20))	{ myQaObj.quizObj.safeLandingValue = 15;}
    else if(noOfCorrectAnswer == 20)	{ myQaObj.quizObj.safeLandingValue = 20;}
    else
    {}
    //console.log(myQaObj.quizObj.safeLandingValue);
    //console.log("2");
}

function calculateKBCScore()
{
    /*var scoreObj={0:0,1:10000,2:25000,3:75000,4:150000,5:300000,6:600000,7:1200000,8:2500000,9:5000000,10:10000000,11:11000000,12:12000000,13:13000000,14:14000000,15:15000000,16:16000000,17:17000000,18:18000000,19:19000000,20:20000000};*/
      //check if isQuit is true than normal case another wise use safeLandingvalue
       myQaObj.quizObj.kbcScore=myQaObj.quizObj.scoreObj[myQaObj.quizObj.NoOfCorrectAnswers]; 
          
    
}

//Study Links Real State Space Covering While Playing Quiz

function getStudyLinkDetailsForSelectedSubtopic(subTopicId)
{
    // call ajax to get the study link details
    var data = {"subtopicId":subTopicId};
    $.ajax({
    url: 'modules/media/getStudyLinksDetails.php',
    type: 'POST',
    data: data,
    async: false,
    cache: false,
    success: function (returndata)
    {
          var studyLinksDetailsJsonObj = JSON.parse(returndata);
                
          setUiForInfoBoardStudyLinks(studyLinksDetailsJsonObj);
                /* // console.log(questionSetJsonObj);
                 if(studyLinksDetailsJsonObj.STUDY_LINK_DETAILS != null)

                 {
                    for(var j=0; j<studyLinksDetailsJsonObj.STUDY_LINK_DETAILS.length; j++)
                    {
                        
                    }
                 }*/
    }
  });
    
}

function initiateDifferentModeOfQuiz(typeOfQuiz)
{
    if(typeOfQuiz=="Practice")
    {
        if (confirm("You Are Going To Switch Practice Mode Quiz!") == true)
        {
            //txt = "You pressed 
            initiateDynamicQuiz(myQaObj.selectedSubTopicId,'Practice');
            
        } 
        else
        {
            //txt = "You pressed Cancel!";
            //do nothing
        }
    }
    else if(typeOfQuiz=="Learn")
    {
        if (confirm("You Are Going To Switch Learn Mode Quiz!") == true)
        {
            //txt = "You pressed 
            initiateDynamicQuiz(myQaObj.selectedSubTopicId,'Learn');
            
        } 
        else
        {
            //txt = "You pressed Cancel!";
            //do nothing
        }
    }
    else
    {
        //written question set
        getPracticeQuestionSet();//
    }
}
function getParentQuestionDetails(questionID)
{
       var questionObj="";
      var data = {"questionId":questionID};
    $.ajax({
    url: 'modules/questions/getQuestionById.php',
    type: 'POST',
    data: data,
    async: false,
    cache: false,
    success: function (returndata)
    {
           questionObj = JSON.parse(returndata);
            
          
    }
  });
    return questionObj;
}