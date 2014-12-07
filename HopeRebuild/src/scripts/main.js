(function(global,DOC){
  var W3C = DOC.dispatchEvent;
  //创建一个div盒子用于js与css在media query的交互
  var indicator = DOC.createElement('div');
  indicator.id = 'state-indicator';
  DOC.body.appendChild(indicator);
  var deviceState = "D";
  var ie678 = '\v' === 'v';
  //注册事件记录
  var registerEvent_func={
    func_navItemHoverToggler:0
  }
  //touch修复
  var touchPosition = {
    x:0,
    y:0,
    distanceX:0,
    distanceY:0
  };
  function handleTouchEvent(event) {
    //只跟踪一次触摸
    if (event.touches.length == 1) {
      switch (event.type) {
        case "touchstart":
          touchPosition.x = event.touches[0].pageX;
          touchPosition.y = event.touches[0].pageY;
          touchPosition.distanceX = 0;
          touchPosition.distanceY = 0;
          break;
        case "touchend":
          break;
        case "touchmove":
          //event.preventDefault();
          touchPosition.distanceX = event.touches[0].pageX - touchPosition.x;
          touchPosition.distanceY = event.touches[0].pageY - touchPosition.y;
          break;
      }
    }
  }
  if(W3C){
    DOC.addEventListener("touchstart", handleTouchEvent, false);
    DOC.addEventListener("touchend", handleTouchEvent, false);
    DOC.addEventListener("touchmove", handleTouchEvent, false);
  }
  $.extend({
    /**
     * 设备屏幕宽度判断
     * @returns {*|string}
     */
    getDevicesState:function(){
      //获取设备状态
      var index = W3C?parseInt(global.getComputedStyle(indicator).getPropertyValue('z-index'), 10):1;
      var states = {
        1: 'D',//Desktop || Default
        2: 'L',
        3: 'M',
        4: 'S',
        5: 'P'
      };
      return states[index] || 'D';

    },
    /**
     * slider
     * @param idname
     * @param pre
     * @param next
     * @param timer
     */
    slider:function(idname,pre,next,timer){
      (function(idname,pre,next,timer){
        //touch position
        var x,y;
        var id = $("#"+idname);
        if(!id){
          return;
        }
        $li = id.find("li");
        var length = $li.length;
        var $windowWidth = $(window).width();
        var fun = setInterval(slide,timer);
        $("#"+next).click(function(){				//单击“下一个”按钮触发的事件
          slide(1);
          clearInterval(fun);
          fun = setInterval(slide,timer);
        });
        $("#"+pre).click(function(){				//单击“上一个”按钮触发的事件
          slide(-1)
          clearInterval(fun);
          fun = setInterval(slide,timer);
        });

        //for touch
        for(var i=0;i<length;i++){
          var item = $li.eq(i);

          item
            .on("touchstart",function(e){
              e.preventDefault();
              clearInterval(fun);
              $(this).css("z-index","10");
              if($(this).index()==(length-1)){
                $li.eq(0).fadeIn(100);
              }else{
                $li.eq($(this).index()+1).fadeIn(100);
              }

            })
            .on("touchmove",function(e){
              e.preventDefault();
              $(this).css("left", touchPosition.distanceX+"px").css("top", touchPosition.distanceY+"px");
            })
            .on("touchend",function(e){
              e.preventDefault();
              $(this).fadeOut(100).css("left",0).css("top",0).css("z-index","1");
              fun = setInterval(slide,timer);

            })
        }
        function slide(action){

          var i = id.find("li:visible").index();
          if($li.eq(i).is(":animated"))
          {
            return;
          }
          if(!action) action = 1;
          action += i;
          if( action < 0 || action >= length)
          {
            action = (action < 0)?(length -1):0;
          }

          $li.eq(i).fadeOut(3000).parent().find("li").eq(action).fadeIn(1000);
        }
      })(idname,pre,next,timer)

    },

    /**
     * tab
     * @param tab_title
     * @param tab_content
     */
    tab:function(tab_title,tab_content){
      var $tab_title_list = $("."+tab_title).find("."+tab_title+"_item"),
        $tab_content_list = $("."+tab_content).find("."+tab_content+"_item");

      for(var i=0;i<$tab_title_list.length;i++){
        $tab_title_list.eq(i).hover(function(){
          $(this).addClass("title_specBg");
          $(this).siblings().removeClass("title_specBg");
          $tab_content_list.eq($(this).index()).show().siblings().hide();
        })
      }
    },
    tabTrangle:function(tab_title,trangle){
      var $tab_title_list = $("."+tab_title).find("."+tab_title+"_item");
      for(var i=0;i<$tab_title_list.length;i++){
        $tab_title_list.eq(i).hover(function(){
          var length = $("."+tab_title).find("."+tab_title+"_item").size();
          var left = ""+(($(this).index()*2+1)/length*50)+"%";
          $("."+trangle).animate({left:left},500);
        })
      }
    },
    sliderHeightCtrl:function(width,height,point,slider){
      var windowWidth = $(window).width();
      if(windowWidth<point){
        var needHeight = windowWidth * height/point;
        var needWidth = needHeight * width/height;
        $("."+slider).css("height",needHeight);
      }else{
        $("."+slider).css("height",height);
	  }
    },
    cardToggler: function (card) {
      $("."+card).hover(
        function () {
          $(this).find("."+card+"_box").stop().delay(50).animate({"top":0,opacity:0.8},300)
        },
        function () {
          $(this).find("."+card+"_box").stop().animate({"top":-1*$(this).height(),opacity:0},300)
        }
      )
      if(ie678){
        $("."+card).hover(
            function () {
              $(this).find(".hope_card_hoverShow_main").stop().delay(50).animate({opacity:0.8},300)
              $(this).find(".hope_card_hoverShow_readmore").stop().delay(50).animate({opacity:0.8},300)
            },
            function () {
              $(this).find(".hope_card_hoverShow_main").stop().animate({opacity:0},300)
              $(this).find(".hope_card_hoverShow_readmore").stop().animate({opacity:0},300)
            }
        )
      }
    },
    contentReplace:function(selector,oldContent,newContent){
        var selector=selector||document;
       for(var i=0;i<selector.length;i++){
          var current=selector.eq(i);
          var reg=new RegExp(oldContent);
          if(current.html().match(reg)){
             current.html(current.html().replace(new RegExp(oldContent),newContent));
         }
      }
        return this;
    },
    pagerHandler:function(){
        /*$.ContentReplace($(".hope_page_web a"),"上一页","< 上一页")
        .ContentReplace($(".hope_page_web a"),"下一页","下一页 >")
        .ContentReplace($(".hope_page_web a"),"第一页","<< 第一页")
        .ContentReplace($(".hope_page_web a"),"最后一页","最后一页 >>")*/
        $.ContentReplace($(".hope_page_mobile a"),"上一页","<")
        .ContentReplace($(".hope_page_mobile a"),"下一页",">")
        .ContentReplace($(".hope_page_mobile a"),"第一页","<<")
        .ContentReplace($(".hope_page_mobile a"),"最后一页",">>");

    },
    headerClickToggler:function(toggler){
      $("#"+toggler).bind("click",
        function(){$("#"+toggler+"_data").toggle(300)}
      )
    },
    navItemHoverToggler:function(){
      $("*[data-toggler=drop]").hover(
          function(){
            $(this).find(".js_dropdown").show();
          },
          function(){
            $(this).find(".js_dropdown").hide();
          }
      )
    }
  })
  $(DOC).ready(function(){
    deviceState = $.getDevicesState();
    var togglerArray = ["nav","search"];
    $.each(togglerArray,function(t){
      $.headerClickToggler("js_toggler_"+togglerArray[t]);
    })

    switch(deviceState){
      case "P":
      case "S":
        break;
      case "M":
      case "L":
      case "D":
        //注册导航条下滑功能
        registerEvent_func.func_navItemHoverToggler = 1
        $.navItemHoverToggler();
        break;
    }
    $(global).resize(function(){
      deviceState = $.getDevicesState();
      switch(deviceState){
        case "P":
        case "S":
          if(registerEvent_func.func_navItemHoverToggler == 1){
            $("*[data-toggler=drop]").unbind('mouseenter mouseleave');
            registerEvent_func.func_navItemHoverToggler = 0
          }

          $.each(togglerArray,function(t){
            $("#js_toggler_"+togglerArray[t]+"_data").css("display","none");
          })
          break;
        case "M":
        case "L":
        case "D":
          if(registerEvent_func.func_navItemHoverToggler == 0){
            registerEvent_func.func_navItemHoverToggler = 1
            $.navItemHoverToggler();
          }
          $.each(togglerArray,function(t){
            if(togglerArray[t] == "nav"){
              $("#js_toggler_"+togglerArray[t]+"_data").css("display","block");
            }else{
              $("#js_toggler_"+togglerArray[t]+"_data").css("display","none");
            }
          });
          break;
      }

    })
  })
  // global.$$ = $$
})(self,self.document)
