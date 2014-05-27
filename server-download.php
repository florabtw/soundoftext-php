<?php

$text = strtolower(substr($_GET['text'], 0, 100));

/* Bad form to save spaces in file names */
$fileName = str_replace(' ', '_', $text);

$language = $_GET['name'];
$languageId = $_GET['id'];

if (strlen($fileName) == 0 || strlen($language) == 0) {
  exit;
}

$rootPath = '/mnt/my-data/audio/';
$relativePath = $language . '/' . $fileName . '.mp3';

if (!file_exists($rootPath . $relativePath)) {
  if (!is_dir($rootPath . $language)) {
    mkdir($rootPath . $language, 0777, true);
  }

  $url = "http://translate.google.com/translate_tts?ie=UTF-8";
  $url .= "&tl=" . $languageId;
  $url .= "&q=" . urlencode($text);

  file_put_contents($rootPath . $relativePath, fopen($url, 'r'));
}

echo $relativePath;

?>
