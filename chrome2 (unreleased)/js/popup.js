/*!
 * English Sabla Google Chrome Extension
 * http://englishsabla.com/
 *
 * Copyright 2010, Assim Al-Marhuby
 * http://assim.me/
 */

$(document).ready(function () {

  // Show latest posts by default
  $("#posts_content").show();

  // When a link is clicked (links with ID ending with "_link"
  $("a[id$='_link']").click(function() {
    // Get requested content
    var requested_content = $(this).attr("id");
    requested_content = requested_content.replace("_link", "");

    // Hide old content, show new content
    $("div[id$='_content']").hide();
    $("div#"+ requested_content +"_content").show("slow");
  });

  // If news container has no news, tell users there's no news
  if($("div#news_container > a").length == 0) {
    // This means there's no news
    $("div#news_container").html("<font size=\"1\" color=\"red\">There's either no recent news or we were unable to connect to English Sabla. Please click on the \"Sabla News and Events Archive\" link below to check for the latest news.</font>");
  }

  // If posts container has no posts, tell users there's a connectivity problem
  if($("div#posts_container > a").length == 0) {
    $("div#posts_container").html("<font size=\"1\" color=\"red\">There has been a problem connecting to English Sabla. Please click on the \"Search New Posts\" link below.</font>");
  }

  // If threads container has no threads, tell users there's a connectivity problem
  if($("div#threads_container > a").length == 0) {
    $("div#threads_container").html("<font size=\"1\" color=\"red\">There has been a problem connecting to English Sabla. Please click on the \"Search New Posts\" link below.</font>");  }

});