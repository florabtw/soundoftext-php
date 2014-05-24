<?php

$base = substr($_GET['input'], 0, 100);
$queryString = urlencode($base);
$fileName = str_replace(' ', '_', $base);

$url = "http://translate.google.com/translate_tts?ie=UTF-8&tl=en&q=";
$url .= $queryString;

$path = 'audio/' . $fileName . '.mp3';
file_put_contents($path, fopen($url, 'r'));

echo $path;

?>
