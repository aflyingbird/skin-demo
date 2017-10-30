//# sourceURL=util.js
/*提供基础的公共方法*/
(function($){
    'use strict';
    $(function(){
        $.fd = $.fd || {};
        //遮罩层方法（进度条+gif图）
        $.fd.loadingProgress = function($div,close){
            $div.css("position","relative");
            var loading_count = 5;
            var clock = setInterval(function(){
                if($(".loadingPanel",$div).length == 0){
                    var html = "<div class = 'loadingPanel'>"+
                        "<div class = 'loadingType'>"+
                        "<div id = 'loading-progress' class = 'loading-progress'>"+
                        "<div class = 'progress-left'></div>"+
                        "</div>"+
                        "<span style = 'display:inline-block;margin-left:20px;' class = 'progressFont'><span class = 'progress-num'>5</span>%</span>"+
                        "</div>"+
                        (close?"<span class = 'fa fa-times-circle' style = 'position:absolute;top:3px;right:3px;color:red;'></span>":"")+
                        "</div>";
                    $div.append(html);
                }
                loading_count+=5;
                $("#loading-progress .progress-left",$div).css("width",loading_count+"%");
                $(".progress-num",$div).text(loading_count);
                if(loading_count == 70){
                    clearInterval(clock);
                }
            },500);
            $("fa-times-circle",$div).bind("click",function(){
                clearInterval(clock);
                $(this).parent().remove();
            });
        };
        //$.fd.loadingProgress($(".workload .oue"));
        //$.fd.removeProgress($div);
        $.fd.removeProgress = function($div){
            var html =  "<div class = 'loading-progress' style = 'float:left;'>"+
                "<div class = 'progress-finish'></div>"+
                "</div>"+
                "<span class = 'fa fa-check-circle' style = 'color:#00A854;margin-left:20px;'></span>";
            $(".loadingPanel .loadingType",$div).empty().append(html);
            setTimeout(function(){
                $(".loadingPanel",$div).remove();
            },300);
        };

        $.fd.loadingCircle = function($div,close){
            $div.css("position","relative");
            if($(".loadingPanel",$div).length == 0){
                var html = "<div class = 'loadingPanel'>"+
                    "<div class = 'loadingType'>"+
                    "<div class = 'bgc'></div>"+
                    "</div>"+
                    (close?"<span class = 'fa fa-times-circle' style = 'position:absolute;top:3px;right:3px;color:red;'></span>":"")+
                    "</div>";
                $div.append(html);
            }
            $("fa-times-circle",$div).bind("click",function(){
                $(this).parent().remove();
            });
        }
        $.fd.removeCircle = function($div){
            $(".loadingPanel",$div).remove();
        };

        //根据sort拼接模板
        $.fd.initModel = function(opt,sort){
            var $root = $("<div>").addClass(opt.icon||"").attr("majorKey","{{"+opt.key+"}}");
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
            return $row;
        }
        $.fd.init_col = function(obj,opt,width){
            var $col = $("<div>").addClass("f_init_col").css({ width: width,display:"inline-block"});
            $col.append($("<span>").css({width: (opt.labelWidth || "auto"),"text-align":"right"}).text(( obj.text == undefined ? ("{{" + obj.name + "}}") : obj.text)+"："));
            $col.append($("<span>").addClass("f_init_col_content").text("{{" + obj.name + "}}"));
            $.fd.addDisplayMode($col,opt);
            return $col;
        }
        $.fd.addDisplayMode = function ($dom,opt) {
            if(opt.show){
                $dom.attr("show",opt.show)
            }
            if(opt.disable){
                $dom.attr("disable",opt.disable)
            }
            if(opt.readonly){
                $dom.attr("readonly",opt.readonly)
            }
        }
        $.fd.showDisplayMode = function($dom,dataObj){
            $.each($("[show]",$dom),function(e,d){
                var data = dataObj[$(d).closest("[majorKey]").attr("majorKey")];
                var result = eval($(d).attr("show"));
                if(result){
                    $(d).remove();
                }
                $(d).removeAttr("show");
            })
            $.each($("[disable]",$dom),function(e,d){
                var data = dataObj[$(d).closest("[majorKey]").attr("majorKey")];
                var result = eval($(d).attr("disable"));
                if(result){
                    $(d).addClass("disable");
                }
                $(d).removeAttr("disable");
            })
            $.each($("[readonly]",$dom),function(e,d){
                var data = dataObj[$(d).closest("[majorKey]").attr("majorKey")];
                var result = eval($(d).attr("readonly"));
                if(result){
                    $(d).addClass("readonly");
                }
                $(d).removeAttr("readonly");
            })
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
            return $footer;
        }
        $.fd.init_checkbox = function($dom) {
            var $span = $("<span>").addClass("fa fa-square-o");//fa-square-o
            return $span;
        }
        $.fd.init_radio = function($dom) {
            var $span = $("<span>").addClass("fa fa-circle-o");//fa fa-circle-o
            return $span;
        }
        $.fd.init_collapse = function($dom) {
            var $span = $("<span>").addClass("fa fa-chevron-circle-right");//fa-chevron-circle-right
            return $span;
        }
        $.fd.init_title = function($dom,param){
            var $span = "<div class = 'init_titleName'>"+
                "<span class = 'titleStyle "+(param.click?"titleClick":"")+"'>"+
                (param.name?"{{"+param.name+"}}":"")+"</span>"+
                "<span class = 'subTitleStyle'>"+
                "<span>"+(param.subTitle.text?param.subTitle.text+"：":"")+"</span>"+
                "<span>"+(param.subTitle.name?"{{"+param.subTitle.name+"}}":"")+"</span>"+
                "</span>"+
                "</div>";
            return $span;
        }
        $.fd.init_switch = function($dom,param,pdr){
            $dom.css("width",param.width);
            var $span = "<div class = 'init_switch' style = 'right:"+(pdr+20)+"px;'>"+
                "<span>"+param.text+"</span>"+
                "<span class = 'fa fa-toggle-off'></span>" +
                "</div>";
            return $span;
        }
        $.fd.init_head = function(head){
            var $head = $("<div>").addClass("init_head");//头部最外层DIV
            var $operate = $("<div>").addClass("head_operate");//多选，单选和收缩的div,定宽
            var $title = $("<div>").addClass("head_title");//标题
            var btnLen = head.bottoms.length;
            var pdr = btnLen * 60 + (head.custom.width || 0);
            $head.css({padding:"0px "+pdr+"px 0px 50px"});
            if(head.operate){
                $operate.append($.fd["init_"+head.operate]($operate));
                $head.append($operate);
            }
            if(head.title){
                var $title = $("<div>");
                $title.append($.fd["init_title"]($title,head.title));
                $head.append($title);
            }
            if(head.custom.type){
                var $custom = $("<div>");
                $custom.append($.fd["init_"+head.custom.type]($custom,head.custom,pdr));
                $head.append($custom);
            }
            if(btnLen > 0){
                var $bottoms = $("<div>").addClass("f_init_bottoms_panel").css({width:(btnLen*60)});
                $bottoms.append($.fd["init_bottoms"]($bottoms,head.bottoms));
                $head.append($bottoms);
            }

            return $head;
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
            var length = btns.length;
            var bottoms = [];
            for(var i = 0; i < length; i++) {
                var item = btns[i];
                var $item = $("<div>").addClass("f_init_bottoms").attr("name",item.name);
                console.log(item)
                if(item.show){
                    $item.attr("show",item.show)
                }
                if(item.disable){
                    $item.attr("disable",item.disable)
                }
                if(item.readonly){
                    $item.attr("readonly",item.readonly)
                }
                $.fd.addDisplayMode($item,item);
                if(item.child){
                    bottoms.push($item
                        .append($("<div>").addClass("f_init_bottoms_more").text(item.text || ("{{"+item.name+"}}")))
                        .append($.fd.init_absolutePanel(item.child))
                    );
                }else{
                    bottoms.push($item
                        .append($("<span>").text(item.text || ("{{"+item.name+"}}"))));
                }
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
            var match = modal.match(/{{.*?}}/g);
            match = $.fd.removeSameArray(match);
            var length = match.length;
            var key = "";
            for(var i = 0; i < length; i++){
                key = match[i].replace(/^{{/,"").replace(/}}$/,"");
                modal = modal.replace(new RegExp(match[i],"g"), (obj[key] || ""));
            }
            return modal;
        }
        $.fd.changeArrayToObj = function(arr, key){
            var len = arr.length;
            var obj = {};
            for(var i = 0; i < len; i++){
                obj[arr[i][key]] = arr[i];
            }
            return obj;
        }
        $.fd.bindClickByName = function ($dom,event) {
            for(var key in event){
                $dom.on(event[key].type,event[key].select,key,function(e){
                    e.stopPropagation();
                    var key = e.data
                    var majorKey = $(this).closest("[majorKey]").attr("majorKey");
                    if(!($(this).hasClass("disable"))){
                        event[key].fun(majorKey);
                    }
                })
            }
        }
        $.fd.bindCommonEvent = function($dom){
            //开关切换
            $dom.on("click",".fa-toggle-off, .fa-toggle-on",function(e){
                e.stopPropagation();
                if($(this).hasClass("fa-toggle-off")){
                    $(this).removeClass("fa-toggle-off").addClass("fa-toggle-on");
                }else{
                    $(this).addClass("fa-toggle-off").removeClass("fa-toggle-on");
                }
            })
            //更多按钮展开
            $dom.on("click",".f_init_bottoms_more",function(e){
                e.stopPropagation();
                $(this).next(".f_init_absolutePanel").show();
                $("body").bind("click", body_ab_panle);
            })
            //收起展开
            $dom.on("click",".fa-chevron-circle-right, .fa-chevron-circle-down",function(){
                if($(this).hasClass("fa-chevron-circle-right")){
                    $(this).removeClass("fa-chevron-circle-right").addClass("fa-chevron-circle-down");
                    $(this).parent().parent().nextAll().show();
                }else{
                    $(this).addClass("fa-chevron-circle-right").removeClass("fa-chevron-circle-down");
                    $(this).parent().parent().nextAll().hide();
                }
            })
            //单选
            $dom.on("click",".fa-dot-circle-o, .fa-circle-o",function(){
                if($(this).hasClass("fa-dot-circle-o")){
                    $(this).removeClass("fa-dot-circle-o").addClass("fa-circle-o");
                }else{
                    $(this).addClass("fa-dot-circle-o").removeClass("fa-circle-o");
                }
            })
            //多选
            $dom.on("click",".fa-check-square-o, .fa-square-o",function(){
                if($(this).hasClass("fa-check-square-o")){
                    $(this).removeClass("fa-check-square-o").addClass("fa-square-o");
                }else{
                    $(this).addClass("fa-check-square-o").removeClass("fa-square-o");
                }
            })
        }

        $.fd.cardTable = function(option){
            var defaultOpt = {
                head:{
                    operate: "checkbox/radio/collapse/''",//多选，单选，收缩展开,没有任何内容
                    status: "status",
                    custom: {name:"",text:"",type:""},//定制操作，type
                    bottoms: [{name:"编辑",show:"data.key === ''&& data.status == '1'",disable:"data.status == '0'",readonly:false}],
                    show:true // true / false / ('key == "12" && status == "1"') 值可以是一个Booleans也可以是一个表达式，根据返回的true/false判断是否需要显示
                },
                content:{
                    type: "form",
                    labelWidth: "100px",
                    params: []
                },
                footer:{
                    labelWidth: "80px",
                    params:[],
                    show:false,
                },
                data: [],
                event: {
                    "编辑":{type:"click",select:"[name = '编辑']",fun:function(key){
                        console.log(key);
                    }
                    }
                },
                div: $("<div>"),
                icon: "f_cardTable",
                width: "100%",
                page: false
            }
            var opt = $.extend(true,{},defaultOpt,option);
            var sort = ["head","content","footer"];
            var cardHtml = $.fd.initModel(opt,sort);
            var back = {
                html : cardHtml,
                dom : opt.div,
                data: [],
                opt: opt,
                dataObj: [],
                refresh : function(data){
                    data = data || [];
                    var len = data.length;
                    var $dom = this.dom;
                    var modal = this.html;
                    $dom.empty();
                    if(len === 0){
                        $dom.append($("<div>").addClass("noData").text("没有找到数据"));
                    }else{
                        for(var i = 0; i < len;i++){
                            $dom.append($.fd.changeModel(modal, data[i]));
                        }
                    }
                    opt.data = data;//刷新的时候需要同步更新数据
                    opt.dataObj = $.fd.changeArrayToObj(opt.data,opt.key);
                    $.fd.showDisplayMode(opt.div,opt.dataObj);//根据数据处理页面需要显示和置灰的元素
                },
                add: function(data){
                    data = data || {};
                    $dom.prepend($.fd.changeModel(modal, data));
                    this.refreshPageTool();//新增
                },
                remove: function (key) {
                    if(key){
                        $("[majorKey='"+key+"']",this.dom).remove();
                    }else{
                        this.dom.empty();
                    }
                    this.refreshPageTool(true);
                },
                edit:function (key, obj) {

                },
                getData: function (key) {
                    if(key){
                        return this.dataObj[key];
                    }else{
                        return this.data;
                    }
                },
                getSelected: function () {
                    var selectors = $("[majorKey].selected",this.dom);
                    var data = [];
                    var length = selectors.length;
                    for(var i = 0; i<length; i++){
                        data.push(this.dataObj($(selectors[i]).attr("majorKey")));
                    }
                    return data;
                },
                refreshPageTool:function (flag) {
                    flag = flag || false;
                }
            }
            back.refresh(opt.data);
            $.fd.bindClickByName(opt.div,opt.event);
            $.fd.bindCommonEvent(opt.div);
            return back;
        }
    });
})(jQuery);
