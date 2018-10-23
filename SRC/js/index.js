//轮播图
var cur = new Date();
$(function(){
	var html = '';
	for(var i = 0;i<3;i++){
		html+= '<li><a href="#"><img src="img/banner'+(i+1)+'.png"/></a></li>';
	}
	$("#banner #xianshiqu ul").html(html);
	var span = '';
	for(var i =0 ;i<$("#banner #xianshiqu li").size();i++){
		span+='<span>'+i+'</span>';
	}
	$("#light").html(span);
	$iw = $("#banner #xianshiqu img").eq(0).width();
	$("#banner #xianshiqu li").css({
		"left": $iw,
		"top": 0
	})
	$("#banner #xianshiqu li").eq(0).css("left",0);
	$("#banner #xianshiqu p span").eq(0).addClass("now-light");
	function light(){
		$("#banner #xianshiqu span").removeClass("now-light");
		$("#banner #xianshiqu span").eq(now).addClass("now-light");
	}
	
	var lunbo = null;
	var now =0;
	clearInterval(lunbo);
	lunbo = setInterval(next,1000);
	function next(){
		var furTime = new Date();
		if(furTime - cur>1000){
			// clearInterval(lunbo);
			$("#banner #xianshiqu li").eq(now).animate({"left":-$iw},1000);
			now= ++now>$("#banner #xianshiqu li").size()-1?0:now;
			$("#banner #xianshiqu li").eq(now).css("left",$iw);
			$("#banner #xianshiqu li").eq(now).animate({"left":0},1000);
			light();
			cur = furTime;
		}
	}
	$("#banner").hover(function(){
		clearInterval(lunbo);
	},function(){
		lunbo = setInterval(next,1000);
	})
	$("#banner #xianshiqu span").click(function(){
		var furTime = new Date();
		if(furTime - cur>1000){
			var fur = $(this).html();
			if(fur>now){
				$("#banner #xianshiqu li").eq(now).animate({"left":-$iw},1000);
				now= fur;
				$("#banner #xianshiqu li").eq(now).css("left",$iw);
				$("#banner #xianshiqu li").eq(now).animate({"left":0},1000);
			}
			else{
				$("#banner #xianshiqu li").eq(now).animate({"left":$iw},1000);
				now= fur;
				$("#banner #xianshiqu li").eq(now).css("left",-$iw);
				$("#banner #xianshiqu li").eq(now).animate({"left":0},1000);
			}
			light();
			cur = furTime;
		}
	})

	function prev(){
		var furTime = new Date();
		if(furTime - cur>1000){
			$("#banner #xianshiqu li").eq(now).animate({"left":$iw},1000);
			now= --now<0?$("#banner #xianshiqu li").size()-1:now;
			$("#banner #xianshiqu li").eq(now).css("left",-$iw);
			$("#banner #xianshiqu li").eq(now).animate({"left":0},1000);
			light();
			cur = furTime;
		}
		
	}
	$("#prev").click(prev);
	$("#next").click(next);
})

$(function(){
// 渲染数据
	$page = 1;
	$count = 12;
	var nowtime = new Date();
	shuju($page,$count);
	function shuju(page,count){
		$.ajax({
			type:"get",
			url:"api/index-shuju.php",
			async:true,
			data:{
				"page":page,
				"count":count
			},
			success:function(str){
				var data = JSON.parse(str);
				var html='';
				for(var i=0;i<data.length;i++){
					var zheng = data[i].sprice.split(".")[0];
					var xiao = data[i].sprice.split(".")[1];
					html+='<li><a href="#"><img src="'+data[i].simg+'"/><p>'+data[i].sincluede+'</p><p><span>￥'+zheng+'</span><span>.'+xiao+'</span><span>￥'+data[i].syuanjia+'</span><span>'+data[i].zkou+'折</span></p></a></li>';
				}
				$("#xrsj ul").html(html);
			}
		})
	}
	document.body.onmousemove= function(e){
		if($page<3){
			if(document.body.offsetHeight - e.pageY<50){
				var furtime = new Date();
				if(furtime-nowtime>3000){
					$page += 1;
					shuju($page,$count);
				}
			}
			$("#jiazai").hide();
		}
		else{
			$("#jiazai").show();
		}
	}

	$("#jiazai").click(function(){
		var furtime = new Date();
		if(furtime - nowtime>3000){
			$page += 1;
			shuju($page,$count);
			nowtime = furtime;
		}
	});
})

$(function(){
	$("#cb-nav #tab li").hover(function(){
		$(this).addClass("light1");
		$(this).siblings().removeClass("light1");
	},function(){
		$(this).css("background-color","#CDC");
	});
	function tianjia(name){
		$.ajax({
			type:"get",
			url:"api/index-cebian.php",
			async:true,
			data:{
				"name":name
			},
			success:function(str){
				var data = JSON.parse(str);
				
				var html ='';
				for(var i=0;i<data.length;i++){
					html += '<li><a href="#"><img src="'+data[i].img+'"/><div><p>'+data[i].include+'</p><p><span>'+data[i].price+'</span><span>'+data[i].f6+'</span></p></div></a></li>';
				}
				$("#tianjia").html(html);
			}
		});
	}
	$("#tab").children().mouseover(function(){
		tianjia($(this).children("a").html());
	});
	
	
	$("#tianjia").on("mouseover","li",function(){
		$(this).css({
			"border-top":"3px solid #ccc",
			"border-bottom":"3px solid #ccc"
		});
	});
	$("#tianjia").on("mouseout","li",function(){
		$(this).css({
			"border-top":"0",
			"border-bottom":"1px solid #ccc"
		});
	});


})
