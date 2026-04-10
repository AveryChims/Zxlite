/**
 * zxlite.js - 轻量级前端工具库 v1.4.1
 * 包管理功能：通过对象调用包内函数
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
            dialog.innerHTML = customHtml;
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
        else if (type === 'html') el.innerHTML = val;
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
    Z.html = function(id, html) { var el = getEl(id); if (!el) return null; if (html === undefined) return el.innerHTML; el.innerHTML = html; return el; };
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
            
            // 执行代码（代码中会创建 window.pkgName 对象）
            eval(code);
            
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
    Z.ajaxGet = function(url) { return fetch(url).then(function(r) { return r.text(); }).catch(function(e) { return ''; }); };
    Z.ajaxPost = function(url, data) { var fd = new URLSearchParams(); for (var k in data) fd.append(k, data[k]); return fetch(url, { method: 'POST', body: fd }).then(function(r) { return r.text(); }); };
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
            if (act === 'list') return d[key];
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
            var ex = expr.replace(/\b(abs|sin|cos|tan|sqrt|pow|exp|log|floor|ceil|round)\b/g, 'Math.$1');
            ex = ex.replace(/\bPI\b/g, 'Math.PI').replace(/\bE\b/g, 'Math.E');
            var r = Function('"use strict";return (' + ex + ')')();
            return rem ? r % 1 : r;
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

if (typeof console !== 'undefined') console.log('zxlite.js v1.4.1 loaded - 包管理功能，通过对象调用');

// 设置默认 Toast 背景色
(function() {
    if (!document.getElementById('zx-toast-default')) {
        var s = document.createElement('style');
        s.id = 'zx-toast-default';
        s.textContent = '.zxlite-toast,.zxlite-toast-top{background:rgba(0,0,0,0.85)!important;color:#fff!important;border:1px solid rgba(255,255,255,0.2)!important;border-radius:8px!important;box-shadow:0 4px 15px rgba(0,0,0,0.3)!important;}';
        document.head.appendChild(s);
    }
})();