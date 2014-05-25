<?php

$text = strtolower(substr($_GET['text'], 0, 100));
$fileName = str_replace(' ', '_', $text);
$language = $_GET['name'];
$languageId = $_GET['id'];

if (strlen($fileName) == 0 || strlen($language) == 0) {
  exit;
}

$filePath = $language . '/' . $fileName . '.mp3';

if (!file_exists($filePath)) {
  if (!is_dir($language)) {
    mkdir($language, 0777, true);
  }

  $url = "http://translate.google.com/translate_tts?ie=UTF-8";
  $url .= "&tl=" . $languageId;
  $url .= "&q=" . urlencode($text);

  file_put_contents($filePath, fopen($url, 'r'));
}

echo $filePath;

?>
