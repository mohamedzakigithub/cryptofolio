$(document).ready(function () {
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  loginForm.on("submit", function (event) {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  async function loginUser(email, password) {
    try {
      const data = await $.post("/api/login", {
        email: email,
        password: password,
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  }
});
