let lecteur = {
	name: 'Lecteur Stape',
	endpoint: '?host=LECTEUR%20Stape',
}

const changeLecteur = (tab) => {
	chrome.tabs.query(
		{active: true}
	).then(tabs => {
		tab = tabs[0]
		chrome.storage.sync.get("lecteur", (data) => {
			//Si il y a 6 slashs on rentre dans le dossier d'un épisode => on met le bon lecteur
			if (tab.url.includes("https://v3.voiranime.com") && tab.url.split("/").length - 1 === 6 && !tab.url.includes(data.lecteur.endpoint)) chrome.tabs.update(
				tab.id, 
				{ url: `${tab.url.split("?host=")[0]}${data.lecteur.endpoint}` }, 
				() => {
					console.log("Redirection effectuée !")
				}
			)
		})
	})
}

chrome.runtime.onInstalled.addListener(() => {
  	chrome.storage.sync.set({ lecteur: lecteur }, () => {
		console.log('Lecteur sélectionné par défaut: ' + lecteur.name);
	});
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  	changeLecteur()
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	changeLecteur()
})

chrome.storage.onChanged.addListener(() => {
	changeLecteur()
})
