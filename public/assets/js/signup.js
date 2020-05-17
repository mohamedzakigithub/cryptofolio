$(document).ready(function () {
  const signUpForm = $("form.signup");
  const nameInput = $("input#name-input");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  signUpForm.on("submit", function (event) {
    event.preventDefault();
    const userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.name || !userData.email || !userData.password) {
      return;
    }
    signUpUser(userData.name, userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  async function signUpUser(name, email, password) {
    try {
      const res = await $.post("/api/signup", {
        name: name,
        email: email,
        password: password,
      });
      window.location.replace("/");
    } catch (error) {
      handleLoginErr(err);
    }
  }

  function handleLoginErr(err) {
    $("#alert .msg").text("Sign Up failed");
    $("#alert").fadeIn(500);
  }
});
