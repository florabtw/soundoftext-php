var constants = {
    SERVER_DOWNLOAD_URL:
        "https://ncpzvf.babbage.cs.missouri.edu/spoken/server-download.php?text=",
    USER_DOWNLOAD_URL:
        "https://ncpzvf.babbage.cs.missouri.edu/spoken/user-download.php?fileName="
};

function keyPress(event) {
    if (event.keyCode == 13) {
        document.getElementById('submit').click();
    }
}

function play(audioId) {
    document.getElementById(audioId).play();
}

function submit() {
    var phrase = document.getElementById('input').value;
    var filePath = download(phrase);

    var listHeader = document.getElementById('list-header');
    if (listHeader.style.display === "") {
        listHeader.style.display = "block";
    }

    display(phrase, filePath);
}

function download(phrase) {
    var url = constants.SERVER_DOWNLOAD_URL + phrase;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);

    return xmlHttp.responseText;
}

function display(phrase, filePath) {
    var table = document.getElementById('links-table');
    var row = table.insertRow(table.rows.length);

    var audio = genAudio(filePath);
    row.appendChild(audio);

    var btnPlay = genPlayButton(filePath);
    var btnPlayCell = row.insertCell(0);
    btnPlayCell.appendChild(btnPlay);

    var btnDownload = genDownloadButton(filePath);
    var btnDownloadCell = row.insertCell(1);
    btnDownloadCell.appendChild(btnDownload);

    var text = document.createTextNode(phrase);
    var textCell = row.insertCell(2);
    textCell.appendChild(text);
}

function genAudio(filePath) {
    var source = document.createElement('source');
    source.src = filePath;
    source.type = 'audio/mp3';

    var audio = document.createElement('audio');
    audio.id = filePath;
    audio.appendChild(source);

    return audio;
}

function genPlayButton(filePath) {
    var btnPlay = document.createElement('div');
    btnPlay.className += "btn";
    btnPlay.onclick = function() { play(filePath) }
    btnPlay.appendChild(document.createTextNode("Play"));
    return btnPlay;
}

function genDownloadButton(filePath) {
    var btnDownload = document.createElement('a');
    btnDownload.className += "btn btn-save";

    var fileName = filePath.split('/').pop();
    btnDownload.href = constants.USER_DOWNLOAD_URL + fileName;

    btnDownload.appendChild(document.createTextNode("Save"));
    return btnDownload;
}
