// [ Load Controllers ]
let surveyController = require('../controllers/survey');

// [ Load Middleware ]
let authenticate = new (require('../middlewares/authenticate'))();

module.exports = app => {

  
  // [ User Authentication ]
  app.get('/', /*authenticate.loginCheck,*/ surveyController.login);
  app.post('/', surveyController.loginPost);

  app.get('/logout', surveyController.logout);

  app.get('/signup', surveyController.signup);
  app.post('/signup', surveyController.signupPost);



// [ Home - Dashboard ]  
  // [ Survey Page ]
  app.get('/survey/:id', authenticate.auth, surveyController.survey);
  app.post('/survey/:id', authenticate.auth, surveyController.surveyPost);

  app.get('/homepage', authenticate.auth, surveyController.homepage);
    
  app.get('/userprofile', authenticate.auth, surveyController.userprofile);
  app.post('/userprofile', surveyController.userprofilePost);

  // [ Photo Upload ]
  app.post('/uploadPhoto', surveyController.uploadPhoto);

  // [ API's ]

  // [ Fetch Quesions API ]
  app.get('/api/getQuestionsAPI',surveyController.getQuestionsAPI);
  
  // [ Frontend Leaderboard api ]
  app.get('/api/frontendLeaderboard',surveyController.frontendLeaderboard);

  // [ Fetch User's For Validation API ]
  app.post('/api/userValidation',surveyController.userValidation);

  // [ Verification API ]
  app.get('/handsfree/verification/:email/:token', surveyController.verificationToken);

  // [ Social Media ]
  app.post('/userprofile/socialMedia', surveyController.socialMedia);

  // [ Reset Password ]
  app.get('/resetpassword', surveyController.resetpassword);
  app.post('/resetpassword', surveyController.resetpasswordPost);

  // [ New Password ]
  app.get('/newpassword/:id/:token', surveyController.newpassword);
  app.post('/newpassword/:id/:token', surveyController.newpasswordpost);  


}
