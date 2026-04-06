/**
 * zxlite.js - 轻量级前端工具库 v1.2.4
 * 补齐文档中的常用 API，并修复部分行为不一致问题
 */
(function(global) {
    'use strict';
    
    const Z = {
        _ap: new Map(),
        _an: new Map(),
        _ev: new Map(),
        _toast: null,
        _toastTimer: null,
        _dialog: null,
        _customAnims: new Map(),
        _at: {
            fadeIn: { init: { opacity: 0 }, key: { opacity: 1 }, dur: 300 },
            fadeOut: { init: { opacity: 1 }, key: { opacity: 0 }, dur: 300 },
            slideUp: { init: { transform: 'translateY(20px)', opacity: 0 }, key: { transform: 'translateY(0)', opacity: 1 }, dur: 400 },
            slideDown: { init: { transform: 'translateY(-20px)', opacity: 0 }, key: { transform: 'translateY(0)', opacity: 1 }, dur: 400 },
            slideLeft: { init: { transform: 'translateX(20px)', opacity: 0 }, key: { transform: 'translateX(0)', opacity: 1 }, dur: 400 },
            slideRight: { init: { transform: 'translateX(-20px)', opacity: 0 }, key: { transform: 'translateX(0)', opacity: 1 }, dur: 400 },
            zoomIn: { init: { transform: 'scale(0.8)', opacity: 0 }, key: { transform: 'scale(1)', opacity: 1 }, dur: 300 },
            zoomOut: { init: { transform: 'scale(1.2)', opacity: 0 }, key: { transform: 'scale(1)', opacity: 1 }, dur: 300 },
            bounce: { init: { transform: 'scale(1)' }, key: { transform: 'scale(1.1)' }, dur: 200, alt: true, iter: 2 },
            shake: { init: { transform: 'translateX(0)' }, key: { transform: 'translateX(-5px)' }, dur: 100, alt: true, iter: 3 },
            flip: { init: { transform: 'rotateY(0)' }, key: { transform: 'rotateY(180deg)' }, dur: 600 },
            pulse: { init: { transform: 'scale(1)' }, key: { transform: 'scale(1.05)' }, dur: 300, alt: true, iter: 2 },
            swing: { init: { transform: 'rotate(0)' }, key: { transform: 'rotate(10deg)' }, dur: 200, alt: true, iter: 3 },
            wobble: { init: { transform: 'translateX(0)' }, key: { transform: 'translateX(-8px)' }, dur: 150, alt: true, iter: 4 },
            rotateIn: { init: { transform: 'rotate(-90deg)', opacity: 0 }, key: { transform: 'rotate(0)', opacity: 1 }, dur: 500 },
            rollIn: { init: { transform: 'translateX(-100px) rotate(-120deg)', opacity: 0 }, key: { transform: 'translateX(0) rotate(0)', opacity: 1 }, dur: 600 },
            glow: { init: { boxShadow: '0 0 0 rgba(102,126,234,0)' }, key: { boxShadow: '0 0 20px rgba(102,126,234,0.8)' }, dur: 300, alt: true, iter: 2 },
            bounceIn: { init: { transform: 'scale(0.3)', opacity: 0 }, key: { transform: 'scale(1)', opacity: 1 }, dur: 500 },
            dropIn: { init: { transform: 'translateY(-100px)', opacity: 0 }, key: { transform: 'translateY(0)', opacity: 1 }, dur: 500 }
        }
    };
    
    function getEl(id) {
        if (!id) return null;
        if (typeof id === 'string') return document.getElementById(id);
        return id;
    }

    function toDataAttr(key) {
        return 'data-' + String(key)
            .replace(/^data-/, '')
            .replace(/([A-Z])/g, '-$1')
            .toLowerCase();
    }

    function loadImageSource(src) {
        return new Promise(function(resolve, reject) {
            if (typeof HTMLImageElement !== 'undefined' && src instanceof HTMLImageElement) {
                if (src.complete && (src.naturalWidth || src.width)) {
                    resolve(src);
                    return;
                }
                src.onload = function() { resolve(src); };
                src.onerror = reject;
                return;
            }

            var image = new Image();
            image.crossOrigin = 'anonymous';
            image.onload = function() { resolve(image); };
            image.onerror = reject;
            image.src = src;
        });
    }

    function cloneData(value) {
        if (value === undefined) return undefined;
        return JSON.parse(JSON.stringify(value));
    }
    
    // ==================== DOM操作核心 ====================
    
    Z.set = function(id, type, val) {
        var el = getEl(id);
        if (!el) return false;
        
        if (type === 'text') {
            el.textContent = val;
        } else if (type === 'html') {
            el.innerHTML = val;
        } else if (type === 'val') {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
                el.value = val;
            } else {
                el.textContent = val;
            }
        } else if (type === 'attr') {
            for (var k in val) el.setAttribute(k, val[k]);
        } else if (type === 'css') {
            for (var k in val) el.style[k] = val[k];
        } else if (type === 'class') {
            el.className = val;
        } else {
            el.setAttribute(type, val);
        }
        return true;
    };
    
    Z.get = function(id, type) {
        var el = getEl(id);
        if (!el) return null;
        
        if (type === 'text') return el.textContent;
        if (type === 'html') return el.innerHTML;
        if (type === 'val') {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
                return el.value;
            }
            return el.textContent;
        }
        if (type === 'attr') return el.attributes;
        if (type === 'css') return el.style;
        return el.getAttribute(type);
    };
    
    Z.new = function(pid, nid, tag, css) {
        css = css || {};
        var p = pid === 'base' ? document.body : getEl(pid);
        if (!p) return false;
        
        var el = document.createElement(tag);
        el.id = nid;
        for (var k in css) el.style[k] = css[k];
        p.appendChild(el);
        return true;
    };
    
    Z.del = function(id) {
        var el = getEl(id);
        if (el && el.parentNode) {
            el.parentNode.removeChild(el);
            return true;
        }
        return false;
    };
    
    Z.$ = function(sel, all) {
        if (all) return document.querySelectorAll(sel);
        return document.querySelector(sel);
    };
    
    Z.id = function(id) {
        return document.getElementById(id);
    };

    Z.tag = function(tag, parent) {
        var root = parent ? getEl(parent) : document;
        return root ? root.getElementsByTagName(tag) : [];
    };

    Z.class = function(cls, parent) {
        var root = parent ? getEl(parent) : document;
        return root ? root.getElementsByClassName(cls) : [];
    };

    Z.attr = function(id, name, value) {
        var el = getEl(id);
        if (!el) return null;
        if (value === undefined) return el.getAttribute(name);
        el.setAttribute(name, value);
        return el;
    };

    Z.rmAttr = function(id, name) {
        var el = getEl(id);
        if (!el) return false;
        el.removeAttribute(name);
        return true;
    };
    
    Z.hide = function(id) {
        var el = getEl(id);
        if (el) el.style.display = 'none';
        return el;
    };
    
    Z.show = function(id) {
        var el = getEl(id);
        if (el) el.style.display = '';
        return el;
    };

    Z.toggle = function(id) {
        var el = getEl(id);
        if (!el) return null;
        if (getComputedStyle(el).display === 'none') {
            el.style.display = el.dataset.zxdDisplay || '';
        } else {
            el.dataset.zxdDisplay = el.style.display || '';
            el.style.display = 'none';
        }
        return el;
    };
    
    Z.addClass = function(id, cls) {
        var el = getEl(id);
        if (el) el.classList.add(cls);
        return el;
    };
    
    Z.rmClass = function(id, cls) {
        var el = getEl(id);
        if (el) el.classList.remove(cls);
        return el;
    };

    Z.toggleClass = function(id, cls) {
        var el = getEl(id);
        if (!el) return false;
        return el.classList.toggle(cls);
    };
    
    Z.hasClass = function(id, cls) {
        var el = getEl(id);
        return el ? el.classList.contains(cls) : false;
    };
    
    Z.html = function(id, html) {
        var el = getEl(id);
        if (!el) return null;
        if (html === undefined) return el.innerHTML;
        el.innerHTML = html;
        return el;
    };
    
    Z.text = function(id, txt) {
        var el = getEl(id);
        if (!el) return null;
        if (txt === undefined) return el.textContent;
        el.textContent = txt;
        return el;
    };
    
    Z.val = function(id, v) {
        var el = getEl(id);
        if (!el) return null;
        if (v === undefined) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
                return el.value;
            }
            return el.textContent;
        }
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
            el.value = v;
        } else {
            el.textContent = v;
        }
        return el;
    };
    
    Z.css = function(id, prop, val) {
        var el = getEl(id);
        if (!el) return null;
        
        if (typeof prop === 'object') {
            for (var k in prop) el.style[k] = prop[k];
            return el;
        }
        if (val === undefined) return getComputedStyle(el)[prop];
        el.style[prop] = val;
        return el;
    };
    
    Z.append = function(parent, child) {
        var p = getEl(parent);
        var c = getEl(child);
        if (p && c) {
            p.appendChild(c);
            return true;
        }
        return false;
    };
    
    Z.prepend = function(parent, child) {
        var p = getEl(parent);
        var c = getEl(child);
        if (p && c) {
            p.insertBefore(c, p.firstChild);
            return true;
        }
        return false;
    };

    Z.parent = function(id) {
        var el = getEl(id);
        return el ? el.parentElement : null;
    };

    Z.children = function(id) {
        var el = getEl(id);
        return el ? el.children : [];
    };

    Z.sibling = function(id, next) {
        var el = getEl(id);
        if (!el) return null;
        return next ? el.nextElementSibling : el.previousElementSibling;
    };

    Z.before = function(target, child) {
        var el = getEl(target);
        var node = getEl(child);
        if (!el || !el.parentNode || !node) return false;
        el.parentNode.insertBefore(node, el);
        return true;
    };

    Z.after = function(target, child) {
        var el = getEl(target);
        var node = getEl(child);
        if (!el || !el.parentNode || !node) return false;
        el.parentNode.insertBefore(node, el.nextSibling);
        return true;
    };

    Z.empty = function(id) {
        var el = getEl(id);
        if (!el) return false;
        el.innerHTML = '';
        return true;
    };

    Z.clone = function(id, deep) {
        var el = getEl(id);
        if (!el) return null;
        return el.cloneNode(deep !== false);
    };

    Z.width = function(id, val) {
        var el = getEl(id);
        if (!el) return null;
        if (val === undefined) return el.getBoundingClientRect().width;
        el.style.width = typeof val === 'number' ? val + 'px' : val;
        return el;
    };

    Z.height = function(id, val) {
        var el = getEl(id);
        if (!el) return null;
        if (val === undefined) return el.getBoundingClientRect().height;
        el.style.height = typeof val === 'number' ? val + 'px' : val;
        return el;
    };
    
    // ==================== 音频控制 ====================
    
    Z.play = function(url) {
        var id = 'a_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        var audio = new Audio(url);
        audio.style.display = 'none';
        document.body.appendChild(audio);
        Z._ap.set(id, { audio: audio, id: id });
        audio.play().catch(function(e) { console.warn('Audio play failed:', e); });
        return id;
    };
    
    Z.pc = function(id, act) {
        var c = Z._ap.get(id);
        if (!c) return false;
        var a = c.audio;
        if (act === 'start' || act === 'continue') {
            a.play().catch(function(e) {});
        } else if (act === 'pause') {
            a.pause();
        } else if (act === 'stop') {
            a.pause();
            a.currentTime = 0;
        } else if (act === 'kill') {
            a.pause();
            a.remove();
            Z._ap.delete(id);
        } else if (act === 'loop') {
            a.loop = true;
        }
        return true;
    };
    
    Z.pis = function(id) {
        var c = Z._ap.get(id);
        if (!c) return false;
        return !c.audio.paused;
    };
    
    Z.pp = function(id, t) {
        var c = Z._ap.get(id);
        if (!c) return 0;
        if (t !== undefined && !isNaN(t)) c.audio.currentTime = t;
        return c.audio.currentTime;
    };
    
    Z.pa = function(id) {
        var c = Z._ap.get(id);
        if (!c) return 0;
        var dur = c.audio.duration;
        return isNaN(dur) ? 0 : dur;
    };
    
    Z.pv = function(id, v) {
        var c = Z._ap.get(id);
        if (c) c.audio.volume = Math.min(1, Math.max(0, v / 100));
        return true;
    };
    
    // ==================== 动画 ====================
    
    Z.anim = function(id, type, dur, dir) {
        var el = getEl(id);
        if (!el) return null;
        var cfg = Z._at[type] || Z._customAnims.get(type);
        if (!cfg) return null;
        var direction = cfg.alt ? 'alternate' : 'normal';
        if (dir === 'reverse' || dir === 'alternate' || dir === 'alternate-reverse') {
            direction = dir;
        }
        
        for (var p in cfg.init) el.style[p] = cfg.init[p];
        var anim = el.animate([cfg.init, cfg.key], {
            duration: dur || cfg.dur,
            direction: direction,
            fill: 'forwards',
            easing: cfg.easing || 'ease',
            iterations: cfg.iter || 1
        });
        return anim;
    };
    
    Z.addAnim = function(name, init, key, dur, easing, iter, alt) {
        Z._customAnims.set(name, {
            init: init,
            key: key,
            dur: dur || 300,
            easing: easing || 'ease',
            iter: iter || 1,
            alt: alt || false
        });
        return true;
    };
    
    Z.stopAnim = function(id) {
        var el = getEl(id);
        if (el) el.getAnimations().forEach(function(a) { a.cancel(); });
        return true;
    };
    
    // ==================== 页面控制 ====================
    
    Z.meta = function(type, val, target) {
        if (type === 'title') {
            document.title = val;
            return true;
        }
        if (type === 'url') {
            if (target === 'new') window.open(val, '_blank');
            else window.location.href = val;
            return true;
        }
        if (type === 'view') {
            var vp = document.querySelector('meta[name="viewport"]');
            if (!vp) {
                vp = document.createElement('meta');
                vp.name = 'viewport';
                document.head.appendChild(vp);
            }
            vp.content = val;
            return true;
        }
        return false;
    };
    
    Z.page = function(act) {
        if (act === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return true; }
        if (act === 'bottom') { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); return true; }
        if (act === 'back') { history.back(); return true; }
        if (act === 'go') { history.forward(); return true; }
        if (act === 'reload') { location.reload(); return true; }
        return false;
    };
    
    // ==================== 对话框 ====================
    
    Z.dialog = function(title, content, btn1, btn2, cb1, cb2) {
        if (Z._dialog) { Z._dialog.remove(); Z._dialog = null; }
        
        var isDouble = arguments.length >= 5;
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:10000;';
        
        var dialog = document.createElement('div');
        dialog.style.cssText = 'background:#fff;border-radius:12px;padding:24px;min-width:280px;max-width:90%;box-shadow:0 10px 25px rgba(0,0,0,0.2);';
        
        var titleEl = document.createElement('h3');
        titleEl.textContent = title;
        titleEl.style.cssText = 'margin:0 0 12px 0;font-size:18px;font-weight:600;color:#333;';
        dialog.appendChild(titleEl);
        
        var contentEl = document.createElement('p');
        contentEl.textContent = content;
        contentEl.style.cssText = 'margin:0 0 24px 0;color:#666;line-height:1.5;font-size:14px;';
        dialog.appendChild(contentEl);
        
        var btnDiv = document.createElement('div');
        btnDiv.style.cssText = 'display:flex;justify-content:flex-end;gap:12px;flex-wrap:wrap;';
        
        var close = function() {
            if (overlay.parentNode) overlay.remove();
            Z._dialog = null;
        };
        
        var makeBtn = function(text, cb, primary) {
            var btn = document.createElement('button');
            btn.textContent = text;
            btn.style.cssText = 'padding:8px 20px;min-width:80px;border:none;border-radius:8px;cursor:pointer;font-size:14px;font-weight:500;' + 
                (primary ? 'background:#007aff;color:#fff;' : 'background:#f0f0f0;color:#333;border:1px solid #ddd;');
            btn.onclick = function() {
                close();
                if (cb && typeof cb === 'function') cb();
            };
            return btn;
        };
        
        if (isDouble && btn2) {
            btnDiv.appendChild(makeBtn(btn1, cb1, false));
            btnDiv.appendChild(makeBtn(btn2, cb2, true));
        } else {
            btnDiv.appendChild(makeBtn(btn1, btn2 || cb1, true));
        }
        
        dialog.appendChild(btnDiv);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        Z._dialog = overlay;
        dialog.onclick = function(e) { e.stopPropagation(); };
        return true;
    };
    
    // ==================== Toast ====================
    
    Z.toast = function(msg, dur) {
        dur = dur || 2000;
        if (Z._toast) {
            clearTimeout(Z._toastTimer);
            Z._toast.remove();
        }
        
        var toast = document.createElement('div');
        toast.textContent = msg;
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:#fff;padding:10px 20px;border-radius:8px;font-size:14px;z-index:10001;max-width:80%;text-align:center;';
        if (msg.length > 30) toast.style.whiteSpace = 'normal';
        else toast.style.whiteSpace = 'nowrap';
        
        document.body.appendChild(toast);
        Z._toast = toast;
        Z._toastTimer = setTimeout(function() {
            if (toast.parentNode) toast.remove();
            Z._toast = null;
        }, dur);
        return true;
    };
    
    // ==================== 事件绑定 ====================
    
    Z.on = function(id, ev, fn) {
        var el = getEl(id);
        if (!el) return false;
        var key = (el.id || '') + '_' + ev;
        if (Z._ev.has(key)) el.removeEventListener(ev, Z._ev.get(key));
        el.addEventListener(ev, fn);
        Z._ev.set(key, fn);
        return true;
    };
    
    Z.sc = function(id, ev, fn) {
        return Z.on(id, ev, fn);
    };
    
    Z.ele = function(id, act) {
        var el = getEl(id);
        if (el && act === 'click') {
            el.click();
            return true;
        }
        return false;
    };
    
    // ==================== 网络请求 (重命名避免冲突) ====================
    
    Z.ajaxGet = function(url) {
        return fetch(url).then(function(r) { return r.text(); }).catch(function(e) { return ''; });
    };
    
    Z.ajaxPost = function(url, data) {
        var fd = new URLSearchParams();
        for (var k in data) fd.append(k, data[k]);
        return fetch(url, { method: 'POST', body: fd }).then(function(r) { return r.text(); });
    };
    
    Z.gu = function(url) {
        return Z.ajaxGet(url);
    };
    
    Z.post = function(url, data) {
        return Z.ajaxPost(url, data);
    };
    
    // ==================== JSON操作 ====================
    
    Z.json = function(data, act, key, val) {
        try {
            var d = typeof data === 'string' ? JSON.parse(data) : cloneData(data);
            if (act === 'edit') {
                if (d[key] !== undefined) d[key] = val;
                return d;
            }
            if (act === 'add') {
                d[key] = val;
                return d;
            }
            if (act === 'del') {
                delete d[key];
                return d;
            }
            if (act === 'get') {
                return d[key];
            }
            if (act === 'list') {
                if (Array.isArray(d)) return d.slice();
                if (d && typeof d === 'object') return Object.keys(d);
                return [];
            }
            return d;
        } catch(e) {
            console.error('JSON操作失败:', e);
            return null;
        }
    };
    
    // ==================== 字符串操作 ====================
    
    Z.rp = function(str, search, replace, all) {
        if (all) return str.split(search).join(replace);
        return str.replace(search, replace);
    };
    
    Z.cut = function(str, start, end) {
        var i = str.indexOf(start);
        if (i === -1) return '';
        var j = str.indexOf(end, i + start.length);
        return j === -1 ? '' : str.substring(i + start.length, j);
    };
    
    Z.mk = function(str) {
        try {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(m, p) {
                return String.fromCharCode(parseInt(p, 16));
            }));
        } catch(e) {
            return btoa(str);
        }
    };
    
    Z.rk = function(str) {
        try {
            return decodeURIComponent(atob(str).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        } catch(e) {
            return atob(str);
        }
    };
    
    Z.upper = function(str) { return str.toUpperCase(); };
    Z.lower = function(str) { return str.toLowerCase(); };
    Z.bigger = function(str) { return str.toUpperCase(); };
    Z.slower = function(str) { return str.toLowerCase(); };
    Z.trim = function(str) { return str.trim(); };
    Z.strcm = function(str) { return str.trim(); };
    Z.len = function(str) { return str.length; };
    Z.long = function(str) { return str.length; };
    Z.substr = function(str, pos, len) {
        if (len === undefined) return String(str).substr(pos);
        return String(str).substr(pos, len);
    };
    Z.ctt = function(str, pos, len) {
        return Z.substr(str, pos, len);
    };
    Z.indexOf = function(str, char) {
        return String(str).indexOf(char);
    };
    Z.gtt = function(str, char) {
        return Z.indexOf(str, char);
    };
    Z.ue = function(str) { return encodeURIComponent(str); };
    Z.mku = function(str) { return encodeURIComponent(str); };
    Z.ud = function(str) { return decodeURIComponent(str); };
    Z.rku = function(str) { return decodeURIComponent(str); };
    Z.escape = function(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };
    Z.unescape = function(str) {
        var text = document.createElement('textarea');
        text.innerHTML = str;
        return text.value;
    };
    
    Z.copy = function(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;left:-9999px';
        document.body.appendChild(ta);
        ta.select();
        var success = document.execCommand('copy');
        ta.remove();
        return success;
    };
    
    // ==================== 时间 ====================
    
    Z.time = function(type) {
        var d = new Date();
        var y = d.getFullYear();
        var m = String(d.getMonth() + 1).padStart(2, '0');
        var day = String(d.getDate()).padStart(2, '0');
        var h = String(d.getHours()).padStart(2, '0');
        var min = String(d.getMinutes()).padStart(2, '0');
        var s = String(d.getSeconds()).padStart(2, '0');
        
        if (type === 0) return y + '-' + m + '-' + day + ' ' + h + ':' + min + ':' + s;
        if (type === 1) return y + '/' + m + '/' + day + ' ' + h + ':' + min + ':' + s;
        if (type === 2) return y + '-' + m + '-' + day;
        if (type === 3) return h + ':' + min + ':' + s;
        if (type === 4) return Date.now();
        if (type === 5) return y + '年' + m + '月' + day + '日 ' + h + ':' + min + ':' + s;
        return y + '-' + m + '-' + day + ' ' + h + ':' + min + ':' + s;
    };
    
    Z.now = function() { return Date.now(); };
    
    Z.date = function() {
        return new Date();
    };
    
    // ==================== 随机数 ====================
    
    Z.rand = function(min, max, dec) {
        if (dec) return min + Math.random() * (max - min);
        return Math.floor(min + Math.random() * (max - min + 1));
    };
    
    Z.uuid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    
    Z.randomStr = function(len) {
        return Math.random().toString(36).substr(2, len);
    };
    
    // ==================== 计算 ====================
    
    Z.calc = function(expr, rem) {
        try {
            var ex = expr.replace(/\b(abs|sin|cos|tan|sqrt|pow|exp|log|floor|ceil|round)\b/g, 'Math.$1');
            ex = ex.replace(/\bPI\b/g, 'Math.PI').replace(/\bE\b/g, 'Math.E');
            var r = Function('"use strict";return (' + ex + ')')();
            if (rem) return r % 1;
            return r;
        } catch(e) {
            console.error('计算错误:', e);
            return NaN;
        }
    };
    
    // ==================== 渐变 ====================
    
    Z.bm = function(dir, id, colors) {
        var el = getEl(id);
        if (!el) return false;
        var dirs = {
            topbottom: 'to bottom',
            leftright: 'to right',
            TL_BR: 'to bottom right',
            rightleft: 'to left',
            bottomtop: 'to top'
        };
        var d = dirs[dir] || 'to bottom';
        el.style.background = 'linear-gradient(' + d + ', ' + colors.split('|').join(', ') + ')';
        return true;
    };
    
    // ==================== 延迟 ====================
    
    Z.wait = function(ms) {
        return new Promise(function(resolve) { setTimeout(resolve, ms); });
    };
    
    Z.pause = function(ms) {
        return new Promise(function(resolve) { setTimeout(resolve, ms); });
    };
    
    Z.delay = function(ms) {
        return new Promise(function(resolve) { setTimeout(resolve, ms); });
    };
    
    Z.sleep = function(ms) {
        return new Promise(function(resolve) { setTimeout(resolve, ms); });
    };
    
    // ==================== 其他工具 ====================
    
    Z.log = function(msg) {
        console.log(msg);
        return msg;
    };
    
    Z.print = function(msg) {
        console.log(msg);
        return msg;
    };
    
    Z.edit = function(enable) {
        document.body.contentEditable = enable ? 'true' : 'false';
        return true;
    };
    
    Z.dl = function(path) {
        var a = document.createElement('a');
        a.href = path;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return true;
    };
    
    Z.sdl = function(path) {
        return Z.dl(path);
    };
    
    Z.ua = function() {
        return navigator.userAgent;
    };
    
    Z.url = function() {
        return window.location.href;
    };
    
    Z.host = function() {
        return window.location.host;
    };
    
    Z.path = function() {
        return window.location.pathname;
    };
    
    Z.data = function(el, key, val) {
        if (arguments.length === 1 && typeof el === 'string') {
            if (el === 'ua') return navigator.userAgent;
            if (el === 'url') return window.location.href;
        }
        var node = getEl(el);
        if (!node || !key) return null;
        var attr = toDataAttr(key);
        if (val === undefined) return node.getAttribute(attr);
        node.setAttribute(attr, val);
        return val;
    };
    
    Z.store = function(k, v) {
        if (v === undefined) return localStorage.getItem(k);
        localStorage.setItem(k, v);
        return v;
    };
    
    Z.clear = function() {
        localStorage.clear();
        return true;
    };
    
    Z.rmItem = function(k) {
        localStorage.removeItem(k);
        return true;
    };
    
    Z.cookie = function(k, v, days) {
        if (v === undefined) {
            var c = document.cookie.match('(^|;)\\s*' + k + '\\s*=\\s*([^;]+)');
            return c ? c.pop() : null;
        }
        var exp = '';
        if (days) {
            var d = new Date();
            d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
            exp = '; expires=' + d.toUTCString();
        }
        document.cookie = k + '=' + (v || '') + exp + '; path=/';
        return v;
    };
    
    Z.isMobile = function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    Z.isPC = function() {
        return !Z.isMobile();
    };
    
    Z.isIOS = function() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent);
    };
    
    Z.isAndroid = function() {
        return /Android/.test(navigator.userAgent);
    };
    
    Z.full = function() {
        var e = document.documentElement;
        if (e.requestFullscreen) e.requestFullscreen();
        return true;
    };
    
    Z.exitFull = function() {
        if (document.exitFullscreen) document.exitFullscreen();
        return true;
    };
    
    Z.isFull = function() {
        return !!document.fullscreenElement;
    };
    
    Z.scrollTo = function(x, y) {
        window.scrollTo({ top: y, left: x, behavior: 'smooth' });
        return true;
    };
    
    Z.scrollX = function() {
        return window.scrollX;
    };
    
    Z.scrollY = function() {
        return window.scrollY;
    };
    
    Z.debounce = function(fn, delay) {
        var t;
        return function() {
            var args = arguments;
            clearTimeout(t);
            t = setTimeout(function() { fn.apply(null, args); }, delay);
        };
    };
    
    Z.throttle = function(fn, delay) {
        var last = 0;
        return function() {
            var now = Date.now();
            if (now - last >= delay) {
                last = now;
                fn.apply(null, arguments);
            }
        };
    };
    
    Z.cloneDeep = function(obj) {
        return cloneData(obj);
    };
    
    Z.deepCopy = function(obj) {
        return cloneData(obj);
    };

    Z.copyDeep = function(obj) {
        return cloneData(obj);
    };
    
    Z.rgb2hex = function(r, g, b) {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };
    
    Z.hex2rgb = function(hex) {
        var h = parseInt(hex.slice(1), 16);
        return { r: h >> 16, g: (h >> 8) & 255, b: h & 255 };
    };
    
    Z.getParam = function(name) {
        var url = new URL(window.location.href);
        return url.searchParams.get(name);
    };
    
    Z.setParam = function(name, val) {
        var url = new URL(window.location.href);
        url.searchParams.set(name, val);
        history.pushState({}, '', url);
        return true;
    };
    
    Z.delParam = function(name) {
        var url = new URL(window.location.href);
        url.searchParams.delete(name);
        history.pushState({}, '', url);
        return true;
    };

    Z.rotate = function(img, angle) {
        return loadImageSource(img).then(function(image) {
            var width = image.naturalWidth || image.width;
            var height = image.naturalHeight || image.height;
            var rad = angle * Math.PI / 180;
            var sin = Math.abs(Math.sin(rad));
            var cos = Math.abs(Math.cos(rad));
            var canvas = document.createElement('canvas');
            canvas.width = Math.ceil(width * cos + height * sin);
            canvas.height = Math.ceil(width * sin + height * cos);

            var ctx = canvas.getContext('2d');
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(rad);
            ctx.drawImage(image, -width / 2, -height / 2, width, height);
            return canvas.toDataURL();
        });
    };

    Z.crop = function(img, sx, ex, sy, ey) {
        return loadImageSource(img).then(function(image) {
            var width = Math.max(0, ex - sx);
            var height = Math.max(0, ey - sy);
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            var ctx = canvas.getContext('2d');
            ctx.drawImage(image, sx, sy, width, height, 0, 0, width, height);
            return canvas.toDataURL();
        });
    };
    
    Z.isStr = function(v) { return typeof v === 'string'; };
    Z.isNum = function(v) { return typeof v === 'number' && !isNaN(v); };
    Z.isArr = function(v) { return Array.isArray(v); };
    Z.isObj = function(v) { return typeof v === 'object' && v !== null && !Array.isArray(v); };
    Z.isFn = function(v) { return typeof v === 'function'; };
    Z.isEl = function(v) { return v && v.nodeType === 1; };
    
    Z.px = function(v) { return v + 'px'; };
    Z.em = function(v) { return v + 'em'; };
    Z.cvd = function(v, m) {
        if (m === 1) return v + 'px';
        if (m === 2) return v + 'em';
        return v.toString();
    };
    
    Z.stop = function() { throw new Error('Execution stopped'); };
    Z.break = function() { throw new Error('Execution stopped'); };
    
    Z.load = function(url) {
        return new Promise(function(res, rej) {
            var s = document.createElement('script');
            s.src = url;
            s.onload = res;
            s.onerror = rej;
            document.head.appendChild(s);
        });
    };
    
    // 暴露全局
    global.zxlite = Z;
    global.zxd = Z;
    
})(typeof window !== 'undefined' ? window : this);

if (typeof console !== 'undefined') console.log('zxlite.js v1.2.4 loaded - 补齐文档 API');
