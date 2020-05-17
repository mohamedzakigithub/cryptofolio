$(document).ready(function () {
  const addpostForm = $("form.addpostFrom");
  const titleInput = $("#title-input");
  const postInput = $("#post-input");
  const coinInput = $("#coin-input");
  const priceInput = $("#price-input");
  const typeInput = $("#type-input");

  addpostForm.on("submit", async function (event) {
    event.preventDefault();
    const result = await $.get("/api/user_data");
    UserId = result.id;
    var postData = {
      UserId: UserId,
      title: titleInput.val().trim(),
      post: postInput.val().trim(),
      coin: coinInput.val().trim(),
      price: priceInput.val().trim(),
      type: typeInput.val().trim(),
    };

    if (
      !postData.UserId ||
      !postData.title ||
      !postData.post ||
      !postData.price
    ) {
      $("#alert .msg").text("All fields required");
      $("#alert").fadeIn(500);
      return;
    }
    addPost(postData);
  });

  async function addPost(postData) {
    try {
      const result = await $.post("/api/posts", postData);
      window.location.replace("/cms");
    } catch (error) {
      handlePostErr();
    }
  }

  function handlePostErr() {
    $("#alert .msg").text("Adding post failed");
    $("#alert").fadeIn(500);
  }
});
