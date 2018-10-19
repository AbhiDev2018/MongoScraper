//Handle Scraping button click  
 var previous = 0;
 var current = null;

//Click event for scraping new articles.
    $("#scrape").on("click", function(event) {
        $.ajax({
            method: "GET",
            url: "/articles",
        })
        .then(function(data) {
            console.log(data);
            current = data.length;
            console.log(current);
            console.log(previous);
            previous = current;
            $.ajax({
                method:"GET",
                url: "/scrape"
            })
            .then(function(data) {
                $.ajax({
                    method: "GET",
                    url: "/articles"
                })
                .then(function(data){
                    current = data.length;
                    console.log(current);
                    console.log(previous);
                if (previous !== current) {
                alert((current - previous) + " new article/s found");
			        previous = current;
                    console.log(previous);
                    }
                else { console.log("No new articles found.")
                       alert("No new articles found!");
                    }
                    location.reload();
                })
            })
        });
    });

//Clicked nav option to active
$(".navbar-nav li").click(function() {
 $(".navbar-nav li").removeClass("active");
 $(this).addClass("active");
});

//Handle Save Article button
$(".save").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/save/" + thisId
  }).done(function(data) {
   //   window.location = "/"
   window.location.assign("/");
  })
});

//Handle Delete Article button
$(".delete").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/delete/" + thisId
  }).done(function(data) {
      window.location = "/saved"
  })
});

//Handle Save Note button
$(".saveNote").on("click", function() {
  var thisId = $(this).attr("data-id");
  if (!$("#noteText" + thisId).val()) {
      alert("please enter a note to save")
  }else {
    $.ajax({
          method: "POST",
          //url:"/articles/"+ thisId,
          url: "/notes/save/" + thisId,
          data: {
            text: $("#noteText" + thisId).val()
          }
        }).done(function(data) {
             console.log(data);
            // Empty the notes section
            $("#noteText" + thisId).val("");
            $(".modalNote").modal("hide");
            window.location = "/saved"
        });
  }
});

//Handle Delete comment button
$(".deleteNote").on("click", function() {
    var noteId = $(this).attr("data-note-id");
    var articleId = $(this).attr("data-article-id");
    $.ajax({
        method: "DELETE",
        url: "/notes/delete/" + noteId + "/" + articleId
    }).done(function(data) {
        console.log(data)
        $(".modalNote").modal("hide");
        window.location = "/saved"
    })
});