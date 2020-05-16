const postsElement = $("#cms");

$(document).ready(async function () {
  userData = await $.get("/api/user_data");
  userid = userData.id;

  let posts = await $.get("/api/posts");
  filteredPosts = posts.filter((post) => post.UserId == userid);

  filteredPosts.forEach((post) => {
    postsElement.append(`<div class="card" style="width: 100%;">
  <div class="card-body">
  <div class="editCheck form-check">
    <input type="checkbox" class="form-check-input" data-id=${post.id}>
    <label class="form-check-label" for=${post.id}>Edit this post</label>
  </div>
    <form class="editpostFrom">
      <div class="form-group">
        <label for="title">Title</label>
        <textarea style="resize: none;" type="textarea" class="form-control edit title-input" data-id=${post.id}
          readonly rows="1" cols="50">${post.title}</textarea>
      </div>
      <div class="form-group">
        <label for="text-input">Post</label>
        <textarea type="textarea" class="form-control edit post-input" data-id=${post.id}
          readonly>${post.post}</textarea>
      </div>
      <button class="deleteBtn btn btn-danger" type="button" data-id="${post.id}">Delete Post</button>
      <button class="saveBtn btn btn-primary" type="button" data-id="${post.id}">Save Post</button>
    </form>
  </div>
</div>
<hr />`);
  });

  AddListeners();
});

function AddListeners() {
  $(".deleteBtn").on("click", function (event) {
    event.preventDefault();
    var id = event.target.getAttribute("data-id");

    $.ajax({
      url: "/api/posts/" + id,
      type: "delete",
    })
      .then(function (data) {
        location.reload();
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  $(".saveBtn").on("click", function (event) {
    event.preventDefault();
    id = event.target.getAttribute("data-id");
    title = $(".title-input[data-id=" + id + "]")
      .val()
      .trim();
    post = $(".post-input[data-id=" + id + "]")
      .val()
      .trim();
    console.log(title);
    var postData = {
      id: id,
      title: title,
      post: post,
    };

    if (!postData.title || !postData.post) {
      $("#alert .msg").text("All fields required");
      $("#alert").fadeIn(500);
      return;
    }
    editPost(postData);
  });

  $(".editCheck").change(function () {
    id = event.target.dataset.id;
    if (event.target.checked) {
      $(" .edit[data-id=" + id + "]").each(function (i) {
        $(this).prop("readonly", false);
      });
    } else {
      $(".edit[data-id=" + id + "]").each(function (i) {
        $(this).prop("readonly", true);
      });
    }
  });
}

function editPost(postData) {
  console.log(postData);
  $.ajax({
    url: "/api/posts",
    type: "put",
    data: postData,
  })
    .then(function (data) {
      window.location.replace("/cms");
    })
    .catch(handleEditErr);
}

function handleEditErr(err) {
  $("#alert .msg").text("Adding post failed");
  $("#alert").fadeIn(500);
}
