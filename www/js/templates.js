define(function(){

  this["JST"] = this["JST"] || {};

  this["JST"]["templates/comp/header.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '';return __p};

  this["JST"]["templates/comp/logo.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<a href="#selector" class="logo"></a><p class="safteynotice">SAFETY<br>OBSERVATION<br>APPLICATION</p>';return __p};

  this["JST"]["templates/comp/shell.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<content><div id="hidepage" class="hidepage"></div><div class="header"><back onclick="window.history.back();">&lt;</back><div class="title"></div><add class="icon-user-add"></add></div><page></page></content>';return __p};

  this["JST"]["templates/comp/shellOut.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<!--<a href="/" class="logo"></a>--><content><page></page></content>';return __p};

  this["JST"]["templates/home.ejs"] = function(data) {var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }__p += '<div>' +((__t = ( JST['templates/comp/logo.ejs']() )) == null ? '' : __t) +'<a href="#new" class="btn">New Observation</a>'; if(localStorage.pending){ ;__p += '<a href="#pending" class="btn">Pending Observations</a>'; } ;__p += '<div class="bottomnavigation"><a href="#logout" onclick="TP.DV.doLogOut();">SIGN OUT?</a><a href="#settings">EDIT PROFILE</a></div></div>';return __p};

  this["JST"]["templates/index.ejs"] = function(data) {var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }__p += '<div>' +((__t = ( JST['templates/comp/logo.ejs']() )) == null ? '' : __t) +'<form action="/" class="loginForm"><div class="control-group"><i class="icon-user"><input type="text" id="email" name="email" placeholder="Email" autocapitalize="none" '; if(TP.ENVIROMENT !== 'liveApp') { ;__p += ' value="a@a.com" '; } ;__p += '/></i></div><div class="control-group"><i class="icon-lock"><input type="password" id="pword" name="pword" placeholder="Password" autocapitalize="none"  '; if(TP.ENVIROMENT !== 'liveApp') { ;__p += ' value="a" '; } ;__p += '/></i></div><button class="btn" type="submit">SIGN-IN</button></form><div class="bottomnavigation"><a href="#signup">NOT REGISTERED?</a><a href="#forgotten">FORGOT PASSWORD?</a></div></div>';return __p};

  this["JST"]["templates/login/checkmail.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div class="nostats"><p class="br">Thank you for signing up</p><p>Please see email for more information: <br><a class="emailaddress" href="mailto:' +((__t = ( data.email )) == null ? '' : __t) +'">' +((__t = ( data.email )) == null ? '' : __t) +'</a></p><a href="#selector" class="btn">Login Now</a></div>';return __p};

  this["JST"]["templates/login/forgotten.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div>' +((__t = ( JST['templates/comp/logo.ejs']() )) == null ? '' : __t) +'<p>Enter your email address below to request a password reset</p><form id="forgotten" name="forgotten" method="post" action=""><input name="email" type="email" id="email" size="50" placeholder="The email address please"/><button class="btn" type="submit">SUBMIT</button></form><div class="bottomnavigation"><a href="#selector">SIGN IN</a><a href="#signup">NOT REGISTERED?</a></div></div>';return __p};

  this["JST"]["templates/login/signup.ejs"] = function(data) {var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }__p += '<div class=""><form action="' +((__t = ( TP.AJAX+'users/reg' )) == null ? '' : __t) +'" class="signupForm ajax"><div class="elements"><p class="br">All fields are required</p><div class="control-group rank"><select name="rank" data-error="Please Select A Rank" id="rank"  data-native-menu="false" class="required"><option value="">Please Select A Rank</option>'; TP.RANKS.forEach(function(me){ ;__p += '<option value="' +((__t = ( me )) == null ? '' : __t) +'" '; if(localStorage.rank===me){;__p += ' selected="selected" '; } ;__p += '>' +((__t = ( me )) == null ? '' : __t) +'</option>'; }); ;__p += '</select></div><div class="control-group fname"><input type="text" placeholder="First Name" name="fname" class="required" data-error="Please enter a First Name" autocomplete="none" '; if(data.from === "edit"){ ;__p += ' value="' +((__t = ( data.fname )) == null ? '' : __t) +'"'; } ;__p += '/></div><div class="control-group sname"><input type="text" placeholder="Last Name" name="sname" class="required" data-error="Please enter a Last Name" autocomplete="none" '; if(data.from === "edit"){ ;__p += ' value="' +((__t = ( data.sname )) == null ? '' : __t) +'"'; } ;__p += '/></div><div class="control-group email"><input type="text" placeholder="Email Address" data-ajaxlocation="' +((__t = ( TP.HTTP+'registration/ajax/' )) == null ? '' : __t) +'" name="email" class="required email server" data-error="Please enter a Email Adress" data-from="5" autocapitalize="off" '; if(data.from === "edit"){ ;__p += ' value="' +((__t = ( data.email )) == null ? '' : __t) +'"'; } ;__p += '/></div><div class="control-group pw"><input type="password" placeholder="Password" name="pw" data-to="16" data-from="6" autocapitalize="none"  '; if(data.from === "edit"){ ;__p += ' value="password"'; } ;__p += '/></div><input type="hidden" name="device" value="' +((__t = ( TP.DEVICE )) == null ? '' : __t) +'"/><input type="hidden" name="version" value="' +((__t = ( TP.VERSION )) == null ? '' : __t) +'"/>'; if(data.from === "edit"){ ;__p += '<input type="hidden" name="pkey" value="' +((__t = ( localStorage.pkey )) == null ? '' : __t) +'"/>'; } ;__p += '<button class="btn signup" type="submit">'; if(data.from === "edit"){ ;__p += 'Done'; }else{;__p += 'Sign Up'; } ;__p += '</button></div></form></div>';return __p};

  this["JST"]["templates/notactive.ejs"] = function(data) {var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }__p += '<div>' +((__t = ( JST['templates/comp/logo.ejs']() )) == null ? '' : __t) +'<a href="#new" class="btn">New Observation</a>'; if(localStorage.pending){ ;__p += '<a href="#pending" class="btn">Pending Observations</a>'; } ;__p += '<div class="bottomnavigation"><a href="#logout" onclick="TP.DV.doLogOut();">SIGN OUT?</a><a href="#settings">EDIT PROFILE</a></div></div>';return __p};

  this["JST"]["templates/observation/comments.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<p class="br">Please record any other general comments you may have below</p><textarea name="comment" id="comment" cols="30" rows="10">' +((__t = ( TP.DEFAULTS.comment )) == null ? '' : __t) +'</textarea><a href="#review" class="btn btnmiddle">Next</a>';return __p};

  this["JST"]["templates/observation/detailTemplate.ejs"] = function(data) {var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }__p += '<observation><p class="obtitle">' +((__t = ( TP.DEFAULTS.title )) == null ? '' : __t) +'</p><p class="grey">Select all that apply</p><ul class="detailsbox">'; Object.keys(TP.CHECKLIST[TP.DEFAULTS.type][TP.DEFAULTS.name].details).forEach(function(me){var item = TP.CHECKLIST[TP.DEFAULTS.type][TP.DEFAULTS.name].details[me]; ;__p += '<li><input type="checkbox" name="' +((__t = ( me )) == null ? '' : __t) +'" '; if(item === true ){ ;__p += ' checked="checked" '; } ;__p += '/>' +((__t = ( me )) == null ? '' : __t) +'</li>'; }); ;__p += '</ul><a href="#' +((__t = ( TP.DEFAULTS.type )) == null ? '' : __t) +'" class="btn done">Done</a></observation>';return __p};

  this["JST"]["templates/observation/failed.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<p>You do not have an internet connection.</p><p class="br">Your Observation has been saved in your Pending Observations</p><a href="#new" class="btn btnalt">MAKE ANOTHER OBSERVATION</a><a href="#pending" class="btn btnalt">PENDING OBSERVATIONS</a><a href="#home" class="btn btnalt">FINISH</a>';return __p};

  this["JST"]["templates/observation/new.ejs"] = function(data) {var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }__p += '<p>Observation recorded at</p><div class="clock"><div class="circle"><div class="details"><div class="time">' +((__t = ( TP.DEFAULTS.time.toString("HH:mm") )) == null ? '' : __t) +'</div><div class="date">' +((__t = ( TP.DEFAULTS.time.toString("dd - mm - yyyy") )) == null ? '' : __t) +'</div></div></div><div class="lines"></div></div><p>Select Vessel</p><select name="vessel" id="vessel"><option value="">Please select</option>'; TP.VESSELS.forEach(function(me){ ;__p += '<option value="' +((__t = ( me )) == null ? '' : __t) +'">' +((__t = ( me )) == null ? '' : __t) +'</option>'; }); ;__p += '</select><div class="hide"><p>Is this a positive or negative observation?</p><div class="newBtn"><a class="btn btn-success" href="#positive" data-type="positive">POSITIVE OBSERVATION</a><a class="btn btn-danger" href="#negative" data-type="negative">NEGATIVE OBSERVATION</a></div></div>';return __p};

  this["JST"]["templates/observation/observation.ejs"] = function(data) {var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }__p += '<p>Select an observation</p><ul class="observationselector">'; Object.keys(TP.CHECKLIST[TP.DEFAULTS.type]).forEach(function(me){var item = TP.CHECKLIST[TP.DEFAULTS.type][me]; ;__p += '<li><input type="checkbox" name="' +((__t = ( me )) == null ? '' : __t) +'" '; if(item.state === true ){ ;__p += ' checked="checked" '; } ;__p += '/><span>' +((__t = ( item.title )) == null ? '' : __t) +'</span></li>'; }); ;__p += '</ul><a href="#reinforce" class="btn btnright">Next</a>';return __p};

  this["JST"]["templates/observation/observationTemplate.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<observation></observation>';return __p};

  this["JST"]["templates/observation/pending.ejs"] = function(data) {var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }__p += '<p class="br">Tap an Observation to review the details and submit</p><div class="pendingItems">';var pending = JSON.parse(localStorage.pending);Object.keys(pending).forEach(function(me){var item = pending[me],type = null;var itemsDate = new Date(item.time);if(item.type==="positive"){ type = "success"; }else{ type = 'danger';};__p += '<a class="btn btn-' +((__t = ( type )) == null ? '' : __t) +'" data-item="' +((__t = ( item.time )) == null ? '' : __t) +'" data-type="' +((__t = ( item.type )) == null ? '' : __t) +'" href="#review" data-type="positive">' +((__t = ( itemsDate.toString("dd MMMM yyyy | HH:mm") )) == null ? '' : __t) +'</a>';});;__p += '</div>';return __p};

  this["JST"]["templates/observation/preparation.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '';return __p};

  this["JST"]["templates/observation/reinforce.ejs"] = function(data) {var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') } if(TP.DEFAULTS.type==="positive") { ;__p += '<p class="br">To reinforce these positive behaviours, please ensure you:</p><div class="bubble left">Discuss the Positive Observations, and why you made them, with all relevant persons</div><div class="bubble right">Praise the relevant persons & encourage them to maintain the positive behaviours</div><div class="bubble left">Highlight your Positive Observations to the Master/Site Manager</div><p>Where relevant, identify & document all positive Lessons Learnt that can be passed to other vessels/sites, then inform relevant QHSSE Staff of these for onward distribution.</p>'; } else { ;__p += '<p class="br">To correct these negative behaviours please ensure you:</p><div class="bubble left">If a hazard is being presented through active work, exercise the<span>Stop Work Authority</span></div><div class="bubble right">Discuss the Negative Observations, why you’ve made them and what hazards they wete presenting</div><div class="bubble left">Explain how these behaviours/conditions can be preventedf from occurring in the future</div><div class="bubble right">Ensure the Master/Site Manager are aware of the Negative Observations</div><div class="bubble left">All Negative Observations are to be corrected before allowing the job to continue</div>'; } ;__p += '<a href="#comments" class="btn btnright">Next</a>';return __p};

  this["JST"]["templates/observation/review.ejs"] = function(data) {var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }__p += '<p>' +((__t = ( TP.DEFAULTS.time.toString("dd MMMM yyyy") )) == null ? '' : __t) +'</p><p class="time">' +((__t = ( TP.DEFAULTS.time.toString("HH:mm") )) == null ? '' : __t) +'</p><p>' +((__t = ( TP.DEFAULTS.vessel )) == null ? '' : __t) +'</p>'; Object.keys(TP.CHECKLIST[TP.DEFAULTS.type]).forEach(function(me){var item = TP.CHECKLIST[TP.DEFAULTS.type][me];if(item.state === true){;__p += '<div class="reviewBox"><h3>' +((__t = ( item.title )) == null ? '' : __t) +'</h3><ul>'; Object.keys(item.details).forEach(function(him){var itemList = item.details[him];if(itemList === true){ ;__p += '<li>' +((__t = ( him )) == null ? '' : __t) +'</li>'; }});;__p += '</ul></div>';}});; if (TP.DEFAULTS.comment){ ;__p += '<div class="reviewBox comment"><h3>Comments</h3><p>' +((__t = ( TP.DEFAULTS.comment )) == null ? '' : __t) +'</p></div>'; } ;__p += '<div '; if (TP.DEFAULTS.edit){ ;__p += 'class="edit"'; } ;__p += '><div class="btn deleteObservation">Delete</div><div class="btn submitObservation">SUBMIT</div></div>';return __p};

  this["JST"]["templates/observation/success.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<p class="br">Thank you for your observation</p><a href="#new" class="btn btnalt">MAKE ANOTHER OBSERVATION</a><a href="#home" class="btn btnalt">FINISH</a>';return __p};

  this["JST"]["templates/users/calendar.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += 'Calendar';return __p};

  this["JST"]["templates/users/pin.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div class="' +((__t = ( data.target )) == null ? '' : __t) +'"><div class="pingshell"><p>' +((__t = ( data.text )) == null ? '' : __t) +'</p><div class="pininputs"><div></div><div></div><div></div><div></div></div><!--<div style="color: #04654D;font-family: sdFont;font-size: 1.3rem;font-weight: bold;line-height: 1.5rem;margin-top: 14px;"><a  style="color: #04654D;font-family: sdFont;font-size: 1.3rem;font-weight: bold;line-height: 1.5rem;margin-top: 14px;" onclick="TP.DV.doLogOut();" href="#logout">First time logging in since the update? Please logout and in!! CLICK ME TO LOGOUT!!!</a></a></div>--></div><div class="pinpad"><div class="digit">1</div><div class="digit">2</div><div class="digit">3</div><div class="digit">4</div><div class="digit">5</div><div class="digit">6</div><div class="digit">7</div><div class="digit">8</div><div class="digit">9</div><div class="digit forgotten">Forgot Pin?</div><div class="digit">0</div><div class="digit icon-left-open"></div></div></div>';return __p};

  this["JST"]["templates/users/pinsave.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div class="nostats"><h1>Pin has been saved, Thank you.</h1><p>You will be asked to enter this pin when the app first opens.</p><p>Don\'t worry if you forget it, you can reset it at any time.</p><a href="#home">Navigate Home</a></div>';return __p};

  this["JST"]["templates/users/settings.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div class="blocks"><user><info><div><h2>Member Since:</h2><date>' +((__t = ( data.regdate )) == null ? '' : __t) +'</date></div></info><detailsimage><div><i class="icon-' +((__t = ( data.gender )) == null ? '' : __t) +'"></i></div></detailsimage></user><resetpin><info><div><h2>Change Pin?</h2></div></info><detailsimage><div><i class="icon-lock-open"></i></div></detailsimage></resetpin><delete><info><div><h2>Delete Account?</h2></div></info><detailsimage><i class="icon-trash"></i></detailsimage></delete></div>';return __p};

  return this["JST"];

});