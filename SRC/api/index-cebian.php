<?php
	include 'connect.php';
	$name=$_GET['name'];
	$sql="select * from cebian where fenlei = '$name'";
	//执行查询语句
	$res=$conn->query($sql);
//	var_dump($res)
	//获取里面的结果集
	$row=$res->fetch_all(MYSQLI_ASSOC);
	//转成字符串
	//把字符串形式的json数据传给前端  echo
	echo json_encode($row,JSON_UNESCAPED_UNICODE);
	//关闭连接数据库
	$res->close();//关闭结果集
    $conn->close();//关闭数据库的链接
?>