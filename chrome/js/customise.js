/*!
 * English Sabla Google Chrome Extension
 * http://englishsabla.com/
 *
 * Copyright 2010, Assim Al-Marhuby
 * http://assim.me/
 */

$(document).ready(function() {

  // Fill in form
  $("input#esoption_username").attr("value", localStorage["esoption_username"]);
  if(localStorage["esoption_thread_resize_post_images"] == "checked")
  {
    $("input#esoption_thread_resize_post_images").attr("checked", "checked").attr("value", "checked");
  }
  if(localStorage["esoption_forum_categories"] == "checked")
  {
    $("input#esoption_forum_categories").attr("checked", "checked").attr("value", "checked");
  }
  if(localStorage["esoption_thread_signatures"] == "checked")
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
    localStorage["esoption_username"] =                  $("input#esoption_username").val();
    localStorage["esoption_thread_resize_post_images"] = $("input#esoption_thread_resize_post_images").val();
    localStorage["esoption_forum_categories"] =          $("input#esoption_forum_categories").val();
    localStorage["esoption_thread_signatures"] =         $("input#esoption_thread_signatures").val();

    // Disable save button
    $("button#save").attr("disabled", "disabled").html("Customisations Saved");
  });

  // Enable "Save" button if inputs have been changed
  $(":input").change(function() {
    $("button#save:disabled").removeAttr("disabled").html("Save Customisations");
  });

});