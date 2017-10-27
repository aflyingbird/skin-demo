//# sourceURL=util.js
/*提供基础的公共方法*/
(function($){
    'use strict';
    $(function(){
        $.fd = $.fd || {};
        //根据sort拼接模板
        $.fd.initModel = function(opt,sort){
            var $root = $("<div>").addClass(opt.icon||"");
            var len = sort.length;
            var key = "";
            for(var i = 0;i < len;i++){
                key = sort[i];
                $root.append($.fd["init_"+key](opt[key]));
            }
            return $root.selfHtml();
        }
        //num 均分多少分，len 保留几位小数 return "50%"
        $.fd.averageFloor = function(num, len){
            len = len || 2;
            if(num == 0){
                return "100%";
            }else{
                return Math.floor(Math.pow(10, (len+2)) / parseFloat(num)) / Math.pow(10,(len)) + "%";
            }
        }
        //f_init_row width:100%;
        $.fd.init_row = function(row,opt){
            var $row = $("<div>").addClass("f_init_row");
            var len = row.length;
            var colWidth = $.fd.averageFloor(len);
            for(var i = 0;i < len; i++){
                $row.append($.fd.init_col(row[i],opt,colWidth));
            }
            console.log("init_row",$row.selfHtml())
            return $row;
        }
        $.fd.init_col = function(obj,opt,width){
            var $col = $("<div>").addClass("f_init_col").css({ width: width });
            $col.append($("<span>").css({width: (opt.labelWidth || "auto")}).text("{{" + (obj.text == undefined ? obj.name : obj.text) + "}}"));
            $col.append($("<div>").addClass("f_init_col_content").text("{{" + obj.name + "}}"));
            console.log("init_col",$col.selfHtml())
            return $col;
        }
        $.fn.selfHtml = function(){
            return $(this)[0].outerHTML;
        }
        //content.labelWidth 每个配置的描述所占宽度，params [], 每一项表示每一行的配置， content 的类型，目前只有form
        $.fd.init_content = function(content) {
            var $con = $("<div>").addClass("f_init_content"),
                type = content.type,
                len = content.params.length;
            //表单的形式
            if (type === 'form') {
                for (var i = 0; i < len; i++) {
                    var item = content.params[i].item;
                    $con.append($.fd.init_row(item,content));
                }
            }
            console.log("init_content",$con.selfHtml())
            return $con;
        }
        $.fd.init_footer = function(footer){
            var $footer = $("<div>").addClass("init_footer");
            var params = footer.params || [];
            var length = footer.params.length;
            for (var i = 0; i < length; i++) {
                var item = params[i].item;
                $footer.append($.fd.init_row(item,footer));
            }
            console.log("init_content",$footer.selfHtml())
            return $footer;
        }
        $.fd.init_checkbox = function($dom) {
            var $span = $("<span>").addClass("fa fa-square-o");//fa-square-o
            $dom.on("click",".fa",function(){
                if($(this).hasClass("fa-check-square-o")){
                    $(this).removeClass("fa-check-square-o").addClass("fa-square-o");
                }else{
                    $(this).addClass("fa-check-square-o").removeClass("fa-square-o");
                }
            })
            console.log("init_checkbox",$span.selfHtml())
            return $span;
        }
        $.fd.init_radio = function($dom) {
            var $span = $("<span>").addClass("fa fa-circle-o");//fa fa-circle-o
            $dom.on("click",".fa",function(){
                if($(this).hasClass("fa-dot-circle-o")){
                    $(this).removeClass("fa-dot-circle-o").addClass("fa-circle-o");
                }else{
                    $(this).addClass("fa-dot-circle-o").removeClass("fa-circle-o");
                }
            })
            console.log("init_radio",$span.selfHtml())
            return $span;
        }
        $.fd.init_collapse = function($dom) {
            var $span = $("<span>").addClass("fa fa-chevron-circle-right");//fa-chevron-circle-right
            $dom.on("click",".fa",function(){
                if($(this).hasClass("fa-chevron-circle-right")){
                    $(this).removeClass("fa-chevron-circle-right").addClass("fa-chevron-circle-down");
                    $(this).parent().parent().nextAll().show();
                }else{
                    $(this).addClass("fa-chevron-circle-right").removeClass("fa-chevron-circle-down");
                    $(this).parent().parent().nextAll().hide();
                }
            })
            console.log("init_collapse",$span.selfHtml())
            return $span;
        }
        $.fd.init_title = function($dom) {
            var $span = $("<span>").addClass("fa fa-dot-circle-o");//fa fa-circle-o
            $dom.on("click",".fa",function(){

            })
            return $span;
        }
        $.fd.init_head = function(head){
            var $head = $("<div>").addClass("init_head");//头部最外层DIV
            var $operate = $("<div>").addClass("head_operate");//多选，单选和收缩的div,定宽
            var $title = $("<div>").addClass("head_title");//标题
            var btnLen = head.bottoms.length;
            var pdr = btnLen * 80 + (head.custom.width || 0);
            $head.css({padding:"5px "+pdr+"px 5px 50px"});
            if(head.operate){
                $operate.append($.fd["init_"+head.operate]($operate));
            }
            if(head.title){
                var $title = $("<div>");
                $title.append($.fd["init_title"]($title,head.title));
            }
            if(head.custom.type){
                var $custom = $("<div>");
                $custom.append($.fd["init_"+head.custom.type]($custom,head.custom));
            }
            if(btnLen > 0){
                var $bottoms = $("<div>").addClass("f_init_bottoms").css({width:(btnLen*80)});
                $bottoms.append($.fd["init_bottoms"]($bottoms,head.bottoms));
            }
            $head.append();
            // {
            //     operate: "checkbox/radio/collapse/''",//多选，单选，收缩展开,没有任何内容
            //     status: "status",
            //     custom: {name:"",text:"",type:"switch",width:"150"},//定制操作，type
            //     bottoms: []
            // }
        }
        //根据配置生成对应的string模板 params:[{name:"",text:""}] ,name用来绑定事件，text:显示的内容，type:待添加，支持不同形式的按钮
        $.fd.init_absolutePanel = function(params){
             var $panel = $("<div>").addClass("f_init_absolutePanel");
             for(var i = 0;i<params.length;i++){
                 $panel.append($("<div>").attr("name",params[i].name).text(params[i].text||params[i].name));
             }
             console.log("init_absolutePanel",$panel.selfHtml())
             return $panel;
        }
        //<div class = "f_init_bottoms"> 相对定位
        //    <div class = "f_init_bottoms_more">更多</div>
        //    <div class = "f_init_absolutePanel"> 绝对定位，默认隐藏
        //       <div name = "">新增</div>
        //    </div>
        // </div>
        function hideAbsolutePanel() {
            $(".f_init_absolutePanel").fadeOut("fast");
            $("body").unbind("mousedown", body_ab_panle);
        }
        function body_ab_panle(e){
            if (!(e.target.className == "f_init_absolutePanel" || $(e.target).parents(".f_init_absolutePanel").length>0)) {
                hideAbsolutePanel();
            }
        }
        $.fd.init_bottoms = function($dom, btns) {
            $dom.on("click",".f_init_bottoms_more",function(e){
                e.stopPropagation();
                $(this).next(".f_init_absolutePanel").show();
                $("body").bind("click", body_ab_panle);
            })
            var length = btns.length;
            var bottoms = [];
            for(var i = 0; i < length; i++) {
                var item = btns[i];
                if(item.child){
                    bottoms.push($("<div>").addClass("f_init_bottoms")
                        .append($("<div>").addClass("f_init_bottoms_more").text(item.text || ("{{"+item.name+"}}")))
                        .append($.fd.init_absolutePanel(item.child))
                    );
                }else{
                    bottoms.push($("<div>").addClass("f_init_bottoms")
                        .append($("<span>").text(item.text || ("{{"+item.name+"}}"))));
                }
                console.log("init_bottoms",$(bottoms[i]).selfHtml())
            }
            return bottoms;
        }
        $.fd.removeSameArray = function(arr, key){
            var obj = {},
                length = arr.length,
                key_val = "",
                array = [];
            for(var i = 0; i<length; i++){
                if(key){
                    key_val = arr[i][key];
                }else{
                    key_val = arr[i];
                }
                if(!obj[key_val]){
                    array.push(arr[i])
                }
                obj[key_val] = true;
            }
            return array;
        }
        $.fd.changeModel = function(modal, obj){
            var matchs = modal.match(/{{.*?}}/g);
            matchs = $.fd.removeSameArray(matchs);
            var length = matchs.length;
            var key = "";
            for(var i = 0; i < length; i++){
                key = matchs[i];
                modal = modal.replace(new RegExp(matchs[i],"g"), obj[key]);
            }
            return modal;
        }
        $.fd.cardTable = function(option){
            var defaultOpt = {
                    head:{
                        operate: "checkbox/radio/collapse/''",//多选，单选，收缩展开,没有任何内容
                        status: "status",
                        custom: {name:"",text:"",type:""},//定制操作，type
                        bottoms: []
                    },
                    content:{
                        type: "form",
                        labelWidth: "80px",
                        params: []
                    },
                    footer:{
                        labelWidth: "80px",
                        params:[]
                    },
                    data: [],
                    icon: "f_cardTable",
                    width: "100%",
                    page: false
                }
            var opt = $.extend(true,{},defaultOpt,option);
            var sort = ["head","content","footer"];
            var cardHtml = $.fd.initModel(opt,sort);
        }
    });
})(jQuery);
