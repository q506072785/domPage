$.extend({
    demoH5:app
});
$.demoH5.main({
    respond:true,//动画自适应
    nav:{
        anchor:true, //点击是否做翻页带#page 都跳页
        attribute:["登录|#page1","免费注册|#page2","帮助中心|#page3"],
    },
    fn: function () {
        var app = {
            bodySzie: function () {
                if ($(window).height() < 780) { // 控制高度适配最小高度
                    $(".section1-bg").height(410); 
                    $(".top-div").css("top", "18%");
                } else {
                    $(".section1-bg").height("auto");
                    $(".top-div").css("top", "20%");
                }
            }
        }
        app.bodySzie();
        $(window).resize(function (){
           app.bodySzie(); // 重定义事件
        })
    }
    
});