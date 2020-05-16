const posts = $("#posts");

$(document).ready(function () {
  $.get("/api/posts").then(function (data) {
    data.forEach((element) => {
      posts.append(`<div class="card" style="width: 100%;">
    <div class="card-body">
    <form class="editpostFrom">
    <div class="form-group">
      <label for="title">Title</label>
      <input
        type="input"
        class="form-control edit title-input"
        value=${element.title}
        data-id=${element.id}
        readonly
      />
    </div>
    <div class="form-group">
      <label for="text-input">Post</label>
      <textarea 
        type="textarea"
        class="form-control edit post-input"
        data-id=${element.id}
        readonly
      >${element.post}</textarea>
    </div>
    
  </form>
    </div>
  </div>
  <hr/>`);
    });
  });
});
