$(function(){
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
    var isAll = true;       //全选的开关
    var a = -1;
    var b = -1;
    var c = 0;
    //updata渲染购物车
    function updata(){  
        for(var i =1;i<7;i++){
            if(getCookie("id"+i)){
                c = 1;
                $.ajax({
                    type:"get",
                    url:"../api/xqy.php",
                    async:true,
                    data:{
                        "id": getCookie("id"+i)
                    },
                    success:function(str){
                        var data = JSON.parse(str);
                        var qianzhui = data[0].xuanze.split("】")[0];
                        var houzhui = data[0].xuanze.split("】")[1];
                        $div = $('<div class="ygdp"><p class="dianming"><input type="checkbox" name="" id="" isok="false">贝恩斯</p><ul><li class="clearfix"><div class="one"><input type="checkbox"></div><div class="two"><img src="'+data[0].photo+'" alt=""><span>'+data[0].include+'</span></div><div class="three"><p>'+qianzhui+'】</p><span>'+houzhui+'</span></div><div class="four"><p>'+data[0].price+'</p><s>'+data[0].ckj+'</s></div><div class="five"><p class="num"><span class="cutnum">-</span><input class="nownum" type="text" value="'+data[0].shuliang+'" /><span class="addnum">+</span></p></div><div class="six"><span>'+(data[0].shuliang*data[0].price).toFixed(2)+'</span><s index="'+data[0].id+'">删除</s></div></li><li class="clearfix"><div class="one"><input type="checkbox"></div><div class="two"><img src="'+data[0].photo+'" alt=""><span>'+data[0].include+'</span></div><div class="three"><p>'+qianzhui+'】</p><span>'+houzhui+'</span></div><div class="four"><p>'+data[0].price+'</p><s>'+data[0].ckj+'</s></div><div class="five"><p class="num"><span class="cutnum">-</span><input class="nownum" type="text" value="'+data[0].shuliang+'" /><span class="addnum">+</span></p></div><div class="six"><span>'+(data[0].shuliang*data[0].price).toFixed(2)+'</span><s index="'+data[0].id+'">删除</s></div></li></ul><div class="xiaoji"><span>小计：<b class="ygdp-xj">0.00</b></span></div></div>');
                        $("#sp-list").append($div);
                    }
                });
            }
        }
        if(c){
            $("#gwc-con").show();
            $("#nothing").hide();
        }
        else{
            $("#gwc-con").hide();
            $("#nothing").show();
        }
    }
    updata();
     //增加减少
     $("#sp-list").delegate(".cutnum","click",function(){
		if($(this).next().val()>1){
            $(this).next().get(0).value--;
            thisSum(this);
            var now=$(this).parent().parent().parent().parent().prev();
            thistotal(now);
        }

	})
    $("#sp-list").delegate(".addnum","click",function(){
        $(this).prev().get(0).value++;
        thisSum(this);
        var now=$(this).parent().parent().parent().parent().prev();
        thistotal(now);
    })

    //单个删除
    $("#sp-list").delegate(".six s","click",function(){ 
        $isOK = $(this).parent().parent().find(".one input").prop("checked");
        if($isOK){
            var isOk1 = confirm("你确定删除该宝贝吗？");
            if(isOk1){
                $.ajax({
                    type:"get",
                    url:"../api/jiagou.php",
                    async:true,
                    data:{
                        "id":$(this).attr("index"),
                        "remove": 1
                    },
                    success:function(str){
                        location.reload();
                    }
                });
                var now = $(this).parent().parent().parent().prev();
                thistotal(now);
            }
        }
    })

    //全部删除
    $("#select-sc").click(function(){
        quanshang();
   });
    function quanshang(){
        var arr = allChecked();
        if(arr.length>0){
            var k = confirm("你确定删除这些宝贝吗？");
            if(k){
                for(var i=arr.length-1;i>=0;i--){
                    var x = $("#sp-list").find(".six").eq(arr[i]).children("s").attr("index");               
                    $.ajax({
                        type:"get",
                        url:"../api/jiagou.php",
                        async:true,
                        data:{
                            "id":x,
                            "remove": 1
                        },
                        success:function(str){
                            location.reload();
                        }
                    });
                }
            }
        }
        else{
            alert("请选择需要移除的宝贝");
        }
    }

    //全选
    $(".allcheck").click(function(){
        allCheck();
        var cur = $(this).parent().parent().children("#sp-list").children(".ygdp");
        var arr = cur.size();
        for(var i=0;i<arr;i++){
            now = cur.eq(i).children(".dianming");
            thistotal(now);
            
        }
    })
    function allCheck(){        //点击全选时改变全部的复选框的状态
		if(isAll){
            $(".allcheck").prop("checked","true");
            $("#sp-list").find(".dianming input").prop("checked","true");
            $("#sp-list").find(".one input").prop("checked","true");
            $(".dianming input").prop("isok",true);
        }
		else{
            $(".allcheck").removeAttr("checked");
            $("#sp-list").find(".dianming input").removeAttr("checked");
            $("#sp-list").find(".one input").removeAttr("checked");
            $(".dianming input").prop("isok",false);
        }
		isAll = !isAll;		
    }

    //点击商品前面的复选框时改变全选的状态
    $("#sp-list").delegate(".one input","click",function(){
        changeAllSelect();
        changeBrandSelect(this);
        var now = $(this).parent().parent().parent().prev();
        thistotal(now);
    })
    function allChecked(){      //所有商品中被选中的商品
        var arr = [];
        var le = $(".one input").size();
        for(var i=0;i<le;i++){
            if($('.one input').eq(i).prop('checked')){
                arr.push(i);
            }
        }
        return arr;
    }
    function changeAllSelect(){
        var arr=allChecked();
        if(arr.length == $(".one input").size()){
            $(".allcheck").prop("checked","true");
            isAll = false;
        }
        else{
            $(".allcheck").removeAttr("checked");     
            isAll = true;
        }
    }

    //点击商品前面的复选框时改变店铺前面的复选框的状态
    function thisChecked(now){      //当前店铺被选中的商品
        var arr = [];
        var inp = $(now).parent().parent().parent().find(".one input");
        var le = inp.size();
        for(var i=0;i<le;i++){
            if(inp.eq(i).prop('checked')){
                arr.push(i);
            }
        }
        return arr;
    }
    function changeBrandSelect(now){
        var arr=thisChecked(now);
        var inp = $(now).parent().parent().parent().find(".one input");
        var brandInp = $(now).parent().parent().parent().prev().find("input");
        if(arr.length == inp.size()){
            brandInp.prop("checked","true");
            $(now).parent().parent().parent().prev().children("input").prop("isok",true);
            b=-1;
        }
        else{
            brandInp.removeAttr("checked");   
            $(now).parent().parent().parent().prev().children("input").prop("isok",false);
            b=-1;
        }
    }
    
    //点击店铺前面的复选框改变全选状态
    $("#sp-list").delegate(".dianming input","click",function(){
        changeAllChecked();
        brandCheck(this);
        var now = $(this).parent();
        thistotal(now);

    })
    function allBrand(){    //店铺前面的复选框被选中的个数
        var arr = [];
        var le = $(".dianming input").size();
        for(var i=0;i<le;i++){
            if($(".dianming input").eq(i).prop('checked')){
                arr.push(i);
            }
        }
        return arr;
    }
    function changeAllChecked(){
        var arr = allBrand();
        if(arr.length == $(".dianming input").size()){
            $(".allcheck").prop("checked","true");
            isAll = false;
        }
        else{
            $(".allcheck").removeAttr("checked");     
            isAll = true;
        }
    }

    //点击店铺前面的复选框改变商品前面复选框的状态
    function brandCheck(now){    
        a = $(now).parent().parent().index();
        $(now).prop("isok",!$(now).prop("isok"));
		if(a==b || !$(now).prop("isok")){
            $(now).parent().next().find(".one input").removeAttr("checked");
            b=-1;
        }
        else{
            $(now).parent().next().find(".one input").prop("checked","true");
            b=a;
        }	
    }
    
    //点击+、-号改变当行小计
    function thisSum(now){
        $d = $(now).parent().parent().prev().children("p").html();
        $n = $(now).parent().children("input").val();
        $k = ($d*1*$n).toFixed(2);
        $(now).parent().parent().next().children("span").html(($k));
    }

    function curSelect(now){      //点击.dianming获取该店铺被选中的商品
        var arr = [];
        var le = $(now).next().find(".one input").size();
        for(var i=0;i<le;i++){
            if($(now).next().find(".one input").eq(i).prop('checked')){
                arr.push(i);
            }
        }
        return arr; 
    }
    //改变店铺小计
    function thistotal(now){    //这里的now是商品
        var arr= curSelect(now);    //找到该店铺下面选择的商品
        var price = 0;
        for(var i =0;i<arr.length;i++){
            price += 1*$(now).next().find(".six span").eq(arr[i]).html();
        }
        price = price.toFixed(2);
        $(now).parent().find(".xiaoji span b").html(price);
        total();
    }

    function total(){
        var arr = allChecked();
        var count = arr.length;
        $("#gwc-botton div em").html(count);
        var le = $(".ygdp-xj").size();
        var price = 0.00;
        for(var i=0;i<le;i++){
            price += 1*$(".ygdp-xj").eq(i).html();
        }
        price = price.toFixed(2);
        $("#gwc-botton b").html("￥"+price);
    }
})

$(function(){
    //没有商品的购物车
    $("#nothing p").eq(1).hover(function(){
        $(this).css("text-decoration","underline");
    },function(){
        $(this).css("text-decoration","none");
    });

    $("#nothing p").eq(2).hover(function(){
        $(this).css("text-decoration","underline");
    },function(){
        $(this).css("text-decoration","none");
    });

    $("#nothing p").eq(2).click(function(){
        location.reload();
    });
})