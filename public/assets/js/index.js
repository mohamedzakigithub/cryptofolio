const posts = $("#posts");

$(document).ready(function () {
  $.get("/api/posts").then(function (data) {
    data.forEach((element) => {
      posts.append(`<div class="card" style="width: 100%;">
      <div class="card-header">
    <h5 class="card-title">${element.title}</h5>
    </div>
    <div class="card-body">
    <p class="card-text">${element.post}</p>
    </div>
  </div>
  <hr/>`);
    });
  });
});
