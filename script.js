const fileInput = document.querySelector("input");
downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e => {
    e.preventDefault(); // preventing form from submitting
    downloadBtn.innerText = "Downloading file...";
    fetchFile(fileInput.value); // input value is taken from <input>
});

function fetchFile(url) {
    // fetching file and returning response as blob
    fetch(url).then(res => res.blob()).then(file => {
        // URL.createObjectURL creates a url of passed object
        let temporaryUrl = URL.createObjectURL(file);
        let anchorTag = document.createElement("a");
        anchorTag.href = temporaryUrl;  // passing temporaryUrl as href value of <a> tag
        // passing file lastname and extension as download value(name) of <a> tag
        anchorTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(anchorTag); // adding <a> tag inside body at the last, otherwise file won't be downloaded as HTML won't recognize the action
        anchorTag.click();    // clicking <a> tag (button, since its inside the form) so that the file is downloaded
        anchorTag.remove();   // removing <a> tag (button, since its inside the form) once file is downloaded
        URL.revokeObjectURL(temporaryUrl);
        downloadBtn.innerText = "Download File";
    }).catch(() => {
        // catch method will call if any error comes during downloading
        downloadBtn.innerText = "Download File";
        alert("Failed to download file!")
    });
}
