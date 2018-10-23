<?php
	
	//更新数据接口
	
	//连接数据库
	
	include 'connect.php';
	$count = isset($_GET['count'])?$_GET['count']:'';
	$xuanze =isset($_GET['xuanze'])?$_GET['xuanze']:'';
	$photo =isset($_GET['photo'])?$_GET['photo']:'';
	$id = isset($_GET['id'])?$_GET['id']:'';
	$remove = isset($_GET['remove'])?$_GET['remove']:'';
	$cookiename = "id$id";
	if($remove){
		setcookie("$cookiename", $id, time() - 3600*60, '/');
		echo 1;
	}
	else{
		$sql="update xq set shuliang='$count' where id='$id'";
		$sql2="update xq set xuanze='$xuanze' where id='$id'";
		$sql3="update xq set photo='$photo' where id='$id'";
		//执行查询语句
		$res=$conn->query($sql);
		$res2=$conn->query($sql2);
		$res3=$conn->query($sql3);
		if($res && $res2 && $res3){
			setcookie("$cookiename", $id, time() + 3600*60, '/');
			echo 0;
		}
	}
	//关闭连接数据库
	
    $conn->close();//关闭数据库的链接
?>