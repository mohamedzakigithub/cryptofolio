const postsElement = $("#cms");
const cmsLoader = $(".loader");

$(document).ready(async function () {
  userData = await $.get("/api/user_data");
  cmsLoader.hide();
  userid = userData.id;
  let posts = await $.get("/api/posts");
  filteredPosts = posts.filter((post) => post.UserId == userid);
  filteredPosts.forEach((post) => {
    postsElement.append(`<div class="card mx-auto" style="width: 50%;">
  <div class="card-body">
  <div class="editCheck form-check">
    <input type="checkbox" class="form-check-input" data-id=${post.id}>
    <label class="form-check-label" for=${post.id}>Edit this post</label>
  </div>
    <form class="editpostFrom">
      <div class="form-group">
        <label for="title">Title</label>
        <textarea style="resize: none;" type="textarea" class="form-control edit title-input" data-id=${post.id}
        disabled="true" rows="1" cols="50">${post.title}</textarea>
      </div>
      <div class="form-group">
        <label for="text-input">Post</label>
        <textarea type="textarea" class="form-control edit post-input" data-id=${post.id}
        disabled="true">${post.post}</textarea>
      </div>
      <div class="form-group">
        <label for="coin-input">Coin</label>
        <select class="custom-select coin-input edit" data-id=${post.id}
        disabled="true">
          <option selected value="Bitcoin">Bitcoin</option>
          <option value="Ethereum">Ethereum</option>
          <option value="XRP">XRP</option>
          <option value="Tether">Tether</option>
          <option value="Bitcoin Cash">Bitcoin Cash</option>
          <option value="Bitcoin SV">Bitcoin SV</option>
          <option value="Litecoin">Litecoin</option>
          <option value="Binance Coin">Binance Coin</option>
        </select>
        </div>
        <div class="form-group">
          <label for="price-input">Price</label>
          <input type="number" class="form-control price-input edit" value= "${post.price}" data-id=${post.id}
          disabled="true" />
        </div>
        <div class="form-group">
        <label for="type-input">Post type</label>
        <select class="custom-select type-input edit"  data-id=${post.id} disabled="true">
          <option selected value="Ask">Ask</option>
          <option value="Bid">Bid</option>
        </select>
        </div> 
      <button class="deleteBtn btn btn-danger" type="button" data-id="${post.id}">Delete Post</button>
      <button class="saveBtn btn btn-primary" type="button" data-id="${post.id}">Save Post</button>
    </form>
  </div>
</div>
<hr />`);
    $(".type-input[data-id=" + post.id + "]").val(post.type);
    $(".coin-input[data-id=" + post.id + "]").val(post.coin);
  });

  AddListeners();
});

function AddListeners() {
  $(".deleteBtn").on("click", async function (event) {
    try {
      event.preventDefault();
      var id = event.target.getAttribute("data-id");
      const result = await $.ajax({
        url: "/api/posts/" + id,
        type: "delete",
      });
      location.reload();
    } catch (err) {
      handleEditErr(err);
    }
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
    coin = $(".coin-input[data-id=" + id + "]")
      .val()
      .trim();
    price = $(".price-input[data-id=" + id + "]")
      .val()
      .trim();
    type = $(".type-input[data-id=" + id + "]")
      .val()
      .trim();
    var postData = {
      id: id,
      title: title,
      post: post,
      coin: coin,
      price: price,
      type: type,
    };

    if (!postData.title || !postData.post || !postData.price) {
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
        $(this).attr("disabled", false);
      });
    } else {
      $(".edit[data-id=" + id + "]").each(function (i) {
        $(this).attr("disabled", true);
      });
    }
  });
}

async function editPost(postData) {
  try {
    const result = await $.ajax({
      url: "/api/posts",
      type: "put",
      data: postData,
    });

    window.location.replace("/cms");
  } catch (err) {
    handleEditErr(err);
  }
}

function handleEditErr(err) {
  $("#alert .msg").text("Adding post failed");
  $("#alert").fadeIn(500);
}
