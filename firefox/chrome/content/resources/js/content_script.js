/*!
 * English Sabla Mozilla Firefox Extension
 * http://englishsabla.com/
 *
 * Copyright 2010, Assim Al-Marhuby
 * http://assim.me/
 */

// Script context (very important line to make this work)
// No need in Chrome extension
var doc = window.content.document;

// Reference the preferences system of Mozilla
var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
.getService(Components.interfaces.nsIPrefBranch);

// Import settings
var esoption_username =                  prefManager.getCharPref("extensions.englishsabla.username")
var esoption_thread_resize_post_images = prefManager.getCharPref("extensions.englishsabla.thread_resize_post_images")
var esoption_forum_categories =          prefManager.getCharPref("extensions.englishsabla.forum_categories")
var esoption_thread_signatures =         prefManager.getCharPref("extensions.englishsabla.thread_signatures")

// Add "Customise" link in navbar after 2nd link (1st index)
$("td.vbmenu_control:eq(1)", doc).after('<td class="vbmenu_control"><a href="chrome://englishsabla/content/resources/html/customise.html" target="_blank">Customise</a></td>');

// Insert username on login form
// Check if the field is not empty
if(esoption_username != "")
{

	$("input#navbar_username", doc)
	.attr("value", esoption_username);

}

// Option: esoption_thread_resize_post_images
if(esoption_thread_resize_post_images == "checked")
{

	// Select all images in posts
	$("div[id^='post_message_']", doc)
	.find("img")

	// Loop through every image
	.each(function() {

		// Specify maximum image width
		var max_image_width = 468;

		// Selected image width and height
		var width = $(this, doc).width();
		var height = $(this, doc).height();

		// Check if image width bigger than max image width
		if ($(this, doc).width() > max_image_width)
		{

			// Calculate new image dimensions
			var ratio = max_image_width / $(this).width();
			width = max_image_width;
			height = $(this, doc).height() * ratio; 
            
			// Resize image
			$(this, doc).width(width).height(height);

			// Get image URL
			var img_url = $(this, doc).attr("src");

			// Show "Full link" under resized image
			var link = '<br /><font size="1"><img src="chrome://englishsabla/content/resources/images/icons/zoom.png"> <a href="' + img_url + '" target="_blank">Show full-sized image</a></font>';
			$(this, doc).after(link);

		}

	});

}

// Option: esoption_forum_categories
if(esoption_forum_categories == "checked")
{

	// Select the img with an id that starts with "collapseimg_forumbit_"
	$("img[id^='collapseimg_forumbit_']", doc)

	// Go to the 4th parent
	.parent()
	.parent()
	.parent()
	.parent()

	// Then hide it
	.hide();

}

// Option: esoption_thread_signatures
if(esoption_thread_signatures == "checked")
{

	// Select the div after the div that has an ID that starts with "post_message_"
	$("div[id^='post_message_'] + div", doc)

	// Then hide it
	.hide();

}