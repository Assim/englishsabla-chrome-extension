/*!
 * English Sabla Google Chrome Extension
 * http://englishsabla.com/
 *
 * Copyright 2010, Assim Al-Marhuby
 * http://assim.me/
 */

var extension_id = "";

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