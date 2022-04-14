// [ Model Load ]
let surveyModel = require('../models/survey');

surveyClass = {
  
  // [ Login GET]
  async login(req, res){
    try{
    await surveyModel.login(req, res);
    }catch (error) {
      console.log('Error in Survey Controller [ loginGet ]: ',error);
    }
  },

  // [ Login POST]
  async loginPost(req, res){
    try {
      await surveyModel.loginPost(req, res);  
    } catch (error) {
      console.log('Error in Survey Controller [ loginPost ]: ',error);
    }
  },

  // [ Logout ]
  async logout(req, res){
    try{
      await surveyModel.logout(req, res);
    }
    catch(error){
      console.log('')
    }
  },

  // [ Signup GET]
  async signup(req, res){
    try{
    await surveyModel.signup(req, res);
  }catch (error) {
      console.log('Error in Survey Controller [ Signup GET ]: ',error);
    }
  },

  // [ Signup POST ]
  async signupPost(req, res){
    try {
      await surveyModel.signupPost(req, res);  
    } catch (error) {
      console.log('Error in Survey Controller [ signupPost ]: ',error);
    }
  },

  // [ Survey GET]
  async survey(req, res){
    try{
    await surveyModel.survey(req, res);
    }catch (error) {
      console.log('Error in Survey Controller [ Survey GET ]: ',error);
    }
  },

  // [ Survey POST ]
  async surveyPost(req, res){
    try{
      await surveyModel.surveyPost(req, res);
    }catch(error){
      console.log('Error In Survey Controller [ Survey POST ]:',error)
    }
  },

  // [ HomePage GET ]
   async homepage(req, res){
    try{
    await surveyModel.homepage(req, res);
    }catch (error) {
      console.log('Error in Survey Controller [ Home page GET ]: ',error);
    }
  },
  // [ HomePage POST]
  async homepage(req, res){
    try {
      await surveyModel.homepage(req, res);  
    } catch (error) {
      console.log('Error in Survey Controller [ homepage Post ]: ',error);
    }
  },

  // [ Edit Profile GET ]
  async userprofile(req, res){
    try{
    await surveyModel.userprofile(req, res);
    }catch (error) {
      console.log('Error in Survey Controller [ userprofile GET ]: ',error);
    }
  },

  // [ Edit Profile POST ]
  async userprofilePost(req, res){
    try {
      await surveyModel.userprofilePost(req, res);  
    } catch (error) {
      console.log('Error in Survey Controller [ userprofile POST ]: ',error);
    }
  },

// [ Photo Upload ] 
  async uploadPhoto(req, res){
    try {
      await surveyModel.uploadPhoto(req, res);  
    } catch (error) {
      console.log('Error in Survey Controller [ uploadPhoto POST ]: ',error);
    }
  },

  // [ getQuestionsAPI GET ]
  async getQuestionsAPI(req, res){
    try{
      await surveyModel.getQuestionsAPI(req, res);
    }catch(error){
     console.log('Error in Survey Controller [ getQuestionsAPI GET ]: ',error); 
    }
  },

//[ frontendLeaderboard API ] 
  async frontendLeaderboard(req, res){
    try{
      await surveyModel.frontendLeaderboard(req, res);
    }catch(error){
     console.log('Error in Survey Controller [ frontendLeaderboard ]: ',error); 
    }
  },

  // [ userValidation API ]
  async userValidation(req, res){
    try{
      await surveyModel.userValidation(req, res);
    }catch(error){
     console.log('Error in Survey Controller [ userValidation ]: ',error); 
    }
  },

  // [ verificationToken ]
  async verificationToken(req, res){
    try{
      await surveyModel.verificationToken(req,res);
    }catch(error){
      console.log('Error in Admin Controller [ verificationToken ]:',error);
    }
  },

  // [ Social Media ]
  async socialMedia(req, res){
    try{
      await surveyModel.socialMedia(req,res);
    }catch(error){
      console.log('Error in Admin Controller [ socialMedia ]:',error);
    }
  },

  // [ Reset Password ]
  async resetpassword(req, res){
    try{
      await surveyModel.resetpassword(req,res);
    }catch(error){
      console.log('Error in Admin Controller [ Reset Password ]:',error);
    }
  },

  // [ Reset Password Post ]
  async resetpasswordPost(req, res){
    try{
      await surveyModel.resetpasswordPost(req,res);
    }catch(error){
      console.log('Error in Admin Controller [ Reset Password POST ]:',error);
    }
  },

  // [ New Password GET  ]
  async newpassword(req, res){
    try{
      await surveyModel.newpassword(req,res);
    }catch(error){
      console.log('Error in Admin Controller [ newpassword GET ]:',error);
    }
  },

  // [ New Password POST  ]
  async newpasswordpost(req, res){
    try{
      await surveyModel.newpasswordpost(req,res);
    }catch(error){
      console.log('Error in Admin Controller [ newpassword POST ]:',error);
    }
  },
}

  module.exports = surveyClass;

