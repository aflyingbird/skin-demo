/**
 * 卡片
 */

 ;(function($){
    $.fd = $.fd || {};

    //完成头部
    
    $.fd.cardeHead = function(option){
        var template ;
        var ModelStr; 
    
        if(option.head){
            template = $.fd.cardeHeadTemplate(option.head);
            ModelStr =  $.fd.cardeModel(template,option.data);
            $(option.dDiv).append(ModelStr);
            $.fd.bindCommonEvent(option.event,option.dDiv);
        }
    }

    $.fd.cardeHeadTemplate = function(option){
        var $head = $("<div>").addClass("init_head");//头部最外层DIV
        var $icon = $("<div>").addClass("head_icon");//多选，单选和收缩的div,定宽
        var $title = $("<div>").addClass("head_title");//标题
        var $status = $("<div>").addClass("head_status");//状态
        var $tool = $("<div>").addClass("head_tool");//右侧工具条
        var $custom = $("<div>").addClass("custom");//开关
        var $moreTool = $("<div>").addClass("head_More");//右侧工具条
        var key ;
        var MyDom;
        var text ;
        var bottoms;
        var headArr  = [
                        {name:"title",dom:$title},
                        {name:"subtitle",dom:$title},
                        {name:"status",dom:$status },
                        {name:"custom",dom:$custom},
                       
                        ];
        
        for(var i=0;i<headArr.length;i++){

            key = headArr[i].name;
            MyDom =headArr[i].dom;
            if(option[key]){
                    text =  "{{"+(option[key].field) +"}}";
                    MyDom.append(text);  
            }
        }
            //特殊处理是事件按钮
            bottoms = option.bottoms;
        if(bottoms instanceof Array){
            var len = bottoms.length;
            for(var j=0;j<len;j++){
                text = bottoms[j].text;
                $tool.append($('<span>').attr('field',bottoms[j].field).append(text));

                if(bottoms[j].child){
                   var children =  bottoms[j].child;
                        for(var n=0;n<children.length;n++){
                            text = children[n].text;     
                            $moreTool.append($('<span>').attr('field',bottoms[j].field).append(text));
                }        
            }  
            }
        }
      
        $tool.append($moreTool);
        $head.append($icon);
        $head.append($title);
        $head.append($status);
        $head.append($tool);
        return $head[0].outerHTML;
    }

    $.fd.cardeModel = function(str,data){
      var exp ;
      var temp = str;
      for(var key in data){
        exp = new RegExp("{{"+key+"}}",'g');
        temp = temp.replace(exp,data[key])
      }
     return  temp;
    }

    $.fd.bindCommonEvent = function(opt,div){
        var event = opt;
        var temp;
        for(var key in event){
            temp = event[key];
            $(div).on(temp.type,"[field="+key+"]",temp.fun);
        }

    };

    
 })($);