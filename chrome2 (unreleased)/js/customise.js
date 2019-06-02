/*!
 * English Sabla Google Chrome Extension
 * http://englishsabla.com/
 *
 * Copyright 2010, Assim Al-Marhuby
 * http://assim.me/
 */

$(document).ready(function() {

  // Fill in form
  var value = ""; // Used for retriving data
  // Text boxes
  $("input:text").each(function() {
    value = $(this).attr("id"); // Get option name
    value = localStorage[value]; // Store setting value
    $(this).attr("value", value);
  });

  $("input:checkbox").each(function() {
    value = $(this).attr("id"); // Get option name
    value = localStorage[value]; // Store setting value
    if(value == "checked")
    {
      $(this).attr("checked", "checked").attr("value", "checked");
    }
  });

  $("select").each(function() {
    value = $(this).attr("id"); // Get option name
    value = localStorage[value]; // Store setting value

    var option = "";
    // Loop on every option
    $(this).find("option").each(function() {
      option = $(this).val(); // Current option value

      // If option found
      if(option == value)
      {
        // Make it selected
        $(this).attr("selected", "selected");

        // Break loop
        return false;
      }
    });
  });

  // Disable children
  if(localStorage["esoption_thread_resize_post_images"] != "checked")
  {
    $("input#esoption_thread_resize_post_images_size").attr("disabled", "disabled");
  }
  if(localStorage["esoption_thread_post_font"] != "checked")
  {
    $("select#esoption_thread_post_font_max_size").attr("disabled", "disabled");
    $("input#esoption_thread_post_font_default_color").attr("disabled", "disabled");
  }

  // Add checked in "value" attribute if checked, or remove the attribute if not checked for checkbox inputs
  $("input:checkbox").change(function() {
    if($(this).attr("value") == "checked")
    {
      $(this).removeAttr("value");
    }
    else
    {
      $(this).attr("value", "checked");
    }
  });

  // Allow numbers in number only fields
  $("input#esoption_thread_resize_post_images_size").forceNumericOnly();

  // Children settings
  // esoption_thread_resize_post_images
  $("input#esoption_thread_resize_post_images").change(function() {
    if($("input#esoption_thread_resize_post_images").val() != "checked") {
      $("input#esoption_thread_resize_post_images_size").attr("disabled", "disabled");
    }
    else
    {
      $("input#esoption_thread_resize_post_images_size").removeAttr("disabled");
    }
  });
  // esoption_esoption_thread_post_font
  $("input#esoption_thread_post_font").change(function() {
    if($("input#esoption_thread_post_font").val() != "checked") {
      $("select#esoption_thread_post_font_max_size").attr("disabled", "disabled");
      $("input#esoption_thread_post_font_default_color").attr("disabled", "disabled");
    }
    else
    {
      $("select#esoption_thread_post_font_max_size").removeAttr("disabled");
      $("input#esoption_thread_post_font_default_color").removeAttr("disabled");
    }
  });

  // Keep save button hidden
  $("button#save").hide();

  // Enable "Save" button if inputs have been changed or if text is being typed
  $(":input").bind('change keyup', function() {
    $("button#save:disabled").removeAttr("disabled").html("Save Customisations");
    $("button#save").show("fast");
  });

  // When the save button is clicked
  $("button#save").click(function() {
    // Validation
    var error_message = "";
    // esoption_thread_resize_post_images_size validation
    if($("input#esoption_thread_resize_post_images_size").val() < 400)
    {
      // Make error message
      error_message += "Maximum image width should not be less than 400. The maximum image width setting has not been saved.";
      // Set it as 400 and show it
      localStorage["esoption_thread_resize_post_images_size"] = 400;
      $("input#esoption_thread_resize_post_images_size").val(400);
    }
    else
    {
      // Save setting
      localStorage["esoption_thread_resize_post_images_size"] = $("input#esoption_thread_resize_post_images_size").val();
    }

    // Save data in localStorage
    localStorage["esoption_username"] =                       $("input#esoption_username").val();
    localStorage["esoption_thread_resize_post_images"] =      $("input#esoption_thread_resize_post_images").val();
    localStorage["esoption_thread_post_font"] =               $("input#esoption_thread_post_font").val();
    localStorage["esoption_thread_post_font_max_size"] =      $("select#esoption_thread_post_font_max_size").val();
    localStorage["esoption_thread_post_font_default_color"] = $("input#esoption_thread_post_font_default_color").val();
    localStorage["esoption_thread_post_no_right_align"] =     $("input#esoption_thread_post_no_right_align").val();
    localStorage["esoption_forum_fluid_style"] =              $("input#esoption_forum_fluid_style").val();
    localStorage["esoption_forum_categories"] =               $("input#esoption_forum_categories").val();
    localStorage["esoption_thread_signatures"] =              $("input#esoption_thread_signatures").val();

    // Disable save button
    $("button#save").attr("disabled", "disabled").html("Saved");

    // If there's errors, then show errors
    if(error_message != "")
    {
      alert(error_message);
    }

    // Hide save button
    $("button#save").fadeOut(2500);
  });

});