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
    var table = document.getElementById('results-table');
    var row = table.insertRow(0);
    row.className += 'results-row';

    displayAudio(row, filePath);
    displayText(row, phrase);
    displayPlayButton(row, filePath);
    displaySaveButton(row, filePath);
}

function displayAudio(row, filePath) {
    var audio = genAudio(filePath);
    row.appendChild(audio);
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

function displayPlayButton(row, filePath) {
    var btnPlay = genPlayButton(filePath);
    var btnPlayCell = row.insertCell(1);
    btnPlayCell.appendChild(btnPlay);
    btnPlayCell.className += 'btn-cell';
}

function genPlayButton(filePath) {
    var btnPlay = document.createElement('div');
    btnPlay.className += "btn";
    btnPlay.onclick = function() { play(filePath) }
    btnPlay.appendChild(document.createTextNode("Play"));
    return btnPlay;
}

function displaySaveButton(row, filePath) {
    var btnSave = genDownloadButton(filePath);
    var btnSaveCell = row.insertCell(2);
    btnSaveCell.appendChild(btnSave);
    btnSaveCell.className += 'btn-cell';
}

function genDownloadButton(filePath) {
    var btnSave = document.createElement('a');
    btnSave.className += "btn btn-save";

    var fileName = filePath.split('/').pop();
    btnSave.href = constants.USER_DOWNLOAD_URL + fileName;

    btnSave.appendChild(document.createTextNode("Save"));
    return btnSave;
}

function displayText(row, phrase) {
    var text = document.createTextNode(phrase);
    var textCell = row.insertCell(0);
    textCell.appendChild(text);
    textCell.className += 'text-cell';
}
