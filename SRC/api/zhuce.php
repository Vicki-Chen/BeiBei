<?php
	
	//连接数据库
	
	include 'connect.php';
		$phone = $_POST['phone'];
		$password = $_POST['password'];
//	$phone = 13420133412;
//	$password = 111111;
	//写插入语句
	$sql="insert into zhuce(phone,password) values('$phone','$password')";
	
	//执行查询语句
	$res=$conn->query($sql);
	if($res){
		echo 0;
	}
	else{
		echo 1;
	}
	
	//关闭连接数据库
	
    $conn->close();//关闭数据库的链接
?>