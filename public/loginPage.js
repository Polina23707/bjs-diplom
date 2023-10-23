"use strict";

const userForm = new UserForm();
// console.log(userForm);

userForm.loginFormCallback = data => {
  // console.log(data);
  ApiConnector.login(data, response => {
    // console.log(response);
    // console.log(response.success);
    if (response.success) {
      location.reload();
    } else {
      // console.log(response.error);
      userForm.setLoginErrorMessage(response.error)
    }
  })
}

userForm.registerFormCallback = data => {
  // console.log(data);
  ApiConnector.register(data, response => {
    // console.log(response);
    // console.log(response.success);
    if (response.success) {
      location.reload();
    } else {
      // console.log(response.error);
      userForm.setRegisterErrorMessage(response.error) 
    }
  })
}