# dynamicServerTime
动态展示服务器时间

通过js获取服务器时间，然后展示在页面上

# 全局方法 dynamicServerTime(options)
```
new dynamicServerTime ({
  eleId: 'time'
})
```
# 参数说明 options
- eleId: '', // 存放最终展示时间的元素id，必传
- url: '',  // 请求服务器端地址，传入数据为时间戳，秒单位，如不传，则取客户端当前时间
- duration: 15000,  // 多长时间同步一次服务器端时间，默认15秒
- jsonp: true, // 是否jsonp请求方式，默认为true
- dataKey: '', // 如果不为jsonp请求方式，则需提供服务端返回时间戳的key
- format: 'y-m-d h:i:s w' // 输出格式，y年m月d日h时i分s秒w周，默认'y-m-d h:i:s w'

# 注意事项
因涉及到dom操作，所以运行次方法时要确定dom结构已加载完毕，例：
```
window.onload = function(){
new dynamicServerTime ({
  eleId: 'time'
})
}
```
