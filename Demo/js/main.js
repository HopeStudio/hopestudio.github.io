(function(global,DOC){
  var ie678 = '\v' === 'v';
  $.extend({
    /**
     * slider
     * @param idname slider盒子的id名字
     * @param pre  向前一跳转的点击按钮的id名字
     * @param next 向前一跳转的点击按钮的id名字
	 * @param timer 切换时间控制
     */
    slider:function(idname,pre,next,timer){
      (function(idname,pre,next,timer){
        var id = $("#"+idname);
        if(!id){
          return;
        }
        $li = id.find("li");
        var length = $li.length;
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
          $(this).addClass("js__title_hover");
          $(this).siblings().removeClass("js_tan_title_hover");
          $tab_content_list.eq($(this).index()).show().siblings().hide();
        })
      }
    },
	/**
	 * cardToggler
	 * @param card card的类名
	 */
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
              $(this).find(".js_card_show_normal").stop().delay(50).animate({opacity:0.8},300)
              $(this).find(".js_card_show_hover").stop().delay(50).animate({opacity:0.8},300)
            },
            function () {
              $(this).find(".js_card_show_normal").stop().animate({opacity:0},300)
              $(this).find(".js_card_show_hover").stop().animate({opacity:0},300)
            }
        )
      }
    },
	/**
	 * clickToggler
	 */
    clickToggler:function(toggler){
      $("#"+toggler).bind("click",
        function(){$("#"+toggler+"_data").toggle(300)}
      )
    },
	/**
	 * hoverToggler
	 */
    hoverToggler:function(){
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
  /**
   * 执行函数
   */
  $(DOC).ready(function(){
	//下滑菜单
    $.hoverToggler();
	//slider
	if($("#js_slider")&&$("#js_pre")&&$("#js_next")){
		$.slider("js_slider","js_pre","js_next",500);
	}
	//tab
	if($(".js_tab_title")&&$(".js_tab_content")){
		$.tab("js_tab_title","js_tab_content")
	}
  });
})(self,self.document)
