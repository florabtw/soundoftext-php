<?php

$phrase = substr($_GET['input'], 0, 100);

$url = "http://translate.google.com/translate_tts?ie=UTF-8&tl=en&q=";
$url .= urlencode($phrase);

$path = 'audio/' . $phrase . '.mp3';
file_put_contents($path, fopen($url, 'r'));

echo $path;

?>
