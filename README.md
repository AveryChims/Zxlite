![image](https://res.viqu.com/web/js/zxlite.png)
# zxlite.js 完整 API 参考手册

**版本**: v2.0.1

## 概述

zxlite.js 是一个轻量级前端工具库，提供 DOM 操作、音频控制、动画效果、对话框扩展、动态主题、包管理、数据处理、网络请求等完整功能。v2.0.0 额外加入事件总线、状态管理、路由、HTTP 客户端、缓存、队列、校验器、模板系统等高级能力；v2.0.1 重点强化了安全与稳定性，添加了importf从本地加载包(文件夹)，官方包和本地包不需要解锁安全保护。所有 API 通过 `zxd` 对象调用，函数名简洁（1-10 个字符）。

**注意:**
 - 对话框深色模式建议搭配深色主题，浅色建议搭配浅色主题！
 - 某个元素需要受到主题样式自动改变需要添加属性：主题色添加class="card"；自动主题色添加class="auto_color"
 - zxd.import()库开发查看此文档就可以(其实我觉得没必要，只是通过这个提供简单的库调用，点击[这里](https://res.viqu.com/web/lib/zxlite/)查看可用库列表；点击[这里](https://res.viqu.com/web/lib/upload.php)发布新的库到zxlite.js默认库源站上，自制库查看文档中部说明！)

## 在线演示

[查看效果演示↗](https://res.viqu.com/web/test/zxlite.html)

本地高级模块演示页面：
- `examples/advanced-playground.html`（直接浏览器打开即可，建议通过本地静态服务器访问）

## 引入方式

```html
<script src="https://res.viqu.com/web/js/zxlite.min.js"></script>
```
_如有问题可以换成https://res.viqu.com/web/js/zxlite.js_

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
- 对话框完全不受主题影响，保持独立样式
- `ntm_` 开头的元素不受主题影响

---

## 八、包管理（v1.4.0 新增）

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.score(url)` | 设置包来源 | `zxd.score('https://example.com/packages/')` |
| `zxd.import(pkgName)/zxd.importf(...)` | 导入单个包 | `await zxd.import('test')` |
| `zxd.importUnsafe(true/false)` | 开关远程 JS 包执行（默认 false） | `zxd.importUnsafe(true)` |
| `zxd.imports(pkg1, pkg2, ...)/zxd.importfs(...)` | 导入多个包 | `await zxd.imports('test', 'utils')` |
| `zxd.query(pkgName)` | 获取包信息 | `var info = await zxd.query('test')` |
| `zxd.alias(pkgName, alias)/zxd.importfa(..., ...)` | 设置包别名 | `zxd.alias('test', 'abc')` |

### 包结构

- 网络包
```
http://res.viqu.com/web/lib/zxlite/包名/
├── main.zxd       # JS代码(必须包含)
├── desc.prop      # 包信息(必须包含)
├── instrument.txt # 包说明
└── view.html      # 包预览
```
- 本地包
```
./lib/包名/
├── main.zxd       # JS代码(必须包含)
└── desc.prop      # 包信息(必须包含)
```

### main.zxd 示例

```javascript
window.test = {
    test: function(content) {
        return content;
    },
    add: function(a, b) {
        return a + b;
    }
};
```

### desc.prop 示例

```
name=测试包
author=Avery Chims
version=1.0
description=这是一个测试包
```

### 使用示例

```javascript
// 远程 JS 包默认禁用执行，确认可信时手动打开：
zxd.importUnsafe(true);

// 导入包
await zxd.import('test');

// 调用包内函数
var result = test.test("内容");  // 返回 '内容'
var sum = test.add(1, 2);       // 返回 3

// 获取包信息
var info = await zxd.query('test');
console.log(info.name, info.version);

// 设置别名
zxd.alias('test', 'abc');
var result2 = abc.test("内容");

// 修改包来源
zxd.score('https://my-server.com/packages/');
```

> 安全提示：默认情况下建议使用 JSON 包格式；仅在你完全信任包源时再开启 `importUnsafe(true)`。

---

## 九、JSON 数据处理

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

## 十、网络请求

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.ajaxGet(url)` | GET 请求 | `zxd.ajaxGet('https://api.example.com').then(html=>{})` |
| `zxd.ajaxPost(url, data)` | POST 请求 | `zxd.ajaxPost('https://api.example.com', {name:'张三'})` |
| `zxd.gu(url)` | GET 请求（别名） | `zxd.gu('https://api.example.com')` |
| `zxd.post(url, data)` | POST 请求（别名） | `zxd.post('https://api.example.com', {name:'张三'})` |

---

## 十一、事件绑定

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.on(id, event, callback)` | 绑定事件 | `zxd.on('btn', 'click', () => alert('点击'))` |
| `zxd.sc(id, event, callback)` | 绑定事件（别名） | `zxd.sc('btn', 'click', fn)` |
| `zxd.ele(id, action)` | 触发事件 | `zxd.ele('btn', 'click')` |

---

## 十二、字符串操作

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

## 十三、时间与随机数

| 方法 | 说明 | 示例 |
|------|------|------|
| `zxd.time(type)` | 获取时间 | `zxd.time(0)` |
| `zxd.now()` | 获取时间戳 | `zxd.now()` |
| `zxd.rand(min, max, decimal)` | 随机数 | `zxd.rand(1, 100, false)` |
| `zxd.uuid()` |