<?php
// current time
$tz = new DateTimeZone('Asia/Tokyo'); // php.iniで設定していないのでここで指定。
$now = new DateTime('now', $tz)->format('Y-m-d H:i:s');
?>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" href="data:,">
	<title>nginx (docker) | TOP</title>
</head>

<body>
	<p>ここはTOPページです。(lesson5, php)</p>

	<p>PHP</p>
	<ul>
		<li><a href="/info.php">/info.php</a></li>
		<li><a href="/hogehoge">静的ファイルが存在しないパス (/hogehoge)</a></li>
	</ul>
	<p>current time: <?= $now ?></p>
</body>

</html>