/*!
 * English Sabla Google Chrome Extension
 * http://englishsabla.com/
 *
 * Copyright 2010, Assim Al-Marhuby
 * http://assim.me/
 */

$(document).ready(function() {

	// Get preferences by requesting the background page
	chrome.extension.sendRequest({name: "getPreferences"},
	function(response)
	{

		// Extension ID
		var extension_id = "dlpepaemobdagdgnojbahkjpkdkkamjf";

		// Add "Customise" link in navbar after 2nd link (1st index)
		$("td.vbmenu_control:eq(1)").after('<td class="vbmenu_control"><a href="chrome-extension://' + extension_id + '/html/customise.html" target="_blank">Customise</a></td>');

		// Insert username on login form
		// Check if the field is not empty
		if(response.esoption_username != "")
		{

			$("input#navbar_username")
			.attr("value", response.esoption_username);

		}

		// Option: esoption_thread_resize_post_images
		if(response.esoption_thread_resize_post_images == "checked")
		{

			// Select all images in posts
			$("div[id^='post_message_']")
			.find("img")

			// Loop through every image
			.each(function() {

				// Specify maximum image width
				var max_image_width = 468;

				// Selected image width and height
				var width = $(this).width();
				var height = $(this).height();

				// Check if image width bigger than max image width
				if ($(this).width() > max_image_width)
				{

					// Calculate new image dimensions
					var ratio = max_image_width / $(this).width();
					width = max_image_width;
					height = $(this).height() * ratio; 
            
					// Resize image
					$(this).width(width).height(height);

					// Get image URL
					var img_url = $(this).attr("src");

					// Show "Full link" under resized image
					var link = '<br /><font size="1"><img src="chrome-extension://' + extension_id + '/images/icons/zoom.png"> <a href="' + img_url + '" target="_blank">Show full-sized image</a></font>';
					$(this).after(link);

				}

			});

		}

		// Option: esoption_forum_categories
		if(response.esoption_forum_categories == "checked")
		{

			// Select the img with an id that starts with "collapseimg_forumbit_"
			$("img[id^='collapseimg_forumbit_']")

			// Go to the 4th parent
			.parent()
			.parent()
			.parent()
			.parent()

			// Then hide it
			.hide();

		}

		// Option: esoption_thread_signatures
		if(response.esoption_thread_signatures == "checked")
		{

			// Select the div after the div that has an ID that starts with "post_message_"
			$("div[id^='post_message_'] + div")

			// Then hide it
			.hide();

		}

	});

});