function checkPassword(form) {
    password1 = form.pass.value;
    password2 = form.re_pass.value;

    // If password not entered
    if (password1 == '')
        alert ("Please enter Password");
          
    // If confirm password not entered
    else if (password2 == '')
        alert ("Please enter confirm password");
          
    // If Not same return False.    
    else if (password1 != password2) {
        alert ("\nPassword did not match: Please try again...")
        return false;
    }

    // If same return True.
    else{
        alert("Welcome To Survey")
        return true;
    }
}