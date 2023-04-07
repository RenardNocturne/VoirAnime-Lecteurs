const select = document.getElementById("selectLecteurs")

chrome.storage.sync.get("lecteur", (data) => {
    for (i in select.options) {
        console.log(select.options[i], data.lecteur.name );
        if (select.options[i].label === data.lecteur.name) select.options[i].selected = 'selected'
    }
})

select.addEventListener("change", () => {
    chrome.storage.sync.set({ lecteur: select.value }, () => {
        let lecteur = {
            name: select.options[select.selectedIndex].label,
            endpoint: select.value
        }
        
		chrome.storage.sync.set({ lecteur: lecteur }, () => {
            console.log('Lecteur sélectionné: ' + lecteur.name);
        })
	});
})