var startpage = {};

startpage.task = {};
// TEXT ON THE FIRST PAGE  ----------------------------------------------------------------------


startpage.section = {};
startpage.section.header =
    '<!-- ####################### Heading ####################### -->' +
    '<a name="top"></a>' +
    '<h1 style="text-align:center;" id="header" class="header">' +
    '   &nbsp; University of Bristol Study: <br> Emotional Responses to Shapes </h1>';


  startpage.task.blurb = '<p>This is an experiment in which you\'ll [DESCRIPTION, FIRST LINE OF TEXT] <br/> The experiment takes about 10 minutes <br /></p><br />This study is run by the University of Bristol. <br /><b>You must be 18 or over to participate and you should be fluent in written English.';



startpage.section.start =
    '<!-- ####################### Start page ####################### -->' +
    '<div class="start">' +
    '<div class="start" style="text-align:left; border:0px solid;">' +
    '<p>' + startpage.task.blurb + '</p> ' +
    "<p>BOTTOM TEXT</p>" +
        '</div>' +
    '</div>';


    var startPage = {
        type: jsPsychHtmlButtonResponse,
        stimulus: startpage.section.header + startpage.section.start,
        choices: ["continue"]
    }



    function checkUserIDResponse(data, textStatus, jqXHR){
      // console.log("data: "+data)
      parts = data.split(",", 4);
      if(parts[0] == "NOTFOUND"){
        console.log("user not found")
      } else if (parts[0] == "NEWUSER") {
        console.log("generating new user")
        Fcount = Number(parts[1])
        Ucount = Number(parts[2])
        if(Math.random()>=0.5){
          TextType = "B";
        } else {
          TextType = "A";
        }
        trialPart = 1;
        userCode = (Math.floor(Math.random() * 899999) + 100000).toString();
        if(Fcount>Ucount+3){
          condition = 'U';
        } else if(Ucount>Fcount+3){
          condition = 'F';
        } else {
          if(Math.random()>=0.5){
              condition = "U";
          } else {
              condition = "F";
          }
          // console.log(userCode, condition, trialPart);
        } 
      } else {
        // USER FOUND
        // console.log("user found")
        userCode = parts[0]
        condition = parts[1] == "F" ? "U" : "F";
        trialPart = Number(parts[2])+1;
        if(parts[3]=="A"){
          TextType = "B";
        } else {
          TextType = "A";
        }        
      }
      // console.log("response processed. UserCode: " + userCode);
      jsPsych.resumeExperiment();
    }

    function checkUserID(userID, callback){
      $.post('checkid',{"userID": userID}, callback); 
      // pause until we've got the data back from the server
      // console.log("post sent. UserCode: " + userCode);
      jsPsych.pauseExperiment();
    }


    var consentHTML =
    '   <!-- ####################### Consent ####################### -->' +
    '   <div class="consent1">' +
    '       <div class="consent" style="text-align:left; border:0px solid">' +
    // '            <p align="right">Approval No ' + welcome.ethics.approval + '</p>' +
    '           <p align="center"><b>THE UNIVERSITY OF BRISTOL: ' +
    '           <br /> PARTICIPANT INFORMATION AND CONSENT FORM</b><br>' + 
    // welcome.ethics.name + '</b></p>' +
    '       <p>This page provides information on the study, and what you what you will be asked to do if you agree to be involved. At the bottom of the page you can give consent to continue with the study. To withdraw you can simply close this browser tab at any time. If you withdraw in this way, your data will automatically be deleted from the study and destroyed. In addition, you are free to not answer specific items about yourself. </p>' +

    '       <p><strong>Purpose of study</strong><br />' +
    '       We are studying  BLAH BLAH BLAH.</p>' +

    '       <p><strong>Time commitment</strong>' +
    '       <br />The study will take about 10 minutes' +    

    '       <p><strong>What do I do in this study?</strong><br />' +
    '       You will first be introduced to the experiment environment with some training exercises. Then you will be asked to respond to 24 images, describing your emotional response</p>' +    

    '   <p><strong>Do I have to take part? Can I withdraw?</strong><br />' +
    '       You do not have to take part and you can withdraw at any time without having to give a reason. You can give consent by clicking the confirm button at the bottom of this page. ' +

    '       <p><strong>What data is captured ?</strong><br />' +
    '       We only record your responses to the images, no information which could identify you is requested. </p>' +
    
    '       <p><strong>How will my data be used?</strong><br />' +
      
    '       <p>The anonymous data collected from this study may be published, or used in articles for publication in journals and conference proceedings. We do not collect your name, and results from the research will be presented in accordance with rules for anonymity such that the results cannot be traced to individual participants. The outcomes of the study will also be made available for you to access if you wish - <a href="mailto:fefe@itu.dk">please contact us</a> if you wish to be informed about the outcome.</p>' +

   '       <p><strong>Will my taking part in the study be kept confidential?</strong><br />' +
    '       Yes. Nobody except the experimenter will be able to connect your data to any identifying information. The text you type will be deleted after analysis and only the timings of keystrokes will be kept. Your participation will not be disclosed to any other parties.</p>' +
    // '           <p><b>Recompense to participants</b></p>' +
    // '           <p>As stated on the Amazon Mechanical Turk page, the pay for completing this HIT is <b>' + welcome.task.pay + '</b></p>' +
    '       <p><strong>What are the possible risks and disadvantages of taking part</strong><br />' +
    '       There are no known risks or disadvantages to you associated with this experiment.</p>' +

  '       <p><strong>Who is organising and funding this research?: </strong><br /> This research is organised by Feng Feng, a research associate at the University of Bristol.</p>' +    

  '       <p><strong>Who has reviewed the study?: </strong><br /> This research has been reviewed by Dr Oussama Metatla and by the Faculty Research Ethics Committee.</p>' +        '       <p>This study has been approved on ethical grounds by the University Of Bristol Faculty Of Engineering Ethics Board.&nbsp; Any questions regarding your rights as a participant may be addressed to that committee through the Faculty Ethics Officer (<a href="http://www.bris.ac.uk/red/support/governance/ethics/ethics.html">see details here</a>). Please note that you are free to withdraw from participation at any time.</p>' +
    '       <p>&nbsp;</p>' +
    '           <p align="center"><b>PARTICIPANT CONSENT</b></p>' +
    '           By continuing, you are making a decision whether or not to participate. ' +
    '   To withdraw your consent, simply close the browser tab. Your data will be deleted from our records.' +  
    '   If you wish to ask further questions before participating you may contact us via Prolific.<br/>' + 
    '   Alternatively, if you feel you are satisfied with the information you have been provided, you can click the button below to indicate that you have read the information provided on this page, and you have decided to participate. <br/>' +
    '   If you click this button and continue you may still withdraw at any point, and without needing to give any reason for withdrawing. You may withdraw at any time before completion of the study.'+
    '           <br>' +
    // '           <p align="center">' +
    // '           <input type="button" id="consentButton1" class="consent jspsych-btn" value="I agree" onclick="welcome.click.consent1()" >' +
    // '           </p>' +
    '       </div><br><br></div>';


    var consent_page = {
        type: jsPsychHtmlButtonResponse,
        stimulus: consentHTML,
        choices: ["I agree"]
    }




    var demog_page = {
        type: jsPsychSurveyText,
        preamble: [    
            '<p font-size:110%><b>Demographic information:</b></p>' +
            '<p>We use this information to check that our sample is representative. We do not record your name and none of this data will be connected to your identity in any of our analyses. <br/><br/> All data will be deleted if you withdraw.</p>'
            ],
        questions: [
            {prompt: "gender", rows: 1, columns: 12, required: true},
            {prompt: "age", rows: 1, columns: 3, required: true},
            {prompt: "first language", rows: 1, columns: 20, required: true},
            {prompt: "country", rows: 1, columns: 20, required: true},
          ],
          data: {easyName: 'demographics'}
    }





    /* define the debrief block */
    var debrief_page = {
      type: jsPsychInstructions,
      pages: ['<p>Thanks for participating.</p><br><p>Click submit to finish.</p>',],
      show_clickable_nav: true
    };


    /* placeholder */
    var placeholder_page = {
        type: 'instructions',
        pages: [
            'click to move on'
        ],
        show_clickable_nav: true
    }


    