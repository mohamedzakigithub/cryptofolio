const posts = $("#posts");

$(document).ready(function () {
  $.get("/api/posts").then(function (data) {
    data.forEach((element) => {
      posts.append(`<div class="card" style="width: 100%;">
      <div class="card-header">
      <h3>${element.title}</h3>
      <p style="margin-bottom: 0rem">Created by: <i>${element.User.name}</i></p>
       <p>Email: <i>${element.User.email}</i></p>
      </div>
    <div class="card-body">
    <p class="card-text">${element.post}</p>
    <footer class="justify-content-between">
    <h4 style="text-align: right;"><span class="badge badge-secondary">${element.coin}</span>
    <span class="badge badge-secondary">${element.price} $</span>
    <span class="badge ${element.type}" >${element.type}</span></h4>
    </footer>
    </div>
  </div>
  <hr/>`);
    });
  });
});
