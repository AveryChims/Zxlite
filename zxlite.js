/**
 * zxlite.js - 轻量级前端工具库 v2.0.1
 * 新增高级模块：bus/store/router/http/cache/queue/valid/template
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
        _dialogAnim: true,
        _toastAnim: true,
        _currentStyle: 'light1',
        _customStyle: null,
        _currentTheme: 'light1',
        _themeEnabled: false,
        _unsafeImport: false,
        _pkgUrl: 'https://res.viqu.com/web/lib/zxlite/',
        _pkgs: new Map(),
        _aliases: new Map(),
        _dialogStyles: {
            light1: { 
                bg: '#ffffff', text: '#333333', textSec: '#666666', border: '#e0e0e0', 
                btnBg: '#007aff', btnText: '#ffffff', shadow: '0 10px 25px rgba(0,0,0,0.1)',
                radius: '12px', padding: '24px', btnRadius: '8px'
            },
            light2: { 
                bg: '#f5f5f0', text: '#2c3e50', textSec: '#7f8c8d', border: '#d5d8dc', 
                btnBg: '#27ae60', btnText: '#ffffff', shadow: '0 8px 20px rgba(39,174,96,0.15)',
                radius: '4px', padding: '20px', btnRadius: '4px'
            },
            light3: { 
                bg: '#fff8f0', text: '#8b4513', textSec: '#cd853f', border: '#f4e4c1', 
                btnBg: '#e67e22', btnText: '#ffffff', shadow: '0 10px 30px rgba(230,126,34,0.2)',
                radius: '20px', padding: '28px', btnRadius: '20px'
            },
            dark1: { 
                bg: '#1a1a2e', text: '#e0e0e0', textSec: '#a0a0b0', border: '#2d2d44', 
                btnBg: '#7c3aed', btnText: '#ffffff', shadow: '0 15px 35px rgba(0,0,0,0.5)',
                radius: '16px', padding: '24px', btnRadius: '10px'
            },
            dark2: { 
                bg: '#0f0f23', text: '#c4b5fd', textSec: '#8b5cf6', border: '#1e1b4b', 
                btnBg: '#ec4899', btnText: '#ffffff', shadow: '0 0 20px rgba(236,72,153,0.3)',
                radius: '8px', padding: '20px', btnRadius: '6px'
            },
            dark3: { 
                bg: '#1e293b', text: '#f1f5f9', textSec: '#94a3b8', border: '#334155', 
                btnBg: '#0ea5e9', btnText: '#ffffff', shadow: '0 10px 25px rgba(14,165,233,0.2)',
                radius: '24px', padding: '30px', btnRadius: '30px'
            }
        },
        _themes: {
            light1: { 
                primary: '#007aff', primaryLight: '#e8f0fe', primaryDark: '#005bb5', 
                bg: '#f5f5f5', card: '#ffffff', text: '#1e293b', textSec: '#64748b', 
                border: '#e0e0e0', radius: '12px', toastBg: 'rgba(255,255,255,0.95)',
                toastShadow: '0 4px 15px rgba(0,0,0,0.1)'
            },
            light2: { 
                primary: '#27ae60', primaryLight: '#e8f5e9', primaryDark: '#1e8449', 
                bg: '#f8f9fa', card: '#ffffff', text: '#212529', textSec: '#6c757d', 
                border: '#dee2e6', radius: '8px', toastBg: 'rgba(255,255,255,0.95)',
                toastShadow: '0 4px 15px rgba(0,0,0,0.1)'
            },
            light3: { 
                primary: '#e67e22', primaryLight: '#fef3e8', primaryDark: '#b85e0a', 
                bg: '#fff9e6', card: '#ffffff', text: '#5d4e37', textSec: '#8b7355', 
                border: '#e6d5b8', radius: '16px', toastBg: 'rgba(255,255,255,0.95)',
                toastShadow: '0 4px 15px rgba(0,0,0,0.1)'
            },
            dark1: { 
                primary: '#7c3aed', primaryLight: '#2d2d44', primaryDark: '#5b21b6', 
                bg: '#1a1a2e', card: '#2d2d44', text: '#e0e0e0', textSec: '#a0a0b0', 
                border: '#3d3d5c', radius: '12px', toastBg: 'rgba(45,45,68,0.95)',
                toastShadow: '0 4px 15px rgba(255,255,255,0.15)'
            },
            dark2: { 
                primary: '#ec4899', primaryLight: '#2e2a5c', primaryDark: '#be185d', 
                bg: '#0f0f23', card: '#1e1b4b', text: '#c4b5fd', textSec: '#8b5cf6', 
                border: '#2e2a5c', radius: '8px', toastBg: 'rgba(30,27,75,0.95)',
                toastShadow: '0 4px 15px rgba(255,255,255,0.15)'
            },
            dark3: { 
                primary: '#0ea5e9', primaryLight: '#1e293b', primaryDark: '#0284c7', 
                bg: '#0f172a', card: '#1e293b', text: '#f1f5f9', textSec: '#94a3b8', 
                border: '#334155', radius: '16px', toastBg: 'rgba(30,41,59,0.95)',
                toastShadow: '0 4px 15px rgba(255,255,255,0.15)'
            }
        },
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
    
    function getStyle(styleName) {
        if (styleName && Z._dialogStyles[styleName]) {
            return Z._dialogStyles[styleName];
        }
        if (Z._customStyle) {
            return Z._customStyle;
        }
        return Z._dialogStyles[Z._currentStyle] || Z._dialogStyles.light1;
    }
    
    function sanitizeHtml(html) {
        var raw = String(html == null ? '' : html);
        var template = document.createElement('template');
        template.innerHTML = raw;
        
        var blockedTags = {
            SCRIPT: true,
            IFRAME: true,
            OBJECT: true,
            EMBED: true,
            LINK: true,
            META: true,
            STYLE: true
        };
        
        function walk(node) {
            if (!node) return;
            if (node.nodeType === 1) {
                var tag = node.tagName;
                if (blockedTags[tag]) {
                    node.remove();
                    return;
                }
                var attrs = Array.from(node.attributes || []);
                for (var i = 0; i < attrs.length; i++) {
                    var name = attrs[i].name;
                    var value = attrs[i].value || '';
                    var lower = name.toLowerCase();
                    if (lower.indexOf('on') === 0 || lower === 'srcdoc') {
                        node.removeAttribute(name);
                        continue;
                    }
                    if ((lower === 'href' || lower === 'src' || lower === 'xlink:href') && /^\s*javascript:/i.test(value)) {
                        node.removeAttribute(name);
                    }
                }
            }
            var children = Array.from(node.childNodes || []);
            for (var j = 0; j < children.length; j++) walk(children[j]);
        }
        
        walk(template.content);
        return template.innerHTML;
    }
    
    Z.sanitizeHtml = function(html) {
        return sanitizeHtml(html);
    };
    
    function applyTheme(themeName, customColor) {
        Z._themeEnabled = true;
        var theme = Z._themes[themeName] || Z._themes.light1;
        var primaryColor = customColor || theme.primary;
        var isDark = themeName.startsWith('dark');
        
        var textColor = theme.text;
        var textSecColor = theme.textSec;
        var cardTextColor = theme.text;
        
        var primaryLight = isDark ? `rgba(${parseInt(primaryColor.slice(1,3),16)}, ${parseInt(primaryColor.slice(3,5),16)}, ${parseInt(primaryColor.slice(5,7),16)}, 0.15)` : `rgba(${parseInt(primaryColor.slice(1,3),16)}, ${parseInt(primaryColor.slice(3,5),16)}, ${parseInt(primaryColor.slice(5,7),16)}, 0.1)`;
        
        var styleEl = document.getElementById('zxlite-theme');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'zxlite-theme';
            document.head.appendChild(styleEl);
        }
        
        styleEl.textContent = `
            :root {
                --zx-primary: ${primaryColor};
                --zx-primary-light: ${primaryLight};
                --zx-primary-dark: ${theme.primaryDark};
                --zx-bg: ${theme.bg};
                --zx-card: ${theme.card};
                --zx-text: ${textColor};
                --zx-text-sec: ${textSecColor};
                --zx-border: ${theme.border};
                --zx-radius: ${theme.radius};
                --zx-toast-bg: ${theme.toastBg};
                --zx-toast-shadow: ${theme.toastShadow};
            }
            body {
                background: var(--zx-bg) !important;
                color: var(--zx-text) !important;
                transition: all 0.3s ease;
            }
            body *:not(.zxlite-dialog):not(.zxlite-dialog *):not([id^="ntm_"]):not([id^="ntm_"] *) {
                color: var(--zx-text) !important;
            }
            a:hover {
                color: var(--zx-primary) !important;
            }
            .card:not(.zxlite-dialog .card), .elements-container:not(.zxlite-dialog .elements-container), 
            .demo-area:not(.zxlite-dialog .demo-area), .status:not(.zxlite-dialog .status), 
            .json-preview:not(.zxlite-dialog .json-preview), .header:not(.zxlite-dialog .header),
            .log-area:not(.zxlite-dialog .log-area) {
                background: var(--zx-card) !important;
                color: ${cardTextColor} !important;
                border-color: var(--zx-border) !important;
                border-radius: var(--zx-radius) !important;
            }
            button:not(.zxlite-dialog button):not([id^="ntm_"]), .btn:not(.zxlite-dialog .btn) {
                background: var(--zx-primary) !important;
                color: white !important;
                border-radius: calc(var(--zx-radius) * 0.6) !important;
            }
            button:not(.zxlite-dialog button):hover, .btn:not(.zxlite-dialog .btn):hover {
                background: var(--zx-primary-dark) !important;
            }
            input:not(.zxlite-dialog input):not([id^="ntm_"]), 
            textarea:not(.zxlite-dialog textarea):not([id^="ntm_"]), 
            select:not(.zxlite-dialog select):not([id^="ntm_"]) {
                background: var(--zx-card) !important;
                color: ${cardTextColor} !important;
                border-color: var(--zx-border) !important;
                border-radius: calc(var(--zx-radius) * 0.6) !important;
            }
            .api-desc:not(.zxlite-dialog .api-desc), .auto_color:not(.zxlite-dialog .auto_color) {
                background: var(--zx-primary-light) !important;
                color: var(--zx-text) !important;
            }
            .zxlite-toast, .zxlite-toast-top {
                background: var(--zx-toast-bg) !important;
                color: var(--zx-text) !important;
                backdrop-filter: blur(10px) !important;
                box-shadow: var(--zx-toast-shadow) !important;
                border: 1px solid var(--zx-border) !important;
            }
        `;
        Z._currentTheme = themeName;
    }
    
    function addAnimationStyle() {
        if (document.getElementById('zx-animation-style')) return;
        var style = document.createElement('style');
        style.id = 'zx-animation-style';
        style.textContent = `
            @keyframes zx-fade-in {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            @keyframes zx-fade-out {
                from { opacity: 1; transform: scale(1); }
                to { opacity: 0; transform: scale(0.95); }
            }
            @keyframes zx-toast-in {
                from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            @keyframes zx-toast-out {
                from { opacity: 1; transform: translateX(-50%) translateY(0); }
                to { opacity: 0; transform: translateX(-50%) translateY(20px); }
            }
            @keyframes zx-toast-top-in {
                from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            @keyframes zx-toast-top-out {
                from { opacity: 1; transform: translateX(-50%) translateY(0); }
                to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
            .zx-dialog-anim {
                animation: zx-fade-in 0.2s ease forwards;
            }
            .zx-dialog-anim-out {
                animation: zx-fade-out 0.2s ease forwards;
            }
            .zx-toast-anim {
                animation: zx-toast-in 0.2s ease forwards;
            }
            .zx-toast-anim-out {
                animation: zx-toast-out 0.2s ease forwards;
            }
            .zx-toast-top-anim {
                animation: zx-toast-top-in 0.2s ease forwards;
            }
            .zx-toast-top-anim-out {
                animation: zx-toast-top-out 0.2s ease forwards;
            }
        `;
        document.head.appendChild(style);
    }
    
    function createDialogCore(opts) {
        if (Z._dialog) { 
            if (Z._dialogAnim && Z._dialog) {
                var oldDialog = Z._dialog.querySelector('.zxlite-dialog');
                if (oldDialog) {
                    oldDialog.classList.add('zx-dialog-anim-out');
                    setTimeout(function() {
                        if (Z._dialog && Z._dialog.parentNode) Z._dialog.remove();
                        Z._dialog = null;
                    }, 200);
                } else {
                    Z._dialog.remove();
                    Z._dialog = null;
                }
            } else {
                Z._dialog.remove();
                Z._dialog = null;
            }
        }
        
        var title = opts.title || '';
        var content = opts.content || '';
        var btns = opts.btns || [];
        var outsideClose = opts.outsideClose === true;
        var outsideFn = opts.outsideFn || null;
        var styleName = opts.style || null;
        var isInput = opts.isInput === true;
        var inputVal = opts.inputValue || '';
        var customHtml = opts.customHtml || null;
        
        var s = getStyle(styleName);
        
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:10000;';
        
        var dialog = document.createElement('div');
        dialog.className = 'zxlite-dialog';
        if (Z._dialogAnim) dialog.classList.add('zx-dialog-anim');
        dialog.setAttribute('data-zx-dialog', 'true');
        dialog.style.cssText = 'background:' + s.bg + ';border-radius:' + s.radius + ';padding:' + s.padding + ';min-width:280px;max-width:90%;box-shadow:' + s.shadow + ';color:' + s.text + ';border:1px solid ' + s.border + ';';
        
        var inputEl = null;
        
        if (customHtml) {
            dialog.innerHTML = sanitizeHtml(customHtml);
            var allElements = dialog.querySelectorAll('*');
            for (var i = 0; i < allElements.length; i++) {
                allElements[i].style.color = s.text;
                if (allElements[i].tagName === 'BUTTON') {
                    allElements[i].style.background = s.btnBg;
                    allElements[i].style.color = s.btnText;
                    allElements[i].style.borderRadius = s.btnRadius;
                }
                if (allElements[i].tagName === 'INPUT' || allElements[i].tagName === 'TEXTAREA' || allElements[i].tagName === 'SELECT') {
                    allElements[i].style.background = s.bg;
                    allElements[i].style.color = s.text;
                    allElements[i].style.borderColor = s.border;
                    allElements[i].style.borderRadius = s.btnRadius;
                }
            }
        } else {
            var titleEl = document.createElement('h3');
            titleEl.textContent = title;
            titleEl.style.cssText = 'margin:0 0 12px 0;font-size:18px;font-weight:600;color:' + s.text + ';';
            dialog.appendChild(titleEl);
            
            if (isInput) {
                inputEl = document.createElement('input');
                inputEl.type = 'text';
                inputEl.value = inputVal;
                inputEl.style.cssText = 'width:100%;padding:10px;margin:0 0 20px 0;border:1px solid ' + s.border + ';border-radius:' + s.btnRadius + ';background:' + s.bg + ';color:' + s.text + ';';
                dialog.appendChild(inputEl);
            } else if (content) {
                var contentEl = document.createElement('p');
                contentEl.textContent = content;
                contentEl.style.cssText = 'margin:0 0 24px 0;color:' + (s.textSec || s.text) + ';line-height:1.5;font-size:14px;';
                dialog.appendChild(contentEl);
            }
            
            var btnDiv = document.createElement('div');
            btnDiv.style.cssText = 'display:flex;justify-content:flex-end;gap:12px;flex-wrap:wrap;margin-top:0;';
            
            var closeDialog = function() {
                if (Z._dialogAnim && dialog) {
                    dialog.classList.add('zx-dialog-anim-out');
                    setTimeout(function() {
                        if (overlay.parentNode) overlay.remove();
                        Z._dialog = null;
                        if (outsideFn && typeof outsideFn === 'function') outsideFn();
                    }, 200);
                } else {
                    if (overlay.parentNode) overlay.remove();
                    Z._dialog = null;
                    if (outsideFn && typeof outsideFn === 'function') outsideFn();
                }
            };
            
            for (var i = 0; i < btns.length; i++) {
                var btn = btns[i];
                var button = document.createElement('button');
                button.textContent = btn.text;
                var isPrimary = i === btns.length - 1;
                if (isPrimary) {
                    button.style.cssText = 'padding:8px 20px;min-width:80px;border:none;border-radius:' + s.btnRadius + ';cursor:pointer;font-size:14px;font-weight:500;background:' + s.btnBg + ';color:' + s.btnText + ';transition:all 0.2s;';
                } else {
                    button.style.cssText = 'padding:8px 20px;min-width:80px;border:none;border-radius:' + s.btnRadius + ';cursor:pointer;font-size:14px;font-weight:500;background:#f0f0f0;color:#333;border:1px solid ' + s.border + ';transition:all 0.2s;';
                }
                button.onclick = (function(btnData, closeFn) {
                    return function() {
                        closeFn();
                        if (btnData.cb && typeof btnData.cb === 'function') {
                            btnData.cb(inputEl ? inputEl.value : null);
                        }
                    };
                })(btn, closeDialog);
                btnDiv.appendChild(button);
            }
            dialog.appendChild(btnDiv);
        }
        
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        Z._dialog = overlay;
        
        if (outsideClose) {
            overlay.onclick = function(e) {
                if (e.target === overlay) {
                    if (Z._dialogAnim && dialog) {
                        dialog.classList.add('zx-dialog-anim-out');
                        setTimeout(function() {
                            if (overlay.parentNode) overlay.remove();
                            Z._dialog = null;
                            if (outsideFn && typeof outsideFn === 'function') outsideFn();
                        }, 200);
                    } else {
                        if (overlay.parentNode) overlay.remove();
                        Z._dialog = null;
                        if (outsideFn && typeof outsideFn === 'function') outsideFn();
                    }
                }
            };
        }
        dialog.onclick = function(e) { e.stopPropagation(); };
        
        return { dialog: dialog, overlay: overlay, inputEl: inputEl };
    }
    
    // ==================== DOM操作 ====================
    Z.set = function(id, type, val) {
        var el = getEl(id);
        if (!el) return false;
        if (type === 'text') el.textContent = val;
        else if (type === 'html') el.innerHTML = sanitizeHtml(val);
        else if (type === 'val') { if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') el.value = val; else el.textContent = val; }
        else if (type === 'attr') { for (var k in val) el.setAttribute(k, val[k]); }
        else if (type === 'css') { for (var k in val) el.style[k] = val[k]; }
        else if (type === 'class') el.className = val;
        else el.setAttribute(type, val);
        return true;
    };
    
    Z.get = function(id, type) {
        var el = getEl(id);
        if (!el) return null;
        if (type === 'text') return el.textContent;
        if (type === 'html') return el.innerHTML;
        if (type === 'val') return (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') ? el.value : el.textContent;
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
    
    Z.del = function(id) { var el = getEl(id); if (el && el.parentNode) { el.parentNode.removeChild(el); return true; } return false; };
    Z.$ = function(sel, all) { return all ? document.querySelectorAll(sel) : document.querySelector(sel); };
    Z.id = function(id) { return document.getElementById(id); };
    Z.hide = function(id) { var el = getEl(id); if (el) el.style.display = 'none'; return el; };
    Z.show = function(id) { var el = getEl(id); if (el) el.style.display = ''; return el; };
    Z.addClass = function(id, cls) { var el = getEl(id); if (el) el.classList.add(cls); return el; };
    Z.rmClass = function(id, cls) { var el = getEl(id); if (el) el.classList.remove(cls); return el; };
    Z.hasClass = function(id, cls) { var el = getEl(id); return el ? el.classList.contains(cls) : false; };
    Z.html = function(id, html, unsafe) { var el = getEl(id); if (!el) return null; if (html === undefined) return el.innerHTML; el.innerHTML = unsafe ? String(html) : sanitizeHtml(html); return el; };
    Z.text = function(id, txt) { var el = getEl(id); if (!el) return null; if (txt === undefined) return el.textContent; el.textContent = txt; return el; };
    Z.val = function(id, v) { var el = getEl(id); if (!el) return null; if (v === undefined) { if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') return el.value; return el.textContent; } if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') el.value = v; else el.textContent = v; return el; };
    Z.css = function(id, prop, val) { var el = getEl(id); if (!el) return null; if (typeof prop === 'object') { for (var k in prop) el.style[k] = prop[k]; return el; } if (val === undefined) return getComputedStyle(el)[prop]; el.style[prop] = val; return el; };
    Z.append = function(parent, child) { var p = getEl(parent), c = getEl(child); if (p && c) { p.appendChild(c); return true; } return false; };
    Z.prepend = function(parent, child) { var p = getEl(parent), c = getEl(child); if (p && c) { p.insertBefore(c, p.firstChild); return true; } return false; };
    
    // ==================== 音频控制 ====================
    Z.play = function(url) {
        var id = 'a_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        var audio = new Audio(url);
        audio.style.display = 'none';
        document.body.appendChild(audio);
        Z._ap.set(id, { audio: audio, id: id });
        audio.play().catch(function(e) { console.warn(e); });
        return id;
    };
    
    Z.pc = function(id, act) {
        var c = Z._ap.get(id);
        if (!c) return false;
        var a = c.audio;
        if (act === 'start' || act === 'continue') { a.play().catch(function(e) {}); }
        else if (act === 'pause') { a.pause(); }
        else if (act === 'stop') { a.pause(); a.currentTime = 0; }
        else if (act === 'kill') { a.pause(); a.remove(); Z._ap.delete(id); }
        else if (act === 'loop') { a.loop = true; }
        return true;
    };
    
    Z.pis = function(id) { var c = Z._ap.get(id); return c ? !c.audio.paused : false; };
    Z.pp = function(id, t) { var c = Z._ap.get(id); if (!c) return 0; if (t !== undefined && !isNaN(t)) c.audio.currentTime = t; return c.audio.currentTime; };
    Z.pa = function(id) { var c = Z._ap.get(id); if (!c) return 0; var dur = c.audio.duration; return isNaN(dur) ? 0 : dur; };
    Z.pv = function(id, v) { var c = Z._ap.get(id); if (c) c.audio.volume = Math.min(1, Math.max(0, v / 100)); return true; };
    
    // ==================== 动画 ====================
    Z.anim = function(id, type, dur, dir) {
        dir = dir || 'normal';
        var el = getEl(id);
        if (!el) return null;
        var cfg = Z._at[type] || Z._customAnims.get(type);
        if (!cfg) return null;
        for (var p in cfg.init) el.style[p] = cfg.init[p];
        return el.animate([cfg.init, cfg.key], {
            duration: dur || cfg.dur,
            direction: dir === 'reverse' ? 'reverse' : 'normal',
            fill: 'forwards',
            easing: cfg.easing || 'ease',
            iterations: cfg.iter || 1,
            alternate: cfg.alt || false
        });
    };
    
    Z.addAnim = function(name, init, key, dur, easing, iter, alt) {
        Z._customAnims.set(name, { init: init, key: key, dur: dur || 300, easing: easing || 'ease', iter: iter || 1, alt: alt || false });
        return true;
    };
    
    Z.stopAnim = function(id) { var el = getEl(id); if (el) el.getAnimations().forEach(function(a) { a.cancel(); }); return true; };
    
    // ==================== 页面控制 ====================
    Z.meta = function(type, val, target) {
        if (type === 'title') { document.title = val; return true; }
        if (type === 'url') { if (target === 'new') window.open(val, '_blank'); else window.location.href = val; return true; }
        if (type === 'view') { var vp = document.querySelector('meta[name="viewport"]'); if (!vp) { vp = document.createElement('meta'); vp.name = 'viewport'; document.head.appendChild(vp); } vp.content = val; return true; }
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
        var args = [title, content];
        if (arguments.length >= 5 && typeof btn2 === 'function') {
            args.push(btn1, cb1, btn2, cb2);
        } else if (arguments.length >= 3) {
            args.push(btn1, btn2 || cb1);
        } else {
            args.push('确定');
        }
        return Z.dialogx.apply(Z, args);
    };
    
    Z.dialogx = function() {
        var args = Array.prototype.slice.call(arguments);
        var title = args[0] || '';
        var content = args[1] || '';
        var btns = [];
        var outsideClose = false;
        var outsideFn = null;
        var style = null;
        var i = 2;
        
        while (i < args.length) {
            if (typeof args[i] === 'boolean') {
                outsideClose = args[i];
                i++;
            } else if (typeof args[i] === 'function') {
                outsideFn = args[i];
                i++;
            } else if (typeof args[i] === 'string' && (args[i] === 'light1' || args[i] === 'light2' || args[i] === 'light3' || args[i] === 'dark1' || args[i] === 'dark2' || args[i] === 'dark3')) {
                style = args[i];
                i++;
            } else if (typeof args[i] === 'string') {
                var text = args[i];
                var cb = (i + 1 < args.length && typeof args[i + 1] === 'function') ? args[i + 1] : null;
                btns.push({ text: text, cb: cb });
                i += cb ? 2 : 1;
            } else {
                i++;
            }
        }
        
        if (btns.length === 0) btns.push({ text: '确定', cb: null });
        return createDialogCore({ title: title, content: content, btns: btns, outsideClose: outsideClose, outsideFn: outsideFn, style: style });
    };
    
    Z.dialogi = function() {
        var args = Array.prototype.slice.call(arguments);
        var title = args[0] || '';
        var content = args[1] || '';
        var btns = [];
        var outsideClose = false;
        var outsideFn = null;
        var style = null;
        var i = 2;
        
        while (i < args.length) {
            if (typeof args[i] === 'boolean') {
                outsideClose = args[i];
                i++;
            } else if (typeof args[i] === 'function') {
                outsideFn = args[i];
                i++;
            } else if (typeof args[i] === 'string' && (args[i] === 'light1' || args[i] === 'light2' || args[i] === 'light3' || args[i] === 'dark1' || args[i] === 'dark2' || args[i] === 'dark3')) {
                style = args[i];
                i++;
            } else if (typeof args[i] === 'string') {
                var text = args[i];
                var cb = (i + 1 < args.length && typeof args[i + 1] === 'function') ? args[i + 1] : null;
                btns.push({ text: text, cb: cb });
                i += cb ? 2 : 1;
            } else {
                i++;
            }
        }
        
        if (btns.length === 0) btns.push({ text: '确定', cb: null });
        
        return new Promise(function(resolve) {
            var result = createDialogCore({ title: title, content: content, btns: btns, outsideClose: outsideClose, outsideFn: outsideFn, style: style, isInput: true });
            var btnDiv = result.dialog.querySelector('div:last-child');
            if (btnDiv && btnDiv.children.length > 0) {
                var lastBtn = btnDiv.children[btnDiv.children.length - 1];
                var oldClick = lastBtn.onclick;
                lastBtn.onclick = function() {
                    var val = result.inputEl ? result.inputEl.value : '';
                    if (oldClick) oldClick();
                    resolve(val);
                };
            } else {
                resolve('');
            }
        });
    };
    
    Z.dialogc = function(html, outsideClose, outsideFn) {
        return createDialogCore({ customHtml: html, outsideClose: outsideClose === true, outsideFn: outsideFn || null });
    };
    
    Z.dialogd = function(view, id) {
        if (view && view.dialog) return view.dialog.querySelector('#' + id);
        return null;
    };
    
    Z.dialogs = function(style) {
        if (typeof style === 'string' && Z._dialogStyles[style]) {
            Z._currentStyle = style;
            Z._customStyle = null;
        } else if (typeof style === 'object') {
            Z._customStyle = style;
        } else {
            return false;
        }
        return true;
    };
    
    Z.dialoga = function(enable) { 
        Z._dialogAnim = enable; 
        return true; 
    };
    
    Z.toasta = function(enable) { 
        Z._toastAnim = enable; 
        return true; 
    };
    
    // ==================== 动态主题 ====================
    Z.style = function(theme, color) {
        var themeName = theme || 'light1';
        if (color && /^#([0-9A-F]{3}){1,2}$/i.test(color)) {
            var baseTheme = Z._themes[themeName] || Z._themes.light1;
            var isDark = themeName.startsWith('dark');
            var customTheme = {
                primary: color,
                primaryLight: isDark ? `rgba(${parseInt(color.slice(1,3),16)}, ${parseInt(color.slice(3,5),16)}, ${parseInt(color.slice(5,7),16)}, 0.15)` : `rgba(${parseInt(color.slice(1,3),16)}, ${parseInt(color.slice(3,5),16)}, ${parseInt(color.slice(5,7),16)}, 0.1)`,
                primaryDark: baseTheme.primaryDark,
                bg: baseTheme.bg,
                card: baseTheme.card,
                text: baseTheme.text,
                textSec: baseTheme.textSec,
                border: baseTheme.border,
                radius: baseTheme.radius,
                toastBg: baseTheme.toastBg,
                toastShadow: baseTheme.toastShadow
            };
            var styleEl = document.getElementById('zxlite-theme');
            if (!styleEl) {
                styleEl = document.createElement('style');
                styleEl.id = 'zxlite-theme';
                document.head.appendChild(styleEl);
            }
            styleEl.textContent = `
                :root {
                    --zx-primary: ${customTheme.primary};
                    --zx-primary-light: ${customTheme.primaryLight};
                    --zx-primary-dark: ${customTheme.primaryDark};
                    --zx-bg: ${customTheme.bg};
                    --zx-card: ${customTheme.card};
                    --zx-text: ${customTheme.text};
                    --zx-text-sec: ${customTheme.textSec};
                    --zx-border: ${customTheme.border};
                    --zx-radius: ${customTheme.radius};
                    --zx-toast-bg: ${customTheme.toastBg};
                    --zx-toast-shadow: ${customTheme.toastShadow};
                }
                body { background: var(--zx-bg) !important; color: var(--zx-text) !important; transition: all 0.3s ease; }
                body *:not(.zxlite-dialog):not(.zxlite-dialog *):not([id^="ntm_"]):not([id^="ntm_"] *) { color: var(--zx-text) !important; }
                a:hover { color: var(--zx-primary) !important; }
                .card:not(.zxlite-dialog .card), .elements-container:not(.zxlite-dialog .elements-container), 
                .demo-area:not(.zxlite-dialog .demo-area), .status:not(.zxlite-dialog .status), 
                .json-preview:not(.zxlite-dialog .json-preview), .header:not(.zxlite-dialog .header),
                .log-area:not(.zxlite-dialog .log-area) {
                    background: var(--zx-card) !important;
                    color: var(--zx-text) !important;
                    border-color: var(--zx-border) !important;
                    border-radius: var(--zx-radius) !important;
                }
                button:not(.zxlite-dialog button):not([id^="ntm_"]), .btn:not(.zxlite-dialog .btn) {
                    background: var(--zx-primary) !important;
                    color: white !important;
                    border-radius: calc(var(--zx-radius) * 0.6) !important;
                }
                button:not(.zxlite-dialog button):hover, .btn:not(.zxlite-dialog .btn):hover {
                    background: var(--zx-primary-dark) !important;
                }
                input:not(.zxlite-dialog input):not([id^="ntm_"]), 
                textarea:not(.zxlite-dialog textarea):not([id^="ntm_"]), 
                select:not(.zxlite-dialog select):not([id^="ntm_"]) {
                    background: var(--zx-card) !important;
                    color: var(--zx-text) !important;
                    border-color: var(--zx-border) !important;
                    border-radius: calc(var(--zx-radius) * 0.6) !important;
                }
                .api-desc:not(.zxlite-dialog .api-desc), .auto_color:not(.zxlite-dialog .auto_color) {
                    background: var(--zx-primary-light) !important;
                    color: var(--zx-text) !important;
                }
                .zxlite-toast, .zxlite-toast-top {
                    background: var(--zx-toast-bg) !important;
                    color: var(--zx-text) !important;
                    backdrop-filter: blur(10px) !important;
                    box-shadow: var(--zx-toast-shadow) !important;
                    border: 1px solid var(--zx-border) !important;
                }
            `;
        } else {
            applyTheme(themeName);
        }
        return true;
    };
    
    // ==================== 包管理功能 ====================
    
    Z.score = function(url) {
        if (url && typeof url === 'string') {
            if (!url.endsWith('/')) {
                url = url + '/';
            }
            Z._pkgUrl = url;
            console.log('包来源已设置为:', url);
            return true;
        }
        return false;
    };
    
    Z.importUnsafe = function(enable) {
        Z._unsafeImport = !!enable;
        console.warn('zxlite import unsafe mode:', Z._unsafeImport ? 'ON' : 'OFF');
        return Z._unsafeImport;
    };
    
    Z.query = async function(pkgName) {
        try {
            var url = Z._pkgUrl + pkgName + '/desc.prop';
            var response = await fetch(url);
            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }
            var text = await response.text();
            var info = {};
            var lines = text.split('\n');
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i].trim();
                if (line === '') continue;
                var eqIndex = line.indexOf('=');
                if (eqIndex > 0) {
                    var key = line.substring(0, eqIndex).trim();
                    var val = line.substring(eqIndex + 1).trim();
                    info[key] = val;
                }
            }
            return info;
        } catch(e) {
            console.error('获取包信息失败:', e);
            return null;
        }
    };
    
    Z.import = async function(pkgName) {
        try {
            if (Z._pkgs.has(pkgName)) {
                console.log('包已导入:', pkgName);
                return true;
            }
            
            var url = Z._pkgUrl + pkgName + '/main.zxd';
            console.log('导入包:', url);
            
            var response = await fetch(url);
            if (!response.ok) {
                throw new Error('HTTP ' + response.status + ' - 文件不存在');
            }
            
            var code = await response.text();
            console.log('获取代码成功，长度:', code.length);
            
            // 优先支持 JSON 包格式（更安全）
            var asJson = null;
            if (/^\s*[\[{]/.test(code.trim())) {
                try {
                    asJson = JSON.parse(code);
                } catch (_) {}
            }
            if (asJson && typeof asJson === 'object') {
                Z._pkgs.set(pkgName, asJson);
                window[pkgName] = asJson;
                console.log('包导入成功(JSON):', pkgName, Object.keys(asJson));
                return true;
            }
            
            // JS 包执行必须显式打开不安全模式
            if (!Z._unsafeImport) {
                console.error('导入被拒绝：远程 JS 包执行默认禁用。若确认可信，请先执行 zxd.importUnsafe(true)');
                return false;
            }
            
            // 在显式不安全模式下使用 script 注入（不使用 eval）
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.setAttribute('data-zxlite-import', pkgName);
            script.text = code + '\n//# sourceURL=zxlite-import-' + pkgName + '.js';
            document.head.appendChild(script);
            script.remove();
            
            // 获取包导出的内容
            var pkgExports = window[pkgName] || {};
            
            Z._pkgs.set(pkgName, pkgExports);
            
            console.log('包导入成功:', pkgName, Object.keys(pkgExports));
            return true;
        } catch(e) {
            console.error('导入包失败:', e.message);
            return false;
        }
    };
    
    Z.imports = function() {
        var args = Array.prototype.slice.call(arguments);
        var promises = [];
        for (var i = 0; i < args.length; i++) {
            promises.push(Z.import(args[i]));
        }
        return Promise.all(promises).then(function(results) {
            for (var i = 0; i < results.length; i++) {
                if (!results[i]) return false;
            }
            return true;
        });
    };
    
    Z.alias = function(pkgName, alias) {
        if (!pkgName || !alias) return false;
        if (!Z._pkgs.has(pkgName)) {
            console.warn('包未导入:', pkgName);
            return false;
        }
        
        var pkg = Z._pkgs.get(pkgName);
        window[alias] = pkg;
        Z._aliases.set(alias, pkgName);
        console.log('设置别名:', pkgName, '->', alias);
        return true;
    };
    
    // ==================== Toast ====================
    Z.toast = function(msg, dur) {
        dur = dur || 2000;
        
        if (Z._toastTimer) {
            clearTimeout(Z._toastTimer);
            Z._toastTimer = null;
        }
        
        function showNewToast() {
            var toast = document.createElement('div');
            toast.textContent = msg;
            toast.className = 'zxlite-toast';
            if (Z._toastAnim) toast.classList.add('zx-toast-anim');
            toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);padding:10px 20px;border-radius:8px;font-size:14px;z-index:10001;max-width:80%;text-align:center;';
            if (msg.length > 30) toast.style.whiteSpace = 'normal';
            else toast.style.whiteSpace = 'nowrap';
            document.body.appendChild(toast);
            Z._toast = toast;
            
            Z._toastTimer = setTimeout(function() { 
                if (Z._toastAnim && Z._toast) {
                    Z._toast.classList.add('zx-toast-anim-out');
                    setTimeout(function() {
                        if (Z._toast && Z._toast.parentNode) {
                            Z._toast.remove();
                            Z._toast = null;
                        }
                        Z._toastTimer = null;
                    }, 200);
                } else {
                    if (Z._toast && Z._toast.parentNode) {
                        Z._toast.remove();
                        Z._toast = null;
                    }
                    Z._toastTimer = null;
                }
            }, dur);
        }
        
        if (Z._toast) {
            if (Z._toastAnim) {
                Z._toast.classList.add('zx-toast-anim-out');
                setTimeout(function() {
                    if (Z._toast && Z._toast.parentNode) {
                        Z._toast.remove();
                        Z._toast = null;
                    }
                    showNewToast();
                }, 200);
            } else {
                if (Z._toast.parentNode) Z._toast.remove();
                Z._toast = null;
                showNewToast();
            }
        } else {
            showNewToast();
        }
        return true;
    };
    
    Z.toastt = function(msg, dur) {
        dur = dur || 2000;
        
        if (Z._toastTimer) {
            clearTimeout(Z._toastTimer);
            Z._toastTimer = null;
        }
        
        function showNewToast() {
            var toast = document.createElement('div');
            toast.textContent = msg;
            toast.className = 'zxlite-toast-top';
            if (Z._toastAnim) toast.classList.add('zx-toast-top-anim');
            toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);padding:10px 20px;border-radius:8px;font-size:14px;z-index:10001;max-width:80%;text-align:center;';
            if (msg.length > 30) toast.style.whiteSpace = 'normal';
            else toast.style.whiteSpace = 'nowrap';
            document.body.appendChild(toast);
            Z._toast = toast;
            
            Z._toastTimer = setTimeout(function() { 
                if (Z._toastAnim && Z._toast) {
                    Z._toast.classList.add('zx-toast-top-anim-out');
                    setTimeout(function() {
                        if (Z._toast && Z._toast.parentNode) {
                            Z._toast.remove();
                            Z._toast = null;
                        }
                        Z._toastTimer = null;
                    }, 200);
                } else {
                    if (Z._toast && Z._toast.parentNode) {
                        Z._toast.remove();
                        Z._toast = null;
                    }
                    Z._toastTimer = null;
                }
            }, dur);
        }
        
        if (Z._toast) {
            if (Z._toastAnim) {
                Z._toast.classList.add('zx-toast-top-anim-out');
                setTimeout(function() {
                    if (Z._toast && Z._toast.parentNode) {
                        Z._toast.remove();
                        Z._toast = null;
                    }
                    showNewToast();
                }, 200);
            } else {
                if (Z._toast.parentNode) Z._toast.remove();
                Z._toast = null;
                showNewToast();
            }
        } else {
            showNewToast();
        }
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
    
    Z.sc = function(id, ev, fn) { return Z.on(id, ev, fn); };
    Z.ele = function(id, act) { var el = getEl(id); if (el && act === 'click') { el.click(); return true; } return false; };
    
    // ==================== 网络请求 ====================
    Z.ajaxGet = function(url, opts) { opts = opts || {}; return fetch(url, opts).then(function(r) { if (!r.ok && opts.throwOnHttpError !== false) throw new Error('HTTP ' + r.status); return r.text(); }).catch(function(e) { if (opts.silent !== false) return ''; throw e; }); };
    Z.ajaxPost = function(url, data, opts) { opts = opts || {}; var fd = new URLSearchParams(); data = data || {}; for (var k in data) fd.append(k, data[k]); return fetch(url, { method: 'POST', body: fd, headers: opts.headers || undefined }).then(function(r) { if (!r.ok && opts.throwOnHttpError !== false) throw new Error('HTTP ' + r.status); return r.text(); }).catch(function(e) { if (opts.silent !== false) return ''; throw e; }); };
    Z.gu = function(url) { return Z.ajaxGet(url); };
    Z.post = function(url, data) { return Z.ajaxPost(url, data); };
    
    // ==================== JSON操作 ====================
    Z.json = function(data, act, key, val) {
        try {
            var d = typeof data === 'string' ? JSON.parse(data) : JSON.parse(JSON.stringify(data));
            if (act === 'edit') { if (d[key] !== undefined) d[key] = val; return d; }
            if (act === 'add') { d[key] = val; return d; }
            if (act === 'del') { delete d[key]; return d; }
            if (act === 'get') return d[key];
            if (act === 'list') {
                if (Array.isArray(d)) return d.slice();
                if (d && typeof d === 'object') return Object.keys(d);
                return [];
            }
            return d;
        } catch(e) { console.error(e); return null; }
    };
    
    // ==================== 字符串操作 ====================
    Z.rp = function(str, search, replace, all) { return all ? str.split(search).join(replace) : str.replace(search, replace); };
    Z.cut = function(str, start, end) { var i = str.indexOf(start); if (i === -1) return ''; var j = str.indexOf(end, i + start.length); return j === -1 ? '' : str.substring(i + start.length, j); };
    Z.mk = function(str) { try { return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(m, p) { return String.fromCharCode(parseInt(p, 16)); })); } catch(e) { return btoa(str); } };
    Z.rk = function(str) { try { return decodeURIComponent(atob(str).split('').map(function(c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); }).join('')); } catch(e) { return atob(str); } };
    Z.upper = function(str) { return str.toUpperCase(); };
    Z.lower = function(str) { return str.toLowerCase(); };
    Z.bigger = function(str) { return str.toUpperCase(); };
    Z.slower = function(str) { return str.toLowerCase(); };
    Z.trim = function(str) { return str.trim(); };
    Z.strcm = function(str) { return str.trim(); };
    Z.len = function(str) { return str.length; };
    Z.long = function(str) { return str.length; };
    Z.copy = function(text) { var ta = document.createElement('textarea'); ta.value = text; ta.style.cssText = 'position:fixed;opacity:0;left:-9999px'; document.body.appendChild(ta); ta.select(); var s = document.execCommand('copy'); ta.remove(); return s; };
    
    // ==================== 时间 ====================
    Z.time = function(type) {
        var d = new Date(), y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0');
        var h = String(d.getHours()).padStart(2, '0'), min = String(d.getMinutes()).padStart(2, '0'), s = String(d.getSeconds()).padStart(2, '0');
        if (type === 0) return y + '-' + m + '-' + day + ' ' + h + ':' + min + ':' + s;
        if (type === 1) return y + '/' + m + '/' + day + ' ' + h + ':' + min + ':' + s;
        if (type === 2) return y + '-' + m + '-' + day;
        if (type === 3) return h + ':' + min + ':' + s;
        if (type === 4) return Date.now();
        if (type === 5) return y + '年' + m + '月' + day + '日 ' + h + ':' + min + ':' + s;
        return y + '-' + m + '-' + day + ' ' + h + ':' + min + ':' + s;
    };
    Z.now = function() { return Date.now(); };
    
    // ==================== 随机数 ====================
    Z.rand = function(min, max, dec) { return dec ? min + Math.random() * (max - min) : Math.floor(min + Math.random() * (max - min + 1)); };
    Z.uuid = function() { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); }); };
    Z.randomStr = function(len) { return Math.random().toString(36).substr(2, len); };
    
    // ==================== 计算 ====================
    Z.calc = function(expr, rem) {
        try {
            var source = String(expr == null ? '' : expr);
            var tokenReg = /\s*([A-Za-z_][A-Za-z0-9_]*|\d*\.\d+|\d+|[()+\-*/%^,])\s*/g;
            var tokens = [];
            var consumed = '';
            var m;
            while ((m = tokenReg.exec(source)) !== null) {
                tokens.push(m[1]);
                consumed += m[0];
            }
            if (consumed.replace(/\s+/g, '') !== source.replace(/\s+/g, '')) {
                throw new Error('invalid character in expression');
            }
            var i = 0;
            var fnMap = {
                abs: Math.abs,
                sin: Math.sin,
                cos: Math.cos,
                tan: Math.tan,
                sqrt: Math.sqrt,
                pow: Math.pow,
                exp: Math.exp,
                log: Math.log,
                floor: Math.floor,
                ceil: Math.ceil,
                round: Math.round
            };
            
            function peek() { return tokens[i]; }
            function next() { return tokens[i++]; }
            function expect(tok) { if (next() !== tok) throw new Error('expected ' + tok); }
            
            function parseExpr() {
                var v = parseTerm();
                while (peek() === '+' || peek() === '-') {
                    var op = next();
                    var rhs = parseTerm();
                    v = op === '+' ? v + rhs : v - rhs;
                }
                return v;
            }
            
            function parseTerm() {
                var v = parsePower();
                while (peek() === '*' || peek() === '/' || peek() === '%') {
                    var op = next();
                    var rhs = parsePower();
                    if (op === '*') v = v * rhs;
                    else if (op === '/') v = v / rhs;
                    else v = v % rhs;
                }
                return v;
            }
            
            function parsePower() {
                var v = parseUnary();
                if (peek() === '^') {
                    next();
                    var rhs = parsePower();
                    v = Math.pow(v, rhs);
                }
                return v;
            }
            
            function parseUnary() {
                if (peek() === '+') { next(); return parseUnary(); }
                if (peek() === '-') { next(); return -parseUnary(); }
                return parsePrimary();
            }
            
            function parseArgs() {
                var args = [];
                if (peek() === ')') return args;
                args.push(parseExpr());
                while (peek() === ',') {
                    next();
                    args.push(parseExpr());
                }
                return args;
            }
            
            function parsePrimary() {
                var t = peek();
                if (t === '(') {
                    next();
                    var inside = parseExpr();
                    expect(')');
                    return inside;
                }
                if (/^\d*\.?\d+$/.test(t || '')) {
                    next();
                    return parseFloat(t);
                }
                if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(t || '')) {
                    next();
                    if (t === 'PI') return Math.PI;
                    if (t === 'E') return Math.E;
                    if (peek() === '(') {
                        if (!fnMap[t]) throw new Error('unknown function: ' + t);
                        next();
                        var args = parseArgs();
                        expect(')');
                        return fnMap[t].apply(null, args);
                    }
                    throw new Error('unknown identifier: ' + t);
                }
                throw new Error('unexpected token: ' + t);
            }
            
            var result = parseExpr();
            if (i !== tokens.length) throw new Error('unexpected token tail');
            if (!isFinite(result)) throw new Error('calc result is not finite');
            return rem ? result % 1 : result;
        } catch(e) { console.error(e); return NaN; }
    };
    
    // ==================== 渐变 ====================
    Z.bm = function(dir, id, colors) {
        var el = getEl(id);
        if (!el) return false;
        var dirs = { topbottom: 'to bottom', leftright: 'to right', TL_BR: 'to bottom right', rightleft: 'to left', bottomtop: 'to top' };
        var d = dirs[dir] || 'to bottom';
        el.style.background = 'linear-gradient(' + d + ', ' + colors.split('|').join(', ') + ')';
        return true;
    };
    
    // ==================== 延迟 ====================
    Z.wait = function(ms) { return new Promise(function(r) { setTimeout(r, ms); }); };
    Z.pause = function(ms) { return new Promise(function(r) { setTimeout(r, ms); }); };
    Z.delay = function(ms) { return new Promise(function(r) { setTimeout(r, ms); }); };
    Z.sleep = function(ms) { return new Promise(function(r) { setTimeout(r, ms); }); };
    
    // ==================== 元素获取 ====================
    Z.gui = function(type, val, all) {
        if (type === 'class') return all ? document.getElementsByClassName(val) : document.getElementsByClassName(val)[0];
        if (type === 'element') return all ? document.getElementsByTagName(val) : document.getElementsByTagName(val)[0];
        if (type === 'selector') return all ? document.querySelectorAll(val) : document.querySelector(val);
        if (type === 'id') return document.getElementById(val);
        return null;
    };
    
    // ==================== 全局更新 ====================
    Z.update = function() { var event = new Event('zxupdate'); window.dispatchEvent(event); return true; };
    
    // ==================== 图片处理 ====================
    Z.rotate = function(img, angle) {
        return new Promise(function(resolve, reject) {
            var image = typeof img === 'string' ? new Image() : img;
            var onLoad = function() {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var rad = angle * Math.PI / 180;
                var sin = Math.abs(Math.sin(rad)), cos = Math.abs(Math.cos(rad));
                var w = image.width, h = image.height;
                canvas.width = w * cos + h * sin;
                canvas.height = w * sin + h * cos;
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(rad);
                ctx.drawImage(image, -w / 2, -h / 2, w, h);
                resolve(canvas.toDataURL());
            };
            if (typeof img === 'string') {
                image.crossOrigin = 'Anonymous';
                image.onload = onLoad;
                image.onerror = reject;
                image.src = img;
            } else if (image.complete) {
                onLoad();
            } else {
                image.onload = onLoad;
                image.onerror = reject;
            }
        });
    };
    
    Z.crop = function(img, sx, ex, sy, ey) {
        return new Promise(function(resolve, reject) {
            var image = typeof img === 'string' ? new Image() : img;
            var onLoad = function() {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var w = ex - sx;
                var h = ey - sy;
                canvas.width = w;
                canvas.height = h;
                ctx.drawImage(image, sx, sy, w, h, 0, 0, w, h);
                resolve(canvas.toDataURL());
            };
            if (typeof img === 'string') {
                image.crossOrigin = 'Anonymous';
                image.onload = onLoad;
                image.onerror = reject;
                image.src = img;
            } else if (image.complete) {
                onLoad();
            } else {
                image.onload = onLoad;
                image.onerror = reject;
            }
        });
    };
    
    Z.izz = function(img, angle) { return Z.rotate(img, angle); };
    Z.czz = function(img, sx, ex, sy, ey) { return Z.crop(img, sx, ex, sy, ey); };
    
    // ==================== 其他工具 ====================
    Z.log = function(msg) { console.log(msg); return msg; };
    Z.print = function(msg) { console.log(msg); return msg; };
    Z.edit = function(enable) { document.body.contentEditable = enable ? 'true' : 'false'; return true; };
    Z.dl = function(path) { var a = document.createElement('a'); a.href = path; a.download = ''; document.body.appendChild(a); a.click(); document.body.removeChild(a); return true; };
    Z.sdl = function(path) { return Z.dl(path); };
    Z.ua = function() { return navigator.userAgent; };
    Z.url = function() { return window.location.href; };
    Z.host = function() { return window.location.host; };
    Z.path = function() { return window.location.pathname; };
    Z.data = function(type) { if (type === 'ua') return navigator.userAgent; if (type === 'url') return window.location.href; return ''; };
    Z.store = function(k, v) { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); return v; };
    Z.clear = function() { localStorage.clear(); return true; };
    Z.rmItem = function(k) { localStorage.removeItem(k); return true; };
    Z.cookie = function(k, v, days) {
        if (v === undefined) { var c = document.cookie.match('(^|;)\\s*' + k + '\\s*=\\s*([^;]+)'); return c ? c.pop() : null; }
        var exp = ''; if (days) { var d = new Date(); d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000); exp = '; expires=' + d.toUTCString(); }
        document.cookie = k + '=' + (v || '') + exp + '; path=/'; return v;
    };
    Z.isMobile = function() { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); };
    Z.isPC = function() { return !Z.isMobile(); };
    Z.isIOS = function() { return /iPad|iPhone|iPod/.test(navigator.userAgent); };
    Z.isAndroid = function() { return /Android/.test(navigator.userAgent); };
    Z.full = function() { var e = document.documentElement; if (e.requestFullscreen) e.requestFullscreen(); return true; };
    Z.exitFull = function() { if (document.exitFullscreen) document.exitFullscreen(); return true; };
    Z.isFull = function() { return !!document.fullscreenElement; };
    Z.scrollTo = function(x, y) { window.scrollTo({ top: y, left: x, behavior: 'smooth' }); return true; };
    Z.scrollX = function() { return window.scrollX; };
    Z.scrollY = function() { return window.scrollY; };
    Z.debounce = function(fn, delay) { var t; return function() { var args = arguments; clearTimeout(t); t = setTimeout(function() { fn.apply(null, args); }, delay); }; };
    Z.throttle = function(fn, delay) { var last = 0; return function() { var now = Date.now(); if (now - last >= delay) { last = now; fn.apply(null, arguments); } }; };
    Z.cloneDeep = function(obj) { return JSON.parse(JSON.stringify(obj)); };
    Z.deepCopy = function(obj) { return JSON.parse(JSON.stringify(obj)); };
    Z.rgb2hex = function(r, g, b) { return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1); };
    Z.hex2rgb = function(hex) { var h = parseInt(hex.slice(1), 16); return { r: h >> 16, g: (h >> 8) & 255, b: h & 255 }; };
    Z.getParam = function(name) { var url = new URL(window.location.href); return url.searchParams.get(name); };
    Z.setParam = function(name, val) { var url = new URL(window.location.href); url.searchParams.set(name, val); history.pushState({}, '', url); return true; };
    Z.delParam = function(name) { var url = new URL(window.location.href); url.searchParams.delete(name); history.pushState({}, '', url); return true; };
    Z.isStr = function(v) { return typeof v === 'string'; };
    Z.isNum = function(v) { return typeof v === 'number' && !isNaN(v); };
    Z.isArr = function(v) { return Array.isArray(v); };
    Z.isObj = function(v) { return typeof v === 'object' && v !== null && !Array.isArray(v); };
    Z.isFn = function(v) { return typeof v === 'function'; };
    Z.isEl = function(v) { return v && v.nodeType === 1; };
    Z.px = function(v) { return v + 'px'; };
    Z.em = function(v) { return v + 'em'; };
    Z.cvd = function(v, m) { if (m === 1) return v + 'px'; if (m === 2) return v + 'em'; return v.toString(); };
    Z.stop = function() { throw new Error('Execution stopped'); };
    Z.break = function() { throw new Error('Execution stopped'); };
    Z.load = function(url) { return new Promise(function(res, rej) { var s = document.createElement('script'); s.src = url; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); };
    
    // 初始化动画样式
    addAnimationStyle();
    
    global.zxlite = Z;
    global.zxd = Z;
    
})(typeof window !== 'undefined' ? window : this);

if (typeof console !== 'undefined') console.log('zxlite.js v2.0.1 loaded - 安全与稳定性增强');

// 设置默认 Toast 背景色
(function() {
    if (!document.getElementById('zx-toast-default')) {
        var s = document.createElement('style');
        s.id = 'zx-toast-default';
        s.textContent = '.zxlite-toast,.zxlite-toast-top{background:rgba(0,0,0,0.85)!important;color:#fff!important;border:1px solid rgba(255,255,255,0.2)!important;border-radius:8px!important;box-shadow:0 4px 15px rgba(0,0,0,0.3)!important;}';
        document.head.appendChild(s);
    }
})();

/**
 * zxlite.js Advanced Extension Pack v2.0.1
 * 提供高级能力：事件总线、状态管理、路由、HTTP、缓存、队列、校验、模板等
 */
(function(global) {
    'use strict';
    
    var Z = global.zxd || global.zxlite;
    if (!Z) return;
    
    function zxTypeOf(v) {
        if (v === null) return 'null';
        if (Array.isArray(v)) return 'array';
        return typeof v;
    }
    
    function zxIsObj(v) {
        return v !== null && typeof v === 'object' && !Array.isArray(v);
    }
    
    function zxIsPlain(v) {
        if (!zxIsObj(v)) return false;
        var p = Object.getPrototypeOf(v);
        return p === Object.prototype || p === null;
    }
    
    function zxClone(v) {
        if (v === undefined || v === null) return v;
        if (Array.isArray(v)) {
            var arr = [];
            for (var i = 0; i < v.length; i++) arr.push(zxClone(v[i]));
            return arr;
        }
        if (zxIsObj(v)) {
            var out = {};
            for (var k in v) out[k] = zxClone(v[k]);
            return out;
        }
        return v;
    }
    
    function zxMerge(a, b) {
        var base = zxClone(a || {});
        if (!zxIsObj(b)) return base;
        for (var k in b) {
            if (zxIsPlain(base[k]) && zxIsPlain(b[k])) base[k] = zxMerge(base[k], b[k]);
            else base[k] = zxClone(b[k]);
        }
        return base;
    }
    
    function zxToPath(path) {
        if (Array.isArray(path)) return path.slice();
        if (typeof path !== 'string') return [path];
        return path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(function(x) {
            return x !== '';
        });
    }
    
    function zxPathGet(obj, path, fallback) {
        var seg = zxToPath(path);
        var cur = obj;
        for (var i = 0; i < seg.length; i++) {
            if (cur == null) return fallback;
            cur = cur[seg[i]];
        }
        return cur === undefined ? fallback : cur;
    }
    
    function zxPathSet(obj, path, value) {
        if (!zxIsObj(obj) && !Array.isArray(obj)) return obj;
        var seg = zxToPath(path);
        if (seg.length === 0) return obj;
        var cur = obj;
        for (var i = 0; i < seg.length - 1; i++) {
            var key = seg[i];
            if (!zxIsObj(cur[key]) && !Array.isArray(cur[key])) {
                cur[key] = /^\d+$/.test(seg[i + 1]) ? [] : {};
            }
            cur = cur[key];
        }
        cur[seg[seg.length - 1]] = value;
        return obj;
    }
    
    function zxPathDel(obj, path) {
        if (!zxIsObj(obj) && !Array.isArray(obj)) return false;
        var seg = zxToPath(path);
        if (!seg.length) return false;
        var cur = obj;
        for (var i = 0; i < seg.length - 1; i++) {
            if (!zxIsObj(cur) && !Array.isArray(cur)) return false;
            cur = cur[seg[i]];
            if (cur == null) return false;
        }
        var leaf = seg[seg.length - 1];
        if (Array.isArray(cur) && /^\d+$/.test(leaf)) {
            var idx = parseInt(leaf, 10);
            if (idx >= 0 && idx < cur.length) {
                cur.splice(idx, 1);
                return true;
            }
            return false;
        }
        if (Object.prototype.hasOwnProperty.call(cur, leaf)) {
            delete cur[leaf];
            return true;
        }
        return false;
    }
    
    function zxUid(prefix) {
        return (prefix || 'zx') + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
    }
    
    function zxEmitter() {
        var map = new Map();
        
        function on(topic, fn, opt) {
            if (typeof fn !== 'function') return function() {};
            var key = String(topic || '*');
            if (!map.has(key)) map.set(key, []);
            var list = map.get(key);
            var item = {
                id: zxUid('ev'),
                fn: fn,
                once: !!(opt && opt.once),
                order: opt && typeof opt.order === 'number' ? opt.order : 0
            };
            list.push(item);
            list.sort(function(a, b) { return a.order - b.order; });
            return function() {
                off(key, item.id);
            };
        }
        
        function off(topic, ref) {
            var key = String(topic || '*');
            var list = map.get(key);
            if (!list || !list.length) return false;
            if (!ref) {
                map.delete(key);
                return true;
            }
            var next = [];
            var hit = false;
            for (var i = 0; i < list.length; i++) {
                if (list[i].id === ref || list[i].fn === ref) hit = true;
                else next.push(list[i]);
            }
            if (next.length) map.set(key, next);
            else map.delete(key);
            return hit;
        }
        
        function emit(topic, payload, meta) {
            var key = String(topic || '*');
            var list = (map.get(key) || []).concat(map.get('*') || []);
            for (var i = 0; i < list.length; i++) {
                try {
                    list[i].fn(payload, { topic: key, meta: meta || {}, time: Date.now() });
                } catch (e) {
                    console.error('zxlite emitter error:', e);
                }
            }
            for (var j = 0; j < list.length; j++) {
                if (list[j].once) {
                    off(key, list[j].id);
                    off('*', list[j].id);
                }
            }
            return list.length;
        }
        
        function once(topic, fn, opt) {
            var conf = zxMerge(opt || {}, { once: true });
            return on(topic, fn, conf);
        }
        
        function clear(topic) {
            if (topic === undefined) map.clear();
            else map.delete(String(topic));
            return true;
        }
        
        function topics() {
            return Array.from(map.keys());
        }
        
        function size(topic) {
            if (topic !== undefined) return (map.get(String(topic)) || []).length;
            var total = 0;
            map.forEach(function(list) { total += list.length; });
            return total;
        }
        
        return { on: on, off: off, emit: emit, once: once, clear: clear, topics: topics, size: size };
    }
    
    Z.clone = Z.clone || function(v) { return zxClone(v); };
    Z.merge = Z.merge || function(a, b) { return zxMerge(a, b); };
    Z.pathGet = Z.pathGet || function(obj, path, fallback) { return zxPathGet(obj, path, fallback); };
    Z.pathSet = Z.pathSet || function(obj, path, value) { return zxPathSet(obj, path, value); };
    Z.pathDel = Z.pathDel || function(obj, path) { return zxPathDel(obj, path); };
    Z.type = Z.type || function(v) { return zxTypeOf(v); };
    
    // ========== 事件总线 ==========
    Z.busx = function(options) {
        var conf = zxMerge({
            debug: false,
            replayLimit: 50
        }, options || {});
        var em = zxEmitter();
        var logs = [];
        
        function debug(action, topic) {
            if (!conf.debug) return;
            console.log('[zxlite.busx]', action, topic || '');
        }
        
        function save(topic, payload) {
            logs.push({
                topic: topic,
                payload: zxClone(payload),
                time: Date.now()
            });
            while (logs.length > conf.replayLimit) logs.shift();
        }
        
        function on(topic, fn, opt) {
            debug('on', topic);
            return em.on(topic, fn, opt || {});
        }
        
        function once(topic, fn, opt) {
            debug('once', topic);
            return em.once(topic, fn, opt || {});
        }
        
        function off(topic, ref) {
            debug('off', topic);
            return em.off(topic, ref);
        }
        
        function emit(topic, payload, meta) {
            var t = String(topic || '*');
            debug('emit', t);
            save(t, payload);
            return em.emit(t, payload, meta);
        }
        
        function emitMany(topics, payload, meta) {
            if (!Array.isArray(topics)) return 0;
            var total = 0;
            for (var i = 0; i < topics.length; i++) total += emit(topics[i], payload, meta);
            return total;
        }
        
        function wait(topic, timeout) {
            var limit = typeof timeout === 'number' ? timeout : 0;
            return new Promise(function(resolve, reject) {
                var timer = null;
                var un = once(topic, function(payload, evt) {
                    if (timer) clearTimeout(timer);
                    resolve({ payload: payload, event: evt });
                });
                if (limit > 0) {
                    timer = setTimeout(function() {
                        un();
                        reject(new Error('busx wait timeout: ' + topic));
                    }, limit);
                }
            });
        }
        
        function history(topic) {
            if (!topic) return logs.slice();
            var key = String(topic);
            return logs.filter(function(item) { return item.topic === key; });
        }
        
        function clear(topic) {
            if (!topic) logs = [];
            else logs = logs.filter(function(item) { return item.topic !== String(topic); });
            return em.clear(topic);
        }
        
        return {
            on: on,
            once: once,
            off: off,
            emit: emit,
            emitMany: emitMany,
            wait: wait,
            history: history,
            clear: clear,
            topics: em.topics,
            size: em.size
        };
    };
    
    Z._busxDefault = Z._busxDefault || Z.busx();
    Z.busCreate = function(opts) { return Z.busx(opts); };
    Z.busOn = function(topic, fn, opt) { return Z._busxDefault.on(topic, fn, opt); };
    Z.busOnce = function(topic, fn, opt) { return Z._busxDefault.once(topic, fn, opt); };
    Z.busOff = function(topic, ref) { return Z._busxDefault.off(topic, ref); };
    Z.busEmit = function(topic, payload, meta) { return Z._busxDefault.emit(topic, payload, meta); };
    Z.busWait = function(topic, timeout) { return Z._busxDefault.wait(topic, timeout); };
    Z.busHistory = function(topic) { return Z._busxDefault.history(topic); };
    
    // 数据处理增强
    Z.pick = function(obj, keys) {
        var src = zxIsObj(obj) ? obj : {};
        var list = Array.isArray(keys) ? keys : [];
        var out = {};
        for (var i = 0; i < list.length; i++) {
            var k = list[i];
            if (Object.prototype.hasOwnProperty.call(src, k)) out[k] = src[k];
        }
        return out;
    };
    
    Z.omit = function(obj, keys) {
        var src = zxIsObj(obj) ? obj : {};
        var list = Array.isArray(keys) ? keys : [];
        var ban = {};
        for (var i = 0; i < list.length; i++) ban[list[i]] = true;
        var out = {};
        for (var k in src) if (!ban[k]) out[k] = src[k];
        return out;
    };
    
    Z.groupBy = function(arr, key) {
        var list = Array.isArray(arr) ? arr : [];
        var out = {};
        for (var i = 0; i < list.length; i++) {
            var row = list[i];
            var g = typeof key === 'function' ? key(row, i) : (row ? row[key] : undefined);
            var tag = String(g);
            if (!out[tag]) out[tag] = [];
            out[tag].push(row);
        }
        return out;
    };
    
    Z.uniqueBy = function(arr, key) {
        var list = Array.isArray(arr) ? arr : [];
        var seen = new Set();
        var out = [];
        for (var i = 0; i < list.length; i++) {
            var row = list[i];
            var id = typeof key === 'function' ? key(row, i) : (row ? row[key] : row);
            var token = JSON.stringify(id);
            if (seen.has(token)) continue;
            seen.add(token);
            out.push(row);
        }
        return out;
    };
    
    Z.sortBy = function(arr, key, order) {
        var list = Array.isArray(arr) ? arr.slice() : [];
        var asc = (order || 'asc') !== 'desc';
        list.sort(function(a, b) {
            var av = typeof key === 'function' ? key(a) : zxPathGet(a, key);
            var bv = typeof key === 'function' ? key(b) : zxPathGet(b, key);
            if (av === bv) return 0;
            if (av > bv) return asc ? 1 : -1;
            return asc ? -1 : 1;
        });
        return list;
    };
    
    Z.chunk = function(arr, size) {
        var list = Array.isArray(arr) ? arr : [];
        var n = Math.max(1, Number(size) || 1);
        var out = [];
        for (var i = 0; i < list.length; i += n) out.push(list.slice(i, i + n));
        return out;
    };
    
    Z.range = function(start, end, step) {
        var s = Number(start) || 0;
        var e = Number(end) || 0;
        var st = Number(step) || 1;
        if (st === 0) st = 1;
        var out = [];
        if (s <= e) for (var i = s; i <= e; i += Math.abs(st)) out.push(i);
        else for (var j = s; j >= e; j -= Math.abs(st)) out.push(j);
        return out;
    };
    
})(typeof window !== 'undefined' ? window : this);

(function(global) {
    'use strict';
    
    var Z = global.zxd || global.zxlite;
    if (!Z) return;
    
    function zClone(v) { return Z.clone ? Z.clone(v) : JSON.parse(JSON.stringify(v)); }
    function zMerge(a, b) { return Z.merge ? Z.merge(a, b) : Object.assign({}, a || {}, b || {}); }
    function zGet(obj, path, fallback) { return Z.pathGet ? Z.pathGet(obj, path, fallback) : fallback; }
    
    // ========== validx ==========
    Z.validx = function(schema, options) {
        var conf = zMerge({
            stopOnFirst: false,
            trimString: true,
            messages: {}
        }, options || {});
        
        var rules = {};
        var customRules = {};
        
        function msg(name, fallback) {
            return conf.messages[name] || fallback;
        }
        
        function normalizeRule(rule) {
            if (typeof rule === 'string') return { rule: rule };
            if (typeof rule === 'function') return { rule: 'custom', validator: rule };
            return rule || {};
        }
        
        function setSchema(nextSchema) {
            rules = {};
            var src = nextSchema || {};
            for (var field in src) {
                var arr = Array.isArray(src[field]) ? src[field] : [src[field]];
                rules[field] = arr.map(normalizeRule);
            }
            return true;
        }
        
        function normalizeData(raw) {
            if (!raw || typeof raw !== 'object') return {};
            if (!conf.trimString) return zClone(raw);
            var out = zClone(raw);
            Object.keys(out).forEach(function(k) {
                if (typeof out[k] === 'string') out[k] = out[k].trim();
            });
            return out;
        }
        
        function checkRule(field, value, data, ruleDef) {
            var rule = ruleDef.rule || 'custom';
            var required = ruleDef.required === true || rule === 'required';
            var empty = value === undefined || value === null || value === '';
            if (empty && !required) return null;
            
            if (rule === 'required') {
                if (empty) return ruleDef.message || msg('required', field + ' is required');
                return null;
            }
            if (rule === 'type') {
                if ((Z.type ? Z.type(value) : typeof value) !== ruleDef.value) return ruleDef.message || msg('type', field + ' type must be ' + ruleDef.value);
                return null;
            }
            if (rule === 'min') {
                if (typeof value !== 'number' || value < ruleDef.value) return ruleDef.message || msg('min', field + ' must be >= ' + ruleDef.value);
                return null;
            }
            if (rule === 'max') {
                if (typeof value !== 'number' || value > ruleDef.value) return ruleDef.message || msg('max', field + ' must be <= ' + ruleDef.value);
                return null;
            }
            if (rule === 'minLen') {
                if (String(value).length < ruleDef.value) return ruleDef.message || msg('minLen', field + ' length must be >= ' + ruleDef.value);
                return null;
            }
            if (rule === 'maxLen') {
                if (String(value).length > ruleDef.value) return ruleDef.message || msg('maxLen', field + ' length must be <= ' + ruleDef.value);
                return null;
            }
            if (rule === 'len') {
                if (String(value).length !== ruleDef.value) return ruleDef.message || msg('len', field + ' length must be ' + ruleDef.value);
                return null;
            }
            if (rule === 'pattern') {
                var re = ruleDef.value instanceof RegExp ? ruleDef.value : new RegExp(ruleDef.value);
                if (!re.test(String(value))) return ruleDef.message || msg('pattern', field + ' format invalid');
                return null;
            }
            if (rule === 'email') {
                var email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email.test(String(value))) return ruleDef.message || msg('email', field + ' is not a valid email');
                return null;
            }
            if (rule === 'url') {
                try {
                    new URL(String(value));
                    return null;
                } catch (e) {
                    return ruleDef.message || msg('url', field + ' is not a valid url');
                }
            }
            if (rule === 'enum') {
                var allow = Array.isArray(ruleDef.value) ? ruleDef.value : [];
                if (allow.indexOf(value) === -1) return ruleDef.message || msg('enum', field + ' is not in enum');
                return null;
            }
            if (rule === 'sameAs') {
                if (value !== zGet(data, ruleDef.value)) return ruleDef.message || msg('sameAs', field + ' must equal ' + ruleDef.value);
                return null;
            }
            if (rule === 'custom') {
                var fn = ruleDef.validator || ruleDef.value;
                if (typeof fn !== 'function') return null;
                var out = fn(value, data, field, ruleDef);
                if (out === true || out === undefined || out === null) return null;
                if (out === false) return ruleDef.message || msg('custom', field + ' invalid');
                return String(out);
            }
            if (customRules[rule]) {
                var customOut = customRules[rule](value, data, field, ruleDef);
                if (customOut === true || customOut === undefined || customOut === null) return null;
                if (customOut === false) return ruleDef.message || msg(rule, field + ' invalid');
                return String(customOut);
            }
            return null;
        }
        
        function fieldValidate(field, data, cfg) {
            var local = cfg || {};
            var src = normalizeData(data || {});
            var value = zGet(src, field);
            var list = rules[field] || [];
            var errors = [];
            for (var i = 0; i < list.length; i++) {
                var e = checkRule(field, value, src, list[i]);
                if (!e) continue;
                errors.push(e);
                if (local.stopOnFirst || conf.stopOnFirst) break;
            }
            return { field: field, valid: errors.length === 0, errors: errors };
        }
        
        function validate(data, cfg) {
            var local = cfg || {};
            var src = normalizeData(data || {});
            var fields = Object.keys(rules);
            var errors = {};
            var firstError = null;
            for (var i = 0; i < fields.length; i++) {
                var out = fieldValidate(fields[i], src, local);
                if (!out.valid) {
                    errors[fields[i]] = out.errors;
                    if (!firstError) firstError = { field: fields[i], message: out.errors[0] };
                    if (local.stopOnFirst || conf.stopOnFirst) break;
                }
            }
            return {
                valid: Object.keys(errors).length === 0,
                errors: errors,
                firstError: firstError,
                data: src
            };
        }
        
        function validateAsync(data, cfg) {
            var local = cfg || {};
            var src = normalizeData(data || {});
            var fields = Object.keys(rules);
            var errors = {};
            var firstError = null;
            
            function runField(i) {
                if (i >= fields.length) {
                    return Promise.resolve({
                        valid: Object.keys(errors).length === 0,
                        errors: errors,
                        firstError: firstError,
                        data: src
                    });
                }
                var field = fields[i];
                var value = zGet(src, field);
                var list = rules[field] || [];
                
                function runRule(j) {
                    if (j >= list.length) return Promise.resolve();
                    var ruleDef = list[j];
                    var rule = ruleDef.rule || 'custom';
                    var asyncMode = rule === 'async' || ruleDef.async === true;
                    if (!asyncMode) {
                        var syncErr = checkRule(field, value, src, ruleDef);
                        if (syncErr) {
                            if (!errors[field]) errors[field] = [];
                            errors[field].push(syncErr);
                            if (!firstError) firstError = { field: field, message: syncErr };
                            if (local.stopOnFirst || conf.stopOnFirst) return Promise.resolve('stop');
                        }
                        return runRule(j + 1);
                    }
                    var fn = ruleDef.validator || ruleDef.value;
                    if (typeof fn !== 'function') return runRule(j + 1);
                    return Promise.resolve(fn(value, src, field, ruleDef)).then(function(asyncOut) {
                        if (asyncOut === true || asyncOut === undefined || asyncOut === null) return runRule(j + 1);
                        var text = asyncOut === false ? (ruleDef.message || msg('async', field + ' invalid')) : String(asyncOut);
                        if (!errors[field]) errors[field] = [];
                        errors[field].push(text);
                        if (!firstError) firstError = { field: field, message: text };
                        if (local.stopOnFirst || conf.stopOnFirst) return 'stop';
                        return runRule(j + 1);
                    }).catch(function(e) {
                        var text = ruleDef.message || e.message || (field + ' async check failed');
                        if (!errors[field]) errors[field] = [];
                        errors[field].push(text);
                        if (!firstError) firstError = { field: field, message: text };
                        if (local.stopOnFirst || conf.stopOnFirst) return 'stop';
                        return runRule(j + 1);
                    });
                }
                
                return runRule(0).then(function(flag) {
                    if (flag === 'stop') {
                        return {
                            valid: false,
                            errors: errors,
                            firstError: firstError,
                            data: src
                        };
                    }
                    return runField(i + 1);
                });
            }
            
            return runField(0);
        }
        
        function extendRule(name, fn) {
            if (!name || typeof fn !== 'function') return false;
            customRules[name] = fn;
            return true;
        }
        
        setSchema(schema || {});
        
        return {
            setSchema: setSchema,
            schema: function() { return zClone(rules); },
            validate: validate,
            validateAsync: validateAsync,
            field: fieldValidate,
            extendRule: extendRule
        };
    };
    
    Z.createValidator = function(schema, options) { return Z.validx(schema, options); };
    
    // ========== tplx ==========
    Z.tplx = (function() {
        var components = {};
        
        function escapeHtml(input) {
            return String(input == null ? '' : input)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }
        
        function render(template, data, options) {
            var conf = zMerge({
                escape: true,
                fallback: ''
            }, options || {});
            var tpl = String(template || '');
            return tpl.replace(/\{\{\s*([^}\s]+)\s*\}\}/g, function(_, token) {
                var value = zGet(data || {}, token, conf.fallback);
                if (value === undefined || value === null) value = conf.fallback;
                return conf.escape ? escapeHtml(String(value)) : String(value);
            });
        }
        
        function compile(template, options) {
            return function(data, localOptions) {
                return render(template, data, zMerge(options || {}, localOptions || {}));
            };
        }
        
        function list(items, template, options) {
            var conf = zMerge({
                join: '',
                startIndex: 0,
                escape: true
            }, options || {});
            var arr = Array.isArray(items) ? items : [];
            var out = [];
            for (var i = 0; i < arr.length; i++) {
                out.push(render(template, zMerge(arr[i], { $index: i + conf.startIndex }), conf));
            }
            return out.join(conf.join);
        }
        
        function mount(target, template, state, options) {
            var conf = zMerge({
                escape: true,
                onRender: null
            }, options || {});
            var el = typeof target === 'string' ? document.querySelector(target) : target;
            if (!el) return null;
            var localState = zClone(state || {});
            var disposed = false;
            
            function redraw(patch) {
                if (disposed) return false;
                if (patch && typeof patch === 'object') localState = zMerge(localState, patch);
                el.innerHTML = render(template, localState, conf);
                if (typeof conf.onRender === 'function') conf.onRender(el, zClone(localState));
                return true;
            }
            
            redraw();
            
            return {
                el: el,
                state: function() { return zClone(localState); },
                set: function(path, value) {
                    if (Z.pathSet) Z.pathSet(localState, path, value);
                    else localState[path] = value;
                    return redraw();
                },
                patch: function(patchObj) {
                    localState = zMerge(localState, patchObj || {});
                    return redraw();
                },
                redraw: redraw,
                destroy: function() { disposed = true; return true; }
            };
        }
        
        function define(name, def) {
            if (!name || !def) return false;
            components[name] = {
                template: def.template || '',
                setup: typeof def.setup === 'function' ? def.setup : null,
                mounted: typeof def.mounted === 'function' ? def.mounted : null,
                updated: typeof def.updated === 'function' ? def.updated : null,
                beforeDestroy: typeof def.beforeDestroy === 'function' ? def.beforeDestroy : null
            };
            return true;
        }
        
        function create(name, props) {
            var comp = components[name];
            if (!comp) return null;
            var ctx = {
                props: zClone(props || {}),
                state: {},
                setState: function(path, value) {
                    if (Z.pathSet) Z.pathSet(ctx.state, path, value);
                    else ctx.state[path] = value;
                },
                getState: function(path, fallback) {
                    return Z.pathGet ? Z.pathGet(ctx.state, path, fallback) : fallback;
                },
                emit: function(evt, payload) {
                    if (Z.busEmit) Z.busEmit('component:' + name + ':' + evt, payload);
                }
            };
            if (comp.setup) {
                var setupOut = comp.setup(ctx);
                if (setupOut && typeof setupOut === 'object') ctx.state = zMerge(ctx.state, setupOut);
            }
            return {
                name: name,
                ctx: ctx,
                render: function(extraProps, options) {
                    if (extraProps && typeof extraProps === 'object') ctx.props = zMerge(ctx.props, extraProps);
                    return render(comp.template, zMerge(ctx.state, ctx.props), options || {});
                },
                mount: function(target, extraProps, options) {
                    var html = this.render(extraProps, options);
                    var el = typeof target === 'string' ? document.querySelector(target) : target;
                    if (!el) return false;
                    el.innerHTML = html;
                    if (comp.mounted) comp.mounted(el, ctx);
                    return true;
                },
                update: function(target, patch, options) {
                    if (patch && typeof patch === 'object') ctx.props = zMerge(ctx.props, patch);
                    var ok = this.mount(target, null, options);
                    if (ok && comp.updated) {
                        var el = typeof target === 'string' ? document.querySelector(target) : target;
                        comp.updated(el, ctx);
                    }
                    return ok;
                },
                destroy: function(target) {
                    var el = typeof target === 'string' ? document.querySelector(target) : target;
                    if (comp.beforeDestroy && el) comp.beforeDestroy(el, ctx);
                    return true;
                }
            };
        }
        
        function remove(name) {
            if (!components[name]) return false;
            delete components[name];
            return true;
        }
        
        function names() {
            return Object.keys(components);
        }
        
        return {
            escape: escapeHtml,
            render: render,
            compile: compile,
            list: list,
            mount: mount,
            define: define,
            create: create,
            remove: remove,
            names: names
        };
    })();
    
    // ========== datex ==========
    Z.datex = {
        parse: function(input) {
            if (input instanceof Date) return new Date(input.getTime());
            if (typeof input === 'number') return new Date(input);
            if (!input) return new Date();
            return new Date(input);
        },
        pad: function(n) { return String(n).padStart(2, '0'); },
        format: function(input, pattern) {
            var d = Z.datex.parse(input);
            if (isNaN(d.getTime())) return '';
            var fmt = pattern || 'YYYY-MM-DD HH:mm:ss';
            var map = {
                YYYY: d.getFullYear(),
                MM: Z.datex.pad(d.getMonth() + 1),
                DD: Z.datex.pad(d.getDate()),
                HH: Z.datex.pad(d.getHours()),
                mm: Z.datex.pad(d.getMinutes()),
                ss: Z.datex.pad(d.getSeconds()),
                SSS: String(d.getMilliseconds()).padStart(3, '0')
            };
            var out = fmt;
            Object.keys(map).forEach(function(k) {
                out = out.replace(new RegExp(k, 'g'), map[k]);
            });
            return out;
        },
        add: function(input, amount, unit) {
            var d = Z.datex.parse(input);
            var n = Number(amount) || 0;
            var u = unit || 'day';
            if (u === 'ms') d.setMilliseconds(d.getMilliseconds() + n);
            else if (u === 'second') d.setSeconds(d.getSeconds() + n);
            else if (u === 'minute') d.setMinutes(d.getMinutes() + n);
            else if (u === 'hour') d.setHours(d.getHours() + n);
            else if (u === 'month') d.setMonth(d.getMonth() + n);
            else if (u === 'year') d.setFullYear(d.getFullYear() + n);
            else d.setDate(d.getDate() + n);
            return d;
        },
        diff: function(a, b, unit) {
            var d1 = Z.datex.parse(a).getTime();
            var d2 = Z.datex.parse(b).getTime();
            var ms = d1 - d2;
            var u = unit || 'ms';
            if (u === 'second') return ms / 1000;
            if (u === 'minute') return ms / (1000 * 60);
            if (u === 'hour') return ms / (1000 * 60 * 60);
            if (u === 'day') return ms / (1000 * 60 * 60 * 24);
            return ms;
        },
        isValid: function(input) {
            var d = Z.datex.parse(input);
            return !isNaN(d.getTime());
        },
        startOf: function(input, unit) {
            var d = Z.datex.parse(input);
            var u = unit || 'day';
            if (u === 'year') {
                d.setMonth(0, 1);
                d.setHours(0, 0, 0, 0);
            } else if (u === 'month') {
                d.setDate(1);
                d.setHours(0, 0, 0, 0);
            } else if (u === 'hour') {
                d.setMinutes(0, 0, 0);
            } else if (u === 'minute') {
                d.setSeconds(0, 0);
            } else {
                d.setHours(0, 0, 0, 0);
            }
            return d;
        },
        endOf: function(input, unit) {
            var d = Z.datex.startOf(input, unit);
            if (unit === 'year') d.setFullYear(d.getFullYear() + 1);
            else if (unit === 'month') d.setMonth(d.getMonth() + 1);
            else if (unit === 'hour') d.setHours(d.getHours() + 1);
            else if (unit === 'minute') d.setMinutes(d.getMinutes() + 1);
            else d.setDate(d.getDate() + 1);
            d.setMilliseconds(d.getMilliseconds() - 1);
            return d;
        }
    };
    
    // ========== 安全与编码 ==========
    Z.escape = function(str) { return Z.tplx.escape(str); };
    Z.unescape = function(str) {
        var map = {
            '&lt;': '<',
            '&gt;': '>',
            '&amp;': '&',
            '&quot;': '"',
            '&#39;': "'"
        };
        return String(str || '').replace(/&lt;|&gt;|&amp;|&quot;|&#39;/g, function(hit) {
            return map[hit] || hit;
        });
    };
    Z.ue = function(str) { return encodeURIComponent(String(str || '')); };
    Z.ud = function(str) { return decodeURIComponent(String(str || '')); };
    
    // ========== 组合工具 ==========
    Z.pipeline = function(tasks, input) {
        var list = Array.isArray(tasks) ? tasks : [];
        return list.reduce(function(chain, task, idx) {
            return chain.then(function(state) {
                if (typeof task !== 'function') return state;
                return task(state, idx);
            });
        }, Promise.resolve(input));
    };
    
    Z.parallel = function(tasks, limit) {
        var list = Array.isArray(tasks) ? tasks : [];
        var max = Math.max(1, Number(limit) || list.length || 1);
        var queue = Z.queuex({ concurrency: max, autoStart: true, retry: 0 });
        var jobs = [];
        for (var i = 0; i < list.length; i++) {
            (function(task, index) {
                jobs.push(queue.add(function() {
                    if (typeof task !== 'function') return null;
                    return task(index);
                }));
            })(list[i], i);
        }
        return Promise.all(jobs).finally(function() {
            queue.destroy();
        });
    };
    
    Z.retry = function(fn, options) {
        var conf = zMerge({
            times: 3,
            delay: 200,
            factor: 1
        }, options || {});
        var count = 0;
        function run() {
            count++;
            return Promise.resolve().then(fn).catch(function(e) {
                if (count >= conf.times) throw e;
                var wait = conf.delay * Math.pow(conf.factor, count - 1);
                return new Promise(function(resolve) { setTimeout(resolve, wait); }).then(run);
            });
        }
        return run();
    };
    
})(typeof window !== 'undefined' ? window : this);

(function(global) {
    'use strict';
    
    var Z = global.zxd || global.zxlite;
    if (!Z) return;
    
    function zClone(v) { return Z.clone ? Z.clone(v) : JSON.parse(JSON.stringify(v)); }
    function zMerge(a, b) { return Z.merge ? Z.merge(a, b) : Object.assign({}, a || {}, b || {}); }
    function zGet(obj, path, fallback) { return Z.pathGet ? Z.pathGet(obj, path, fallback) : fallback; }
    
    // ========== routerx ==========
    Z.routerx = function(options) {
        var conf = zMerge({
            routes: [],
            view: null,
            notFound: null,
            beforeEach: null,
            afterEach: null,
            debug: false
        }, options || {});
        
        var started = false;
        var current = null;
        var beforeHooks = [];
        var afterHooks = [];
        var bus = Z.busCreate ? Z.busCreate() : { on: function() {}, off: function() {}, emit: function() {}, clear: function() {} };
        
        function log() {
            if (!conf.debug) return;
            var args = Array.prototype.slice.call(arguments);
            args.unshift('[zxlite.routerx]');
            console.log.apply(console, args);
        }
        
        function normalize(path) {
            var p = String(path || '/').trim();
            if (!p) p = '/';
            if (p[0] !== '/') p = '/' + p;
            p = p.replace(/\/{2,}/g, '/');
            if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
            return p;
        }
        
        function parseQuery(qs) {
            var out = {};
            if (!qs) return out;
            var q = qs.replace(/^\?/, '');
            if (!q) return out;
            q.split('&').forEach(function(part) {
                if (!part) return;
                var idx = part.indexOf('=');
                if (idx < 0) out[decodeURIComponent(part)] = '';
                else out[decodeURIComponent(part.slice(0, idx))] = decodeURIComponent(part.slice(idx + 1));
            });
            return out;
        }
        
        function buildQuery(query) {
            if (!query || typeof query !== 'object') return '';
            var out = [];
            for (var k in query) {
                if (query[k] === undefined || query[k] === null) continue;
                out.push(encodeURIComponent(k) + '=' + encodeURIComponent(String(query[k])));
            }
            return out.length ? ('?' + out.join('&')) : '';
        }
        
        function parsePath(path) {
            var src = String(path || '/');
            var p = src;
            var qs = '';
            var qi = src.indexOf('?');
            if (qi >= 0) {
                p = src.slice(0, qi);
                qs = src.slice(qi + 1);
            }
            return {
                path: normalize(p),
                query: parseQuery(qs)
            };
        }
        
        function tokenize(path) {
            return normalize(path).split('/').filter(function(x) { return x; });
        }
        
        function match(path) {
            var parsed = parsePath(path);
            var target = tokenize(parsed.path);
            for (var i = 0; i < conf.routes.length; i++) {
                var route = conf.routes[i];
                var pattern = tokenize(route.path || '/');
                if (pattern.length !== target.length) continue;
                var params = {};
                var ok = true;
                for (var j = 0; j < pattern.length; j++) {
                    if (pattern[j][0] === ':') params[pattern[j].slice(1)] = decodeURIComponent(target[j]);
                    else if (pattern[j] !== target[j]) { ok = false; break; }
                }
                if (ok) {
                    return {
                        matched: true,
                        path: parsed.path,
                        fullPath: parsed.path + buildQuery(parsed.query),
                        query: parsed.query,
                        params: params,
                        route: route
                    };
                }
            }
            return {
                matched: false,
                path: parsed.path,
                fullPath: parsed.path + buildQuery(parsed.query),
                query: parsed.query,
                params: {},
                route: null
            };
        }
        
        function getHashPath() {
            return (window.location.hash || '#/').replace(/^#/, '') || '/';
        }
        
        function setHashPath(path, replace) {
            var p = path || '/';
            if (replace) {
                var next = window.location.pathname + window.location.search + '#' + p;
                history.replaceState(history.state || {}, '', next);
            } else {
                window.location.hash = p;
            }
        }
        
        function resolve(path) {
            var out = match(path);
            if (out.route) return out;
            if (typeof conf.notFound === 'function') {
                out.route = {
                    name: 'not-found',
                    path: out.path,
                    component: conf.notFound
                };
            }
            return out;
        }
        
        function runGuards(list, to, from) {
            return new Promise(function(resolvePromise) {
                var i = 0;
                function next(result) {
                    if (result === false) return resolvePromise(false);
                    if (typeof result === 'string') return resolvePromise(result);
                    if (i >= list.length) return resolvePromise(true);
                    var guard = list[i++];
                    try {
                        var out = guard(to, from, next);
                        if (out instanceof Promise) {
                            out.then(next).catch(function() { resolvePromise(false); });
                            return;
                        }
                        if (out !== undefined) next(out);
                    } catch (e) {
                        console.error('routerx guard error:', e);
                        resolvePromise(false);
                    }
                }
                next(true);
            });
        }
        
        function render(to) {
            if (!to || !to.route || !conf.view) return true;
            var el = typeof conf.view === 'string' ? document.querySelector(conf.view) : conf.view;
            if (!el) return false;
            var comp = to.route.component;
            if (typeof comp === 'function') {
                var out = comp(to);
                if (out instanceof Promise) {
                    return out.then(function(html) {
                        if (html !== undefined) el.innerHTML = Z.sanitizeHtml ? Z.sanitizeHtml(html) : String(html);
                        return true;
                    });
                }
                if (out !== undefined) el.innerHTML = Z.sanitizeHtml ? Z.sanitizeHtml(out) : String(out);
                return true;
            }
            if (typeof comp === 'string') {
                el.innerHTML = Z.sanitizeHtml ? Z.sanitizeHtml(comp) : String(comp);
                return true;
            }
            return false;
        }
        
        function transition(path, mode) {
            var from = current;
            var to = resolve(path);
            log('transition', mode, to.fullPath);
            var guards = [];
            if (typeof conf.beforeEach === 'function') guards.push(conf.beforeEach);
            for (var i = 0; i < beforeHooks.length; i++) guards.push(beforeHooks[i]);
            if (to.route && typeof to.route.beforeEnter === 'function') guards.push(to.route.beforeEnter);
            
            return runGuards(guards, to, from).then(function(allow) {
                if (allow === false) {
                    bus.emit('cancel', { to: to, from: from });
                    return false;
                }
                if (typeof allow === 'string') {
                    navigate(allow, { replace: true, trigger: true });
                    return false;
                }
                if (from && from.route && typeof from.route.beforeLeave === 'function') {
                    var leave = from.route.beforeLeave(to, from);
                    if (leave === false) return false;
                }
                current = to;
                var rendered = render(to);
                return Promise.resolve(rendered).then(function() {
                    if (from && from.route && typeof from.route.afterLeave === 'function') from.route.afterLeave(to, from);
                    if (to.route && typeof to.route.afterEnter === 'function') to.route.afterEnter(to, from);
                    if (typeof conf.afterEach === 'function') conf.afterEach(to, from);
                    for (var j = 0; j < afterHooks.length; j++) afterHooks[j](to, from);
                    bus.emit('change', { to: to, from: from, mode: mode || 'push' });
                    return true;
                });
            });
        }
        
        function onHashChange() {
            transition(getHashPath(), 'hashchange');
        }
        
        function navigate(path, cfg) {
            var c = cfg || {};
            var p = normalize(path || '/');
            var full = p + buildQuery(c.query || null);
            if (c.trigger === false) {
                setHashPath(full, !!c.replace);
                return Promise.resolve(true);
            }
            if (c.replace) {
                setHashPath(full, true);
                return transition(full, 'replace');
            }
            if (getHashPath() === full) return transition(full, 'push');
            setHashPath(full, false);
            return Promise.resolve(true);
        }
        
        function start() {
            if (started) return true;
            started = true;
            window.addEventListener('hashchange', onHashChange);
            var first = getHashPath();
            transition(first, 'start');
            bus.emit('start', { path: first });
            return true;
        }
        
        function stop() {
            if (!started) return true;
            started = false;
            window.removeEventListener('hashchange', onHashChange);
            bus.emit('stop', { current: current });
            return true;
        }
        
        function addRoute(route) {
            if (!route || !route.path) return false;
            conf.routes.push(route);
            return true;
        }
        
        function removeRoute(pathOrName) {
            var key = String(pathOrName || '');
            var out = [];
            var removed = false;
            for (var i = 0; i < conf.routes.length; i++) {
                if (conf.routes[i].path === key || conf.routes[i].name === key) removed = true;
                else out.push(conf.routes[i]);
            }
            conf.routes = out;
            return removed;
        }
        
        function beforeEach(fn) {
            if (typeof fn !== 'function') return function() {};
            beforeHooks.push(fn);
            return function() { beforeHooks = beforeHooks.filter(function(x) { return x !== fn; }); };
        }
        
        function afterEach(fn) {
            if (typeof fn !== 'function') return function() {};
            afterHooks.push(fn);
            return function() { afterHooks = afterHooks.filter(function(x) { return x !== fn; }); };
        }
        
        return {
            start: start,
            stop: stop,
            push: function(path, query) { return navigate(path, { query: query, replace: false, trigger: true }); },
            replace: function(path, query) { return navigate(path, { query: query, replace: true, trigger: true }); },
            go: function(delta) { history.go(delta || 0); return true; },
            back: function() { history.back(); return true; },
            current: function() { return current ? zClone(current) : null; },
            match: function(path) { return resolve(path); },
            addRoute: addRoute,
            removeRoute: removeRoute,
            routes: function() { return conf.routes.slice(); },
            beforeEach: beforeEach,
            afterEach: afterEach,
            render: function(path) { return transition(path || getHashPath(), 'manual'); },
            on: bus.on,
            off: bus.off
        };
    };
    
    Z.createRouter = function(options) { return Z.routerx(options); };
    
    // ========== httpx ==========
    Z.httpx = function(options) {
        var conf = zMerge({
            baseURL: '',
            timeout: 15000,
            retries: 0,
            retryDelay: 300,
            parse: 'auto',
            headers: {},
            credentials: 'same-origin'
        }, options || {});
        
        var reqInterceptors = [];
        var resInterceptors = [];
        var errInterceptors = [];
        
        function useRequest(fn) {
            if (typeof fn !== 'function') return function() {};
            reqInterceptors.push(fn);
            return function() { reqInterceptors = reqInterceptors.filter(function(x) { return x !== fn; }); };
        }
        
        function useResponse(fn) {
            if (typeof fn !== 'function') return function() {};
            resInterceptors.push(fn);
            return function() { resInterceptors = resInterceptors.filter(function(x) { return x !== fn; }); };
        }
        
        function useError(fn) {
            if (typeof fn !== 'function') return function() {};
            errInterceptors.push(fn);
            return function() { errInterceptors = errInterceptors.filter(function(x) { return x !== fn; }); };
        }
        
        function withBase(url) {
            var u = String(url || '');
            if (/^https?:\/\//i.test(u)) return u;
            var b = conf.baseURL || '';
            if (!b) return u;
            if (b.endsWith('/') && u.startsWith('/')) return b + u.slice(1);
            if (!b.endsWith('/') && !u.startsWith('/')) return b + '/' + u;
            return b + u;
        }
        
        function buildQuery(query) {
            if (!query || typeof query !== 'object') return '';
            var out = [];
            for (var k in query) {
                var v = query[k];
                if (v === undefined || v === null) continue;
                if (Array.isArray(v)) {
                    for (var i = 0; i < v.length; i++) out.push(encodeURIComponent(k) + '=' + encodeURIComponent(String(v[i])));
                } else {
                    out.push(encodeURIComponent(k) + '=' + encodeURIComponent(String(v)));
                }
            }
            return out.length ? ('?' + out.join('&')) : '';
        }
        
        function parseBody(data, headers) {
            if (data === undefined || data === null) return null;
            if (data instanceof FormData) return data;
            if (data instanceof Blob) return data;
            if (typeof data === 'string') return data;
            var headerKey = Object.keys(headers).find(function(k) { return k.toLowerCase() === 'content-type'; });
            var ctype = headerKey ? headers[headerKey] : '';
            if (!ctype) {
                headers['Content-Type'] = 'application/json';
                return JSON.stringify(data);
            }
            if (ctype.indexOf('application/json') >= 0) return JSON.stringify(data);
            if (ctype.indexOf('application/x-www-form-urlencoded') >= 0) {
                var fd = new URLSearchParams();
                for (var k in data) fd.append(k, data[k]);
                return fd;
            }
            return data;
        }
        
        function parseResponse(resp, mode) {
            var contentType = resp.headers.get('content-type') || '';
            var m = mode || conf.parse || 'auto';
            if (m === 'raw') return Promise.resolve(resp);
            if (m === 'json') return resp.json();
            if (m === 'text') return resp.text();
            if (contentType.indexOf('application/json') >= 0) return resp.json();
            return resp.text();
        }
        
        function runReq(cfg) {
            var next = zClone(cfg);
            for (var i = 0; i < reqInterceptors.length; i++) next = reqInterceptors[i](next) || next;
            return next;
        }
        
        function runRes(res) {
            var next = res;
            for (var i = 0; i < resInterceptors.length; i++) next = resInterceptors[i](next) || next;
            return next;
        }
        
        function runErr(err, cfg) {
            var e = err;
            for (var i = 0; i < errInterceptors.length; i++) {
                try { e = errInterceptors[i](e, cfg) || e; } catch (_) {}
            }
            return e;
        }
        
        function doFetch(cfg, attempt) {
            var headers = zMerge(conf.headers || {}, cfg.headers || {});
            var queryStr = buildQuery(cfg.query);
            var finalUrl = withBase(cfg.url) + queryStr;
            var timeout = typeof cfg.timeout === 'number' ? cfg.timeout : conf.timeout;
            var method = String(cfg.method || 'GET').toUpperCase();
            var retries = typeof cfg.retries === 'number' ? cfg.retries : conf.retries;
            var retryDelay = typeof cfg.retryDelay === 'number' ? cfg.retryDelay : conf.retryDelay;
            var ac = typeof AbortController !== 'undefined' ? new AbortController() : null;
            var timer = null;
            if (ac && timeout > 0) timer = setTimeout(function() { ac.abort(); }, timeout);
            
            var req = runReq({
                url: finalUrl,
                method: method,
                headers: headers,
                body: method === 'GET' || method === 'HEAD' ? undefined : parseBody(cfg.data, headers),
                credentials: cfg.credentials || conf.credentials,
                signal: ac ? ac.signal : undefined
            });
            
            return fetch(req.url, req).then(function(resp) {
                if (timer) clearTimeout(timer);
                return parseResponse(resp, cfg.parse || conf.parse).then(function(parsed) {
                    var out = runRes({
                        ok: resp.ok,
                        status: resp.status,
                        statusText: resp.statusText,
                        headers: resp.headers,
                        data: parsed,
                        raw: resp,
                        config: req
                    });
                    if (!out.ok && cfg.throwOnHTTPError !== false) {
                        var err = new Error('HTTP ' + out.status + ' ' + out.statusText);
                        err.response = out;
                        throw err;
                    }
                    return out;
                });
            }).catch(function(e) {
                if (timer) clearTimeout(timer);
                if (attempt < retries) {
                    return new Promise(function(resolve) { setTimeout(resolve, retryDelay * (attempt + 1)); }).then(function() {
                        return doFetch(cfg, attempt + 1);
                    });
                }
                throw runErr(e, cfg);
            });
        }
        
        function request(cfg) {
            var base = zMerge({
                url: '',
                method: 'GET',
                headers: {},
                data: null,
                query: null,
                parse: conf.parse,
                timeout: conf.timeout,
                retries: conf.retries,
                retryDelay: conf.retryDelay,
                throwOnHTTPError: true
            }, cfg || {});
            return doFetch(base, 0);
        }
        
        function create(nextOptions) {
            return Z.httpx(zMerge(conf, nextOptions || {}));
        }
        
        return {
            request: request,
            get: function(url, query, cfg) { return request(zMerge(cfg || {}, { url: url, method: 'GET', query: query || null })); },
            post: function(url, data, cfg) { return request(zMerge(cfg || {}, { url: url, method: 'POST', data: data })); },
            put: function(url, data, cfg) { return request(zMerge(cfg || {}, { url: url, method: 'PUT', data: data })); },
            patch: function(url, data, cfg) { return request(zMerge(cfg || {}, { url: url, method: 'PATCH', data: data })); },
            del: function(url, query, cfg) { return request(zMerge(cfg || {}, { url: url, method: 'DELETE', query: query || null })); },
            upload: function(url, file, field, extra, cfg) {
                var fd = new FormData();
                fd.append(field || 'file', file);
                var ext = extra || {};
                for (var k in ext) fd.append(k, ext[k]);
                return request(zMerge(cfg || {}, { url: url, method: 'POST', data: fd }));
            },
            useRequest: useRequest,
            useResponse: useResponse,
            useError: useError,
            create: create,
            config: function() { return zClone(conf); }
        };
    };
    
    Z.httpCreate = function(options) { return Z.httpx(options); };
    Z._httpxDefault = Z._httpxDefault || Z.httpx();
    Z.http = function(cfg) { return Z._httpxDefault.request(cfg); };
    
})(typeof window !== 'undefined' ? window : this);

(function(global) {
    'use strict';
    
    var Z = global.zxd || global.zxlite;
    if (!Z) return;
    
    function zClone(v) { return Z.clone ? Z.clone(v) : JSON.parse(JSON.stringify(v)); }
    function zMerge(a, b) { return Z.merge ? Z.merge(a, b) : Object.assign({}, a || {}, b || {}); }
    function zGet(obj, path, fallback) { return Z.pathGet ? Z.pathGet(obj, path, fallback) : fallback; }
    function zSet(obj, path, value) { return Z.pathSet ? Z.pathSet(obj, path, value) : obj; }
    function zType(v) { return Z.type ? Z.type(v) : typeof v; }
    function zNow() { return Date.now(); }
    
    function emitter() {
        if (Z.busCreate) {
            var bus = Z.busCreate({ replayLimit: 10, debug: false });
            return {
                on: bus.on,
                off: bus.off,
                emit: bus.emit,
                once: bus.once,
                clear: bus.clear
            };
        }
        var map = new Map();
        return {
            on: function(k, fn) { if (!map.has(k)) map.set(k, []); map.get(k).push(fn); return function() {}; },
            off: function() { return true; },
            emit: function(k, p) { (map.get(k) || []).forEach(function(fn) { fn(p); }); return true; },
            once: function() { return function() {}; },
            clear: function() { map.clear(); return true; }
        };
    }
    
    // ========== storex ==========
    Z.storex = function(options) {
        var conf = zMerge({
            name: 'default',
            strict: false,
            state: {},
            getters: {},
            mutations: {},
            actions: {},
            modules: {},
            persist: null
        }, options || {});
        
        var state = zClone(conf.state || {});
        var bus = emitter();
        var moduleMap = {};
        var unsubs = [];
        var lock = false;
        var active = true;
        
        function assertMutation() {
            if (conf.strict && !lock) throw new Error('storex strict mode: mutate only in commit/setState');
        }
        
        function getStorage() {
            var p = conf.persist;
            if (!p || p.enabled === false) return null;
            try {
                if ((p.mode || 'local') === 'session') return window.sessionStorage;
                return window.localStorage;
            } catch (e) {
                return null;
            }
        }
        
        function persistKey() {
            var p = conf.persist || {};
            return p.key || ('zxlite_storex_' + conf.name);
        }
        
        function persistSave() {
            var st = getStorage();
            if (!st) return false;
            try {
                st.setItem(persistKey(), JSON.stringify({
                    name: conf.name,
                    ts: zNow(),
                    state: state
                }));
                return true;
            } catch (e) {
                console.warn('storex persist save failed:', e.message);
                return false;
            }
        }
        
        function persistLoad() {
            var st = getStorage();
            if (!st) return null;
            try {
                var raw = st.getItem(persistKey());
                if (!raw) return null;
                var parsed = JSON.parse(raw);
                return parsed && parsed.state ? parsed.state : null;
            } catch (e) {
                return null;
            }
        }
        
        function setState(path, value, meta) {
            if (!active) return false;
            assertMutation();
            lock = true;
            if (typeof path === 'string' || Array.isArray(path)) zSet(state, path, value);
            else if (zType(path) === 'object') state = zMerge(state, path);
            lock = false;
            bus.emit('change', {
                type: 'setState',
                path: path,
                value: zClone(value),
                state: zClone(state),
                meta: meta || {}
            });
            persistSave();
            return true;
        }
        
        function replaceState(nextState, meta) {
            if (!active) return false;
            assertMutation();
            lock = true;
            state = zClone(nextState || {});
            lock = false;
            bus.emit('change', {
                type: 'replaceState',
                state: zClone(state),
                meta: meta || {}
            });
            persistSave();
            return true;
        }
        
        function getState(path, fallback) {
            if (!path) return zClone(state);
            return zGet(state, path, fallback);
        }
        
        function getGetter(name) {
            var fn = conf.getters[name];
            if (typeof fn !== 'function') return undefined;
            try {
                return fn(state, getterProxy);
            } catch (e) {
                console.error('storex getter error:', name, e);
                return undefined;
            }
        }
        
        function allGetters() {
            var out = {};
            for (var k in conf.getters) out[k] = getGetter(k);
            return out;
        }
        
        function commit(type, payload, meta) {
            if (!active) return false;
            var fn = conf.mutations[type];
            if (typeof fn !== 'function') return false;
            lock = true;
            fn(state, payload, { type: type, meta: meta || {} });
            lock = false;
            bus.emit('mutation', {
                type: type,
                payload: zClone(payload),
                state: zClone(state),
                meta: meta || {}
            });
            bus.emit('change', {
                type: 'mutation',
                mutation: type,
                payload: zClone(payload),
                state: zClone(state),
                meta: meta || {}
            });
            persistSave();
            return true;
        }
        
        function dispatch(type, payload, meta) {
            if (!active) return Promise.resolve(false);
            var fn = conf.actions[type];
            if (typeof fn !== 'function') return Promise.resolve(false);
            var ctx = {
                state: state,
                rootState: state,
                getters: getterProxy,
                getState: getState,
                setState: function(path, value, m) {
                    lock = true;
                    var ok = setState(path, value, m);
                    lock = false;
                    return ok;
                },
                commit: commit,
                dispatch: dispatch,
                emit: bus.emit,
                module: moduleProxy
            };
            bus.emit('action:start', { type: type, payload: zClone(payload), meta: meta || {} });
            return Promise.resolve(fn(ctx, payload, { type: type, meta: meta || {} })).then(function(result) {
                bus.emit('action:done', { type: type, payload: zClone(payload), result: zClone(result), meta: meta || {} });
                return result;
            }).catch(function(e) {
                bus.emit('action:error', { type: type, payload: zClone(payload), error: e, meta: meta || {} });
                throw e;
            });
        }
        
        function deepEqual(a, b, seenA, seenB) {
            if (a === b) return true;
            if (a == null || b == null) return a === b;
            if (typeof a !== typeof b) return false;
            if (typeof a !== 'object') return a === b;
            var sa = seenA || [];
            var sb = seenB || [];
            for (var i = 0; i < sa.length; i++) {
                if (sa[i] === a) return sb[i] === b;
            }
            sa.push(a);
            sb.push(b);
            if (Array.isArray(a)) {
                if (!Array.isArray(b) || a.length !== b.length) return false;
                for (var ai = 0; ai < a.length; ai++) {
                    if (!deepEqual(a[ai], b[ai], sa, sb)) return false;
                }
                return true;
            }
            var keysA = Object.keys(a);
            var keysB = Object.keys(b);
            if (keysA.length !== keysB.length) return false;
            for (var k = 0; k < keysA.length; k++) {
                var key = keysA[k];
                if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
                if (!deepEqual(a[key], b[key], sa, sb)) return false;
            }
            return true;
        }
        
        function watch(path, handler, cfg) {
            if (typeof handler !== 'function') return function() {};
            var opt = cfg || {};
            var deep = opt.deep !== false;
            var oldVal = getState(path);
            if (opt.immediate) handler(zClone(oldVal), undefined, { immediate: true, path: path });
            var un = bus.on('change', function(info) {
                var next = getState(path);
                var changed = deep ? !deepEqual(next, oldVal) : next !== oldVal;
                if (!changed) return;
                var prev = oldVal;
                oldVal = zClone(next);
                handler(zClone(next), zClone(prev), info);
            });
            unsubs.push(un);
            return un;
        }
        
        function subscribe(handler, cfg) {
            if (typeof handler !== 'function') return function() {};
            var topic = cfg && cfg.topic ? cfg.topic : 'change';
            var un = bus.on(topic, handler, cfg || {});
            unsubs.push(un);
            return un;
        }
        
        function registerModule(name, mod) {
            if (!name || zType(mod) !== 'object') return false;
            if (moduleMap[name]) return false;
            moduleMap[name] = {
                state: zClone(mod.state || {}),
                getters: mod.getters || {},
                mutations: mod.mutations || {},
                actions: mod.actions || {}
            };
            lock = true;
            state[name] = zClone(moduleMap[name].state);
            lock = false;
            var prefix = name + '/';
            for (var mk in moduleMap[name].mutations) {
                (function(mkName) {
                    conf.mutations[prefix + mkName] = function(rootState, payload, info) {
                        moduleMap[name].mutations[mkName](rootState[name], payload, info);
                    };
                })(mk);
            }
            for (var ak in moduleMap[name].actions) {
                (function(akName) {
                    conf.actions[prefix + akName] = function(ctx, payload, info) {
                        var childCtx = zMerge(ctx, { state: state[name], rootState: state });
                        return moduleMap[name].actions[akName](childCtx, payload, info);
                    };
                })(ak);
            }
            for (var gk in moduleMap[name].getters) {
                (function(gkName) {
                    conf.getters[prefix + gkName] = function(rootState, getters) {
                        return moduleMap[name].getters[gkName](rootState[name], getters, rootState);
                    };
                })(gk);
            }
            bus.emit('module:register', { name: name, state: zClone(state[name]) });
            persistSave();
            return true;
        }
        
        function unregisterModule(name) {
            if (!moduleMap[name]) return false;
            var prefix = name + '/';
            for (var mk in conf.mutations) if (mk.indexOf(prefix) === 0) delete conf.mutations[mk];
            for (var ak in conf.actions) if (ak.indexOf(prefix) === 0) delete conf.actions[ak];
            for (var gk in conf.getters) if (gk.indexOf(prefix) === 0) delete conf.getters[gk];
            lock = true;
            delete state[name];
            lock = false;
            delete moduleMap[name];
            bus.emit('module:unregister', { name: name });
            persistSave();
            return true;
        }
        
        function snapshot() {
            return {
                name: conf.name,
                ts: zNow(),
                state: zClone(state),
                getters: allGetters(),
                modules: Object.keys(moduleMap)
            };
        }
        
        function reset(nextState) {
            lock = true;
            state = zClone(nextState || conf.state || {});
            lock = false;
            bus.emit('change', { type: 'reset', state: zClone(state) });
            persistSave();
            return true;
        }
        
        function hotUpdate(patch) {
            if (zType(patch) !== 'object') return false;
            if (patch.getters && zType(patch.getters) === 'object') conf.getters = zMerge(conf.getters, patch.getters);
            if (patch.mutations && zType(patch.mutations) === 'object') conf.mutations = zMerge(conf.mutations, patch.mutations);
            if (patch.actions && zType(patch.actions) === 'object') conf.actions = zMerge(conf.actions, patch.actions);
            return true;
        }
        
        function destroy() {
            if (!active) return true;
            active = false;
            for (var i = 0; i < unsubs.length; i++) {
                try { unsubs[i](); } catch (e) {}
            }
            unsubs = [];
            bus.clear();
            return true;
        }
        
        var getterProxy = {
            get: function(name) { return getGetter(name); }
        };
        Object.defineProperty(getterProxy, 'all', {
            enumerable: true,
            get: function() { return allGetters(); }
        });
        
        var moduleProxy = {
            register: registerModule,
            unregister: unregisterModule,
            has: function(name) { return !!moduleMap[name]; },
            list: function() { return Object.keys(moduleMap); }
        };
        
        for (var mn in conf.modules) registerModule(mn, conf.modules[mn]);
        var loaded = persistLoad();
        if (loaded) {
            lock = true;
            state = zMerge(state, loaded);
            lock = false;
        }
        
        return {
            name: conf.name,
            state: function(path, fallback) { return getState(path, fallback); },
            getState: getState,
            setState: function(path, value, meta) { lock = true; var ok = setState(path, value, meta); lock = false; return ok; },
            replaceState: function(nextState, meta) { lock = true; var ok = replaceState(nextState, meta); lock = false; return ok; },
            commit: commit,
            dispatch: dispatch,
            watch: watch,
            subscribe: subscribe,
            getters: getterProxy,
            module: moduleProxy,
            persistSave: persistSave,
            persistLoad: persistLoad,
            snapshot: snapshot,
            reset: reset,
            hotUpdate: hotUpdate,
            destroy: destroy,
            on: bus.on,
            off: bus.off
        };
    };
    
    Z.createStore = function(options) { return Z.storex(options); };
    
    // ========== cachex ==========
    Z.cachex = function(options) {
        var conf = zMerge({
            namespace: 'zxlite',
            mode: 'memory',
            defaultTTL: 0,
            clone: true
        }, options || {});
        
        var mem = new Map();
        
        function k(name) { return conf.namespace + ':' + String(name); }
        function now() { return Date.now(); }
        
        function storage() {
            try {
                if (conf.mode === 'local') return window.localStorage;
                if (conf.mode === 'session') return window.sessionStorage;
            } catch (e) {}
            return null;
        }
        
        function write(key, payload) {
            var st = storage();
            if (!st) { mem.set(key, payload); return true; }
            try {
                st.setItem(key, JSON.stringify(payload));
                return true;
            } catch (e) {
                mem.set(key, payload);
                return false;
            }
        }
        
        function read(key) {
            var st = storage();
            if (!st) return mem.get(key) || null;
            var raw = st.getItem(key);
            if (raw == null) return mem.get(key) || null;
            try {
                return JSON.parse(raw);
            } catch (e) {
                return mem.get(key) || null;
            }
        }
        
        function delRaw(key) {
            var st = storage();
            if (st) st.removeItem(key);
            mem.delete(key);
            return true;
        }
        
        function expired(entry) {
            if (!entry) return true;
            if (!entry.expireAt) return false;
            return now() >= entry.expireAt;
        }
        
        function set(name, value, ttl, meta) {
            var t = typeof ttl === 'number' ? ttl : conf.defaultTTL;
            return write(k(name), {
                value: conf.clone ? zClone(value) : value,
                createAt: now(),
                updateAt: now(),
                expireAt: t > 0 ? now() + t : 0,
                meta: zClone(meta || {})
            });
        }
        
        function get(name, fallback) {
            var key = k(name);
            var entry = read(key);
            if (!entry) return fallback;
            if (expired(entry)) {
                delRaw(key);
                return fallback;
            }
            return conf.clone ? zClone(entry.value) : entry.value;
        }
        
        function entry(name) {
            var key = k(name);
            var val = read(key);
            if (!val) return null;
            if (expired(val)) {
                delRaw(key);
                return null;
            }
            return zClone(val);
        }
        
        function has(name) { return entry(name) !== null; }
        
        function touch(name, ttl) {
            var key = k(name);
            var e = read(key);
            if (!e || expired(e)) {
                delRaw(key);
                return false;
            }
            var t = typeof ttl === 'number' ? ttl : conf.defaultTTL;
            e.updateAt = now();
            e.expireAt = t > 0 ? now() + t : 0;
            return write(key, e);
        }
        
        function remove(name) { return delRaw(k(name)); }
        
        function clear() {
            var prefix = conf.namespace + ':';
            var st = storage();
            if (st) {
                var all = [];
                for (var i = 0; i < st.length; i++) {
                    var key = st.key(i);
                    if (key && key.indexOf(prefix) === 0) all.push(key);
                }
                for (var j = 0; j < all.length; j++) st.removeItem(all[j]);
            }
            var mkeys = Array.from(mem.keys());
            for (var m = 0; m < mkeys.length; m++) if (mkeys[m].indexOf(prefix) === 0) mem.delete(mkeys[m]);
            return true;
        }
        
        function keys() {
            var prefix = conf.namespace + ':';
            var out = [];
            var st = storage();
            if (st) {
                for (var i = 0; i < st.length; i++) {
                    var key = st.key(i);
                    if (key && key.indexOf(prefix) === 0) out.push(key.slice(prefix.length));
                }
            }
            mem.forEach(function(_, key) {
                if (key.indexOf(prefix) === 0) {
                    var nk = key.slice(prefix.length);
                    if (out.indexOf(nk) === -1) out.push(nk);
                }
            });
            return out;
        }
        
        function clean() {
            var list = keys();
            var removed = 0;
            for (var i = 0; i < list.length; i++) {
                if (entry(list[i]) === null) removed++;
            }
            return removed;
        }
        
        function stats() {
            var list = keys();
            var expiring = 0;
            var forever = 0;
            for (var i = 0; i < list.length; i++) {
                var e = entry(list[i]);
                if (!e) continue;
                if (e.expireAt) expiring++;
                else forever++;
            }
            return {
                namespace: conf.namespace,
                mode: conf.mode,
                size: list.length,
                expiring: expiring,
                forever: forever
            };
        }
        
        return {
            set: set,
            get: get,
            entry: entry,
            has: has,
            touch: touch,
            remove: remove,
            clear: clear,
            keys: keys,
            clean: clean,
            size: function() { return keys().length; },
            stats: stats
        };
    };
    
    Z.cacheCreate = function(options) { return Z.cachex(options); };
    Z._cachexDefault = Z._cachexDefault || Z.cachex({ namespace: 'zxlite_default', mode: 'memory', defaultTTL: 0 });
    Z.cacheSet = function(key, value, ttl, meta) { return Z._cachexDefault.set(key, value, ttl, meta); };
    Z.cacheGet = function(key, fallback) { return Z._cachexDefault.get(key, fallback); };
    Z.cacheHas = function(key) { return Z._cachexDefault.has(key); };
    Z.cacheDel = function(key) { return Z._cachexDefault.remove(key); };
    Z.cacheClear = function() { return Z._cachexDefault.clear(); };
    
    // ========== queuex ==========
    Z.queuex = function(options) {
        var conf = zMerge({
            name: 'queue',
            concurrency: 1,
            retry: 0,
            retryDelay: 0,
            autoStart: true
        }, options || {});
        
        var waiting = [];
        var running = 0;
        var paused = !conf.autoStart;
        var destroyed = false;
        var bus = emitter();
        var stats = { added: 0, done: 0, failed: 0, canceled: 0 };
        
        function sortWaiting() {
            waiting.sort(function(a, b) {
                if (a.priority === b.priority) return a.createAt - b.createAt;
                return b.priority - a.priority;
            });
        }
        
        function runWithTimeout(fn, timeout) {
            if (!timeout || timeout <= 0) return Promise.resolve().then(fn);
            return Promise.race([
                Promise.resolve().then(fn),
                new Promise(function(_, reject) {
                    setTimeout(function() { reject(new Error('queuex timeout ' + timeout + 'ms')); }, timeout);
                })
            ]);
        }
        
        function execute(task) {
            if (task.canceled) {
                stats.canceled++;
                task.reject(new Error('task canceled'));
                bus.emit('cancel', { id: task.id, meta: task.meta });
                return Promise.resolve(false);
            }
            running++;
            task.tries++;
            bus.emit('start', { id: task.id, tries: task.tries, meta: task.meta });
            return runWithTimeout(function() {
                return task.fn({
                    id: task.id,
                    tries: task.tries,
                    meta: task.meta,
                    queue: api
                });
            }, task.timeout).then(function(result) {
                running--;
                stats.done++;
                task.resolve(result);
                bus.emit('done', { id: task.id, tries: task.tries, result: zClone(result), meta: task.meta });
                pump();
                return true;
            }).catch(function(e) {
                running--;
                if (task.tries <= task.retry) {
                    bus.emit('retry', { id: task.id, tries: task.tries, error: e, meta: task.meta });
                    setTimeout(function() {
                        waiting.push(task);
                        sortWaiting();
                        pump();
                    }, task.retryDelay);
                    return false;
                }
                stats.failed++;
                task.reject(e);
                bus.emit('error', { id: task.id, tries: task.tries, error: e, meta: task.meta });
                pump();
                return false;
            });
        }
        
        function pump() {
            if (destroyed || paused) return;
            while (running < conf.concurrency && waiting.length) {
                execute(waiting.shift());
            }
            if (running === 0 && waiting.length === 0) {
                bus.emit('idle', snapshot());
            }
        }
        
        function add(fn, opt) {
            if (destroyed) return Promise.reject(new Error('queuex destroyed'));
            if (typeof fn !== 'function') return Promise.reject(new Error('queuex task must be function'));
            var c = zMerge({
                id: 'task_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8),
                priority: 0,
                retry: conf.retry,
                retryDelay: conf.retryDelay,
                timeout: 0,
                meta: {}
            }, opt || {});
            stats.added++;
            return new Promise(function(resolve, reject) {
                waiting.push({
                    id: c.id,
                    fn: fn,
                    priority: c.priority,
                    retry: c.retry,
                    retryDelay: c.retryDelay,
                    timeout: c.timeout,
                    meta: c.meta,
                    createAt: zNow(),
                    tries: 0,
                    canceled: false,
                    resolve: resolve,
                    reject: reject
                });
                sortWaiting();
                bus.emit('add', { id: c.id, waiting: waiting.length, meta: c.meta });
                pump();
            });
        }
        
        function pause() { paused = true; bus.emit('pause', snapshot()); return true; }
        function resume() { paused = false; bus.emit('resume', snapshot()); pump(); return true; }
        
        function clear(reason) {
            var r = reason || 'queue cleared';
            while (waiting.length) {
                var task = waiting.shift();
                task.canceled = true;
                task.reject(new Error(r));
                stats.canceled++;
            }
            bus.emit('clear', snapshot());
            return true;
        }
        
        function cancel(id) {
            for (var i = 0; i < waiting.length; i++) {
                if (waiting[i].id === id) {
                    var task = waiting.splice(i, 1)[0];
                    task.canceled = true;
                    task.reject(new Error('task canceled: ' + id));
                    stats.canceled++;
                    bus.emit('cancel', { id: id, by: 'manual' });
                    return true;
                }
            }
            return false;
        }
        
        function idle() {
            if (running === 0 && waiting.length === 0) return Promise.resolve(snapshot());
            return new Promise(function(resolve) {
                var un = bus.on('idle', function(info) {
                    if (typeof un === 'function') un();
                    resolve(info);
                });
            });
        }
        
        function snapshot() {
            return {
                name: conf.name,
                paused: paused,
                running: running,
                waiting: waiting.length,
                stats: zClone(stats)
            };
        }
        
        function destroy() {
            destroyed = true;
            clear('queue destroyed');
            bus.clear();
            return true;
        }
        
        var api = {
            add: add,
            pause: pause,
            resume: resume,
            clear: clear,
            cancel: cancel,
            idle: idle,
            snapshot: snapshot,
            stats: function() { return zClone(stats); },
            on: bus.on,
            off: bus.off,
            destroy: destroy
        };
        
        return api;
    };
    
    Z.queueCreate = function(options) { return Z.queuex(options); };
    
})(typeof window !== 'undefined' ? window : this);
