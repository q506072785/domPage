app = {
    main: function (json) {
        var _that = this;
        _that.init("#idContentBg",".section","#content");
        _that.dom.nav("#idContentBg",json.nav);
        _that.pageInit(json.respond);
        $(window).resize(function () {
            _that.init("#idContentBg",".section","#content");
            _that.pageInit(json.respond);

        });
        _that.mouse.mousewheel();
        _that.fn(json.fn);
    },
    init: function (ContentBg,ContentWp,ContentWp_bg) {
        var _div = $(ContentBg),
        	_div_w = $(ContentWp),
            _div_w_b = $(ContentWp_bg),
            _maxheight = $("body").height(),
            _that = this,
            _host;
        _div.height(_maxheight);
        _div_w.height(_maxheight);
        _div_w_b.height(_maxheight*_div_w.length);
    },
    dom: {
        nav: function (idContentBg,nav) {
            var _bg  = $(idContentBg),
                _html,
                _href,
                _trg ,
                _maxheight ,
                _top;
            _html = "<div id='fullPage-nav'><ul>"
            for(var i = 0,len = nav.attribute.length; i<len; i++){
                _href = (nav.attribute[i].split("|")[1])?nav.attribute[i].split("|")[1]:"javascript:;";
                _trg = (nav.anchor)?"":"_target='blank'";
                _html +="<li><a href="+_href+_trg+">"+nav.attribute[i].split("|")[0]+"</a></li>";
            }
            _html +="</ul></div>"
            _bg.prepend(_html);
            if(nav.anchor){
                app.dom.navClick();
            }
            
        },
        navClick: function () {
            var _maxheight,
                _top,
                _host;
            $("a").click(function () {
                _maxheight = $("body").height();
                _top = $("#content").offset().top;
                if(_top == 0|| _top%_maxheight == 0){
                    _host = $(this).attr("href");
                    if(_host.replace("#page")){
                        app.amit.amininit(-parseInt(_host.replace("#page",""))+1);  
                    }
                }else{
                    return false;
                }
            })
        }
    },
    pageInit:function (respond) {
        if(respond){
          var _that = this,
            _host = (window.location.href.split("#")[1])?window.location.href.split("#")[1]:"page1",
            _int = -parseInt(_host.replace("page",""))+1;
            _that.amit.amininit(_int); 
        }   
    },
    amit: {
    	aminmove: function (i) {
    		var _maxheight = $("body").height(),
    			_div = $("#content"),
                _top = $("#content").offset().top,
                _maxtop = -_maxheight*($(".section").length-1),
                _num,
                _that = this;
            if((_top != 0 || i != 1 )&& (_top !=  _maxtop|| i != -1)){
                if(_top != 0){
                    _num =  _top/_maxheight;
                }else {
                    _num = 0;
                }
                _num = _num +i;
                app.amit.addClassn(_num);
                _div.stop(true,false).animate({top:_maxheight*_num},"slow",function () {
                    location.hash="page"+(-_num+1);
                });
            }
            
            return true;
    	},
        amininit: function (_num) {
            var _maxheight = $("body").height(),
                _div = $("#content");
            app.amit.addClassn(_num);
            _div.stop(true,false).animate({top:_maxheight*_num},"slow");
        },
        addClassn: function (i) {
            $("#content .section").removeClass("active");
            $("#fullPage-nav li a").removeClass("active");
            $("#content .section").eq(-i).addClass("active");
            if(-i >= $("#fullPage-nav li a").length){
                $("#fullPage-nav li a").eq($("#fullPage-nav li a").length-1).addClass("active");
            }else{
                 $("#fullPage-nav li a").eq(-i).addClass("active");
            }
            
                
        }

    },
    mouse: {
        scrollFunc: function (event) {
            var direct = 0,
            	e = event||window.event,
            	num,
                i,
                _maxheight = $("body").height(),
                _top = $("#content").offset().top,
                detail = e.wheelDelta?e.wheelDelta:e.detail;
            if(detail == 120 || detail == -3){
                i = 1;
            }else {
                i = -1;
            }
            if(_top == 0|| _top%_maxheight == 0){
                app.amit.aminmove(i);
            }            
        },
        mousewheel: function () {
            var _maxheight = $("body").height(),
                _top = $("#content").offset().top;
            if(document.addEventListener){
                document.addEventListener('DOMMouseScroll',app.mouse.scrollFunc,false);
            }
            document.onmousewheel=app.mouse.scrollFunc;
        	
        }
    },
    fn : function (fn){
        if(fn){
            fn();
        }
    }
}
