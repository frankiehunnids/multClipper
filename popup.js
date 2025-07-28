const handlerText = document.getElementById("handler-text");
const clipsDiv = document.getElementById("clips-div");
const clearListBtn = document.getElementById("clear-list-btn");

var history = undefined;
//if there are no clips, give this message

//adds the new clips to the gui
chrome.storage.local.get("clipboardHistory", (result) => {

    if (result.clipboardHistory === undefined){
        handlerText.textContent = "You have not clipped any Text yet";
        Object.assign(handlerText.style, {
            fontSize: "20px",
            color: "whitesmoke",
            
        });
    }
    history = result.clipboardHistory || [];
    history.forEach((item, index) => {
        const newSingleClipDiv = document.createElement('div');
        newSingleClipDiv.id = `singleclip-${index}`;
        clipsDiv.prepend(newSingleClipDiv);

        //stuff for the singe clip div
        Object.assign(newSingleClipDiv.style, {
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#414c54",
            border: "0px solid black",
            borderRadius: "10px",
            alignItems: "center",
            
        });
        

        const newClip = document.createElement('p');
        const newTime = document.createElement('p');
        const newCopyBtn = document.createElement('button');




        //stuff for the clip element
        newClip.id = `clip-${index}`;
        newSingleClipDiv.appendChild(newClip);
        newClip.textContent = item["text"];

        Object.assign(newClip.style, {
            fontSize: "14px",
            color: "whitesmoke",
            border: "0px solid black",
            borderRadius: "10px",
            width: "185px",
            marginLeft: "7px"

        })
    

        //stuff for the time element
        newTime.id = `time-${index}`;
        newSingleClipDiv.appendChild(newTime);
        const time1 = item["time"];
        const date = new Date(time1);
        const time2 = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // set to true for AM/PM
        });
        newTime.textContent = time2;
        newTime.style.color = "whitesmoke";




        //stuff for the copy button
        newCopyBtn.id = `cpyBtn-${index}`;
        newSingleClipDiv.appendChild(newCopyBtn);
        newCopyBtn.textContent = "⧉";
        newCopyBtn.style.borderRadius = "100px";
        newCopyBtn.style.height = "20px";

    });
    
});

//clear the entire list of clips
clearListBtn.onclick = function(){  
    chrome.storage.local.remove("clipboardHistory");
    while(clipsDiv.firstChild){
        clipsDiv.removeChild(clipsDiv.firstChild);
    }
}



