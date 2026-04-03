# zxlite.js 完整 API 参考手册

**版本**: v1.3.0

## 概述

zxlite.js 是一个轻量级前端工具库，提供 DOM 操作、音频控制、动画效果、对话框扩展、动态主题、数据处理、网络请求等完整功能。所有 API 通过 `zxd` 对象调用，函数名简洁（1-10 个字符）。

## 引入方式

```html
<script src="https://res.viqu.com/web/js/zxlite.js"></script>
```
[测试一下↗](https://res.viqu.com/web/test/zxlite.html)
---

一、DOM 操作（30+ 个）

方法 说明
zxd.set(id, type, value) 设置元素属性，类型：text/html/val/attr/css/class
zxd.get(id, type) 获取元素属性，返回属性值
zxd.new(pid, nid, tag, styles) 创建新元素，pid 父级 ID（base=body）
zxd.del(id) 删除元素
zxd.$(selector, all) 选择器，all=true 返回所有，false 返回第一个
zxd.id(id) 通过 ID 获取元素
zxd.tag(tag, parent) 通过标签名获取元素
zxd.class(cls, parent) 通过类名获取元素
zxd.attr(el, name, value) 获取/设置属性
zxd.rmAttr(el, name) 移除属性
zxd.html(el, html) 获取/设置 innerHTML
zxd.text(el, txt) 获取/设置 textContent
zxd.val(el, v) 获取/设置表单值
zxd.data(el, key, val) 获取/设置 data-* 属性
zxd.css(el, prop, val) 获取/设置样式，prop 可为对象
zxd.addClass/rmClass/hasClass/toggleClass(el, cls) 类名操作
zxd.hide/show/toggle(el) 显示/隐藏/切换元素
zxd.parent/children/sibling(el, next) 遍历元素
zxd.append/prepend/before/after(parent, child) 插入元素
zxd.empty/clone(el, deep) 清空/克隆元素
zxd.width/height(el, val) 获取/设置宽高
zxd.gui(type, value, all) 获取元素，type: class/id/element/selector

---

二、音频控制（7 个）

方法 说明
zxd.play(url) 播放音乐，返回控制器 ID
zxd.pc(id, action) 控制音频：start/continue/pause/stop/kill/loop
zxd.pis(id) 是否正在播放
zxd.pp(id, time) 设置/获取播放进度（秒）
zxd.pa(id) 获取音频总时长（秒）
zxd.pv(id, volume) 设置音量（0-100）

---

三、动画效果（30+ 种预设动画）

方法 说明
zxd.anim(id, type, duration, direction) 执行动画
zxd.addAnim(name, init, key, dur, easing, iter, alt) 添加自定义动画
zxd.stopAnim(id) 停止元素上的所有动画

预设动画类型：

· 基础：fadeIn, fadeOut
· 滑动：slideUp, slideDown, slideLeft, slideRight
· 缩放：zoomIn, zoomOut, zoomInX, zoomInY
· 旋转：rotateIn, rotateOut, rotateInLeft, rotateInRight
· 弹跳：bounce, bounceIn, bounceOut
· 震动：shake, shakeX, shakeY
· 翻转：flip, flipX, flipInX, flipInY
· 脉冲：pulse, pulseInfinite
· 摇摆：swing, wobble
· 闪烁：flash, blink
· 特效：rubberBand, dropIn, dropOut, rollIn, rollOut, glow, spinPulse

---

四、对话框扩展（v1.3.0 新增）

方法 说明
zxd.dialogx(标题,内容,按钮1,回调1,按钮2,回调2,按钮3,回调3,外面关闭,外面回调,样式) 扩展对话框，支持1-3个按钮
zxd.dialogi(标题,内容,按钮1,回调1,按钮2,回调2,外面关闭,外面回调,样式) 输入框对话框，返回 Promise 获取输入值
zxd.dialogc(html内容,外面关闭,回调) 自定义布局对话框，支持 HTML 字符串或 $文件路径
zxd.dialogd(view, "元素id") 获取自定义对话框内元素
zxd.dialogs(css) 自定义对话框全局样式
zxd.dialoga(true/false) 开启/关闭对话框动画
zxd.toasta(true/false) 开启/关闭 Toast 动画

6 种内置对话框样式：

· 亮色：light1, light2, light3
· 暗色：dark1, dark2, dark3

使用示例：

```javascript
// 单按钮对话框
zxd.dialogx('提示', '操作成功', '确定', () => console.log('确定'));

// 双按钮对话框
zxd.dialogx('确认', '确定删除吗？', '取消', () => console.log('取消'), '确认', () => console.log('删除'));

// 三按钮对话框
zxd.dialogx('选择', '请选择', '选项A', () => console.log('A'), '选项B', () => console.log('B'), '选项C', () => console.log('C'));

// 输入框对话框
let name = await zxd.dialogi('输入', '请输入姓名:', '确定');
console.log('输入:', name);

// 自定义布局
let view = zxd.dialogc('<div><input id="myInput"><button id="myBtn">提交</button></div>', true);
let btn = zxd.dialogd(view, 'myBtn');
btn.onclick = () => { console.log('提交'); };
```

---

五、对话框与提示（原有）

方法 说明
zxd.dialog(title, content, btn1, btn2, cb1, cb2) 显示对话框（点击外面不会关闭）
zxd.toast(message, duration) 底部提示消息
zxd.toastt(message, duration) 顶部提示消息（v1.3.0 新增）

---

六、页面控制（5 个）

方法 说明
zxd.meta(type, value, target) 页面元数据操作：title/url/view
zxd.page(action) 页面控制：top/bottom/back/go/reload
zxd.full/exitFull/isFull() 全屏控制
zxd.scrollTo(x, y) 滚动到指定位置
zxd.scrollX/scrollY() 获取滚动位置

---

七、动态主题（v1.3.0 新增）

方法 说明
zxd.style(主题名, 颜色) 设置全局主题，主题名：light1/light2/light3/dark1/dark2/dark3

使用示例：

```javascript
// 设置亮色主题
zxd.style('light1', '#007aff');

// 设置暗色主题
zxd.style('dark1', '#89b4fa');

// 自定义颜色（自动生成 Material You 风格配色）
zxd.style('light1', '#F87B40');
```

---

八、JSON 数据处理（1 个）

方法 说明
zxd.json(data, action, key, value) JSON 操作：edit/add/del/get/list

---

九、网络请求（3 个）

方法 说明
zxd.ajaxGet(url) GET 请求，返回 Promise
zxd.ajaxPost(url, data) POST 请求，返回 Promise
zxd.gu(url) 获取网页内容（同 ajaxGet）

---

十、事件绑定（3 个）

方法 说明
zxd.on(id, event, callback) 绑定事件
zxd.sc(id, event, callback) on 的别名
zxd.ele(id, action) 触发事件

---

十一、字符串操作（12 个）

方法 说明
zxd.rp(str, search, replace, all) 字符串替换
zxd.cut(str, start, end) 裁剪字符串
zxd.len/long(str) 获取字符串长度
zxd.mk(str) / zxd.rk(str) Base64 编码/解码
zxd.upper/bigger(str) 转大写
zxd.lower/slower(str) 转小写
zxd.trim/strcm(str) 去除首尾空格
zxd.substr/ctt(str, position) 截取字符串
zxd.indexOf/gtt(str, char) 查找字符位置
zxd.ue/mku(str) URL 编码
zxd.ud/rku(str) URL 解码
zxd.escape/unescape(str) HTML 转义/反转义

---

十二、时间与随机数（6 个）

方法 说明
zxd.time(type) 获取时间，type 0-5 对应不同格式
zxd.now() 获取时间戳
zxd.date() 获取 Date 对象
zxd.rand(min, max, decimal) 随机数
zxd.uuid() 生成 UUID
zxd.randomStr(len) 生成随机字符串

time() 格式说明：

· 0：2024-01-01 12:30:45
· 1：2024/01/01 12:30:45
· 2：2024-01-01
· 3：12:30:45
· 4：时间戳（毫秒）
· 5：2024年01月01日 12:30:45

---

十三、数学计算（1 个）

方法 说明
zxd.calc(expression, remainderOnly) 数学表达式计算，支持 abs/sin/cos/tan/sqrt 等

---

十四、渐变背景（1 个）

方法 说明
zxd.bm(direction, id, colors) 设置渐变背景，方向：topbottom/leftright/TL_BR/rightleft/bottomtop

---

十五、存储（4 个）

方法 说明
zxd.store(key, value) localStorage 操作
zxd.clear() 清空 localStorage
zxd.rmItem(key) 删除 localStorage 项
zxd.cookie(key, value, days) Cookie 操作

---

十六、设备与浏览器信息（8 个）

方法 说明
zxd.ua() 获取 UserAgent
zxd.url() 获取当前页面 URL
zxd.host() 获取当前域名
zxd.path() 获取当前路径
zxd.isMobile() 是否移动端
zxd.isPC() 是否 PC 端
zxd.isIOS() 是否 iOS 设备
zxd.isAndroid() 是否安卓设备

---

十七、URL 参数操作（3 个）

方法 说明
zxd.getParam(name) 获取 URL 参数
zxd.setParam(name, value) 设置 URL 参数（不刷新页面）
zxd.delParam(name) 删除 URL 参数

---

十八、图片处理（2 个）

方法 说明
zxd.rotate(img, angle) 旋转图片，返回 Promise，返回 DataURL
zxd.crop(img, sx, ex, sy, ey) 裁剪图片，返回 Promise，返回 DataURL

---

十九、其他工具函数（20+ 个）

方法 说明
zxd.wait/pause/delay/sleep(ms) 延迟执行，返回 Promise
zxd.log/print(msg) 控制台输出
zxd.copy(text) 复制文本到剪贴板
zxd.edit(enable) 页面编辑模式
zxd.dl/sdl(path) 发起下载
zxd.load(url) 动态加载 JS 脚本，返回 Promise
zxd.px/em/cvd(value, mode) 单位转换
zxd.isStr/isNum/isArr/isObj/isFn/isEl(v) 类型判断
zxd.clone/deepCopy/copyDeep(obj) 深拷贝
zxd.debounce(fn, delay) 防抖函数
zxd.throttle(fn, delay) 节流函数
zxd.rgb2hex(r,g,b) / zxd.hex2rgb(hex) 颜色转换
zxd.stop/break() 强制停止 JS 执行
zxd.update() 触发全局更新事件（v1.3.0 新增）

---

完整示例代码

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
zxd.addAnim('custom', {opacity:0}, {opacity:1}, 300, 'ease', 1);
zxd.anim('box', 'custom', 300);

// ========== 对话框扩展 (v1.3.0) ==========
// 单按钮
zxd.dialogx('提示', '操作成功', '确定', () => console.log('确定'));

// 双按钮
zxd.dialogx('确认', '确定删除吗？', '取消', () => console.log('取消'), '确认', () => console.log('删除'));

// 三按钮
zxd.dialogx('选择', '请选择', 'A', () => console.log('A'), 'B', () => console.log('B'), 'C', () => console.log('C'));

// 输入框对话框
let name = await zxd.dialogi('输入', '请输入姓名:', '确定');
console.log('输入:', name);

// 自定义布局
let view = zxd.dialogc('<div><input id="myInput"><button id="myBtn">提交</button></div>', true);
let btn = zxd.dialogd(view, 'myBtn');
btn.onclick = () => { console.log('提交'); };

// 6种样式
zxd.dialogx('样式测试', '亮色样式1', '确定', null, false, null, { bg: '#fff', text: '#333', btnBg: '#007aff' });

// ========== 动态主题 (v1.3.0) ==========
zxd.style('light1', '#007aff');
zxd.style('dark1', '#89b4fa');

// ========== Toast ==========
zxd.toast('底部提示', 2000);
zxd.toastt('顶部提示', 2000);

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
var base64 = zxd.mk('Hello');
var decoded = zxd.rk(base64);
var upper = zxd.upper('hello');

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
zxd.copy('复制内容');
zxd.edit(true);
zxd.dl('/file.pdf');
zxd.update(); // 触发全局更新

// 防抖节流
var fn = zxd.debounce(() => console.log('执行'), 500);
var fn2 = zxd.throttle(() => console.log('执行'), 1000);

// 类型判断
if (zxd.isStr('hello')) console.log('是字符串');
if (zxd.isArr([1,2,3])) console.log('是数组');

// 深拷贝
var copy = zxd.cloneDeep({a:1,b:{c:2}});
```

---

注意事项

1. 所有 API 通过 zxd 对象调用，如 zxd.set()
2. 音频播放需要用户交互，首次播放可能需要点击页面
3. 动画使用 Web Animations API，兼容现代浏览器
4. 网络请求需要服务器支持 CORS
5. 对话框点击外面不会关闭（设计如此，可通过参数配置）
6. 复制功能优先使用 Clipboard API，自动降级
7. 所有延迟方法返回 Promise，可使用 async/await
8. 动态主题会修改页面全局样式，可通过 zxd.style() 随时切换

---

版本历史

· v1.3.0 - 新增 dialogx/dialogi/dialogc、6种对话框样式、动态主题、顶部Toast、gui元素获取、update全局更新、动画开关
· v1.2.0 - 新增 30+ 动画、完整 DOM 操作、音频 continue、pis 方法、自定义动画
· v1.1.0 - 新增 60+ 工具函数
· v1.0.0 - 初始版本

```
