<?php
$fileName = $_GET['fileName'];
$file = 'audio/' . $fileName;

if (file_exists($file)) {
  header('Content-Description: File Transfer');
  header('Content-Type: application/octet-stream');
  header('Content-Disposition: attachment; filename=' . basename($file));
  header('Content-Transfer-Encoding: binary');
  header('Expires: 0');
  header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
  header('Pragma: public');
  header('Content-Length: ' . filesize($file));
  ob_clean();
  flush();
  readfile($file);
} else {
  header('HTTP/1.0 404 Not Found');
  echo 'File ' . $fileName . ' does not exist!';
}
?>
