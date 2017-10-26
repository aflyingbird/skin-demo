//# sourceURL=util.js
/*提供基础的公共方法*/
(function($){
    'use strict';
    $(function(){
        $.fd = $.fd || {};
        $.fd.initModel = function(opt,sort){
            var $root = $("div").addClass(opt.icon||"");
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
            return Math.floor(Math.pow(10, (len+2)) / parseFloat(num)) / Math.pow(10,(len)) + "%";
        }
        //f_init_row width:100%;
        $.fd.init_row = function(row,opt){
            var $row = $("<div>").addClass("f_init_row");
            var len = row.length;
            var colWidth = $.fd.averageFloor(len);
            for(var i = 0;i < len; i++){
                $row.append($.fd.init_col(row[i],opt,colWidth));
            }
            return $row;
        }
        $.fd.init_col = function(obj,opt,width){
            var $col = $("<div>").addClass("f_init_col").css({ width: colWidth });
            $col.append($("<span>").css({width: (opt.labelWidth || "auto")}).text("{{" + (obj.text === undefind ? obj.name : obj.text) + "}}"));
            $col.append($("<div>").addClass("f_init_col_content").text("{{" + obj.name + "}}"));
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
            var pdr = head.bottoms.length * 80 + (head.custom.width || 0);
            $head.css({padding:"5px "+pdr+"px 5px 50px"});
            if(head.operate){
                $operate.append($.fd["init_"+head.operate]($operate));
            }
            if(head.title){
                var $title = $("<div>");
                $title.append($.fd["init_title"]($title));
            }
            if(head.custom.type){
                var $custom = $("<div>");
                $custom.append($.fd["init_"+head.custom.type]($custom));
            }
            if(head.bottoms.length>0){
                var $bottoms = $("<div>");
                $bottoms.append($.fd["init_bottoms"]($bottoms));
            }
            $head.append();
            // {
            //     operate: "checkbox/radio/collapse/''",//多选，单选，收缩展开,没有任何内容
            //     status: "status",
            //     custom: {name:"",text:"",type:"switch",width:"150"},//定制操作，type
            //     bottoms: []
            // }
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
