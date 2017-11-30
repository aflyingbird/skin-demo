

;(function($){
    
        var option = {
            
           
                //field表示后端传过来的key,text表示默认值
                title:{text:"主标题",class:"card_title",event:{click:fnTitle}},
                subtitle:{text:"副标题",class:"card_subtitle"},
                status:{text:"进行中"},
                custom:{field:"",text:"生效版本",type:"switch"},
                bottoms:[
                            {field:"编辑",text:"编辑",readonly:true},
                            {field:"复制",text:"复制" ,disable:true},                         
                            {field:"更多-定版",text:"定版"},
                            {field:"更多-删除",text:"删除"}
                           
                        ]
           
        }
       function fnTitle(e){
            console.log(e);
        }
        var s = $.fd.createHeader (option);
        $('body').append(s);

 

})($);