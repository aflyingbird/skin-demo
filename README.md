# skin-demo
一个前端代码整体架构
##src
存放前端代码
###view 
html 以及vue文件
###js
js文件
####consitute文件夹说明
该文件夹下面的所有文件是具体的每一个模块，供开发环境中使用。生成环境中会将该文件夹下所有的文件打包合并成consitute同级别下的文件
以element为例，consitute下所有的文件通过gulp合并混淆后生成element.js
###css
参照js说明
##server
node实现后端接口
