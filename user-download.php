<?php
$file = '/mnt/my-data/audio/' . $_GET['file'];

/* Attempt at stopping tomfoolery */
if (strpos($file, '/../') !== false) exit;

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
  echo 'File ' . basename($file) . ' does not exist!';
}
?>
