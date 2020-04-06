let theStateOfTheInterface = (event) => {

	let $panel = document.querySelector('.panel')
	// How much has scrolled?
	let winH = document.documentElement.clientHeight
	let docH = document.documentElement.scrollHeight
	let maxY = docH - winH
	let winY = window.scrollY
	// Remove all images from the panel
	while ($panel.firstChild) {
		$panel.removeChild($panel.lastChild);
	}
	// For each section...
	document.querySelectorAll('section').forEach(($sec) => {
		// How far is the top of this element from the top of the document?
		let topPx = $sec.offsetTop
		// Clone the image that's in the section (will be added to the panel)
		let $planet = $sec.querySelector('.planet-img').cloneNode(true)
		// If seen, add a "seen" class to the new cloned image
		if (winY >= topPx) {
			$planet.classList.add('seen')
		}

		// Add the cloned planet to panel
		$panel.appendChild($planet)
	})
}

	let loadContentFromHtmlFile = (url) => {

		// Put up the loading screen
		document.querySelector('.loading').classList.add('show')

		fetch(url)
			.then((response) => {
				return response.text() // Convert it something readable
			})
			.then((html) => {

				let parser = new DOMParser()
				let newDocument = parser.parseFromString(html, 'text/html')

				// The loadthis.html page has been loaded!
				// Append the content from the new page into the old page
				// document.querySelector('#content').innerHTML += newDocument.querySelector('#content').innerHTML

				// REAPLACE the content, rather than append
				document.querySelector('#content').innerHTML = newDocument.querySelector('#content').innerHTML

				// Change the page url by adding "history" to the browser's back/forward buttons
				window.history.pushState({ /*data can be passed here*/ }, '', `${url}`)

				let $script = document.querySelector('#content').querySelector('script')
				try {
					// This has security issues! It's just a demo to simplify the idea
					eval($script.textContent)
				} catch (err) {
					// Shows the console an error, but won't kill the page
					console.error(`💀 There doesn't appear to be any JavaScript code to run (aaaawkward 😬)`)
				}

				// Take down the loading screen, we're done
				document.querySelector('.loading').classList.remove('show')
			})

		if (winY >= maxY) {
			// You have definitely hit the bottom

			// Add new content when we hit the bottom
			document.querySelector('#content').innerHTML += `
			<section class="full-viewport">
			  <h2>Read Related Articles</h2>
			</section>
			`
		}
	}

	window.addEventListener('load', theStateOfTheInterface)
	window.addEventListener('scroll', theStateOfTheInterface)
	window.addEventListener('resize', theStateOfTheInterface)