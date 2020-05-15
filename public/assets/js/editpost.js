$(document).ready(function () {
  var addpostForm = $("form.addpostFrom");
  var titleInput = $("#title-input");
  var postInput = $("#post-input");

  addpostForm.on("submit", function (event) {
    event.preventDefault();
    $.get("/api/user_data").then(function (data) {
      UserId = data.id;
      event.preventDefault();
      var postData = {
        UserId: UserId,
        title: titleInput.val().trim(),
        post: postInput.val().trim(),
      };

      if (!postData.UserId || !postData.title || !postData.post) {
        $("#alert .msg").text("All fields required");
        $("#alert").fadeIn(500);
        return;
      }
      addPost(postData);
    });
  });

  function addPost(postData) {
    console.log(postData);
    $.post("/api/posts", postData)
      .then(function (data) {
        window.location.replace("/cryptofolio");
      })
      .catch(handlePostErr);
  }

  function handlePostErr(err) {
    $("#alert .msg").text("Adding post failed");
    $("#alert").fadeIn(500);
  }
});
