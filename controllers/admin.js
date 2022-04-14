// [ Model Load ]
let adminModel = require('../models/admin');

adminClass = {
  
  // [ Login ]
  async login(req, res){
    try{
      await adminModel.login(req, res);
    }catch (error) {
      console.log('Error in Admin Controller [ login ]: ',error);
    }
  },

  // [ Login POST]
  async loginPost(req, res){
    try {
      await adminModel.loginPost(req, res);  
    } catch (error) {
      console.log('Error in Admin Controller [ loginPost ]: ',error);
    }
  },

  // [ Setting GET ]
  async adminsetting(req, res){
    try{
      await adminModel.adminsetting(req, res);
    }
    catch(error){
      console.log('Error in Admin Controller [ Setting GET ]: ',error)
    }
  },

  // [ adminsettingPost ]
  async adminsettingPost(req, res){
    try{
      await adminModel.adminsettingPost(req, res);
    }
    catch(error){
      console.log('Error in Admin Controller [ adminsettingPost Post ]: ',error)
    }
  },
  
//  Admin Page
  // [ Dashboard GET ]
  async dashboard(req, res){
    try{
    await adminModel.dashboard(req, res);
    }catch (error) {
      console.log('Error in Admin Controller [ Dashboard GET ]: ',error);
    }
  },
  
  // [ Dashboard POST ]
  async dashboardPost(req, res){
    try {
      await adminModel.dashboardPost(req, res);  
    } catch (error) {
      console.log('Error in Admin Controller [ dashboardpost ]: ',error);
    }
  },

  // [ queList GET ]
  async queList(req, res){
    try {
      await adminModel.queList(req, res);  
    } catch (error) {
      console.log('Error in Admin Controller [ queList GET ]: ',error);
    }
  },
  // [ addQue GET]
  async addQue(req, res){
    try{
      await adminModel.addQue(req, res);
    }catch(error){
      console.log('Error in Admin Controller [ addQue ]: ',error);
    }
  },

  // [ addQue POST ]
  async addQuePost(req, res){
    try {
      await adminModel.addQuePost(req, res);  
    } catch (error) {
      console.log('Error in Admin Controller [ addQuePost ]: ',error);
    }
  },
  
  // [ viewQue GET ]
  async viewQue(req, res){
    try{
      await adminModel.viewQue(req, res);
    }catch(error){
      console.log('Error in Admin Controller [ viewQue GET ]: ',error);
    }
  },
  // [ Edit Question GET ]
async editQue(req, res){
    try{
      await adminModel.editQue(req, res);
    }catch(error){
      console.log('Error in Admin Controller [ editQue GET ]: ',error);
    }
  },
// [ Edit Question POST ]
async editQuePost(req, res){
    try{
      await adminModel.editQuePost(req, res);
    }catch(error){
      console.log('Error in Admin Controller [ editQuePost ]: ',error);
    }
  },

  // [ getQue GET ]
  async getQue(req, res){
    try{
      await adminModel.getQue(req,res);
    } catch(error) {
      console.log('Error in Admin Controller [ getQue GET ]:',error);
    }
  },

  // [ getAllQuestions GET ]
  async getAllQuestions(req, res){
    try{
      await adminModel.getAllQuestions(req,res);
    } catch(error) {
      console.log('Error in Admin Controller [ getAllQuestions GET ]:',error);
    }
  },

  // [ getQueData GET ]
  async getQueData(req, res){
    try{
      await adminModel.getQueData(req,res);
    }catch(error){
      console.log('Error in Admin Controller [ getQueData GET ]:',error);
    }
  },
  
// [ View Survey ]
  async viewSurvey(req, res){
    try{
      await adminModel.viewSurvey(req, res);
    }catch(error){
      console.log('Error in Admin Controller [ addSurvey GET ]: ',error);
    }
  },

// [ Edit Survey GET ]
async editSurvey(req, res){
    try{
      await adminModel.editSurvey(req, res);
    }catch(error){
      console.log('Error in Admin Controller [ editSurvey GET ]: ',error);
    }
  },
// [ Edit Survey POST ]
async editSurveyPost(req, res){
    try{
      await adminModel.editSurveyPost(req, res);
    }catch(error){
      console.log('Error in Admin Controller [ editSurveyPost ]: ',error);
    }
  },
// [ Add Survey GET ]
  async addSurvey(req, res){
    try{
      await adminModel.addSurvey(req, res);
    }catch(error){
      console.log('Error in Admin Controller [ addSurvey GET ]: ',error);
    }
  },
  // [ Add Survey POST ]
  async addSurveyPost(req, res){
    try{
      await adminModel.addSurveyPost(req, res);
    }catch(error){
      console.log('Error in Admin Controller [ addSurveyPost POST ]: ',error);
    }
  },

  /*
    [ Survey Management ]
  */
  async surveyTable(req, res){
    try{
      await adminModel.surveyTable(req, res);
    }catch(error){
      console.log('Error in Admin Controller [ survey ]: ',error);
    }
  },

  // [ Survey List ]
  async surveyList(req, res){
    try{
      await adminModel.surveyList(req, res);
    }catch(error){
      console.log('Error in Admin Controller [ surveyList ]: ',error);
    }
  },

  // [ Leaderboard GET ]
   async leaderboard(req, res){
    try{
    await adminModel.leaderboard(req, res);
    }catch (error) {
      console.log('Error in Admin Controller [ Leaderboard GET ]: ',error);
    }
  },

  // [ Get Leaderboard Data ]
  async getLeaderboardData(req, res){
    try{

      await adminModel.getLeaderboardData(req, res);

    }
    catch(error){
      console.log('Error in Admin Controller [ Get Leaderboard Data ]: ',error);
    }
  },

// [ Leaderboard GET ]
   async leaderboard(req, res){
    try{
    await adminModel.leaderboard(req, res);
    }catch (error) {
      console.log('Error in Admin Controller [ Leaderboard GET ]: ',error);
    }
  },

  // [ Edit Profile GET ]
  async adminProfile(req, res){
    try{
      await adminModel.adminProfile(req, res);
    }catch (error) {
      console.log('Error in Admin Controller [ Admin Profile GET ]:',error);
    }
  },
  async adminProfilePost(req, res){
    try{
      await adminModel.adminProfilePost(req, res);
    }catch (error) {
      console.log('Error in Admin Controller [ Admin Profile POST ]:',error);
    }
  },

  // [ User Management ]
  async userManagement(req, res){
    try{
      await adminModel.userManagement(req,res);
    }catch(error){
      console.log('Error in Admin Controller [ userManagement GET ]:',error);
    }
  },

// [ View User Profile GET ]
  async viewUserProfile(req, res){
    try{
      await adminModel.viewUserProfile(req,res);
    }catch(error){
      console.log('Error in Admin Controller [ viewUserProfile GET ]:',error);
    }
  },

  // [ View User Profile ]
  async viewUserProfilePost(req, res){
    try{
      await adminModel.viewUserProfilePost(req,res);
    }catch(error){
      console.log('Error in Admin Controller [ viewUserProfilePost POST ]:',error);
    }
  },

  // [ API for User Management ]
  async userData(req, res){
    try{
      await adminModel.userData(req,res);
    }catch(error){
      console.log('Error in Admin Controller [ userData GET ]:',error);
    }
  },

  // [ API for User Delete ]
  async userDelete(req, res){
    try{
      await adminModel.userDelete(req,res);
    }catch(error){
      console.log('Error in Admin Controller [ userDelete POST ]:',error);
    }
  },

  // [ API for User Blocking And Unblocking ]
  async userBlock(req, res){
    try{
      await adminModel.userBlock(req,res);
    }catch(error){
      console.log('Error in Admin Controller [ userBlock POST ]:',error);
    }
  },

  // [ addDummyUsers ]
  async addDummyUsers(req, res){
    try{
      await adminModel.addDummyUsers(req,res);
    }catch(error){
      console.log('Error in Admin Controller [ addDummyUsers POST ]:',error);
    }
  },

}

module.exports = adminClass;