// [ Models Load ]
const userSchema = require('../schemas/users.js');
const surveySchema = require('../schemas/survey.js');
const questionsSchema = require('../schemas/questions');
const surveyResponseSchema = require('../schemas/surveyResponseData.js');
const verificationTokenSchema = require('../schemas/verificationsTokens.js');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const helper = require("../helper.js")



var multer = require('multer');
var upload = multer({
  dest: 'public/upload/'
});
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 20000000
  },
});


surveyClass = {

  // [ Login Page ]
  async login(req, res) {
    try {
      await res.render('user/login/login', {
        name: process.env.PROJECT_NAME
      });
    } catch (error) {
      console.log('Error in Survey Model [ login ]: ', error);
    }
  },

  // [ Login POST ]
  async loginPost(req, res) {
    try {
        let found = false;
        let body = req.body;
        const user = await userSchema.findOne({$or: [{ username: body.email }, { email: body.email}]});
        if(user){
          const verified = await bcrypt.compare(body.password,user.password);
          if (verified && user.isVerified == true) {
              found = true;
              let session = req.session;
              session.userId   = user._id;
              session.email    = user.email;
              session.username = user.username;
              session.password = user.password;

              // [ Sending Mail ]
              // let options = {
              //       to : result[i].email,
              //       subject : "Login ALert",
              //       message : `Hello ${result[i].name}, Welcome to HandsFree Survey System. We are glad to see you here.`

              //     }
              // helper.mailer(req, res, options) 

              res.send({
                "status": 'success',
                "message": "Login Successful"
              });
          }
        }if(!found){
          res.send({
              "status": 'fail',
              "message": "Please Enter Correct Credentials"
          });
        }


    } catch (error) {
      console.log('Error in Survey Model [ loginPost ]: ', error);
    }
  },

  // [ Logout ]
  async logout(req, res) {
    try {

      req.session.destroy();
      res.redirect('/');

    } catch (error) {
      console.log('Error in Survey Model [ logout ]: ', error);
    }
  },

  // [ Sign up page GET ]
  async signup(req, res) {
    try {
     await res.render('user/login/signup', {
        name: process.env.PROJECT_NAME
      });
    } catch (error) {
      console.log('Error in Survey Model [ signup ]: ', error);
    }
  },

  // [ Signup Post ]
  async signupPost(req, res) {
    try {
      console.log("sIGNUP post")
          let body = req.body;
          const user = await userSchema.findOne({$or: [{ username: body.username }, { email: body.email}]});
          if(user){
            res.send(`${body.username}, You Have Already SignUp `);
          }else{
            const password = await bcrypt.hash(body.password,12);
            let userCreated = await userSchema.create({
              name     : body.name,
              username : body.username,
              email    : body.email,
              password : password
              
            });
            // [ JWT Token ]
            await jwt.sign(body.email,process.env.SECRET_KEY,async(err, token)=>{
            if(err) throw err;
            token = token;
            console.log(`http://localhost:8000/handsfree/verification/${body.email}/${token}`)
            await verificationTokenSchema.create({
              userEmail : body.email,
              userId : userCreated._id,
              token     : token
            })
            console.log(`http://localhost:8000/handsfree/verification/${body.email}/${token}`)
            let options = {
              to : req.body.email,
              subject : "Welcome To HandsFree Survey System",
              message : `Hello ${req.body.name}, Welcome to HandsFree Survey System. We are glad to see you here.
              To verify your account please click on this link http://localhost:8000/handsfree/verification/${body.email}/${token}`
  
            }
            helper.mailer(req, res, options)
          })
          res.send({
            "status": 'success',
            "message": "Registered Sucessfully!!"
          });
          }

        
    } catch (error) {
      console.log('Error in Survey Model [ signupPost ]: ', error);
    }
  },

  // [ Survey Page GET ]
  async survey(req, res) {
    try {
      let id = req.params.id;

      let surveyDetails = await surveySchema.findOne({_id : req.params.id});

      await userSchema.findOne({email: req.session.email},(error, result)=>{
        if (error) throw error;
        res.render('user/homepage/survey', {
          name: process.env.PROJECT_NAME,
          user: result,
          id : id,
          surveyDetails : surveyDetails
        });
      })


    } catch (error) {
      console.log('Error in Survey Model [ survey page ]: ', error);
    }
  },

  // [ Survey POST ]
  async surveyPost(req, res){
    try{
      let surveyId = req.params.id;
      let userId = req.body.userId;
      let ansData = {
        surveyId : surveyId,
        userId   : userId,
        ansData  : req.body.ansData
      }
      console.log('Answer Fetched :',req.body )
      
      await surveyResponseSchema.create(ansData,async(error)=>{
        if(error) throw error;
        console.log("checking")
      })
          await userSchema.updateOne({_id : userId},{$inc: {surveyAttend: 1, points: req.body.surveyPoints}},(error)=>{
          if(error) throw error;
          console.log("Inside Update")
          res.send({
            "status" : "success",
            "statuscode" : 200,
            "message" : "Your Response Has Been Submitted Successfully"
          });
        })

    }catch(error){
      console.log('Error in Survey Model [ Survey Page Post ]:',error);
    }
  },

// [ Homepage GET ]
  async homepage(req, res) {
    try {
      const user = await userSchema.findOne({email : req.session.email});      

      if (user) {
        const survey = await surveySchema.find();
        res.render('user/homepage/homepage', {
          name: process.env.PROJECT_NAME,
          user: user,
          totalSurvey : survey
        });
      }else{
        res.redirect('/');
      }
    } catch (error) {
      console.log('Error in Survey Model[ Home page ]: ', error);
    }
  },

  // [ Edit Profile GET ]
  async userprofile(req, res) {
    try {
      const user = await userSchema.findOne({email : req.session.email});
        
          if(user){
            res.render('user/profile/userprofile', {
              name: process.env.PROJECT_NAME,
              user: user
            });
          }else{
            res.redirect('/');
          }

        } catch (error) {
      console.log('Error in Survey Model [ userprofile GET ]: ', error);
    }
  },

  // [ Edit Profile POST ]
  async userprofilePost(req, res) {
    try {

       await userSchema.findOneAndUpdate({email: req.session.email}, {username: req.body.username},(error)=>{
         if(error){
                res.send({
                  "status": 'fail',
                  "message": "Please Fill The Proper Details!!"
                });
         }else{
                console.log("Data Updated")
                res.send({
                  "status": 'success',
                  "message": "Profile Updated Sucessfully!!"
                });
         }
         
       });
    } catch (error) {
      console.log('Error in Survey Model [ Edit Profile POST ]: ', error);
    }

  },

  // [ Upload Photo ]
  async uploadPhoto(req, res) {
    try {
      
      console.log('req.files: ',req.files);
      let image = req.files.myImage;

      let re = /(?:\.([^.]+))?$/;
      let ext = re.exec(image.name)[1];
      let fileName = Date.now()+'.'+ext;

      image.mv('./public/profile/'+fileName, async function(err) {
        if (err){
          res.send('error');
        }
        await userSchema.findOneAndUpdate({email: req.session.email}, {imgsrc: fileName},(error)=>{
          if(error){
                 res.send({
                   "status": 'fail',
                   "message": "Something Went Wrong Try Again"
                 });
          }else{
                 console.log("Data Updated")
                 res.send({
                   "status": 'success',
                   "message": "Profile Photo Updated Sucessfully!!"
                 });
          }
          
        });
        // let user = await Sys.App.Services.UserServices.getSingleUserData({_id: req.body.id});
        // if(user){
          // await Sys.App.Services.UserServices.updateUserData({
          //   _id: req.body.id
          // },{
          //   avatar: fileName
          // });
          // req.session.details.avatar = fileName;

          // req.flash('success','Profile Avatar Updated Successfully');
         
        // }
        // else{
        //   req.flash('error', 'Error in Profile Avatar Update');
        //   return res.redirect('/profile');
        // }
      });

      return true;

    } catch (error) {
      console.log('Error in Survey Model [ Edit Profile POST ]: ', error);
    }

  },

  //  [ getQuestionsAPI GET ]
  async getQuestionsAPI(req, res){
    try{
      
       console.log(req.query);
      // [ Function For Sending Default Message ]
      let defaultMsg = function(){
        console.log("*******Default Message*******")
        res.send({
        "status" : "success",
        "statuscode" : 204, /* 204 Indicates That There Is No Content Found */
        "message" : "Questions Fetched Sucessfully",
        "surveyId" : queSurveyId,
        "responseData" : "Thank You For Attending The Survey.."
        });
      }
      let responseData = '';
      let queSurveyId = req.query.id;
      const userAttendedSurvey = await surveyResponseSchema.find({surveyId:queSurveyId,userId : req.session.userId});

      if(userAttendedSurvey != ""){
        res.send({
          "status" : "success",
          "statuscode" : 403,
          "message" : "Questions Fetched Sucessfully",
          "surveyId" : queSurveyId,
         "responseData" : "You Have Already Attended The Survey!!"
          });
      }else{

        if (req.query.parentId != '' && req.query.parentId != undefined ) {
          let parentId = req.query.parentId;

          // [ To fetch the question on the bases of surveyId and ParnetId ]
          let parentFetching = async function(){
            console.log("*******Parent Fetching*******")
            await questionsSchema.find({surveyId : queSurveyId,parentQueId : parentId},(error, result)=>{
              if(error) throw error;
              responseData = result;

              if (responseData.length > 0) {
                res.send({
                "status" : "success",
                "statuscode" : 200,
                "message" : "Questions Fetched Sucessfully",
                "surveyId" : queSurveyId,
  
                "responseData" : responseData
                });
              }else{
                console.log('Default in Parent  ');
                defaultMsg();
              }
            })

        }
        // [ Fetching Question On the Bases of OPtion Val And Parent And Survey Id ]
        if (req.query.optionVal != '' && req.query.optionVal != undefined ) {
          console.log("*******If Option Available*******")
          let optionVal = req.query.optionVal;
          await questionsSchema.find({surveyId : queSurveyId,parentQueId : parentId, parentOption : optionVal},(error, result)=>{
                if (error) throw error;
                responseData = result;

                if (responseData.length > 0) {
                  res.send({
                  "status" : "success",
                  "statuscode" : 200,
                  "message" : "Questions Fetched Sucessfully",
                  "surveyId" : queSurveyId,
      
                  "responseData" : responseData
                  });
                  }else{
                    parentFetching();
                  }
          })

        }else{
         parentFetching();
        }

        }else if (req.query.firstQue == 'true') {
          console.log("*******First Question*******")
          await questionsSchema.find({surveyId : queSurveyId}).sort({ queOrder : 1 }).exec((error, result)=>{
            if (error) throw error;
            responseData = result;

            if (responseData.length > 0) {
              res.send({
              "status" : "success",
              "statuscode" : 200,
              "message" : "Questions Fetched Sucessfully",
              "surveyId" : queSurveyId,
              "responseData" : responseData
              });
            }else{
              res.send({
              "status" : "success",
              "statuscode" : 404,
              "message" : "Questions Fetched Sucessfully",
              "surveyId" : queSurveyId,
             "responseData" : "Sorry This Survey Is Not Available.."
              });
            }
          })

        }else{
          console.log('Default in The end ');
          defaultMsg();
        }

      }
             
  }catch(error){
    console.log('Error in Survey Model [ getQuestionsAPI GET ]: ', error);
   }
  },

  // [ FrontendLeaderboard API ]

  async frontendLeaderboard(req, res) {
    try {
      const user = await userSchema.find({}).sort({points : -1});

          res.send({
            "status" : "success",
            "statuscode" : 200,
            "message" : "LeaderboardData Fetched Sucessfully",
            "leaderboardData" : user
           });
       
    } catch (error) {
      console.log('Error in Survey Model [ frontendLeaderboard GET ]: ', error);
    }

  },

  // [ userValidation API ]
  async userValidation(req, res) {
    try {
      const username = await userSchema.count({username : req.body.username});
      console.log("count", username)
      
          if (username == 0) {
            res.send({
              "status" : "success",
              "statuscode" : 200,
              "message" : "Username Available!"
            });
          }else{
            res.send({
              "status" : "fail",
              "statuscode" : 424,
              "message" : "This username is already taken!"
            });
          }
       
    } catch (error) {
      console.log('Error in Survey Model [ userValidation GET ]: ', error);
    }

  },

  // [ userValidation API ]
  async verificationToken(req, res) {
    try {
      await verificationTokenSchema.findOne({userEmail: req.params.email},(err, result)=>{
        if(err) throw err;
        else{
          if(result){
            console.log("user verification",result.email)
            let isVerified = jwt.verify(result.token, process.env.SECRET_KEY)
            console.log("is Verified : ",isVerified)
            if(isVerified){
              userSchema.findOneAndUpdate({email : req.params.email},{isVerified : true},(err)=>{
                if(err) throw err;
                res.redirect('/');
              })
            }else{
              res.send("Something Went Wrong Try Agin To Generate Link!!")
            }
          }else{
              res.send("Your Verification Link Has Been Expired!! Try Again To Continue Further!!")
            
          }
        }
      });
      

        
    } catch (error) {
      console.log('Error in Survey Model [ verificationToken ]: ', error);
    }

  },

  // [ Social Media ]
  async socialMedia(req, res) {
  try {
    let body = req.body;
      let newValues = {
        instagram : body.instagram,
        facebook  : body.facebook,
        twitter   : body.twitter,
        github    : body.github,
        website   : body.website
      }
      await userSchema.findOneAndUpdate({email: req.session.email}, newValues,(error)=>{
        if(error){
              res.send({
                "status": 'fail',
                "message": "Please Fill The Proper Details!!"
              });
        }else{
              console.log("Data Updated")
              res.send({
                "status": 'success',
                "message": "Social Media Accounts Added Sucessfully!!"
              });
        }
        
      });
  } catch (error) {
    console.log('Error in Survey Model [ Edit Profile POST ]: ', error);
  }

},

// [ Reset Password ]
async resetpassword(req, res){
  try {
    await res.render('user/login/forgotPassword', {
      name: process.env.PROJECT_NAME
    });
  } catch (error) {
    console.log("Error in Survey Model Reset Password",error)
  }
},

// [ Reset Password POST ]
async resetpasswordPost(req, res){
  try {
    let { email } = req.body;
    let user = await userSchema.findOne({email : email});

    if(user){
      let token = await jwt.sign({email : user.email, id : user._id},process.env.SECRET_KEY + user.password);

      await verificationTokenSchema.create({
        userEmail : user.email,
        userId : user._id,
        token     : token
      },(error)=>{
        if(error){
          res.send({
            "status"  : "fail",
            "message" : "Enter Valid Email Id"
          })
        }else{
          res.send({
            "status"  : "success",
            "message" : "User Found Successfully",
            "token"   : token,
            "id"      : email
          })
        } 

      })

    }else{
      res.send({
        "status"  : "fail",
        "message" : "Enter Valid Email Id"
      })
    }
  } catch (error) {
    console.log("Error in Survey Model Reset Password POST",error)
  }
},

// [ New Password GET ]
async newpassword(req, res){
  try {
    let {id , token } = req.params;
    let user = await userSchema.findOne({email : id});

    if(user){
      await verificationTokenSchema.findOne({userId : user._id},async(error,data)=>{
        if(error){
          res.redirect('/resetpassword');
        }else{
          await jwt.verify(data.token, process.env.SECRET_KEY + user.password, async (error , result)=>{
            if(error){
              res.redirect('/resetpassword');
            }else{
              await res.render('user/login/newpassword', {
                name: process.env.PROJECT_NAME,
                id : id,
                token : token
              });
            }
    
          })
        }
      })

      
    }else{
      res.send('Link has been expired')
    }

  } catch (error) {
    console.log("Error in the Survey Model New Passwod GET ",error)
  }
},

// [ New Password POST ]
async newpasswordpost(req, res){
  try {
    let {id , token } = req.params;
    console.log(" Id : ", id);
    console.log('token : ', token) 
    let user = await userSchema.findOne({email : id});

    if(user){
      await verificationTokenSchema.findOne({userId : user._id},async(error,data)=>{
        if(error){
          res.send({
            "status" : "tokenfail",
            "message" : "Token expire try again"
          })
        }else{
          await jwt.verify(token, process.env.SECRET_KEY + user.password, async (error , result)=>{
            if(error){
              res.send({
                "status" : "tokenfail",
                "message" : "Token expire try again"
              })
            }else{
              console.log("result : ",result)
    
              let { password } = req.body;
              const newPassword = await bcrypt.hash(password,12);
    
              await userSchema.findOneAndUpdate({_id : result.id},{password : newPassword},async(error)=>{
                if(error) throw error;
                await verificationTokenSchema.deleteMany({userId : result.id });
                res.send({
                  "status" : "success",
                  "message" : "Password Reset Successfully"
                })
              })
            }
    
          })
        }
      })

    }else{
      res.send({
        "status" : "tokenfail",
        "message" : "Token expire try again"
      })
    }

  } catch (error) {
    console.log("Error in the Survey Model New Passwod POST ",error)
  }
},

}
module.exports = surveyClass;