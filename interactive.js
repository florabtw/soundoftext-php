function keyPress(event) {
    if (event.keyCode == 13) {
        document.getElementById('submit').click();
    }
}

function submit() {
    var phrase = document.getElementById('input').value;
    var fileUrl = download(phrase);
    alert(fileUrl);
    display(phrase, fileUrl);
}

function download(phrase) {
    var url = "https://ncpzvf.babbage.cs.missouri.edu/spoken/save.php?input=";
    url += phrase;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);

    return xmlHttp.responseText;
}
