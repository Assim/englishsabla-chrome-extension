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

		// Introduction for installing it for the first time
		if(!localStorage["es_intro"]) {
			alert("Thank you for installing English Sabla for Google Chrome. Click on the English Sabla icon next to the address bar and you will be able to view the latest forum activity and customise your browsing experience.");
			// So that this message isn't displayed again
			localStorage["es_intro"] = true;
		}

		// Insert username on login form
		// Check if the field is not empty
		if(response.esoption_username != "")
		{
			$("input#navbar_username").attr("value", response.esoption_username);
		}

		// Option: esoption_thread_resize_post_images
		if(response.esoption_thread_resize_post_images == "checked")
		{
			// Specify maximum image width, define default if not specified
			if(!response.esoption_thread_resize_post_images_size)
			{
				var max_image_width = 400;
			}
			else
			{
				var max_image_width = response.esoption_thread_resize_post_images_size;
			}

			// Select all images in posts, and loop through them
			$("div[id^='post_message_']").find("img").each(function() {

				// Current image width and height
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

		// Option: esoption_thread_post_font
		if(response.esoption_thread_post_font == "checked")
		{
			var max_font_size = response.esoption_thread_post_font_max_size;
			var default_color = response.esoption_thread_post_font_default_color;

			// Default values
			if(max_font_size == undefined)
			{
				max_font_size = 0;
			}

			// Max font size
			if(max_font_size != 0)
			{
				var i = 7; // Max font size possible
				var selector = ""; // Empty string for selector

				// Build selector for all font sizes that exceeded the maximum font size
				for(i=7;i>max_font_size;i--) {
					selector = selector + 'font[size="'+i+'"],';
				}

				// Remove last char of string which is a ","
				selector = selector.substring(0, selector.length-1);

				// Select all font tags that exceeded the maximum post font
				// Then change to the maximum font size
				$("div[id^='post_message_']").find(selector).each(function() {
					$(this).attr("size", max_font_size);
				});
			}

			// Default font color
			if(default_color == "checked")
			{
				// Remove all color attributes
				$("div[id^='post_message_']").find("font").each(function() {
					$(this).removeAttr("color");
				});	
			}
		}

		// Option: esoption_thread_post_no_right_align
		if(response.esoption_thread_post_no_right_align == "checked")
		{
			// Select every DIV which is right-aligned
			$("div[id^='post_message_']").find('div[align="right"]').each(function() {
				// Make it left-aligned
				$(this).attr("align", "left");
			});
		}

		// Option: esoption_forum_fluid_style
		if(response.esoption_forum_fluid_style == "checked")
		{
			$('table[width="76%"]').attr("width", "100%");
		}

		// Option: esoption_forum_categories
		if(response.esoption_forum_categories == "checked")
		{
			// Select the img with an id that starts with "collapseimg_forumbit_", go to 4th parent, and hide it
			$("img[id^='collapseimg_forumbit_']").parent().parent().parent().parent().hide();
		}

		// Option: esoption_thread_signatures
		if(response.esoption_thread_signatures == "checked")
		{
			// Select the div after the div that has an ID that starts with "post_message_", and hide it
			$("div[id^='post_message_'] + div").hide();
		}

		// Modification: Username Mentions
		if($(location).attr('href') == "http://www.englishsabla.com/forum/misc.php?do=mentions")
		{
			// Page modifications, remove and replace original page contents
			$("table.tborder:eq(1)").hide();
			$("table.tborder:eq(2)").hide();
			$("div.vbmenu_popup[id='pagenav_menu']").after("<div id='mentions'></div>");
			$("span.navbar:eq(1)").remove();
			$("a[href='/forum/misc.php?do=mentions'] + strong").text("Mentions");
			$("title").text("English Sabla - Mentions");
			
			// Check if user logged in (if no password label)
			if($("label[for='navbar_password']").length == 0)
			{
				var logged_in_user = $("a[href^='member.php?u=']:eq(0)").text();
				var posts = new Array(); // Array to hold post IDs

				function showPosts()
				{
					var max = posts.length; // Max number of items
					var post_content = ""; // Hold post content
					var username = ""; // Holds username of posts

					// Create post container divs
					$.each(posts, function(key, value) {
						// Add container divs for each post with post ID as div ID
						// It's important or posts will be out of order since some might load before others
						$("div#mentions").append("<div id='"+value+"'></div>");
					});

					// Loading image
					$("div#mentions").append("<div id='loading' align='center'><img width='50' height='50' valign='middle' src='http://www.moggperformancehawaii.com/cms/Images/loading.gif'> <b>Loading...</b></div>");

					// Get posts
					$.each(posts, function(key, value) {
						$.get("http://www.englishsabla.com/forum/showpost.php?p="+value, function(post_data) {
							username = $(post_data).find("a.smallusername").text();

							// Check if post author not logged in user
							if(username != logged_in_user)
							{
								// Add post to it's div container
								post_content = $(post_data).find("table[id^='post']").parent().html() + "<br>";
								$("div#"+value).html(post_content);
							}
						});
					});
				}

				function getSearchData(search_id) {
					// Open search page with 200 items per page
					var search_url = "http://www.englishsabla.com/forum/search.php?searchid="+search_id+"&pp=200";
					$.get(search_url, function(search_data) {

						var i = 0; // Array index
						var post_id = ""; // post ID

						// For each post, add it's ID in the posts array
						$(search_data).find("table[id^='post']").each(function() {
							post_id = $(this).attr("id");
							posts[i] = post_id.replace("post", "");
							i++;
						});

						// Invoke showPosts() for showing posts on the page
						showPosts();
					});
				}

				// Search posts with username as search query
				$.get("http://www.englishsabla.com/forum/search.php?do=process&showposts=1&query="+logged_in_user, function(data) {
					// Get search ID
					var search_id = $(data).find("input[name='url']").val();
					search_id = search_id.replace("/forum/search.php?searchid=", "");

					// Invoke getSearchData() with search_id as the parameter. 
					getSearchData(search_id);
				});
			}
			else
			{
				// Inform user to login first
				$("div#mentions").html("<center><b>You need to be logged in to view this page.</b></center>");
			}
		}
	});
});