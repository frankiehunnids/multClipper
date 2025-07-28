document.addEventListener("copy", () => {

    let copiedText = document.getSelection()?.toString() || "";

    if(copiedText.trim() !== ""){
        chrome.runtime.sendMessage({copiedText});
    }

});