// [ Load Controllers ]
let adminController = require('../controllers/admin');

// [ Load Middleware ]
// let authenticate = new (require('../middlewares/authenticate'))();

module.exports = app => {

    // [ Admin Authentication ]
    app.get('/admin', /*authenticate.loginCheck,*/ adminController.login);
    app.post('/admin', adminController.loginPost);

    // app.get('/admin/logout', adminController.logout);

    // [ Dashboard ]
    // app.get('/admin/dashboard', adminController.dashboard);
    
    // [ Setting ]
    app.get('/admin/setting', adminController.adminsetting);
    app.post('/admin/setting', adminController.adminsettingPost);
    
    // [ Survey Management ]
    app.get('/admin/survey', adminController.surveyTable);
    app.get('/admin/survey/getSurvey', adminController.surveyList);
    
    app.get('/admin/survey/viewSurvey/:id', adminController.viewSurvey);

	

    // [ Edit Survey ]
    app.get('/admin/survey/editSurvey/:id', adminController.editSurvey);
    app.post('/admin/survey/editSurvey/:id', adminController.editSurveyPost);
    
    // [ Question List ]
    app.get('/admin/question/queList', adminController.queList);
    //  [ Add Question ]
    app.get('/admin/question/addQue', adminController.addQue);
    app.post('/admin/question/addQue', adminController.addQuePost);
    // [ View Question ]
    app.get('/admin/question/viewQue/:id', adminController.viewQue);
    // [ Edit Question ]
    app.get('/admin/question/editQue/:id', adminController.editQue);
    app.post('/admin/question/editQue/:id', adminController.editQuePost);
    // [ Fetch Questions List ]
    app.get('/admin/question/getQue', adminController.getQue);

    // [ GetQue ]
    app.get('/admin/question/getAllQuestions', adminController.getAllQuestions);

    // [ Gettig all data of Selected Question for Edit ]
    app.get('/api/getQueData/:id',adminController.getQueData);

    app.get('/admin/survey/addsurvey', adminController.addSurvey);
    app.post('/admin/survey/addsurvey', adminController.addSurveyPost);
    
    app.get('/admin/leaderboard', adminController.leaderboard);

    app.get('/api/getLeaderboardData', adminController.getLeaderboardData);


    // [ User Management ]
    app.get('/admin/userManagement', adminController.userManagement);

    // [ View User Profile GET ]
    app.get('/admin/userManagement/viewUserProfile/:id', adminController.viewUserProfile);

    // [ View User Profile POST]
    app.post('/admin/userManagement/viewUserProfile/:id', adminController.viewUserProfilePost);
    
    // [ API for User Management ]
    app.get('/api/userData', adminController.userData);

    // [ API for Deleteing User Data ]
    app.post('/api/userDelete/:id', adminController.userDelete);

    // [ API for Blocking And Unblocking User ]
    app.post('/api/userBlock/:id', adminController.userBlock);
    
    // [ Edit Profile ]
    app.get('/admin/profile', adminController.adminProfile);
    app.post('/admin/profile', adminController.adminProfilePost);

    // [ Create Dummy Users ]
    app.post('/addDummyUsers', adminController.addDummyUsers);

}