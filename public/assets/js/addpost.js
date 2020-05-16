$(document).ready(function () {
  var addpostForm = $("form.addpostFrom");
  var titleInput = $("#title-input");
  var postInput = $("#post-input");
  var coinInput = $("#coin-input");
  var priceInput = $("#price-input");
  var typeInput = $("#type-input");

  addpostForm.on("submit", function (event) {
    event.preventDefault();
    $.get("/api/user_data").then(function (data) {
      UserId = data.id;
      var postData = {
        UserId: UserId,
        title: titleInput.val().trim(),
        post: postInput.val().trim(),
        coin: coinInput.val().trim(),
        price: priceInput.val().trim(),
        type: typeInput.val().trim(),
      };

      if (!postData.UserId || !postData.title || !postData.post || !postData.price) {
        $("#alert .msg").text("All fields required");
        $("#alert").fadeIn(500);
        return;
      }
      addPost(postData);
    });
  });

  function addPost(postData) {
    $.post("/api/posts", postData)
      .then(function (data) {
        window.location.replace("/cms");
      })
      .catch(handlePostErr);
  }

  function handlePostErr(err) {
    $("#alert .msg").text("Adding post failed");
    $("#alert").fadeIn(500);
  }
});
