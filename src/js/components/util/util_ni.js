//# sourceURL=util_ni.js
(function($){
    'use strict';
    $(function(){
        $.fd = $.fd || {};
        //defaultOpt是每一个单独的元素都可以配置的属性，不同类型可以有自己单独的配置
        var defaultOpt = {
            title:"caeseName",//显示data中key值的内容
            text:"",//显示的固定内容
            key:"",//返回数据中不重复的主键
            icon:"",//矢量图
            className:"",//使用的class
            name:"",//定义名称
            width:"",//宽度
            type:"",//类型，每个类型对应
            min:"",//最小值 - input munber 等输入框的配置属性
            max:"",//最大值 - input munber 等输入框的配置属性
            reg:"",//正则 - input munber 等输入框的配置属性
            child:[],//是否有更多的显示内容，child中的每一个对象都是一个defaultOpt配置
            group:[],//一组配置，主要类型有,单选,多选,时间范围选择,btn组
            //是否显示，返回true/false
            formatter:function(title){
                return title;
            },
            //是否显示，返回true/false
            show:function(data){
                return data.name == "sds";
            },
            //是否禁用 返回true/false
            disable:function(data){
                return false;
            },
            //是否只读 返回true/false
            readonly:function(data){
                return false;
            },
            //点击事件
            click:function(key,value,data){

            },
            //change事件
            change:function(key,value,data){

            }
        }
        var type = {
            btn:$.fd.initBtn,//按钮
            span:$.fd.initSpan,//返回一个span标签
            label:$.fd.initLabel,//返回一个label标签
            div:$.fd.initDiv,//返回一个div
            input:"",//返回一个输入框
            textArea:"",//返回文本域
            number:"",//数字类型输入
            time:"",//单个时间选择,默认为年月日
            time_year:"",//单个时间选择,选择到年
            time_month:"",//单个时间选择,选择到月
            timeRange:"",//时间范围选择
            timeRange_year:"",//时间范围选择,选择到年
            timeRange_month:"",//时间范围选择,选择到月
            select:"",//下拉框
            radio:$.fd.initRadio,//单选按钮
            checkbox:$.fd.initCheckbox,//多选按钮
            switch:$.fd.initSwitch,//开关
            collapse:$.fd.initCollapse,//收起展开
            panel:$.fd.initPanel,//一个展示模块
            tree:"",//一个选择树
            selectTree:""//下拉框选择树
        }
        $.fd.initOpt = function(obj,opt,$dom){

        }
        $.fd.initBtn = function(obj,opt){
            var $dom = $("<div>").addClass("btn");
            opt.className = opt.className || "btn-primary";
            $.fd.initOpt(obj,opt,$dom);
            return $dom;
        }
        $.fd.initSpan = function(obj,opt){
            var $dom = $("<span>");
            $.fd.initOpt(obj,opt,$dom);
            return $dom;
        }
        $.fd.initLabel = function(obj,opt){
            var $dom = $("<label>");
            $.fd.initOpt(obj,opt,$dom);
            return $dom;
        }
        $.fd.initDiv = function(obj,opt){
            var $dom = $("<div>");
            $.fd.initOpt(obj,opt,$dom);
            return $dom;
        }
        $.fd.initRadio = function(obj,opt){
            var $dom = $("<div>");
            $.fd.initOpt(obj,opt,$dom);
            return $dom;
        }
        $.fd.initCheckbox = function(obj,opt){
            var $dom = $("<div>");
            $.fd.initOpt(obj,opt,$dom);
            return $dom;
        }
        $.fd.initSwitch = function(obj,opt){
            var $dom = $("<div>");
            $.fd.initOpt(obj,opt,$dom);
            return $dom;
        }
        $.fd.initCollapse = function(obj,opt){
            var $dom = $("<div>");
            $.fd.initOpt(obj,opt,$dom);
            return $dom;
        }
        $.fd.initPanel = function(obj,opt){
            var $dom = $("<div>");
            $.fd.initOpt(obj,opt,$dom);
            return $dom;
        }
        $.fd.initModel = function(data,opt){
             var length = data.length;
             var back = [];
             for(var i = 0;i<length;i++){
                 back.push($.fd.initSingleModel(data[i],opt));
             }
             return back;
        }
        [[{type:"collapse"},{title:},{}],
            [],
            []
         ]
        // opt = opt || [
        //      //每个是一正行，里面的每一个子类是一列,没有定义宽度的时候默认float：left
        //     [{type:"collapse"},{title:"",type:"span",className:"title"},{title:"",text:"",className:"subTitle"}],
        //     [{},{}]
        //     ];
        //生成一行
        // [{typr:"tadio"},{type:"span",title:"caseNo",className:"title ",width:"20%"},
        //     {type:"btn",className:"tool-right",group:[{},{},{title:"",}]}]
        $.fd.initRowModel = function(obj,opt){
            var $div = $("<div>").addClass("col-md-12");
            var length = opt.length;
            for(var i = 0;i<length;i++){
                $div.append($.fd.initLineModel(obj,opt[i]));
            }
            return $div;
        }
        $.fd.initCard = function(opt){
            opt = {
                div:"",
                id:"",
                head:{title:"",subTitle,button:"",wid}
            }
            [title,"cubtitle"]
            title:"",
            cubTitle:""
        }
        //生成一列
        $.fd.initLineModel = function(obj,opt){
            var length = opt.length;
            var back = [];
            for(var i = 0;i<length;i++){
                back.push( type[( opt[i].type || "default" )](obj, opt[i]) );
            }
            return back;
        }

    });
})(jQuery);
