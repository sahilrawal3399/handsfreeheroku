
class middlewareClass {
  
  // [ User Authentication ]
  async auth(req, res, next){
    
    try{
      let session = req.session;
      if(!session.email){
        res.redirect('/');
      }
      else {
        next();
      }
    }
    catch(error){

    }

  }

  async loginCheck(req, res, next){
    
    try{
      let session = req.session;
      console.log('session middleware: ',session);
      if(!session.email){
        next();
      }
      else {
        res.redirect('/survey');
      }
    }
    catch(error){

    }

  }

}

module.exports = middlewareClass;