const presence = new Presence({ clientId: "1337589059156967425" });

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/LXE2BOi.png",
	};

	if (document.querySelector('[aria-label="Pause"]')) {
		const data = {
			channel: document.querySelector("div.styles-module__text___xT9yv")
				?.textContent,
			track:
				document.querySelector("div.styles-module__title___D3wQt")
					?.textContent ?? "Loading",
		};
		if (
			document.querySelector("div.ScrubberSidebar-module__live___olTao")
				.textContent
		) {
			const imageElement = document.querySelector<HTMLImageElement>(
				"span.image-module__image___v0MU3 image-module__image--align-center___Sfx0W image-module__image--aspect-auto___q0e7P image-module__image--display-inline___DS1oW image-module__image--fit-none___JNDXW image-module__image--justify-center___LwZt4 image-module__image--radius-small___3tcEX image-module__image--shape-rectangle___61oi- image-module__image--size-full___29q-k" +
					"> span.image-module__image-container___tpidl " +
					"> span.image-module__image-outer___Kl-YN " +
					"> span.image-module__image-inner___rZWHj " +
					"> img.image-module__image-image___WKoaX"
			);
			presenceData.largeImageKey = imageElement.src;
			presenceData.smallImageKey = Assets.Play;
			presenceData.details = data.track;
			presenceData.state = data.channel;
		} else {
			const footerImageElement = document.querySelector<HTMLImageElement>(
				".BaseLayout-module__footer___TLKLc"
			);
			presenceData.largeImageKey = footerImageElement?.src;
			presenceData.smallImageKey = Assets.Play;
			presenceData.details = data.track;
			presenceData.state = data.channel;
		}
	} else if (document.querySelector('[aria-label="Play"]')) {
		switch (document.location.pathname) {
			case "/player/home":
				presenceData.details = "Viewing SiriusXM Home";
				break;
			case "/player/curated-grouping":
				presenceData.details = "Viewing:";
				presenceData.state = document.querySelector(
					"div.CuratedGroupingHeader-module__CuratedGroupingHeaderHeadline___hezgw"
				)?.textContent;
				break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
