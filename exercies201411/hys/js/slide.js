/**
 * Created by hope on 2014/8/13.
 */
$(function(){
    var aImg = $('#slide .pic');		//图像集合
    var iSize = aImg.length;		//图像个数
    var index = 0;		//切换索引
    var t;
    $('#btnLeft').click(function(){		//左边按钮点击
        index--;
        if(index<0){
            index=iSize-1
        }
        change(index)
    })
    $('#btnRight').click(function(){    //右边按钮点击
        index++;
        if(index>iSize-1){
            index=0
        }
        change(index)
    })

    //切换过程
    function change(index){
        aImg.stop();
        //隐藏除了当前元素，所以图�?
        aImg.eq(index).siblings().animate({
            opacity:0
        },1000)
        //显示当前图像
        aImg.eq(index).animate({
            opacity:1
        },1000)
    }


    function autoshow() {
        index=index+1;
        if(index<=iSize-1){
            change(index);
        }else{
            index=0;
            change(index);
        }

    }
    int=setInterval(autoshow,3000);
    function clearInt() {
        $('#btnLeft,#btnRight').mouseover(function() {
            clearInterval(int);
        })

    }
    function setInt() {
        $('#btnLeft,#btnRight').mouseout(function() {
            int=setInterval(autoshow,3000);
        })
    }
    clearInt();
    setInt();
})
