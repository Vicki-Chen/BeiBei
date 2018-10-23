$(function(){
    var ison = false;
    function brand(count){
        $.ajax({
            type:"get",
            url:"../api/list-brand.php",
            async:true,
            data:{
                "count":count
            },
            success:function(str){
                var data = JSON.parse(str);
                
                var html='';
                for(var i = 0;i<data.length;i++){
                    html += '<li><a href="#"><img src="'+data[i].img+'" /><div>'+data[i].name+'</div></a></li>';
                }
                $("#brand-img").html(html);
            }
        });
    }
    function updata(){
        if(ison){
            brand(23);
            $("#brand-img").next().html("收起<i class='iconfont icon-huidaodingbu'></i>");
            $("#brand-img").next().css("color","#ff4965");
            $("#brand-img").next().children("i").css("font-size","20px");
        }
        else{
            brand(9);
            $("#brand-img").next().html("更多<i class='iconfont icon-xiala'></i>");
            $("#brand-img").next().css("color","#686868");
            
        }
        ison = !ison;
    }
    updata();
    $("#brand-img").next().click(function(){
        updata();
    });
    $("#brand-img").on("mouseover","li",function(){
        $(this).children("a").children("div").show();
        $(this).css("border","1px solid #ff4965");
    });
    $("#brand-img").on("mouseout","li",function(){
        $(this).children("a").children("div").hide();
        $(this).css({
            "border":"0",
            "border-right": "1px solid #ccc",
            "border-bottom": "1px solid #ccc"
        })
    }); 
})

$(function(){
    $page = 1;
    $count = 40;
    function brand(page,count,paixu,fangshi){
        $.ajax({
            type:"get",
            url:"../api/yzzj-sp.php",
            async:true,
            data:{
                "page":page,
                "count":count,
                "paixu":paixu,
                "fangshi":fangshi
            },
            success:function(str){
                var data = JSON.parse(str);
                var html='';
                for(var i = 0;i<data.length;i++){
                    var zheng = data[i].price.split(".")[0];
				var xiao = data[i].price.split(".")[1];
                    html += '<li index="'+(i+1)+'"><a href="xqy.html"><img src="'+data[i].img+'" /><h3>'+data[i].include+'</h3><h4>￥<span>'+zheng+'</span><span>.'+xiao+'</span></h4></a></li>';
                }
                $("#zjiao").html(html);
            }
        })
    }
    brand($page,$count,'zonghe','desc');
    $("#zonghe").click(function(){
        brand($page,$count,'zonghe','desc');
    });
    $("#price").click(function(){
        brand($page,$count,'price','asc');
    });
    $("#xiaoliang").click(function(){
        brand($page,$count,'xiaoliang','desc');
    });
    $("#yz-sp span").hover(function(){ 
        if($(this).attr("class")=="dianji"){
            $(this).css({
                "border":"1px solid #ff4965",
                "color": "#ff4965"
            });
            $(this).children("i").css({
                "color": "#ff4965"
            });
        }
    },function(){
        if($(this).attr("class")=="dianji"){
            $(this).css({
                "border":"1px solid #eee",
                "color": "#999"
            });
            $(this).children("i").css({
                "color": "#999"
            });
        }
    });

    $("#yz-sp span").click(function(){
        $(this).addClass("light");
        $(this).removeClass("dianji");
        $(this).css({
            "color":"#fff"
        })
        $(this).children("i").css({
            "color": "#fff"
        });
        $(this).siblings().removeClass("light");
        $(this).siblings().addClass("dianji");
        $(this).siblings().css({
            "border":"1px solid #eee",
            "color": "#999"
        })
        $(this).siblings().children("i").css({
            "color": "#999"
        });
    });
    
    $("#yeshu span").click(function(){
        $(this).addClass("yema");
        $(this).siblings().removeClass("yema");
        $page = $(this).html();
        if($("#yz-sp .light").attr("index")==1){
            brand($page,$count,'zonghe','desc');
        }
        else if($("#yz-sp .light").attr("index")==2){
            brand($page,$count,'price','asc');
        }
        else if($("#yz-sp .light").attr("index")==3){
            brand($page,$count,'xiaoliang','desc');
        }
        window.scrollTo(0,0);
    })
    $("#yz-sp #zjiao").on("mouseover","li",function(){
        $(this).css({
            "border": "1px solid #ff5482"
        })
    });
    $("#yz-sp #zjiao").on("mouseout","li",function(){
        $(this).css({
            "border": "1px solid #eee"
        })
    });
    $("#xiayiye").hover(function(){
        $(this).css({
            "border": "1px solid #ff5482",
            "color": "#ff5482"
        })
    },function(){
        $(this).css({
            "border": "1px solid #eee",
            "color": "#686868"
        })
    });
    $("#yeshu span").hover(function(){
        $(this).css({
            "border": "1px solid #ff5482"
        })
    },function(){
        $(this).css({
            "border": "1px solid #eee"
        })
    });
    $("#xiayiye").click(function(){
        if($page<3){
            $("#yeshu span").eq($page).addClass("yema");
            $("#yeshu span").eq($page).siblings().removeClass("yema");
            $page++;
            if($("#yz-sp .light").attr("index")==1){
                brand($page,$count,'zonghe','desc');
            }
            else if($("#yz-sp .light").attr("index")==2){
                brand($page,$count,'price','asc');
            }
            else if($("#yz-sp .light").attr("index")==3){
                brand($page,$count,'xiaoliang','desc');
            }
            window.scrollTo(0,0);
        }
        else{
            alert("没有更多内容啦~回首页看看吧~");
        }
    })

    function setCookie(cookieName, cookieValue, date, path){
        // 包装数据
        var data = {
            "val" : cookieValue
        }
        // 编码
        var str = cookieName+"="+encodeURIComponent(JSON.stringify(data));
        // 过期时间
        if( date ){
            var dt = new Date();
            dt.setDate(dt.getDate()+date);
            str += ";expires="+dt.toGMTString();
        }
        // path属性
        if( path ){
            str += ";path="+path;
        }
        // 设置cookie
        document.cookie = str;
    }
    
    $("#zjiao").on("click","li",function(){
        setCookie('id',1*$(this).attr("index"));
    });

})