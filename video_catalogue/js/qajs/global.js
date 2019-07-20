function Qa_Session() //emply constructor for this object
{
    //---user stats
    this.loginType = "QA"; //added for social networking logins in future.
    this.userid; //I
    this.userName;
    this.userSessionId; //I
    
    //---FOR COURSE SELECTION

    //---user selections stats
 
    this.selectedCourseName=""; //I
    this.selectedTopicName=""; //I
    
    this.selectedSubTopicId; //I
    this.selectedSubTopicName=""; //
}

function quiz_Session() //empty constructor for this object
{
    //---quiz stats
    this.quizSessionId; //I
    this.TotalQuestionsInQuiz = 10; //default
    this.quizType = "QUIZ"; //default
    this.questionSetJsonString; //I
    this.questionSetArray = []; //I
    this.isLastQuestion=false;
    this.currentQuestionIndex; //I
    this.currentQuestionObj; //I
    this.currentQuestionOptionCount;//added for kbc feature
    this.isFiftyFiftyUsed=false;//for 50-50 feature of kbc(to be reset at the start of quiz
    this.isDoubleDipActive=false;//for double dip feature
    //this.kbcExitMode="";//lost or quit
    this.isQuit=false;
    this.kbcScore=0;
    this.scoreObj={0:0,1:10000,2:25000,3:75000,4:150000,5:300000,6:600000,7:1200000,8:2500000,9:5000000,10:10000000,11:11000000,12:12000000,13:13000000,14:14000000,15:15000000,16:16000000,17:17000000,18:18000000,19:19000000,20:20000000};
    this.safeLandingScore=0;
    this.NoOfCorrectAnswers = 0;
    
    this.startTime; //I
    this.endTime;
    this.duration;
    //this.activityId; //to be used for activity management

    this.userResponseText;
    this.rightOrWrong;
    this.timePerQuestion;
	
	//this.isBackButtonHit = false; replaced with isReviewActive...
	this.isReviewActive = false;
	this.selectedReviewQuestionNo = -1;
	this.questionStatus = "Not Attempted";
	
	this.testStatus = "";
	
	this.isSubmitActive = false;
	
	//this will tell about question display mode.
	this.questionDisplayMode = "OBJECTIVE";

    this.questionSetOrder;
}

function QuestionObject()
{
    this.questionId;
    this.questionText;
    this.option1;
    this.option2;
    this.option3;
    this.option4;
    this.answer;
    this.kbcLevel;
    this.selectedOption;
    this.timeToAttempt;
    this.createdOn;
    this.reviewStatus;
    this.quesionStartTime;
    this.questionEndTime;
}

//this will be used to store all details about tests like test schedule, question set, score of the test etc...