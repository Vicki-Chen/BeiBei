$(function(){
	$("#top-nav a").hover(function(){
		$(this).css("text-decoration","underline");
	},function(){
		$(this).css("text-decoration","none");
	});
	
	$("#top-nav ul li").hover(function(){
		$(this).children("ul").parent().css("background-color","#fff");
		$(this).children("ul").show().css("background-color","#fff");
		
	},function(){
		$(this).children("ul").parent().css("background-color","#f4f4f4");
		$(this).children("ul").hide();
	});

	$("#logo-gwc > a").hover(function(){
		$(this).next("div").show();
	},function(){
		$(this).next("div").hide();
	});
	$("#gwc-xs").hover(function(){
		$(this).show();		
	},function(){
		$(this).hide();
	});

	$("#main-nav ul li a").hover(function(){
		$(this).css("background-color","#f34660"); 
		
	},function(){
		$(this).css("background-color","#ff647c"); 
	});

	$("#min-nav ul li").hover(function(){
		$(this).css("border-bottom","3px solid #ff506b");
	},function(){
		$(this).css("border-bottom","0");
	});

	$("#main-nav .icon-sousuo").hover(function(){
		$(this).css("color","#ff647c");
	},function(){
		$(this).css("color","#888888");
	});
	$("#cbl ul li").eq(0).hover(function(){
		$("#gwc-xs2").show();
		$("#gwc-total2").show();
	},function(){
		$("#gwc-xs2").hide();
	})


	$("#cbl ul li").hover(function(){
		$(this).parent().css("opacity",1);
		$(this).children().children("i").css({
			"background":"#fc7782",
			"color": "#fff"
		});
	},function(){
		$(this).parent().css("opacity",0.5);
		$(this).children().children("i").css({
			"background":"#fff",
			"color": "#fc7782"
		});
	})

	$("#cbl ul li").eq(1).hover(function(){
		$(this).children("div").show();
	},function(){
		$(this).children("div").hide();
	})
	var timer = null;
	// var hddb = document.getElementsByClassName("icon-huidaodingbu")[0];
	$(".icon-huidaodingbu").click(function(){
		clearInterval(timer);	
		timer= setInterval(function(event){
			$top = document.body.scrollTop || document.documentElement.scrollTop;
			if($top>0){
				window.scrollTo(0,$top-20);
			}
			else{
				clearInterval(timer);
			}
		},20)
		event.stopPropagation();		
	})
	document.onclick = function(){
		clearInterval(timer);	
	}

	$("#nav-fenlei").hover(function(){
		$("#nav-tab").show();
	},function(){
		$("#nav-tab").hide();
	});
	
	$("#nav-tab").children("ul").children("li").mouseover(function(){
		$fenlei = $(this).children("u").html();
		$_t = $(this);
		$.ajax({
			type:"get",
			url:"api/index-fenlei.php",
			async:true,
			data:{
				"fenlei":$fenlei
			},
			success:function(str){
				var data = JSON.parse(str);
				var html ='';
				for(var i=0;i<data.length;i++){
					html += '<li><a href="html/yzzj.html"><img src="'+data[i].img+'"/><p>'+data[i].name+'</p></a></li>';
				}
				$("#nav-tab #zhangshi").children("ul").html(html);
			}
		});
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
	function updata(){
		var c = 0;  
		$phone = getCookie("phone");
		$password = getCookie("password");
		if($phone){
			$("#dlxs").show();
			$("#nodenglu").hide();
			var price = 0.00;
			var count = 0;
			for(var i =1;i<7;i++){
				if(getCookie("id"+i)){
					c = 1;
					$.ajax({
						type:"get",
						url:"api/xqy.php",
						async:true,
						data:{
							"id": getCookie("id"+i)
						},
						success:function(str){
							var data = JSON.parse(str);
							$li = $('<li><div><img src="html/'+data[0].photo+'" alt=""></div><div><p>'+data[0].include+'</p><p>'+data[0].xuanze+'</span></div><div><p>￥'+data[0].price+'</p><p>x'+data[0].shuliang+'</p></div></li>');
							price += (data[0].price*data[0].shuliang)*1;
							count += data[0].shuliang*1;
							$(".gwc-sp").append($li);
							$("#gwc-total2 b").html(count+"件");
							$(".xiaoji").html("￥"+price);
						}
					});
				}
			}
			
			if(c){
				$(".gwc-sp").show();
				$(".noshop").hide();
			}
			else{
				$(".gwc-sp").hide();
				$(".noshop").show();
			}
		}
		else{
			$("#dlxs").hide();
			$("#nodenglu").show();
		}
	}
	updata();
	$("#logo-gwc a").click(function(){
		$phone = getCookie("phone");
		if(!$phone){
			var a = confirm("请先登陆");
			if(a){
				location.href="html/denglu.html";
				return false;
			}
			else{
				return false;
			}
			
		}
	})
	$("#cbl a").click(function(){
		$phone = getCookie("phone");
		if(!$phone){
			var a = confirm("请先登陆");
			if(a){
				location.href="html/denglu.html";
				return false;
			}
			else{
				return false;
			}
			
		}
	})
	$("#tuichu").click(function(){
		$phone = getCookie("phone");
		$password = getCookie("password");
		// var date = new Date();
//		var date = new Date();
//		console.log(date)
//		date.setDate( date.getDate()-1222 );
//		console.log(date)
//		document.cookie = "phone="+getCookie('phone')+";expires="+date.toGMTString();
//		document.cookie = "phone=13420133702;expires=date.toGMTString()"
		$.ajax({
			type:"post",
			url:"api/denglu.php",
			async:true,
			data: {
				"phone":$phone,
				"password":$password,
				"tuichu":211
			},
			success:function(str){
				updata();
            }
		});
	})
})
