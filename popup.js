const clipsDiv = document.getElementById("clips-div");
const clearListBtn = document.getElementById("clear-list-btn");

var history = undefined;
//if there are no clips, give this message

//adds the new clips to the gui
chrome.storage.local.get("clipboardHistory", (result) => {

    if (result.clipboardHistory === undefined){
        const handlerDiv = document.createElement('div');
        const handlerText = document.createElement('p');
        clipsDiv.appendChild(handlerDiv);
        handlerDiv.appendChild(handlerText);

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
            backgroundColor: "	#2C2C2C",
            border: "0px solid black",
            borderRadius: "10px",
            marginBottom: "10px",
            alignItems: "center",
            flexWrap: "wrap",
            gap:"10px"
            
        });
        

        const newClip = document.createElement('p');
        const newCopyBtn = document.createElement('button');
        const newTime = document.createElement('p');
        




        //stuff for the clip element
        newClip.id = `clip-${index}`;
        newSingleClipDiv.appendChild(newClip);
        newClip.textContent = item["text"];

        Object.assign(newClip.style, {
            fontSize: "14px",
            color: "whitesmoke",
            border: "0px solid black",
            height:"35px",
            width: "185px",
            marginBottom:"0px",
            marginLeft: "7px",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            overflow: "hidden"

        })

        //stuff for the copy button
        newCopyBtn.id = `cpyBtn-${index}`;
        newSingleClipDiv.appendChild(newCopyBtn);
        
        const svgNS = "http://www.w3.org/2000/svg";
        const svgIcon = document.createElementNS(svgNS, "svg");
        svgIcon.setAttribute("fill", "#B0B0B0");
        svgIcon.setAttribute("height", "20px");
        svgIcon.setAttribute("width", "20px");
        svgIcon.setAttribute("version", "1.1");
        svgIcon.setAttribute("viewBox", "0 0 460 460");
        svgIcon.setAttribute("stroke", "#B0B0B0");
        svgIcon.setAttribute("stroke-width", "0.0046");
        svgIcon.setAttribute("transform", "rotate(180)");

        // <g id="SVGRepo_iconCarrier"> and inner content
        const g = document.createElementNS(svgNS, "g");

        const path1 = document.createElementNS(svgNS, "path");
        path1.setAttribute("d", "M425.934,0H171.662c-18.122,0-32.864,14.743-32.864,32.864v77.134h30V32.864c0-1.579,1.285-2.864,2.864-2.864h254.272 c1.579,0,2.864,1.285,2.864,2.864v254.272c0,1.58-1.285,2.865-2.864,2.865h-74.729v30h74.729 c18.121,0,32.864-14.743,32.864-32.865V32.864C458.797,14.743,444.055,0,425.934,0z");

        const path2 = document.createElementNS(svgNS, "path");
        path2.setAttribute("d", "M288.339,139.998H34.068c-18.122,0-32.865,14.743-32.865,32.865v254.272C1.204,445.257,15.946,460,34.068,460h254.272 c18.122,0,32.865-14.743,32.865-32.864V172.863C321.206,154.741,306.461,139.998,288.339,139.998z M288.341,430H34.068 c-1.58,0-2.865-1.285-2.865-2.864V172.863c0-1.58,1.285-2.865,2.865-2.865h254.272c1.58,0,2.865,1.285,2.865,2.865v254.273h0.001 C291.206,428.715,289.92,430,288.341,430z");

        g.appendChild(path1);
        g.appendChild(path2);
        svgIcon.appendChild(g);

        newCopyBtn.appendChild(svgIcon);


        Object.assign(newCopyBtn.style, {
            borderRadius:"100px",
            height:"40px",
            width:"40px",
            backgroundColor: "transparent",
            borderWidth: "0px"
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
        Object.assign(newTime.style, {
            color: "#A0A0A0",
            marginLeft: "7px",
            marginTop:"0px",
            width:"50px"
        })


        
    });
    
});

//clear the entire list of clips
clearListBtn.onclick = function(){  
    chrome.storage.local.remove("clipboardHistory");
    while(clipsDiv.firstChild){
        clipsDiv.removeChild(clipsDiv.firstChild);
    }
}



