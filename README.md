# zxlite.js 完整 API 参考手册

**版本**: v1.3.7

## 概述

zxlite.js 是一个轻量级前端工具库，提供 DOM 操作、音频控制、动画效果、对话框扩展、动态主题、数据处理、网络请求等完整功能。所有 API 通过 `zxd` 对象调用，函数名简洁（1-10 个字符）。

**注意:对话框深色模式建议搭配深色主题，浅色建议搭配浅色主题！**

## 在线演示

[查看效果演示↗](https://res.viqu.com/web/test/zxlite.html)

## 引入方式

```html
<script src="https://res.viqu.com/web/js/zxlite.js"></script>
```

---

## 一、DOM 操作（30+ 个）

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.set(id, type, value)` | 设置元素属性 | `zxd.set('demo', 'text', 'Hello')` |
| `zxd.get(id, type)` | 获取元素属性 | `var text = zxd.get('demo', 'text')` |
| `zxd.new(pid, nid, tag, styles)` | 创建新元素 | `zxd.new('base', 'newDiv', 'div', {color:'red'})` |
| `zxd.del(id)` | 删除元素 | `zxd.del('newDiv')` |
| `zxd.$(selector, all)` | 选择器 | `zxd.$('.item', true)` |
| `zxd.id(id)` | 通过 ID 获取元素 | `var el = zxd.id('demo')` |
| `zxd.hide(id)` | 隐藏元素 | `zxd.hide('demo')` |
| `zxd.show(id)` | 显示元素 | `zxd.show('demo')` |
| `zxd.addClass(id, cls)` | 添加类名 | `zxd.addClass('demo', 'active')` |
| `zxd.rmClass(id, cls)` | 移除类名 | `zxd.rmClass('demo', 'active')` |
| `zxd.hasClass(id, cls)` | 判断类名 | `zxd.hasClass('demo', 'active')` |
| `zxd.html(id, html)` | 获取/设置 innerHTML | `zxd.html('demo', '<b>粗体</b>')` |
| `zxd.text(id, txt)` | 获取/设置 textContent | `zxd.text('demo', '文本')` |
| `zxd.val(id, v)` | 获取/设置表单值 | `zxd.val('input1', '张三')` |
| `zxd.css(id, prop, val)` | 获取/设置样式 | `zxd.css('demo', 'color', 'red')` |
| `zxd.append(parent, child)` | 追加子元素 | `zxd.append('parent', 'child')` |
| `zxd.prepend(parent, child)` | 前置子元素 | `zxd.prepend('parent', 'child')` |
| `zxd.gui(type, value, all)` | 获取元素 | `zxd.gui('class', 'card', true)` |

### type 参数说明（set/get）

| type | 说明 |
|------|------|
| `text` | 文本内容 |
| `html` | HTML 内容 |
| `val` | 表单值 |
| `attr` | 元素属性 |
| `css` | CSS 样式 |
| `class` | 类名 |

---

## 二、音频控制（7 个）

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.play(url)` | 播放音乐，返回控制器 ID | `var ctrl = zxd.play('music.mp3')` |
| `zxd.pc(id, action)` | 控制音频 | `zxd.pc(ctrl, 'pause')` |
| `zxd.pis(id)` | 是否正在播放 | `var isPlay = zxd.pis(ctrl)` |
| `zxd.pp(id, time)` | 设置/获取播放进度（秒） | `zxd.pp(ctrl, 30)` |
| `zxd.pa(id)` | 获取音频总时长（秒） | `var dur = zxd.pa(ctrl)` |
| `zxd.pv(id, volume)` | 设置音量（0-100） | `zxd.pv(ctrl, 50)` |

### pc action 参数说明

| action | 说明 |
|--------|------|
| `start` / `continue` | 开始/继续播放 |
| `pause` | 暂停 |
| `stop` | 停止并重置进度 |
| `kill` | 销毁音频 |
| `loop` | 循环播放 |

---

## 三、动画效果（30+ 种预设动画）

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.anim(id, type, duration, direction)` | 执行动画 | `zxd.anim('box', 'bounce', 500)` |
| `zxd.addAnim(name, init, key, dur, easing, iter, alt)` | 添加自定义动画 | `zxd.addAnim('myFade', {opacity:0}, {opacity:1}, 400)` |
| `zxd.stopAnim(id)` | 停止元素上的所有动画 | `zxd.stopAnim('box')` |

### 预设动画类型（30+）

| 分类 | 动画名称 |
|------|----------|
| 基础 | `fadeIn`, `fadeOut` |
| 滑动 | `slideUp`, `slideDown`, `slideLeft`, `slideRight` |
| 缩放 | `zoomIn`, `zoomOut`, `zoomInX`, `zoomInY` |
| 旋转 | `rotateIn`, `rotateOut`, `rotateInLeft`, `rotateInRight` |
| 弹跳 | `bounce`, `bounceIn`, `bounceOut` |
| 震动 | `shake`, `shakeX`, `shakeY` |
| 翻转 | `flip`, `flipX`, `flipInX`, `flipInY` |
| 脉冲 | `pulse`, `pulseInfinite` |
| 摇摆 | `swing`, `wobble` |
| 闪烁 | `flash`, `blink` |
| 特效 | `rubberBand`, `dropIn`, `dropOut`, `rollIn`, `rollOut`, `glow`, `spinPulse` |

---

## 四、对话框（6 种样式）

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.dialog(title, content, btn1, btn2, cb1, cb2)` | 原有对话框（保留） | `zxd.dialog('提示', '内容', '确定')` |
| `zxd.dialogx(...)` | 扩展对话框，支持1-3个按钮 | `zxd.dialogx('提示', '内容', '确定', fn, false, null, 'light1')` |
| `zxd.dialogi(...)` | 输入框对话框，返回 Promise | `var val = await zxd.dialogi('输入', '请输入姓名:', '确定')` |
| `zxd.dialogc(html, outsideClose, outsideFn)` | 自定义布局对话框 | `zxd.dialogc('<div>自定义内容</div>', true)` |
| `zxd.dialogd(view, id)` | 获取自定义对话框内元素 | `var btn = zxd.dialogd(view, 'myBtn')` |
| `zxd.dialogs(style)` | 设置全局对话框样式 | `zxd.dialogs('dark1')` |
| `zxd.dialoga(true/false)` | 开启/关闭对话框动画 | `zxd.dialoga(false)` |

### 6 种预设样式

| 样式 | 风格 | 特点 |
|------|------|------|
| `light1` | 亮色1 | 白色背景，蓝色按钮，圆润风格 |
| `light2` | 亮色2 | 米白背景，绿色按钮，方正风格 |
| `light3` | 亮色3 | 奶油背景，橙色按钮，复古大圆角 |
| `dark1` | 暗色1 | 紫黑背景，紫色按钮，现代风格 |
| `dark2` | 暗色2 | 深蓝背景，粉色按钮，霓虹风格 |
| `dark3` | 暗色3 | 深灰背景，蓝色按钮，大圆角风格 |

### dialogx/dialogi 参数说明

```javascript
// 单按钮
zxd.dialogx('标题', '内容', '按钮文字', 回调函数, 点击外面关闭, 外面回调, '样式名')

// 双按钮
zxd.dialogx('标题', '内容', '按钮1', 回调1, '按钮2', 回调2, 点击外面关闭, 外面回调, '样式名')

// 三按钮
zxd.dialogx('标题', '内容', '按钮1', 回调1, '按钮2', 回调2, '按钮3', 回调3, 点击外面关闭, 外面回调, '样式名')
```

---

## 五、Toast 提示

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.toast(message, duration)` | 底部 Toast 提示 | `zxd.toast('操作成功', 2000)` |
| `zxd.toastt(message, duration)` | 顶部 Toast 提示 | `zxd.toastt('提示消息', 2000)` |
| `zxd.toasta(true/false)` | 开启/关闭 Toast 动画 | `zxd.toasta(false)` |

**特点：**
- 连续触发时自动排队，每个 Toast 完整显示设定时长
- 深色模式自动使用白色阴影，浅色模式使用黑色阴影
- 支持毛玻璃效果和边框区分

---

## 六、页面控制

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.meta(type, value, target)` | 页面元数据操作 | `zxd.meta('title', '新标题')` |
| `zxd.page(action)` | 页面控制 | `zxd.page('top')` |
| `zxd.full()` | 全屏 | `zxd.full()` |
| `zxd.exitFull()` | 退出全屏 | `zxd.exitFull()` |
| `zxd.isFull()` | 是否全屏 | `zxd.isFull()` |
| `zxd.scrollTo(x, y)` | 滚动到指定位置 | `zxd.scrollTo(0, 100)` |
| `zxd.scrollX()` | 获取水平滚动位置 | `var x = zxd.scrollX()` |
| `zxd.scrollY()` | 获取垂直滚动位置 | `var y = zxd.scrollY()` |

### meta type 参数

| type | 说明 |
|------|------|
| `title` | 页面标题 |
| `url` | 页面跳转 |
| `view` | viewport 设置 |

### page action 参数

| action | 说明 |
|--------|------|
| `top` | 滚动到顶部 |
| `bottom` | 滚动到底部 |
| `back` | 后退一页 |
| `go` | 前进一页 |
| `reload` | 刷新页面 |

---

## 七、动态主题

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.style(theme, color)` | 设置全局主题 | `zxd.style('dark1', '#7c3aed')` |

### 主题列表

| 主题 | 说明 |
|------|------|
| `light1` | 亮色主题1（蓝色） |
| `light2` | 亮色主题2（绿色） |
| `light3` | 亮色主题3（橙色） |
| `dark1` | 暗色主题1（紫色） |
| `dark2` | 暗色主题2（粉色） |
| `dark3` | 暗色主题3（蓝色） |

**特点：**
- 自动计算文本颜色（根据背景亮度）
- 自动应用所有页面元素样式
- 支持自定义主色：`zxd.style('light1', '#F87B40')`

---

## 八、JSON 数据处理

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.json(data, action, key, value)` | JSON 操作 | `zxd.json(data, 'add', 'city', '北京')` |

### action 参数

| action | 说明 |
|--------|------|
| `edit` | 修改值 |
| `add` | 添加属性 |
| `del` | 删除属性 |
| `get` | 获取值 |
| `list` | 获取列表 |

---

## 九、网络请求

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.ajaxGet(url)` | GET 请求 | `zxd.ajaxGet('https://api.example.com').then(html=>{})` |
| `zxd.ajaxPost(url, data)` | POST 请求 | `zxd.ajaxPost('https://api.example.com', {name:'张三'})` |
| `zxd.gu(url)` | GET 请求（别名） | `zxd.gu('https://api.example.com')` |
| `zxd.post(url, data)` | POST 请求（别名） | `zxd.post('https://api.example.com', {name:'张三'})` |

---

## 十、事件绑定

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.on(id, event, callback)` | 绑定事件 | `zxd.on('btn', 'click', () => alert('点击'))` |
| `zxd.sc(id, event, callback)` | 绑定事件（别名） | `zxd.sc('btn', 'click', fn)` |
| `zxd.ele(id, action)` | 触发事件 | `zxd.ele('btn', 'click')` |

---

## 十一、字符串操作

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.rp(str, search, replace, all)` | 字符串替换 | `zxd.rp('abc abc', 'a', 'x', true)` |
| `zxd.cut(str, start, end)` | 裁剪字符串 | `zxd.cut('name=张三&age=18', 'name=', '&')` |
| `zxd.mk(str)` | Base64 编码 | `zxd.mk('Hello 世界')` |
| `zxd.rk(str)` | Base64 解码 | `zxd.rk('SGVsbG8g5LiW55WM')` |
| `zxd.upper(str)` | 转大写 | `zxd.upper('hello')` |
| `zxd.lower(str)` | 转小写 | `zxd.lower('WORLD')` |
| `zxd.trim(str)` | 去除首尾空格 | `zxd.trim('  abc  ')` |
| `zxd.len(str)` | 获取字符串长度 | `zxd.len('hello')` |
| `zxd.copy(text)` | 复制到剪贴板 | `zxd.copy('复制内容')` |
| `zxd.escape(str)` | HTML 转义 | `zxd.escape('<div>')` |
| `zxd.unescape(str)` | HTML 反转义 | `zxd.unescape('&lt;div&gt;')` |
| `zxd.ue(str)` | URL 编码 | `zxd.ue('你好')` |
| `zxd.ud(str)` | URL 解码 | `zxd.ud('%E4%BD%A0%E5%A5%BD')` |

---

## 十二、时间与随机数

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.time(type)` | 获取时间 | `zxd.time(0)` |
| `zxd.now()` | 获取时间戳 | `zxd.now()` |
| `zxd.rand(min, max, decimal)` | 随机数 | `zxd.rand(1, 100, false)` |
| `zxd.uuid()` | 生成 UUID | `zxd.uuid()` |
| `zxd.randomStr(len)` | 生成随机字符串 | `zxd.randomStr(8)` |

### time type 参数

| type | 格式示例 |
|------|----------|
| 0 | 2024-01-01 12:30:45 |
| 1 | 2024/01/01 12:30:45 |
| 2 | 2024-01-01 |
| 3 | 12:30:45 |
| 4 | 时间戳（毫秒） |
| 5 | 2024年01月01日 12:30:45 |

---

## 十三、数学计算

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.calc(expression, remainderOnly)` | 数学表达式计算 | `zxd.calc('abs(-5) + sin(0.5) * 10')` |

### 支持函数

| 函数 | 说明 |
|------|------|
| `abs()` | 绝对值 |
| `sin()` | 正弦 |
| `cos()` | 余弦 |
| `tan()` | 正切 |
| `sqrt()` | 平方根 |
| `pow()` | 幂运算 |
| `exp()` | 指数 |
| `log()` | 自然对数 |
| `floor()` | 向下取整 |
| `ceil()` | 向上取整 |
| `round()` | 四舍五入 |

### 支持常量

| 常量 | 值 |
|------|-----|
| `PI` | 3.141592653589793 |
| `E` | 2.718281828459045 |

---

## 十四、渐变背景

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.bm(direction, id, colors)` | 设置渐变背景 | `zxd.bm('topbottom', 'box', '#ff0000|#00ff00')` |

### direction 参数

| 方向 | 说明 |
|------|------|
| `topbottom` | 从上到下 |
| `leftright` | 从左到右 |
| `rightleft` | 从右到左 |
| `bottomtop` | 从下到上 |
| `TL_BR` | 左上到右下 |
| `trbl` | 右上到左下 |
| `brtl` | 右下到左上 |
| `bltr` | 左下到右上 |

---

## 十五、存储

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.store(key, value)` | localStorage 操作 | `zxd.store('name', '张三')` |
| `zxd.clear()` | 清空 localStorage | `zxd.clear()` |
| `zxd.rmItem(key)` | 删除 localStorage 项 | `zxd.rmItem('name')` |
| `zxd.cookie(key, value, days)` | Cookie 操作 | `zxd.cookie('token', 'abc123', 7)` |

---

## 十六、设备与浏览器信息

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.ua()` | 获取 UserAgent | `zxd.ua()` |
| `zxd.url()` | 获取当前页面 URL | `zxd.url()` |
| `zxd.host()` | 获取当前域名 | `zxd.host()` |
| `zxd.path()` | 获取当前路径 | `zxd.path()` |
| `zxd.isMobile()` | 是否移动端 | `if(zxd.isMobile())` |
| `zxd.isPC()` | 是否 PC 端 | `if(zxd.isPC())` |
| `zxd.isIOS()` | 是否 iOS 设备 | `if(zxd.isIOS())` |
| `zxd.isAndroid()` | 是否安卓设备 | `if(zxd.isAndroid())` |

---

## 十七、URL 参数操作

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.getParam(name)` | 获取 URL 参数 | `var id = zxd.getParam('id')` |
| `zxd.setParam(name, value)` | 设置 URL 参数 | `zxd.setParam('page', '2')` |
| `zxd.delParam(name)` | 删除 URL 参数 | `zxd.delParam('page')` |

---

## 十八、图片处理

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.rotate(img, angle)` | 旋转图片，返回 Promise | `zxd.rotate('image.jpg', 90).then(dataUrl=>{})` |
| `zxd.crop(img, sx, ex, sy, ey)` | 裁剪图片，返回 Promise | `zxd.crop('image.jpg', 0, 100, 0, 100)` |
| `zxd.izz(img, angle)` | rotate 的别名 | - |
| `zxd.czz(img, sx, ex, sy, ey)` | crop 的别名 | - |

---

## 十九、其他工具函数

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.wait(ms)` | 延迟执行（Promise） | `await zxd.wait(1000)` |
| `zxd.pause(ms)` | 延迟执行（别名） | `await zxd.pause(1000)` |
| `zxd.delay(ms)` | 延迟执行（别名） | `await zxd.delay(1000)` |
| `zxd.sleep(ms)` | 延迟执行（别名） | `await zxd.sleep(1000)` |
| `zxd.log(msg)` | 控制台输出 | `zxd.log('消息')` |
| `zxd.print(msg)` | 控制台输出（别名） | `zxd.print('消息')` |
| `zxd.edit(enable)` | 页面编辑模式 | `zxd.edit(true)` |
| `zxd.dl(path)` | 发起下载 | `zxd.dl('file.pdf')` |
| `zxd.sdl(path)` | 下载（别名） | `zxd.sdl('file.pdf')` |
| `zxd.load(url)` | 动态加载 JS 脚本 | `zxd.load('lib.js').then(()=>{})` |
| `zxd.update()` | 触发全局更新事件 | `zxd.update()` |
| `zxd.debounce(fn, delay)` | 防抖函数 | `var fn = zxd.debounce(()=>{}, 500)` |
| `zxd.throttle(fn, delay)` | 节流函数 | `var fn = zxd.throttle(()=>{}, 500)` |
| `zxd.cloneDeep(obj)` | 深拷贝 | `var copy = zxd.cloneDeep(obj)` |
| `zxd.isStr(v)` | 是否字符串 | `zxd.isStr('hello')` |
| `zxd.isNum(v)` | 是否数字 | `zxd.isNum(123)` |
| `zxd.isArr(v)` | 是否数组 | `zxd.isArr([1,2,3])` |
| `zxd.isObj(v)` | 是否对象 | `zxd.isObj({a:1})` |
| `zxd.isFn(v)` | 是否函数 | `zxd.isFn(()=>{})` |
| `zxd.px(v)` | 转 px 单位 | `zxd.px(10)` |
| `zxd.em(v)` | 转 em 单位 | `zxd.em(1.5)` |
| `zxd.stop()` | 强制停止 JS 执行 | `zxd.stop()` |
| `zxd.break()` | 强制停止（别名） | `zxd.break()` |

---

## 完整示例代码

```javascript
// ========== DOM 操作 ==========
zxd.set('demo', 'text', 'Hello World');
var text = zxd.get('demo', 'text');
zxd.new('base', 'newBox', 'div', {color:'red',padding:'10px'});
zxd.del('newBox');

// 获取元素
var els = zxd.gui('class', 'card', true);
var el = zxd.gui('id', 'demo');

// ========== 音频控制 ==========
var ctrl = zxd.play('music.mp3');
zxd.pc(ctrl, 'pause');
zxd.pc(ctrl, 'continue');
zxd.pc(ctrl, 'stop');
var isPlaying = zxd.pis(ctrl);
var progress = zxd.pp(ctrl);
var duration = zxd.pa(ctrl);
zxd.pv(ctrl, 50);

// ========== 动画 ==========
zxd.anim('box', 'bounce', 500);
zxd.addAnim('custom', {opacity:0}, {opacity:1}, 300);
zxd.anim('box', 'custom', 300);

// ========== 对话框 ==========
// 单按钮
zxd.dialogx('提示', '操作成功', '确定', () => console.log('确定'));

// 双按钮（使用 light1 样式）
zxd.dialogx('确认', '确定删除吗？', '取消', () => console.log('取消'), '确认', () => console.log('删除'), false, null, 'light1');

// 三按钮（使用 dark1 样式）
zxd.dialogx('选择', '请选择', 'A', () => console.log('A'), 'B', () => console.log('B'), 'C', () => console.log('C'), false, null, 'dark1');

// 输入框对话框
let name = await zxd.dialogi('输入', '请输入姓名:', '确定');
console.log('输入:', name);

// 自定义布局
let view = zxd.dialogc('<div><input id="myInput"><button id="myBtn">提交</button></div>', true);
let btn = zxd.dialogd(view, 'myBtn');
btn.onclick = () => { console.log('提交'); };

// 切换全局对话框样式
zxd.dialogs('dark1');

// ========== Toast ==========
zxd.toast('底部提示', 2000);
zxd.toastt('顶部提示', 2000);

// 开关动画
zxd.dialoga(false);  // 关闭对话框动画
zxd.toasta(false);   // 关闭 Toast 动画

// ========== 动态主题 ==========
zxd.style('dark1', '#7c3aed');  // 暗色主题，紫色主色
zxd.style('light1');            // 亮色主题

// ========== 页面控制 ==========
zxd.meta('title', '新标题');
zxd.page('top');
zxd.full();

// ========== JSON 操作 ==========
var data = {name:'张三', age:18};
data = zxd.json(data, 'add', 'city', '北京');
var age = zxd.json(data, 'get', 'age');

// ========== 网络请求 ==========
zxd.ajaxGet('https://api.example.com').then(html => console.log(html));
zxd.ajaxPost('https://api.example.com', {name:'张三'}).then(res => {});

// ========== 事件绑定 ==========
zxd.on('btn', 'click', () => alert('clicked'));
zxd.ele('btn', 'click');

// ========== 字符串操作 ==========
var result = zxd.rp('abc abc', 'a', 'x', true);
var base64 = zxd.mk('Hello 世界');
var decoded = zxd.rk(base64);
zxd.copy('复制内容');

// ========== 时间 ==========
var time = zxd.time(0);
var timestamp = zxd.now();

// ========== 随机数 ==========
var num = zxd.rand(1, 100, false);
var uuid = zxd.uuid();

// ========== 计算 ==========
var calc = zxd.calc('abs(-5) + sin(0.5) * 10');

// ========== 渐变 ==========
zxd.bm('topbottom', 'box', '#ff0000|#00ff00');

// ========== 存储 ==========
zxd.store('name', '张三');
var name = zxd.store('name');
zxd.cookie('token', 'abc123', 7);

// ========== 设备判断 ==========
if (zxd.isMobile()) console.log('手机端');

// ========== URL 参数 ==========
var id = zxd.getParam('id');
zxd.setParam('page', '2');

// ========== 图片处理 ==========
zxd.rotate('image.jpg', 90).then(dataUrl => {});
zxd.crop('image.jpg', 0, 100, 0, 100).then(dataUrl => {});

// ========== 工具函数 ==========
await zxd.wait(1000);
zxd.edit(true);
zxd.dl('/file.pdf');
zxd.update(); // 触发全局更新

// 防抖节流
var fn = zxd.debounce(() => console.log('执行'), 500);
var fn2 = zxd.throttle(() => console.log('执行'), 1000);

// 深拷贝
var copy = zxd.cloneDeep({a:1,b:{c:2}});
```

---

## 注意事项

1. 所有 API 通过 `zxd` 对象调用，如 `zxd.set()`
2. 音频播放需要用户交互，首次播放可能需要点击页面
3. 动画使用 Web Animations API，兼容现代浏览器
4. 网络请求需要服务器支持 CORS
5. 对话框默认点击外面不关闭（可通过参数配置）
6. Toast 连续触发时会自动排队，每个完整显示设定时长
7. 动态主题会自动计算文本颜色并应用到所有页面元素
8. 所有延迟方法返回 Promise，可使用 async/await

---

## 版本历史

| 版本 | 更新内容 |
|------|----------|
| v1.3.7 | 优化深色模式 Toast 阴影、颜色协调、Toast 连续触发修复 |
| v1.3.6 | Toast 透明背景、自动文本颜色、完整主题系统 |
| v1.3.5 | 修复 Toast 边框、主题文本颜色 |
| v1.3.4 | 主题系统、动画控制、对话框动画 |
| v1.3.3 | 6 种对话框样式有明显差异 |
| v1.3.2 | 修复对话框样式和双按钮 |
| v1.3.1 | 修复对话框样式 |
| v1.3.0 | 新增 dialogx/dialogi/dialogc、6种样式、动态主题 |
| v1.2.0 | 新增 30+ 动画、完整 DOM 操作 |
| v1.1.0 | 新增 60+ 工具函数 |
| v1.0.0 | 初始版本 |onsole.log('输入:', name);

// 自定义布局
let view = zxd.dialogc('<div><input id="myInput"><button id="myBtn">提交</button></div>', true);
let btn = zxd.dialogd(view, 'myBtn');
btn.onclick = () => { console.log('提交'); };

// 切换全局对话框样式
zxd.dialogs('dark1');

// ========== Toast ==========
zxd.toast('底部提示', 2000);
zxd.toastt('顶部提示', 2000);

// 开关动画
zxd.dialoga(false);  // 关闭对话框动画
zxd.toasta(false);   // 关闭 Toast 动画

// ========== 动态主题 ==========
zxd.style('dark1', '#7c3aed');  // 暗色主题，紫色主色
zxd.style('light1');            // 亮色主题

// ========== 页面控制 ==========
zxd.meta('title', '新标题');
zxd.page('top');
zxd.full();

// ========== JSON 操作 ==========
var data = {name:'张三', age:18};
data = zxd.json(data, 'add', 'city', '北京');
var age = zxd.json(data, 'get', 'age');

// ========== 网络请求 ==========
zxd.ajaxGet('https://api.example.com').then(html => console.log(html));
zxd.ajaxPost('https://api.example.com', {name:'张三'}).then(res => {});

// ========== 事件绑定 ==========
zxd.on('btn', 'click', () => alert('clicked'));
zxd.ele('btn', 'click');

// ========== 字符串操作 ==========
var result = zxd.rp('abc abc', 'a', 'x', true);
var base64 = zxd.mk('Hello 世界');
var decoded = zxd.rk(base64);
zxd.copy('复制内容');

// ========== 时间 ==========
var time = zxd.time(0);
var timestamp = zxd.now();

// ========== 随机数 ==========
var num = zxd.rand(1, 100, false);
var uuid = zxd.uuid();

// ========== 计算 ==========
var calc = zxd.calc('abs(-5) + sin(0.5) * 10');

// ========== 渐变 ==========
zxd.bm('topbottom', 'box', '#ff0000|#00ff00');

// ========== 存储 ==========
zxd.store('name', '张三');
var name = zxd.store('name');
zxd.cookie('token', 'abc123', 7);

// ========== 设备判断 ==========
if (zxd.isMobile()) console.log('手机端');

// ========== URL 参数 ==========
var id = zxd.getParam('id');
zxd.setParam('page', '2');

// ========== 图片处理 ==========
zxd.rotate('image.jpg', 90).then(dataUrl => {});
zxd.crop('image.jpg', 0, 100, 0, 100).then(dataUrl => {});

// ========== 工具函数 ==========
await zxd.wait(1000);
zxd.edit(true);
zxd.dl('/file.pdf');
zxd.update(); // 触发全局更新

// 防抖节流
var fn = zxd.debounce(() => console.log('执行'), 500);
var fn2 = zxd.throttle(() => console.log('执行'), 1000);

// 深拷贝
var copy = zxd.cloneDeep({a:1,b:{c:2}});
```

---

注意事项

1. 所有 API 通过 zxd 对象调用，如 zxd.set()
2. 音频播放需要用户交互，首次播放可能需要点击页面
3. 动画使用 Web Animations API，兼容现代浏览器
4. 网络请求需要服务器支持 CORS
5. 对话框默认点击外面不关闭（可通过参数配置）
6. Toast 连续触发时会自动排队，每个完整显示设定时长
7. 动态主题会自动计算文本颜色并应用到所有页面元素
8. 所有延迟方法返回 Promise，可使用 async/await

---

版本历史

版本 更新内容
v1.3.7 优化深色模式 Toast 阴影、颜色协调、Toast 连续触发修复
v1.3.6 Toast 透明背景、自动文本颜色、完整主题系统
v1.3.5 修复 Toast 边框、主题文本颜色
v1.3.4 主题系统、动画控制、对话框动画
v1.3.3 6 种对话框样式有明显差异
v1.3.2 修复对话框样式和双按钮
v1.3.1 修复对话框样式
v1.3.0 新增 dialogx/dialogi/dialogc、6种样式、动态主题
v1.2.0 新增 30+ 动画、完整 DOM 操作
v1.1.0 新增 60+ 工具函数
v1.0.0 初始版本

```
