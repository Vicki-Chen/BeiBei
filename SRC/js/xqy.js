$(function(){
	var id = 0;
    function xqy(){
		function getCookie(cookieName){
			var str = decodeURIComponent(document.cookie);//str="b={"val":2}; c=3; a=1"
			var arr = str.split("; ");
			for( var i=0,len=arr.length; i<len; i++ ){
				var tmp = arr[i];	// 当i=0时，tmp="b={"val":2}"
				var ind = tmp.indexOf("=");
				var _name = tmp.substring(0, ind);
				var _value = tmp.substring(ind+1);
				if( cookieName==_name ){
					return JSON.parse(_value).val;
				}
			}
		}
		id = getCookie("id");
        $.ajax({
			type:"get",
			url:"../api/xqy.php",
			async:true,
			data:{
				"id": id
			},
			success:function(str){
				var data = JSON.parse(str);
				var arr = data[0].imgs.split(";");
				$(".tb-booth a").attr("href",arr[0]);
				$(".tb-booth a img").attr("src",arr[1]);
				$(".tb-booth a img").attr("rel",arr[0]);
				$("#thumblist li").eq(0).find("img").attr("src",arr[2]);
				$("#thumblist li").eq(0).find("img").attr("mid",arr[1]);
				$("#thumblist li").eq(0).find("img").attr("big",arr[0]);
				$("#thumblist li").eq(1).find("img").attr("src",arr[5]);
				$("#thumblist li").eq(1).find("img").attr("mid",arr[4]);
				$("#thumblist li").eq(1).find("img").attr("big",arr[3]);

                $("#xqy-weizhi").html($("#xqy-weizhi").html()+data[0].include);
				$("#main-1-1").html($("#main-1-1").html()+data[0].include);
				$("#main-1-2").html(data[0].xxjs);
				$("#main-1-3 #price").html(data[0].price);
				$("#main-1-3 #dazhe b").html(data[0].zhekou);
				$("#ckj s").html(data[0].ckj);
				var yanse = data[0].yanse.split(";");
				var img = data[0].img.split(";");
				var html='';
				for(var i =0;i<yanse.length;i++){
					html+= '<p><img src="'+img[i]+'" /><span>'+yanse[i]+'</span></p>';
				}
				$("#xuanze").html(html);
				$("#price2").html(data[0].price);
			}
		});
	}

	xqy();
	var src='';
	$("#xqy-main a").click(function(){
		return false;
	})
	$c = -1;
	$d = -1;
	$e = '';
	$("#xuanze").delegate("p","click",function(){
		$c = $(this).index();
		$(this).addClass("checked");
		$(this).siblings().removeClass("checked");
		if($c == $d){
			$d =-1;
			$(this).removeClass("checked");
		}
		else{
			$e = $(this).children("span").html();
			$d = $c;
		}
		src = $(this).find("img").attr("src");
	});
	function getCookie(cookieName) {
		var str = decodeURIComponent(document.cookie);
		var arr = str.split("; ");
		for(var i = 0; i < arr.length; i++) {
			var cookie = arr[i].split("=");
			if(cookieName == cookie[0]) {
				if(cookieName == 'phone') {
					$("#yhm").html(cookie[1]);
				}
				return cookie[1];
			}
		}
	}
	$("#goumai").click(function(e){
		$("#goumai img").attr("src",src);
		var w = e.clientX ;
		var h =  e.clientY-40;
		$phone = getCookie("phone");
		$password = getCookie("password");
		if($phone){
			if($c == -1 && $d==-1){}
			else if($c == $d){
				$(this).children("img").animate({"opacity":"1"},function(){
					$(this).animate({"top":"-40px"},function(){
						$(this).css("position","fixed");
						$(this).css("top",h);
						$(this).css("right",w);
						$(this).animate({"top":"50%","right":40},1000,function(){
							$(this).css({
								"opacity":"0",
								"position":"absolute",
								"top": "0px",
								"right": "55px"
							});
						});
					});
					$j = $("#box ul li").eq($c).children("div").children("a").children("img").attr("src");
					$.ajax({
						type:"get",
						url:"../api/jiagou.php",
						async:true,
						data:{
							'count':$(".nownum").val(),
							'xuanze':$e,
							'photo': $j,
							'id':id
						},
						success:function(str){
							
						}
					});
				})

			}
		}
		else{
			var g = confirm("请先登陆");
			if(g){
				location.href="denglu.html";
			}
		}
	});

	$a = $("#zynr").css("height");
	$b = parseFloat($a)+70;
	$("#main-2").css("height",$b+"px");
	$isOk = false;

	$(".cutnum").click(function(){
		if($(".nownum").val()>1){
			$(".nownum").get(0).value--;
		}
	});
	$(".addnum").click(function(){
		$(".nownum").get(0).value++;
	});
})