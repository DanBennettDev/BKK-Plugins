// JSPSYCH Standard stuff

var jsPsychBKKSurveyText = (function (jspsych) {
  'use strict';

  const info = {
      name: "survey-text",
      parameters: {
        // BKK PARAMS START /////////////////////

        spike: {
          type: jspsych.ParameterType.INT,
          default: 120,
        },
        complexity: {
          type: jspsych.ParameterType.INT,
          default: 100,
        },
        noise: {
          type: jspsych.ParameterType.INT,
          default: 100,
        },
        smooth: {
          type: jspsych.ParameterType.INT,
          default: 100,
        },
        move: {
          type: jspsych.ParameterType.INT,
          default: 0,
        },
        bbkkSize: {
          type: jspsych.ParameterType.FLOAT,
          default: 150,
        },
        bkkColor:{
          type:jspsych.ParameterType.STRING,
          default:"#36DDD2"
        },

        // BKK PARAMS END /////////////////////

          questions: {
              type: jspsych.ParameterType.COMPLEX,
              array: true,
              pretty_name: "Questions",
              default: undefined,
              nested: {
                  /** Question prompt. */
                  prompt: {
                      type: jspsych.ParameterType.HTML_STRING,
                      pretty_name: "Prompt",
                      default: undefined,
                  },
                  /** Placeholder text in the response text box. */
                  placeholder: {
                      type: jspsych.ParameterType.STRING,
                      pretty_name: "Placeholder",
                      default: "",
                  },
                  /** The number of rows for the response text box. */
                  rows: {
                      type: jspsych.ParameterType.INT,
                      pretty_name: "Rows",
                      default: 1,
                  },
                  /** The number of columns for the response text box. */
                  columns: {
                      type: jspsych.ParameterType.INT,
                      pretty_name: "Columns",
                      default: 40,
                  },
                  /** Whether or not a response to this question must be given in order to continue. */
                  required: {
                      type: jspsych.ParameterType.BOOL,
                      pretty_name: "Required",
                      default: false,
                  },
                  /** Name of the question in the trial data. If no name is given, the questions are named Q0, Q1, etc. */
                  name: {
                      type: jspsych.ParameterType.STRING,
                      pretty_name: "Question Name",
                      default: "",
                  },
              },
          },
          /** If true, the order of the questions in the 'questions' array will be randomized. */
          randomize_question_order: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Randomize Question Order",
              default: false,
          },
          /** HTML-formatted string to display at top of the page above all of the questions. */
          preamble: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Preamble",
              default: null,
          },
          /** Label of the button to submit responses. */
          button_label: {
              type: jspsych.ParameterType.STRING,
              pretty_name: "Button label",
              default: "Continue",
          },
          /** Setting this to true will enable browser auto-complete or auto-fill for the form. */
          autocomplete: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Allow autocomplete",
              default: false,
          },
      },
  };
  /**
   * **survey-text**
   *
   * jsPsych plugin for free text response survey questions
   *
   * @author Josh de Leeuw
   * @see {@link https://www.jspsych.org/plugins/jspsych-survey-text/ survey-text plugin documentation on jspsych.org}
   */
  class SurveyTextPlugin {
      constructor(jsPsych) {
          this.jsPsych = jsPsych;
      }
      trial(display_element, trial) {
          for (var i = 0; i < trial.questions.length; i++) {
              if (typeof trial.questions[i].rows == "undefined") {
                  trial.questions[i].rows = 1;
              }
          }
          for (var i = 0; i < trial.questions.length; i++) {
              if (typeof trial.questions[i].columns == "undefined") {
                  trial.questions[i].columns = 40;
              }
          }
          for (var i = 0; i < trial.questions.length; i++) {
              if (typeof trial.questions[i].value == "undefined") {
                  trial.questions[i].value = "";
              }
          }
          var html = "";

          // show preamble text
          if (trial.preamble !== null) {
              html +=
                  '<div id="jspsych-survey-text-preamble" class="jspsych-survey-text-preamble">' +
                      trial.preamble +
                      "</div>";
          }

          html += ""

          // BKK SPECIFIC STUFF STARTS----------------------------------------------------------------------------------------------

          // DIVS FOR THE BKK STIMULUS
            +'<div class="bkkAll" id="bkkAll">'

            +'<div class="bkkLeft" id="bkkLeft"><div id="bkkContainer" class="bkkContainer"></div>'
            + "</div>" // bkkLeft ends
            + '<div class="bkkRight" id="bkkRight">'
            + '<div id="ctrlContainer">'

            //  BKK GUI
            + '<div class="menu_displays" id="create_menu">'
            +'<div class="bkk_slidewrap">'
              +'<img src="./img/ii_protrusion_a.png" width="40px">'
              +'<input class="bkkslide" type="range" id="spikiness" min="0" max="255" value="' + trial.spike + '">'
              +'<img src="./img/ii_protrusion_b.png" width="40px"><br>'
            +'</div>'
            +'<div class="bkk_slidewrap">'
              +'<img src="./img/ii_count_a.png" width="40px">'
              +'<input class="bkkslide" type="range" id="complexity" min="0" max="255" value="' + trial.complexity + '">'
              +'<img src="./img/ii_count_b.png" width="40px"><br>'
            +'</div>'
            +'<div class="bkk_slidewrap">'
              +'<img src="./img/ii_mess_a.png" width="40px">'
              +'<input class="bkkslide" type="range" id="noise" min="0" max="255" value="' + trial.noise + '">'
              +'<img src="./img/ii_mess_b.png" width="40px">'
              +'<br>'
            +'</div>'
            +'<div class="bkk_slidewrap">'
              +'<img src="./img/ii_smooth_b.png" width="40px">'
              +'<input class="bkkslide" type="range" id="smooth" min="0" max="255" value="' + trial.smooth + '">'
              +'<img src="./img/ii_smooth_a.png" width="40px">'
              +'<br>'
            +'</div>'
            +'<div class="bkk_slidewrap">'
              +'<img src="./img/ii_rotate_a.png" width="40px">'
              +'<input class="bkkslide" type="range" id="move_amount" min="0" max="255" value="' + trial.move + '">'
              +'<img src="./img/ii_rotate_b.png" width="40px">'
              +'<br>'
            +'</div>'
            +'<div class="bkk_slidewrap">'
              +'<input class="field-radio" type="color" id="colourPicker" value="' + trial.bkkColor + '"">'
              +'<br>'
            +'</div>'
            +'</div>' // create_menu ends  
            + "</div>" // ctrlContainer ends     
            + "</div>" // bkkRight ends                  
            + "</div>";

          // BKK SPECIFIC STUFF ENDS ------------------------------------------------------------------------------------------------------


          // start form
          if (trial.autocomplete) {
              html += '<form id="jspsych-survey-text-form">';
          }
          else {
              html += '<form id="jspsych-survey-text-form" autocomplete="off">';
          }
          // generate question order
          var question_order = [];
          for (var i = 0; i < trial.questions.length; i++) {
              question_order.push(i);
          }
          if (trial.randomize_question_order) {
              question_order = this.jsPsych.randomization.shuffle(question_order);
          }
          // add questions
          for (var i = 0; i < trial.questions.length; i++) {
              var question = trial.questions[question_order[i]];
              var question_index = question_order[i];
              html +=
                  '<div id="jspsych-survey-text-' +
                      question_index +
                      '" class="jspsych-survey-text-question" style="margin: 2em 0em;">';
              html += '<p class="jspsych-survey-text">' + question.prompt + "</p>";
              var autofocus = i == 0 ? "autofocus" : "";
              var req = question.required ? "required" : "";
              if (question.rows == 1) {
                  html +=
                      '<input type="text" id="input-' +
                          question_index +
                          '"  name="#jspsych-survey-text-response-' +
                          question_index +
                          '" data-name="' +
                          question.name +
                          '" size="' +
                          question.columns +
                          '" ' +
                          autofocus +
                          " " +
                          req +
                          ' placeholder="' +
                          question.placeholder +
                          '"></input>';
              }
              else {
                  html +=
                      '<textarea id="input-' +
                          question_index +
                          '" name="#jspsych-survey-text-response-' +
                          question_index +
                          '" data-name="' +
                          question.name +
                          '" cols="' +
                          question.columns +
                          '" rows="' +
                          question.rows +
                          '" ' +
                          autofocus +
                          " " +
                          req +
                          ' placeholder="' +
                          question.placeholder +
                          '"></textarea>';
              }
              html += "</div>";
          }
          // add submit button
          html +=
              '<input type="submit" id="jspsych-survey-text-next" class="jspsych-btn jspsych-survey-text" value="' +
                  trial.button_label +
                  '"></input>';
          html += "</form>";


          display_element.innerHTML = html;
          // backup in case autofocus doesn't work
          display_element.querySelector("#input-" + question_order[0]).focus();
          display_element.querySelector("#jspsych-survey-text-form").addEventListener("submit", (e) => {
              e.preventDefault();
              // measure response time
              var endTime = performance.now();
              var response_time = Math.round(endTime - startTime);
              // create object to hold responses
              var question_data = {};
              for (var index = 0; index < trial.questions.length; index++) {
                  var id = "Q" + index;
                  var q_element = document
                      .querySelector("#jspsych-survey-text-" + index)
                      .querySelector("textarea, input");
                  var val = q_element.value;
                  var name = q_element.attributes["data-name"].value;
                  if (name == "") {
                      name = id;
                  }
                  var obje = {};
                  obje[name] = val;
                  Object.assign(question_data, obje);
              }
              // save data
              var trialdata = {
                  rt: response_time,
                  response: question_data,
              };
              display_element.innerHTML = "";
              // next trial
              this.jsPsych.finishTrial(trialdata);
          });


          // BKK SPECIFIC STUFF STARTS ---------------------- 
          var bkk = new BKK();
          var circ = new Circumplex();
          var pinkTromboneElement;
          var audioCtx;
          var nameParts = [];
          var bkkName = '';
          var bkkPhon = '';
          var circumplexX = null;
          var circumplexY = null;
          var userBKKs = null;
          var bkksize = 'big';
          window.onresize = resizeBKK;
         function resizeBKK() {
            var w = window.innerWidth;
            var h = window.innerHeight;
            if(bkksize=='big' && (w<875 || h<600)){
              bkk.setBKKSize(300)
                bkksize='small'
            }
            if(bkksize=='small' && w>=875 && h>=600){
              bkk.setBKKSize(400)
                bkksize='big'
            }
          }
         function setupBKKCTRL(){
              circ.setupControls(circ_div, circumplexClick);
          }
          function circumplexClick() {
            // This function will handle what happens when the circumplex is clicked
            null
          }
          function recordParameters() {
            // write this function to get the data from the sliders and record it so you can analyse it ter
              null
          }
          var circContainer = 'circContainer'
          function setupFormUpdate() {
            bkk.set_form_update_event(recordParameters) 
          }

          // circ.setupCircumplex(circContainer, circumplexClick)
          bkk.runBKKExplore(setupFormUpdate);       

          //  BKK SPECIFIC STUFF ENDS ----------------------



          var startTime = performance.now();
      }
  }
  SurveyTextPlugin.info = info;



  return SurveyTextPlugin;

})(jsPsychModule);
