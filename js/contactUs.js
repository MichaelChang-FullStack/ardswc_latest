/*Generate Capcha*/
  function generateRandomValue() {
      var uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
      var numbers = '0123456789';

      var char1 = uppercaseCharacters.charAt(Math.floor(Math.random() * uppercaseCharacters.length));
      var char2 = numbers.charAt(Math.floor(Math.random() * numbers.length));
      var char3 = lowercaseCharacters.charAt(Math.floor(Math.random() * lowercaseCharacters.length));
      var char4 = numbers.charAt(Math.floor(Math.random() * numbers.length));

      var captchaValue = [char1, char2, char3, char4];
      var captcha = shuffleArray(captchaValue).join('');

      return captcha;
  }

  function shuffleArray(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }

      return array;
  }

  function regenerateCaptcha() {
      var captchaLabel = document.getElementById('captcha-label');
      captchaLabel.innerHTML = generateRandomValue();
  }

  // Initial captcha generation
  regenerateCaptcha();


/*Speech capcha*/

$(document).ready(function() {
$('#speak').click(function() {
  var text = document.getElementById("captcha-label").innerHTML;
  fetchSpeech(text);
});

$('#captcha-regenerate').click(function() {
  stopAudio(function() {
      regenerateCaptcha();
  });
});
});

var isPlaying = false; // Flag to track audio playback status

function fetchSpeech(text) {
/*var data = {
  input: { text: text },
  voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
  audioConfig: { audioEncoding: 'MP3' },
};*/
var data = {
          input: { text: text },
          voice: { languageCode: 'cmn-TW', ssmlGender: 'NEUTRAL' },
          audioConfig: { audioEncoding: 'MP3' },
      };

var characters = text.split(''); 
var audio = document.getElementById('audio');

function playNextCharacter(index) {
  if (index >= characters.length) {
      isPlaying = false; 
      return; 
  }

  var currentCharacter = characters[index];
  var isUpperCase = currentCharacter === currentCharacter.toUpperCase();

  data.input.text = currentCharacter; 
  data.voice.ssmlGender = isUpperCase ? 'MALE' : 'FEMALE'; 

  $.ajax({
      type: 'POST',
      url: 'https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyBm7vO5EBLe9rT-4RmEHhb3f5-ExfU13Mc',
      data: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      },
      success: function(response) {
          audio.src = 'data:audio/mp3;base64,' + response.audioContent;
          audio.play();
          isPlaying = true; 

          
          setTimeout(function() {
              playNextCharacter(index + 1);
          }, 1000); 
      }
  });
}


playNextCharacter(0);
}

function stopAudio(callback) {
var audio = document.getElementById('audio');
audio.pause();
audio.currentTime = 0;

if (typeof callback === 'function') {
  callback();
}
}

setInterval(function() {
if (!isPlaying) {
  stopAudio();
}
}, 100); 


/*Insert*/

jQuery(document).on('click','#save-event', function(e) {
    e.preventDefault();
    var nickname=document.getElementById("nickname").value;
    var contact_email=document.getElementById("email").value;
    var contact_number=document.getElementById("contact_number").value;
    var feedback=document.getElementById("feedback").value;
    var verification_code=document.getElementById("verification_code").value;
    var captcha_label=document.getElementById("captcha-label").innerHTML;

    var checkboxes_gender = document.querySelectorAll('input[name="gender"]');
  
    
  
    var pass_nickname=1;
    var pass_contact_number=1;
    var pass_mail_address=1;
    var pass_capcha=1;
    var pass_gender=1;
    var pass_feedback=1;
  
    if(verification_code==captcha_label)
    {
        pass_capcha=0;
    }

    
    
  
    if(nickname!=null && nickname!='')
    {
  
      function containsChar(input) {
        var regex = /\p{L}/u; 
        return regex.test(input);
      }
  
  
      if (containsChar(nickname)) {
        console.log("Valid name");
        pass_nickname=0;
      } else {
        console.log("Invalid name");
        pass_nickname=1;
      }
  
    }
  
    /*Check Gender should select*/
    for (var i = 0; i < checkboxes_gender.length; i++) {
      if (checkboxes_gender[i].checked) {
        pass_gender=0;
      }
    }


    if(contact_number!=null && contact_number!='')
    {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/;
  
  
      var textphone=phoneRegex.test(contact_number);
      console.log(textphone);
  
      if(textphone==true)
      {
        pass_contact_number=0;
      }
      else if(textphone==false)
      {
        pass_contact_number=1;
      }
  console.log(pass_contact_number);
    }
  
  
    function validateEmail(email) {
      // Regular expression pattern to match an email address
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    }
  
    if(contact_email!=null && contact_email!='')
    {
    if (validateEmail(contact_email)) {
      console.log("Valid email address");
      pass_mail_address=0;
    } else {
      console.log("Invalid email address");
      pass_mail_address=1;
    }
    }

    if(feedback!=''&&feedback!=null)
    {
      pass_feedback=0;
      console.log("not empty");
    }
    else
    {
      console.log("empty");
    }
  
    

    

  
    if(pass_nickname==0&&pass_contact_number==0&&pass_mail_address==0&&pass_capcha==0&&pass_gender==0&&pass_feedback==0)
    {
  
    jQuery.ajax({
            url: "./server/contactUs.php",
            method: "POST",              
            data:jQuery("form#addnew_form_data").serialize(),
            dataType:"html",
            success: function(response) {
              console.log(response);
  var data = JSON.parse(response);
  
  if (data.status === 'true') {
    alert('Thanks for contact us');
    const add_contact_us_form = document.getElementById("addnew_form_data");
    add_contact_us_form.reset();
    
  
  } else {
    alert('Something went wrong,please try again later');
  }
  },
            error: function (xhr, ajaxOptions, thrownError) {
                ////console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
    }); 
  }
  else if(pass_nickname==1)
  {
  
  alert("Please input valid nickname");
  }
  else if (pass_gender==1)
  {
    alert("Please select gender");
  }
  else if(pass_mail_address==1)
  {
  
  alert("Please input valid mail address");
  }
  
  else if(pass_contact_number==1)
  {
  
  alert("Please input valid contact number");
  }
  else if(pass_feedback==1)
  {
  alert("Please input valid feedback");
  }
  else if(pass_capcha==1)
  {
  alert("Please input valid capcha");
  }
  else
  {
  alert("please fill all required field");
  }
  
  });