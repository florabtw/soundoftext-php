<?php

$base = substr($_GET['text'], 0, 100);
$fileName = str_replace(' ', '_', $base);
$filePath = 'audio/' . $fileName . '.mp3';

if (!file_exists($filePath)) {
  $url = "http://translate.google.com/translate_tts?ie=UTF-8&tl=en&q=";
  $queryString = urlencode($base);
  $url .= $queryString;

  file_put_contents($filePath, fopen($url, 'r'));
}

echo $filePath;

?>
