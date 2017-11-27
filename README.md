# Image-crx
a image link inspect extension

## config
- listen: 是否进行监听
- show: 是否在页面展示监听到的图片元素
- types: 要监听的资源类型(可选：image、script、sctylesheet)
- urls：监听哪些域名下的资源
- filter：都某些类型文件过滤，例如监听image类型，但过滤gif

## use
- 如需要使用该插件，必须打开开发者工具
- 可以点击浏览器右上角icon打开配置，或进入扩展程序页面点击选项进行配置
- 当更新配置后，需要关闭开发者工具并重新打开，然后刷新页面
- 如果发现某些资源符合过滤条件并没有出现在过滤栏中，则该图片可能是从缓存中读取，没有发送请求
