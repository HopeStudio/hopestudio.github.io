/**
 * Created by 尧舜 on 2014/12/17.
 */
(function(){
    //因为不用被其它模块调用，故不暴露为全局变量
    var loader={
        //要去抓取数据的Url
        baseUrl:'http://ce.sysu.edu.cn/hope/Journals/Index_',
        //目前加载到的页数
        pageNum:1,
        //目标页面中用于包裹瀑布流block的容器id
        containerId:'pinterest',
        //当前页面用于包裹瀑布流block的容器id
        currentContainerId:'pinterest',
        //发起Ajax请求的function
        fetchWaterFallItem:function(){
            //获取当前页面的页面数
            loader.pageNum=$('#page').val();
            loader.pageNum++;
            $('#load_more').attr('disabled','disabled');

            try{
                $.ajax({
                    url:loader.baseUrl+loader.pageNum+'.aspx',
                    method:'get',
                    dataType:'aspx',
                    success:loader.handleData});
            }catch(exception){
                alert('loaded failed,please try again!');
            }
        },
        //处理返回的data
        handleData:function(data){

            data=data.replace(/(>\s*<)/g,'><');

            var regex=/<div id="pinterest">(<div class="water_fall_item">.*<\/div>)+<\/div>/g;

            var match=regex.exec(data);

            if(match&&match[1]){
                $('#'+loader.currentContainerId).append(match[1]);
            }else{
                alert('no match data');
            }

            $('#page').val(loader.pageNum);

            $('#load_more').removeAttr('disabled');
        },
        initialize:function(){
            $('#load_more').on('click',loader.fetchWaterFallItem);
        }
    }
    //执行初始化
    loader.initialize();
})();