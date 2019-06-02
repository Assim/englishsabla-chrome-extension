/*!
 * English Sabla Google Chrome Extension
 * http://englishsabla.com/
 *
 * Copyright 2010, Assim Al-Marhuby
 * http://assim.me/
 */

			// Select the img with an id that starts with "collapseimg_forumbit_"
			$("img[id^='collapseimg_forumbit_']")

			// Go to the 4th parent
			.parent()
			.parent()
			.parent()
			.parent()

			// Then hide it
			.hide();