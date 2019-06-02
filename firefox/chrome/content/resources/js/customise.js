/*!
 * English Sabla Mozilla Firefox Extension
 * http://englishsabla.com/
 *
 * Copyright 2010, Assim Al-Marhuby
 * http://assim.me/
 */

$(document).ready(function() {

  // Reference the preferences system of Mozilla
  var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
  .getService(Components.interfaces.nsIPrefBranch);

  // Fill in form
  $("input#esoption_username").attr("value", prefManager.getCharPref("extensions.englishsabla.username"));
  if(prefManager.getCharPref("extensions.englishsabla.thread_resize_post_images") == "checked")
  {
    $("input#esoption_thread_resize_post_images").attr("checked", "checked").attr("value", "checked");
  }
  if(prefManager.getCharPref("extensions.englishsabla.forum_categories") == "checked")
  {
    $("input#esoption_forum_categories").attr("checked", "checked").attr("value", "checked");
  }
  if(prefManager.getCharPref("extensions.englishsabla.thread_signatures") == "checked")
  {
    $("input#esoption_thread_signatures").attr("checked", "checked").attr("value", "checked");
  }

  // Add checked in "value" attribute if checked, or remove the attribute if not checked for checkbox inputs
  $("input[type='checkbox']").change(function() {
    if($(this).attr("value") == "checked")
    {
      $(this).removeAttr("value");
    }
    else
    {
      $(this).attr("value", "checked");
    }
  });

  // When the save button is clicked
  $("button#save").click(function() {
    // Save data in localStorage
    var esoption_username =                  $("input#esoption_username").val();
    var esoption_thread_resize_post_images = $("input#esoption_thread_resize_post_images").val();
    var esoption_forum_categories =          $("input#esoption_forum_categories").val();
    var esoption_thread_signatures =         $("input#esoption_thread_signatures").val();

    prefManager.setCharPref("extensions.englishsabla.username", esoption_username);
    prefManager.setCharPref("extensions.englishsabla.thread_resize_post_images", esoption_thread_resize_post_images);
    prefManager.setCharPref("extensions.englishsabla.forum_categories", esoption_forum_categories);
    prefManager.setCharPref("extensions.englishsabla.thread_signatures", esoption_thread_signatures);

    // Disable save button
    $("button#save").attr("disabled", "disabled").html("Customisations Saved");
  });

  // Enable "Save" button if inputs have been changed
  $(":input").change(function() {
    $("button#save:disabled").removeAttr("disabled").html("Save Customisations");
  });

});