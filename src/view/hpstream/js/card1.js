;(function($){
    $.fd = $.fd ||{};
    //主标题
   
     $.fd.spanHTML = function(option){
        var op = option;
        var $span= $('<span>').addClass(op.class||"").text(op.text);
        $span.css(op.style||"")
        if(op.event){
          for(var key in op.event){
            $span.on(key,op.event[key]) 
          }
        }
        return  $span;
     }

     $.fd.divHTML = function(option){
        var op = option;
        var $div= $('<div>').addClass(op.class||"").text(op.text);
        $div.css(op.style||"")
        if(op.event){
          for(var key in op.event){
            $div.on(key,op.event[key]) 
          }
        }
        return  $div;
     }

     $.fd.title = function(option){
      return  $.fd.spanHTML(option);
    }

    $.fd.subtitle = function(option){
      return $.fd.spanHTML(option);
    }

    $.fd.status = function(option){
      return $.fd.spanHTML(option);
    }

    $.fd.textHeader = function(option){
      var isContent = ['title','subtitle','status'];
      var op = option;
      var $header = $('<div>').addClass(op.class||"");
      $header.css(op.style||"")
      for(var i=0;i<isContent.length;i++){
        var tem = isContent[i];
        if(option[tem]){
          var $dom = $.fd[tem](op[tem]);
          $header.append($dom);
        }
      }
      return $header;
    }
    $.fd.custom = function(option){
      return $.fd.spanHTML(option);
    }
    $.fd.bottom = function(option){
      return $.fd.spanHTML(option);
    }
    $.fd.bottoms = function(Arr){
      var $tool =  $.fd.divHTML({class:"card_tool"});
      var $MoreTool =  $.fd.spanHTML({text:"更多",event:{click:MoreShow}});
      var $ChildTool =  $.fd.divHTML({class:"card_chilren"});
      var newArr = Arr;
      for(var i=0;i<newArr.length;i++){
        if(i<2){
          $tool.append($.fd.spanHTML(newArr[i]));
        }else{
          $ChildTool.append($.fd.spanHTML(newArr[i]));
        } 
      }
      if(newArr.length>2){
        $tool.append($MoreTool);
        $ChildTool.hide();
      }
      $tool.append($MoreTool);
      $tool.append($ChildTool);

      function MoreShow(e){
        if($ChildTool.is(":visible")){
          $ChildTool.hide();
        }else{
          $ChildTool.show();
        }
      }
      return $tool;
    };
    $.fd.ToolHeader = function(option){
      var isContent = ['custom','bottoms'];
      var op = option;
      var $header = $('<div>').addClass(op.class||"");
      $header.css(op.style||"")
      for(var i=0;i<isContent.length;i++){
        var tem = isContent[i];
        if(option[tem]){
          var $dom = $.fd[tem](op[tem]);
          $header.append($dom);
        }
      }
      return $header;
    }
    $.fd.createHeader = function(option){
     var $root= $.fd.divHTML({class:"card_title"});
     var $textHeader =  $.fd.textHeader(option);
     var $ToolHeader =  $.fd.ToolHeader(option);

      $root.append($textHeader);
      $root.append($ToolHeader);
      return  $root;
    }



})($);