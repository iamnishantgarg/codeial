{
  $(document).ready(function() {
    $(document).ajaxStart(function() {
      $(".loadingio-spinner-pulse-40ajj5222fn").css("display", "block");
    });
    $(document).ajaxComplete(function() {
      $(".loadingio-spinner-pulse-40ajj5222fn").css("display", "none");
    });
  });

  let createPost = () => {
    let newPostForm = $("#new-post-form");
    newPostForm.submit(e => {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/posts/create/",
        data: newPostForm.serialize(),
        success: data => {
          //console.log(data);
          let newPost = newPostDom(data.data.p);
          $("#post-list-container>ul").prepend(newPost);
          new Noty({
            theme: "relax",
            type: "success",
            text: "Post created successfully!",
            layout: "topRight",
            timeout: 1000
          }).show();
          deletePost($(" .delete-post-button", newPost));
        },
        error: error => {
          console.log(error.responseText);
        }
      });
    });
  };

  let newPostDom = post => {
    return $(`<li id="post-${post._id}">
  <small><a href="/posts/destroy/${post._id}" class="delete-post-button">X</a></small
  > ${post.content}<br />
  <small>${post.user.name}</small><br />
  <form action="/comments/create" method="POST" style="padding: 0;margin: 0;">
    <input
      type="text"
      name="content"
      placeholder="Write a comment ..."
      required
    />
    <input type="hidden" name="post" value="${post._id}" hidden />
    <input type="submit" value="Add Comment" />
  </form>
</li>
`);
  };
  let deletePost = deleteLink => {
    $(deleteLink).click(e => {
      e.preventDefault();
      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: data => {
          console.log(data);
          $(`#post-${data.data.post_id}`).remove();
          new Noty({
            theme: "relax",
            type: "error",
            text: "Post and associated comments deleted",
            layout: "topRight",
            timeout: 1000
          }).show();
        },
        error: error => {
          console.log(error.responseText);
        }
      });
    });
  };

  $(".delete-post-button").each(function() {
    deletePost($(this));
  });
  createPost();
}
