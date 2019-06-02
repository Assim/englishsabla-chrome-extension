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

  // When posts link clicked
  $("a#posts_link").click(function() {
    $("div#threads_content").hide();
    $("div#news_content").hide();
    $("div#customise_content").hide();
    $("div#information_content").hide();
    $("div#posts_content").show();
  });

  // When threads link clicked
  $("a#threads_link").click(function() {
    $("div#posts_content").hide();
    $("div#news_content").hide();
    $("div#customise_content").hide();
    $("div#information_content").hide();
    $("div#threads_content").show();
  });

  // When news link clicked
  $("a#news_link").click(function() {
    $("div#posts_content").hide();
    $("div#threads_content").hide();
    $("div#customise_content").hide();
    $("div#information_content").hide();
    $("div#news_content").show();
  });

  // When customise link clicked
  $("a#customise_link").click(function() {
    $("div#posts_content").hide();
    $("div#threads_content").hide();
    $("div#news_content").hide();
    $("div#information_content").hide();
    $("div#customise_content").show();
  });

  // When information link clicked
  $("a#information_link").click(function() {
    $("#posts_content").hide();
    $("#threads_content").hide();
    $("#news_content").hide();
    $("div#customise_content").hide();
    $("#information_content").show();
  });

});