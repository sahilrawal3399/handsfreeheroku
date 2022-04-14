// [ Models Load ] 
let userSchema = require('../schemas/users');
let surveySchema = require('../schemas/survey.js');
let settingSchema = require('../schemas/settingPage.js');
let questionsSchema = require('../schemas/questions');
const bcrypt = require("bcrypt");

const multer = require('multer');
const path = require('path');
var mongoose = require('mongoose');
const helper = require("../helper.js")


// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

adminClass = {

  // [ Login Page GET ]
  async login(req, res) {
    try {
      await res.render('admin/login/login', {
        name: process.env.PROJECT_NAME
      });
    } catch (error) {
      console.log('Error in Admin Model [ login ]: ', error);
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
        if (verified && user.role == "admin") {
            found = true;
            let session = req.session;
            session.email = user.email;
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
      console.log('Error in Admin Model [ loginPost ]: ', error);
    }
  },


  //  Admin Page
  // [ Dashboard GET ]
  async dashboard(req, res) {
    try {
      await res.render('admin/dashboard/dashboard', {
        name: process.env.PROJECT_NAME
      });
    } catch (error) {
      console.log('Error in Admin Model[ Dashboard GET ]: ', error);
    }
  },

  // [ Dashboard POST ]
  async dashboardPost(req, res) {
    try {
      console.log("This step cleared")
      await questionsSchema.create({
        questions: req.body.questions
      });
    } catch {
      console.log('Error in Admin Model[ Dashboard POST ]: ', error);
    }
  },

  // [ adminsetting ]
  async adminsetting(req, res) {
    try {
      const settings = await settingSchema.findOne({recordNo : "record1"});
      
      res.render('admin/setting/settingPage', {
        name: process.env.PROJECT_NAME,
        data : settings
      }); 
            
    } catch (error) {
      console.log('Error in Admin Model [ settingPage GET ]: ', error)
    }
  },

  // [ adminsettingPost ]
  async adminsettingPost(req, res) {
    try {

      let newValues = {
          websiteTitle        : req.body.websiteTitle,
          homepageTitle       : req.body.homepageTitle,  
          homepageDescription : req.body.homepageDescription,
          leaderboardStatus   : req.body.leaderboardStatus
      }
      await settingSchema.findOneAndUpdate({recordNo: "record1"}, newValues,(error)=>{
        if(error){
          res.send({
            "status": 'fail',
            "message": "Something Went Wrong!!"
          });
        }else{
          console.log("Data Updated")
          res.send({
              "status": 'success',
              "message": "Settings Saved Sucessfully!!"
            });
        }
      });

      // await MongoClient.connect(url, function (err, db) {
     
      // let dbo = db.db("mydb");
      // let myquery = {
      //   recordnNo : 'record1' 
      // };
      
      // let newvalues = {
      //   $set: {
      //     websiteTitle : req.body.websiteTitle,
      //     homepageTitle : req.body.homepageTitle,  
      //     homepageDescription : req.body.homepageDescription,
      //     leaderboardStatus : req.body.leaderboardStatus
      //   }
      // };

      // dbo.collection("settingpage").updateOne(myquery, newvalues, function (err, res) {
      //   if (err) throw err;
      //   db.close();
      // });
      
      // res.send({
      //   "status": 'success',
      //   "message": "Settings Saved Sucessfully!!"
      // });
             
      // });
    } catch (error) {
      console.log('Error in Admin Model [ adminsettingPost POST ]: ', error);
    }
  },

  // [ queList GET ]
  async queList(req, res) {
      try{
      await res.render('admin/question/questionlist',{
        name: process.env.PROJECT_NAME
      });
    }catch(error){
      console.log('Error in Admin Model [ queList GET ]: ',error);
    }
  },
  // [ addQue GET ]
  async addQue(req, res) {
      try {
      await surveySchema.find({ surveyStatus: "active" },async(error,surveys)=>{
        await questionsSchema.find({},(err, questions)=>{
          if(!err){
            res.render('admin/question/addque', {
              name: process.env.PROJECT_NAME,
              questions: questions,
              surveylist: surveys
            });
          }

        });
      });
     
    } catch (error) {
      console.log('Error in Admin Model [ addQue GET ]: ', error)
    }
  },

  // [ addQue POST ]
  async addQuePost(req, res) {
    try {
      console.log("Body : ",req.body);
        // [ Validations ]
        if(req.body.surveyId == null || mongoose.Types.ObjectId(req.body.surveyId) == undefined){
          res.send({
            "status": 'fail',
            "statusCode": 400,
            "message": "Something Wrong with SurveyId"
          });
        }
        let queOrder = 0;
        await questionsSchema.countDocuments({},async(error ,count)=>{
          if(!error){
            queOrder = count + 1;
            let surveyId = mongoose.Types.ObjectId(req.body.surveyId);
            let myobj = {
              question: req.body.question,
              answerType: req.body.answerType,
              parent: (req.body.parent == 'yes') ? true : false,
              surveyId : surveyId,
              queOrder : queOrder
            };
            
            if (myobj.parent == true) {
              let parentId = mongoose.Types.ObjectId(req.body.parentQueId); 
              myobj.parentQueId = parentId;
              if(req.body.parentOption != null){
                myobj.parentOption = req.body.parentOption;
              }
            }
    
            if (myobj.answerType == 'option') {
    
              let testArray = req.body.option;
              
              if(testArray.length > 0){
                
                let testJson = [];
                for (var i = 0; i < testArray.length; i++) {
                  let option = testArray[i];
                  let testJsonObject = {};
                  testJsonObject['option_'+i] = testArray[i];
                  testJson.push(testJsonObject);
                }
                myobj.options = testJson;
              }
            }
    
            await questionsSchema.create(myobj, (err)=>{
              if(!err){
              console.log("Question Saved Successfully")
              res.send({
                "status": 'success',
                "statusCode": 200,
                "message": "Question Added Sucessfully!!"
              });
              }
            })
          }
        });

    } catch (error) {
      console.log('Error in Admin Model [ addQue POST ]: ', error);
      res.send({
        "status": 'fail',
        "statusCode": 400,
        "message": "Something Wrong"
      });
    }
  },

  // [ viewQue GET ]
  async viewQue(req, res) {
    try {
      await questionsSchema.findOne({_id:req.params.id},async(error, question)=>{
        if (error) throw error;
        if (question.options != null) {
          let optionArray = [];
        if(question.options.length > 0){
          let test = question.options;
          test.map(function(mapData, index){
            optionArray.push(mapData['option_'+index]);
            return mapData;
          });
        }
          question.options = optionArray;
        }

        let surveyDetails = await surveySchema.findOne({_id : question.surveyId});

        if(question.parent == true ){
          await questionsSchema.findOne({_id : question.parentQueId},(err, parentQue)=>{
            if(err) throw err;
            res.render('admin/question/viewque', {
              name: process.env.PROJECT_NAME,
              question    : question,
              queValue    : parentQue.question,
              surveyValue : surveyDetails.surveyName
            });
    
          })

        }else{
          res.render('admin/question/viewque', {
              name: process.env.PROJECT_NAME,
              question    : question,
              surveyValue : surveyDetails.surveyName
          });
        }
        
      })

    } catch (error) {
      console.log('Error in Admin Model [ View Question ]: ', error);
    }
  },

  // [ getQueData GET ]
   async getQueData(req, res) {
    try {
      console.log("getQue Data has been called")
      await questionsSchema.findOne({_id : req.params.id }, (error,question)=>{
        if(!error){
          
          if (question.options != null) {
            let optionArray = [];
  
          if(question.options.length > 0){
            let test = question.options;
            test.map(function(mapData, index){
              optionArray.push(mapData['option_'+index]);
              return mapData;
            });
          }
          question.options = optionArray;

          }

          res.send({
            "status": 'success',
            "statusCode" : 200,
            "message": "Questions details Fetched Sucessfully!!",
            "getQueData" : question 
          })

        } 
      });
     

    } catch (error) {
      console.log('Error in Admin Model [ View Question ]: ', error);
    }
  },

   // [ editQue GET ]
  async editQue(req, res) {
    try {
        await questionsSchema.findOne({_id:req.params.id},async(error, question)=>{
          if (error) throw error;
          if (question.options != null) {
            let optionArray = [];
          if(question.options.length > 0){
            let test = question.options;
            test.map(function(mapData, index){
              optionArray.push(mapData['option_'+index]);
              return mapData;
            });
          }
            question.options = optionArray;
          }

          let surveys = await surveySchema.find();
          let allQues = await questionsSchema.find();

          res.render('admin/question/editque', {
            name       : process.env.PROJECT_NAME,
            question   : question,
            questions  : allQues,
            surveylist : surveys
          });

        })
        
    } catch (error) {
      console.log('Error in Admin Model [ Edit Question ]: ', error);
    }
  },

// [ editQue POST ]
  async editQuePost(req, res) {
     try {
      console.log("Req.Body: ", req.body);
          // [ Validations ]
          if(req.body.surveyId == null || mongoose.Types.ObjectId(req.body.surveyId) == undefined){
            res.send({
              "status": 'fail',
              "statusCode": 400,
              "message": "Something Wrong with SurveyId"
            });
          }else{
            // [ definig Variable Section ]
            let parentId = null;
            let options = null;
            let parentOption = null;
            if (req.body.parent == 'yes') {
              parentId = mongoose.Types.ObjectId(req.body.parentQueId); 
              if(req.body.parentOption != null){
              parentOption = req.body.parentOption;
              }
            }

            if (req.body.answerType == 'option') {
              console.log("Inside the optin")
            let testArray = req.body.option;
            
            if(testArray.length > 0){
              
              let testJson = [];
              let testJsonObject = {};
              for (var i = 0; i < testArray.length; i++) {
                let option = testArray[i];
                
                testJsonObject['option_'+i] = testArray[i];
                testJson.push(testJsonObject);
              }
              options = testJson;
            }
          }

            let newValues = { 
                question     : req.body.question,
                answerType   : req.body.answerType,
                parent       : (req.body.parent == 'yes') ? true : false,
                parentQueId  : (req.body.parent == 'yes') ? parentId : "", 
                surveyId     : mongoose.Types.ObjectId(req.body.surveyId),
                options      : options,
                parentOption : (req.body.parentOption != null) ? parentOption : ""
            }

            await questionsSchema.findOneAndUpdate({_id : req.body._id},newValues,(error)=>{
              if (error) throw error;

              res.send({
                "status"     : 'success',
                "statusCode" : 200,
                "message"    : "Question Updated Sucessfully!!"
              });
            })
          
          }

    } catch (error) {
      console.log('Error in Admin Model [ addQue POST ]: ', error);
      res.send({
        "status": 'fail',
        "statusCode": 400,
        "message": "Something Wrong"
      });
    }
  },
  // [ getQue GET ]
  async getQue(req, res) {
    try {
      
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let search = req.query.search.value;
      let query = {};
      let orderArray = [ '_id', 'question' ];
      let sortJson = {};
      let recordsTotal = 0;

      if(req.query.order[0].column != null){
        let test = orderArray[req.query.order[0].column];
        let ascDesc = (req.query.order[0].dir == 'desc') ? -1 : 1;
        sortJson[test] = ascDesc;
      }

      if (search != null) {
        query = { question: { $regex: '.*' + search + '.*' } };
      } else {
        query = { };
      }

       // [ Total Count ]
      recordsTotal = await questionsSchema.countDocuments();
      
      await questionsSchema.find(query).skip(start).limit(length).sort(sortJson).exec((error,result)=>{
        if (error) throw err;
        let obj = {
          'draw'           : req.query.draw,
          'recordsTotal'   : recordsTotal,
          'recordsFiltered': recordsTotal,
          'data'           : result
        };
        res.send(obj);
      })

    } catch (error) {
      console.log('Error in Admin Model [ Question table]: ', error);
    }
  },

  // [ getAllQuestions GET ]
  async getAllQuestions(req, res){
    try{
      await questionsSchema.find({},(error, result)=>{
        res.send({
          "status": 'success',
          "statusCode" : 200,
          "message": "Questions Fetched Sucessfully!!",
          "queData" : result 
        })
      })

    } catch(error){
      console.log('Error in Admin Model [ Question table]: ', error);
    }
  },

  // [ View Survey ]
  async viewSurvey(req, res) {
    try {

      await surveySchema.findOne({_id : req.params.id},(error,result)=>{
        if(error) throw error;
        res.render('admin/survey/viewsurvey', {
          name: process.env.PROJECT_NAME,
          survey: result
        });
      })

    } catch (error) {
      console.log('Error in Admin Model [ View Survey]: ', error);
    }
  },

  // [ Edit Survey GET ]
  async editSurvey(req, res) {
    try {
      await surveySchema.findOne({_id : req.params.id},(error,result)=>{
        if(error) throw error;
        res.render('admin/survey/editsurvey', {
          name: process.env.PROJECT_NAME,
          survey: result
        });
      })
      
    } catch (error) {
      console.log('Error in Admin Model [ View Survey]: ', error);
    }
  },

  // [ Edit Survey POST ]
  async editSurveyPost(req, res) {
    try {
      let body = req.body;
      let newValues = {
                  surveyName   : body.surveyname,
                  description  : body.description,
                  surveyStatus : body.surveystatus
      }
      await surveySchema.findOneAndUpdate({_id: body._id}, newValues,(error)=>{
        if(error) throw error;
        res.send({
          "status": 'success',
          "message": "Survey Updated Sucessfully!!"
        });
      });
      
    } catch (error) {
      console.log('Error in Admin Model [ Edit Survey POST ]: ', error);
      res.send({
        "status": 'error',
        "message": "You Made Some Mistake!!"
      });
    }
  },

  // [ Add Survey GET ]
  async addSurvey(req, res) {
    try {
      await res.render('admin/survey/addsurvey', {
        name: process.env.PROJECT_NAME
      });
    } catch (error) {
      console.log('Error in Admin Model [ addSurevy GET ]: ', error);
    }
  },

  // [ add survey  POST ]
  async addSurveyPost(req, res) {
    try {
      let body = req.body;

      await surveySchema.create({
        surveyName    : body.surveyname,
        description   : body.description,
        surveyStatus  : body.surveystatus        
      },(error)=>{
        if(error){
          res.send({
            "status": 'fail',
            "message": "Something Went Wrong Try Again!!"
          });
        }else{
          res.send({
            "status": 'success',
            "message": "Survey Added Sucessfully!!"
          });
        }
      });
    } catch (error) {
      console.log('Error in Admin Model [ addQue POST ]: ', error);
      res.send({
        "status": 'error',
        "message": "Server Error Try Again!!"
      });
    }
  },

  /*
    [ Survey List ]
  */
  async surveyTable(req, res) {
    try {
      res.render('admin/survey/list', {
        name: process.env.PROJECT_NAME
      });
    } catch (error) {
      console.log('Error in Admin Model [ survey table]: ', error);
    }
  },

  //  [ Survey List GET ]
  async surveyList(req, res) {
    try {

      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let search = req.query.search.value;
      let query = {};
      let orderArray = [ '_id', 'surveyName', 'surveyStatus' ];
      let sortJson = {};
      let recordsTotal = 0;

      if(req.query.order[0].column != null){
        let test = orderArray[req.query.order[0].column];
        let ascDesc = (req.query.order[0].dir == 'desc') ? -1 : 1;
        sortJson[test] = ascDesc;
      }

      if (search != null) {
        query = { surveyName: { $regex: '.*' + search + '.*' } };
      } else {
        query = { };
      }

      // [ Total Count ]
      recordsTotal = await surveySchema.countDocuments();
      
      await surveySchema.find(query).skip(start).limit(length).sort(sortJson).exec((error,result)=>{
        if (error) throw err;
        let obj = {
          'draw'           : req.query.draw,
          'recordsTotal'   : recordsTotal,
          'recordsFiltered': recordsTotal,
          'data'           : result
        };
        res.send(obj);
      })

    } catch (error) {
      console.log('Error in Admin Model [ survey table]: ', error);
    }
  },
  
  // [ Leaderboard GET ]
  async leaderboard(req, res) {
    try {
      res.render('admin/Leaderboard/Leaderboard', {
            name: process.env.PROJECT_NAME
          });

    } catch (error) {
      console.log('Error in Admin Model[ Leaderboard GET ]: ', error);
    }
  },

  // [ Get Leaderboard Data ]
  async getLeaderboardData(req, res) {
    try {
      
      let userstart = parseInt(req.query.start);
      let userlength = parseInt(req.query.length);
      let usersearch = req.query.search.value;
      let usersTotal = 0;
      let userquery = {};
      let userorderArray = [ '_id', 'name','email', 'surveyAttend' ];
      let usersortJson = {};

      if(req.query.order[0].column != null){
        let usertest = userorderArray[req.query.order[0].column];
        let userascDesc = (req.query.order[0].dir == 'desc') ? -1 : 1;
        usersortJson[usertest] = userascDesc;
      }

          if (usersearch != null) {
            userquery = { name: { $regex: '.*' + usersearch + '.*' } };
          } else {
            userquery = { };
          }

               // [ Total Count ]
      usersTotal = await userSchema.countDocuments();
      
      await userSchema.find(userquery).skip(userstart).limit(userlength).sort(usersortJson).exec((error,result)=>{
        if (error) throw err;
        let obj = {
          'draw'           : req.query.draw,
          'recordsTotal'   : usersTotal,
          'recordsFiltered': usersTotal,
          'data'           : result
        };
        res.send(obj);
      })


    } catch (error) {
      console.log('Error in Admin Model [ Get Leaderboard Data ]: ', error);
    }
  },

  // [ Edit Profile GET ]
  async adminProfile(req, res) {
    try {
      await userSchema.findOne({email: req.session.email}, (error,result)=>{
        res.render('admin/dashboard/adminprofile', {
          name: process.env.PROJECT_NAME,
          user: result
        })
      })
    } catch (error) {
      console.log('Error in Admin Model [ Admin Profile GET ]: ', error);
    }
  },

  // [ Admin Profile POST ]
  async adminProfilePost(req, res) {
    try {
      
      req.file = req.files;
      if (req.file !== undefined) {
        upload(req, res, (err) => {
          if (err) {
            console.log('error in uploading')
            res.render('admin/dashboard/adminprofile', {
              msg: err
            });
          } else {
            if (req.file == undefined) {
              console.log('No file Selected')
              res.render('admin/dashboard/adminprofile', {
                msg: 'Error: No File Selected!'
              });
            } else {
              console.log('File Uploaded')
              res.render('admin/dashboard/adminprofile', {
                msg: 'File Uploaded!',
                file: `uploads/${req.file.filename}`
              });

            }
          }
        });
      }
      // Changing NAme

      if (req.body.name !== undefined) {
        await userSchema.findOneAndUpdate({email: req.session.email}, {name: req.body.name},(error)=>{
          res.send({
            "status": 'success',
            "message": "Profile Updated Sucessfully!!"
          });
        })
      }
    } catch (error) {
      console.log('Error in Admin Model [ Admin Profile POST ]: ', error)
    }
  },


  // [ User Management ]

   async userManagement(req, res) {
    try {
      res.render('admin/usermanagement/usermanagement', {
            name: process.env.PROJECT_NAME
      });

    } catch (error) {
      console.log('Error in Admin Model[ userManagement GET ]: ', error);
      }
  }, 

  // [ View User Profile GET ]
  async viewUserProfile(req, res) {
    try {
      await userSchema.findOne({_id: req.params.id},(error, result)=>{
        if(!error){
          res.render('admin/usermanagement/viewUserProfile', {
            name: process.env.PROJECT_NAME,
            user: result
          });
        }

      })

    } catch (error) {
      console.log('Error in Survey Model [ viewUserProfile GET ]: ', error);
    }
  },

    // [ Edit Profile POST ]
  async viewUserProfilePost(req, res) {
    try {
        let newValues = {
          name     : req.body.name,
          username : req.body.username,
          password : req.body.password
        }
        await userSchema.findOneAndUpdate({_id : req.params.id},newValues,(error)=>{
          if(error){
            res.send({
              "status": 'fail',
              "message": "Something Went Wrong!!"
            });
          };
          res.send({
            "status": 'success',
            "message": "Profile Updated Sucessfully!!"
          });
        })
      
    } catch (error) {
      console.log('Error in Survey Model [ Edit Profile POST ]: ', error);
    }

  },

    // [ API For userManagement ]
  async userData(req, res) {
    try {
      let userstart = parseInt(req.query.start);
      let userlength = parseInt(req.query.length);
      let usersearch = req.query.search.value;
      let usersTotal = 0;
      let userquery = {};
      let userorderArray = [ '_id', 'name','username', 'isBlock', 'createdAt' ];
      let usersortJson = {};
      
      if(req.query.order[0].column != null){
        let usertest = userorderArray[req.query.order[0].column];
        let userascDesc = (req.query.order[0].dir == 'desc') ? -1 : 1;
        usersortJson[usertest] = userascDesc;
      }

          if (usersearch != null) {
            userquery = { name: { $regex: '.*' + usersearch + '.*' } };
          } else {
            userquery = { };
          }
          
                         // [ Total Count ]
      usersTotal = await userSchema.countDocuments();
      
      await userSchema.find(userquery).skip(userstart).limit(userlength).sort(usersortJson).exec((error,result)=>{
        if (error) throw err;
        let obj = {
          'draw'           : req.query.draw,
          'recordsTotal'   : usersTotal,
          'recordsFiltered': usersTotal,
          'data'           : result
        };
        res.send(obj);
      })

    } catch (error) {
      console.log('Error in Admin Model [ userData ]: ', error);
    }
  },

// [ API for user delete ]
 async userDelete(req, res) {
    try {
      
      await userSchema.findOneAndUpdate({_id: req.params.id},{isDeleted :true},(error)=>{
        if(error){
          res.send({
            "status": 'fail',
            "message": "Something Went Wrong!!"
          });
        }else{
          res.send({
            "status": 'success',
            "message": "User Deleted Sucessfully!!"
          });
        }
      })

    } catch (error) {
      console.log('Error in Admin Model [ User DELETE  POST ]: ', error);
    }
  },

// [ API for user Blocking And Unblocking ]
 async userBlock(req, res) {
    try {
      let blockStatus = true;
      let message = "User Blocked Successfully!!";
      if(req.body.btnValue == "false"){
        blockStatus = false;
        message = "User Unblocked Successfully!!"

      }

      await userSchema.findOneAndUpdate({_id: req.params.id},{isBlock : blockStatus},(error)=>{
        if(error){
          res.send({
            "status": 'fail',
            "message": "Something Went Wrong!!"
          });
        }else{
          res.send({
            "status": 'success',
            "message": message
          });
        }
      })
    } catch (error) {
      console.log('Error in Admin Model [ User DELETE  POST ]: ', error);
    }
  },
    // [ addDummyUsers ]

   async addDummyUsers(req, res) {
    try {
     
      for(let i = 0; i <= 5; i++){
        await userSchema.create({
          name     :"user"+i ,
          username : "userno_"+i,
          email    : "user"+i+"@g.com",
          password : "Sahil@1234"
          
        });

      }
      res.send({
              "status": 'success',
              "message": "Dummy Users Added Sucessfully!!"
            });

    } catch (error) {
      console.log('Error in Admin Model[ addDummyUsers POST ]: ', error);
      }
  },

}


module.exports = adminClass;