/**
 * "Seo Layered Navigation" extension for "Magento Commerce" by "EcommerceTeam (www.ecommerce-team.com)"
 *
 * @category     Extension
 * @copyright    Copyright (c) 2015 EcommerceTeam (http://www.ecommerce-team.com)
 * @author       EcommerceTeam
 * @version      4.1.1
 */


/**
 * Wrapper for main framework
 *
 * @type {{getElementById: Function, select: Function, hasClass: Function, addClass: Function, toggleClass: Function, removeClass: Function, next: Function, parent: Function, observe: Function, onDomReady: Function, toggle: Function, extend: Function, ajax: Function}}
 */
var EcoLayeredNavTool = {
    getElementById: function(id) {
        return $(id);
    },
    select: function(selector, elem) {
        if (elem) {
            return Element.select(elem, selector);
        }
        return $$(selector);
    },
    hasClass: function(elem, className) {
        return Element.hasClassName(elem, className);
    },
    addClass: function(elem, className) {
        return Element.addClassName(elem, className);
    },
    toggleClass: function(elem, className) {
        if (this.hasClass(elem, className)) {
            this.removeClass(elem, className);
        } else {
            this.addClass(elem, className);
        }
    },
    removeClass: function(elem, className) {
        return Element.removeClassName(elem, className);
    },
    next: function(elem, selector) {
        return Element.next(elem, selector);
    },
    parent: function(elem, selector) {
        return Element.up(elem, selector);
    },
    observe: function(elem, action, callback) {
        return Event.observe(elem, action, callback);
    },
    onDomReady: function(callback) {
        Event.observe(document, "dom:loaded", callback);
    },
    toggle: function(elem) {
        return this.isVisible(elem) ? $(elem).style.display = 'none' : $(elem).style.display = 'block';
    },
    extend: function (target, data) {
        return Object.extend(target, data);
    },
    ajax: function(url, params, method, headers, onSuccess, onFailure) {
        return new Ajax.Request(url,
            {
                parameters: params,
                method: method || 'get',
                requestHeaders: headers || {},
                onSuccess: onSuccess || null,
                onFailure: onFailure || null
            }
        );
    },
    isVisible: function(elem) {
        if ((elem.nodeType != 1) || (elem == document.body)) {
            return true;
        }
        if (elem.currentStyle && elem.currentStyle["display"] != "none" && elem.currentStyle["visibility"] != "hidden") {
            return this.isVisible(elem.parentNode);
        } else if (window.getComputedStyle) {
            var cs = document.defaultView.getComputedStyle(elem, null);
            if (cs.getPropertyValue("display") != "none" && cs.getPropertyValue("visibility") != "hidden") {
                return this.isVisible(elem.parentNode);
            }
        }

        return false;
    },
    isIE: function () {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    }
};
