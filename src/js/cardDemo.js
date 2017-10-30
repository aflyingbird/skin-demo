/**
 * Created by lxx on 2017/10/30.
 */

;
(function($) {
    'use strict';
    $(function() {
        var cardOpt = {
            head:{
                operate: "collapse",
                status: "status",
                title:{name:"titleName",click:true,subTitle:{name:"gxsj",text:"更新时间"}},
                custom: {name:"sxbb",text:"生效版本",type:"switch"},
                bottoms: [{name:"编辑",text:"编辑",disable:"data.isBeabled == '1'",show:"data.isFinish == '1'"},{name:"复制",text:"复制"},{"name":"更多",text:"更多",show:"data.isFinish == '1'",child:[{name:"更多-定版",text:"定版"},{name:"更多-删除",text:"删除",disable:"data.isBeabled == '1'"}]}]
            },
            content:{
                type: "form",
                labelWidth: "100px",
                params: [{item:[{name:"kpsj",text:"考评时间"},{name:"sbjzsj",text:"上报截止时间"}]},{item:[{name:"remarks",text:"备注"}]}]
            },
            footer:{
                labelWidth: "80px",
                params:[]
            },
            data: [],
            div: $("#cardTableTest"),
            key: "id",
            event:{
                "编辑":{
                    type:"click",
                    select:"[name = '编辑']",
                    fun:editVersion
                },
                "复制":{
                    type:"click",
                    select:"[name = '复制']",
                    fun:copyVersion
                },
                "定版":{
                    type:"click",
                    select:"[name = '更多-定版']",
                    fun:sureVersion
                },
                "删除":{
                    type:"click",
                    select:"[name = '更多-删除']",
                    fun:deleteVersion
                },
                "生效版本":{
                    type:"click",
                    select:".init_switch>.fa",
                    fun:comeIntoForce
                },
                "标题查看":{
                    type:"click",
                    select:".init_titleName>.titleClick",
                    fun:enterNextPage
                },
            },
            icon: "f_cardTable",
            width: "100%",
            page: false
        };
        function refreshVersion(){
//			$.fd.ajax({
//				type: "get",
//				data: queryInfo,
//				url: "api/statistics/court/workload",
//				success: function (d) {
            //var data = d.data||[];
            var data = [{
                id:"123",
                titleName:"2017考评版本第一版已生效状态",
                kpsj:"2017-10至2017-12",
                sbjzsj:"2017-12-12",
                sxbb:true,
                gxsj:"2017-12-01",
                status:"已定制",
                isBeabled:"1",
                remarks:"第一期考评信息配置按照上次开会的来进行配置的。第一期考评信息配置按照上次开会的来进行配置的。第一期考"
            },{
                id:"1234",
                titleName:"2017考评版本第一版已生效状态",
                kpsj:"2017-10至2017-12",
                sbjzsj:"2017-12-12",
                sxbb:true,
                gxsj:"2017-12-01",
                status:"",
                remarks:"第一期考评信息配置按照上次开会的来进行配置的。第一期考评信息配置按照上次开会的来进行配置的。第一期考"
            },{
                id:"4343",
                titleName:"2017考评版本第一版已生效状态",
                kpsj:"2017-10至2017-12",
                sbjzsj:"2017-12-12",
                sxbb:false,
                gxsj:"2017-12-01",
                status:"",
                isFinish:"1",
                remarks:"第一期考评信息配置按照上次开会的来进行配置的。第一期考评信息配置按照上次开会的来进行配置的。第一期考"
            }];
            cardOpt.data = data;
            for(var i = 0;i<data.length;i++){
                versionObj[data[i].id] = data[i];
            }
            $.fd.cardTable(cardOpt);
//				}
//			});
        }
        refreshVersion();
    });
}(jQuery));