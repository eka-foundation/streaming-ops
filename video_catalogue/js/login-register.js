/*
 *
 * login-register modal
 * Autor: Creative Tim
 * Web-autor: creative.tim
 * Web script: http://creative-tim.com
 * 
 */
var afterRegisterEmail="";
var afterRegisterPassword=";"
function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('<i class="fa fa-signal"></i> QUIZACADEMY</a>');
    }); 
    $('.error').removeClass('alert alert-danger').html('');
       
}
function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');    
        });
        
        $('.modal-title').html('<i class="fa fa-signal"></i> QUIZACADEMY</a>');
    });       
     $('.error').removeClass('alert alert-danger').html(''); 
}

function openLoginModal(){
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}
function openRegisterModal(){
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}

function loginAjax(activity)
{
    var username="";
    var password="";
    var name="";
    var cpassword="";
    if(activity=="LOGIN")
    {
         username=$("#username").val();
         password=$("#password").val();
    }
    else if(activity=="SIGNUP")
    {
         username=$("#email").val();
         password=$("#rpassword").val();
         cpassword=$("#password_confirmation").val();
         name=$("#name").val();
    }
    else if(activity=="LOGINAFTERREGISTER")
    {
       username=afterRegisterEmail;
       password=afterRegisterPassword;
       activity="LOGIN";
    }
    if(validateEmailId(username))
    {
       if(activity=="SIGNUP")
       {
           if(cpassword==password)
           {
               if(isPasswordValidate(password))
               {
                   //go with the flow
               }
               else
               {
                   shakeModal("INV_DIGI");
                   return false;
               }
           }
           else
           {
               shakeModal("WRONG_PASSWORD");
               return false;
           }
       }
       var data={username:username,password:password,activity:activity,name:name};
    
     $.ajax({
                type: "POST",
                url: "http://localhost/quizacademy/modules/login/userValidation.php",
                data: data,
                success: function(result)
                 {
                     //console.log(result);
                     var tempR = result;
                     var st = tempR.indexOf("{");
                     var userSessionId="";
                     if(tempR.substring(st+1, st+2) == "1")
                     {
                         if(activity=="LOGIN")
                         {
                             var st2 = tempR.indexOf("-");
                             userSessionId=tempR.substring(st2+1);
                             //successfull login
                              // here through php you can redirect page to quizacademy
                             var url="http://localhost/quizacademy/index.php";
                             //var jsonParam='{`userSessionId`:'+userSessionId+',`emailId`:'+username+'}';
                             openURLThroughPost(url,userSessionId,username);    
                         }
                         else if(activity=="SIGNUP")
                         {
                             afterRegisterEmail=username;
                             afterRegisterPassword=password;
                             loginAjax("LOGINAFTERREGISTER");
                             //initiate loginAjaxModel("LOGINAFTERREGISTER")
                         }
                         
                     }
                     else
                     {
                         shakeModal('INV_CRED');
                     }
                 }
            }); 
    }
    else
    {
        shakeModal('INV_EMAIL');
    }
    //first get the user name and password in variables
    
}
function isPasswordValidate(password)
        {
            if(password.length < 6)
            {
                return false;
            }
            else
            {
                var passwordExpression=(/^[0-9a-zA-Z-_]+$/);
                if(passwordExpression.test(password))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
function validateEmailId(emailId)
		{
			//var emailId = document.getElementById("emailForForgotPwd").value;
            
			var atpos=emailId.indexOf("@");
			var dotpos=emailId.lastIndexOf(".");
            //if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId)==false)
            if (/^\w+([\.-]?\w+)([\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId)==false)
			//if (atpos<1 || dotpos<atpos+2 || dotpos+2>=emailId.length)
			{
					//alert("Not a valid e-mail address");
					//shakeModal();
					//document.getElementById(tdId).style.display = "block";
					//document.getElementById(tdId).innerHTML="Invalid Email Address.";
	  				return false;
			}
			else
			{
				return true;
			}
		}
 function openURLThroughPost(url,userSessionId,username)
{
    console.log(url+userSessionId+username);
    /*console.log(jsonParams);
    userSessionId="hello";
    jsonParams=jQuery.parseJSON(JSON.stringify(jsonParams));
    jsonParams=jsonParams.replace(/`/g,'"');
    console.log(jsonParams);*/
    //jsonParams=jQuery.parseJSON(jsonParams);
    var data={userSessionId:userSessionId,emailId:username};
    open = function(verb, url, data, target)
    {
          var form = document.createElement("form");
          form.action = url;
          form.method = verb;
          form.target = target || "_blank";
          if (data) 
          {
            //console.log(data);
            for (var key in data) 
            {
                  var input = document.createElement("textarea");
                  input.name = key;
                  input.value = data[key];
                  form.appendChild(input);
                 // console.log(key);console.log(data[key]);
            }
          }
          form.style.display = 'none';
          document.body.appendChild(form);
          form.submit();
    };
open('POST', url, data ,'_self');
}
function shakeModal(messageHint)
{
    var message="";
    if(messageHint=="INV_EMAIL")
    {
        message="Invalid Email Address";
    }
    else if(messageHint=="INV_CRED")
    {
        message="Wrong Username Or Password"
    }
    else if(messageHint=="INV_DIGI")
    {
        message="Minimum Six Digits Required";
    }
    else if(messageHint=="WRONG_PASSWORD")
    {
        message="Password must be same";
    }
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html(message);
             $('input[type="password"]').val('');
             setTimeout( function(){ 
                $('#loginModal .modal-dialog').removeClass('shake'); 
    }, 1000 ); 
}

   