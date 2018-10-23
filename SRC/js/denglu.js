$(function(){
    $isok = false;
    $isok1 = false;
    $isok2 = false;
    $isxiangshi = true;
    $('#mpanel1').slideVerify({
        type : 1,		//类型
        vOffset : 5,	//误差量，根据需求自行调整
        barSize : {
            width : '100%',
            height : '40px',
        },
        ready : function() {
        },
        success : function() {
            $("#mpanel2").show();
            $isok = true;
            $("#mpanel1").hide();
        },
        error : function() {
            $isok = false; 
        }     
    });
    $('#mpanel2').pointsVerify({
        defaultNum : 8,	//默认的文字数量
        checkNum : 2,	//校对的文字数量
        vSpace : 5,	//间隔
        imgName : ['1.jpg', '2.jpg'],
        imgSize : {
            width: '330px',
            height: '230px',
        },
        barSize : {
            width : '330px',
            height : '40px',
        },
        ready : function() {
        },
        success : function() {
            $("#mpanel2").hide();
            $("#mpanel1").show();
        }
    });

    function xianshi(){
        if($isxiangshi){
            $(this).css("color","#ff5482");
            $(this).prev().attr("type","text");  
        }
        else{
            $(this).css("color","#666");
            $(this).prev().attr("type","password");
        }
        $isxiangshi = !$isxiangshi;
    }
    $(".icon-yanjing").click(xianshi);
    $("#shuoming i").hover(function(){
        $(this).css("opacity",1);
    },function(){
        $(this).css("opacity",0.5);
    })
    $("#phone input").blur(function(){
        var b = $("#phone input").val();
        var a = /^1(3|5|6|7|8|9)[0-9]{9}$/.test(b);
        if(!a){
           $("#yz-phone").html("请输入正确的手机号").css("color","red");           
           $isok2 = false;
           $("#phone input").val("");
        }else{
            $isok1 = true;
            $("#weishu").hide();
            $("#yz-phone").html("");
        }
    });
    $("#password input").blur(function(){
        var d = $("#password input").val();
        var c = /^\w{6,16}$/.test(d);
        if(!c){
           $("#yz-password").html("密码应为6-16位字符").css("color","red");           
           $isok2 = false;
        }else{
            $isok2 = true;
            $("#yz-password").html("");
        }
    });

    $("#phone input").keyup(function(){
        var a = $("#phone input").val();
        $("#weishu").html(a.length).show();
    })
    $("#tijiao").click(function(){
        console.log($("#phone input").val());
        if($isok && $isok1 && $isok2){
            $.ajax({
                type:"post",
                url:"../api/denglu.php",
                async:true,
                data:{
                    "phone":$("#phone input").val(),
                    "password":$("#password input").val()
                },
                success:function(str){
                    if(str==0){
                        confirm("该手机号尚未注册");
                        location.reload();
                    }
                    else if(str==1){
                        location.href="../index.html"
                    }
                    else if(str==2){
                        confirm("密码错误");
                        location.reload();
                    }
                    
                }
            });
        }
        else{
            alert("请输入正确的信息");
        }
        return false;
    })
})