function keyPress(event) {
    if (event.keyCode == 13) {
        document.getElementById('submit').click();
    }
}

function save() {
    phrase = document.getElementById('input').value;
    alert(phrase);
}
