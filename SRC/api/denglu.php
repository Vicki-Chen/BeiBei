<?php
	include 'connect.php';
	$phone=isset($_POST['phone'])?$_POST['phone']:"";
	$password=isset($_POST['password'])?$_POST['password']:"";
	$tuichu = isset($_POST['tuichu'])?$_POST['tuichu']:"";
	$sql="select * from zhuce where phone='$phone'";
	//执行查询语句
	$res=$conn->query($sql);
	//获取里面的结果集
	$row=$res->fetch_all(MYSQLI_ASSOC);
//	var_dump($row);
	if($row){
		$sql2="select * from zhuce where phone='$phone' and password='$password'";
		$res2=$conn->query($sql2);
		//获取里面的结果集
		$row2=$res2->fetch_all(MYSQLI_ASSOC);
		if($row2){
			if($tuichu){
				setcookie('phone', $phone, time() - 3600*60, '/');
				setcookie('password', $password, time() - 3600*60, '/');
				echo 4;
			}
			else{
				setcookie('phone', $phone, time() + 3600*60, '/');
				setcookie('password', $password, time() + 3600*60, '/');
				echo "1";	
			}
		}
		else{
			echo "2";	
		}
	}
	else{
		echo "0";
	}
//	}
	//关闭连接数据库
	$res->close();//关闭结果集
    $conn->close();//关闭数据库的链接
?>