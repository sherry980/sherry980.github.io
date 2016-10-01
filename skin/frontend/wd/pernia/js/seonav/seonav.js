/**
 * "Seo Layered Navigation" extension for "Magento Commerce" by "EcommerceTeam (www.ecommerce-team.com)"
 *
 * @category     Extension
 * @copyright    Copyright (c) 2015 EcommerceTeam (http://www.ecommerce-team.com)
 * @author       EcommerceTeam
 * @version      4.1.1
 */

"use strict";
/**
 * Loadinfo indicator for ajax requests
 *
 * @type {{showIndicator: Function, hideIndicator: Function}}
 */
var EcoLayeredNavIndicator = {

    /**
     * Show inidicator
     */
    showIndicator: function() {
        var indicator = document.getElementById('sln-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'sln-indicator';
            indicator.innerHTML = '<span>' + (window['layeredLoadMsg'] || 'Please wait...' ) + '</span>';
            indicator.style.display = 'none';
            document.body.appendChild(indicator);
        }
        indicator.style.display = 'block';
    },

    /**
     * Hide indicator
     */
    hideIndicator: function() {
        var indicator = document.getElementById('sln-indicator');
        if (indicator) {
            EcoLayeredNavTool.toggle(indicator);
        }
    }
};

/**
 * Overlay functions
 *
 * @type {{showOverlay: Function, hideOverlay: Function, createOverlay: Function}}
 */
var EcoLayeredNavOverlay = {
    overlay: {},
    /**
     * Show overlays for all elements
     * @returns {boolean}
     */
    showOverlay:function() {
        EcoLayeredNavIndicator.showIndicator();
        var productList = EcoLayeredNavTool.select('div.category-products');
        if (productList.length > 0) {
            productList = productList[0];
        } else if(productList = EcoLayeredNavTool.select('div.col-main p.note-msg')) {
            productList = productList[0];
        } else {
            return false;
        }
        this.createOverlay('products-list', productList, false);
        var navigationBlocks = EcoLayeredNavTool.select('div.block-layered-nav .block-content');
        for(var i = 0; i < navigationBlocks.length;i++){
            this.createOverlay('layered-navigation-'+i, navigationBlocks[i], true);
        }

    },

    /**
     * Hide all overlays
     */
    hideOverlay:function(){
        for (var key in this.overlay) {
            if (this.overlay.hasOwnProperty(key)) {
                EcoLayeredNavTool.toggle(this.overlay[key]);
            }
        }
        EcoLayeredNavIndicator.hideIndicator();
    },

    /**
     * Create overlay for element
     * @param id
     * @param container
     */
    createOverlay:function(id, container){
        var overlay,
            isIE = EcoLayeredNavTool.isIE() < 9;

        if (this.overlay['sln-overlay-'+id]) {
            overlay = this.overlay['sln-overlay-'+id];
        } else {
            overlay = document.createElement('div');
            overlay.id = 'sln-overlay-'+id;
            document.body.appendChild(overlay);
            this.overlay['sln-overlay-'+id] = overlay;
        }

        if (isIE) {
            container.style.position = 'relative';
        }

        var obj        = container;
        var offsetLeft = obj.offsetLeft;
        var offsetTop  = obj.offsetTop;
        while (obj.offsetParent) {
            if (obj == EcoLayeredNavTool.select('body')[0]) {
                break
            } else {
                offsetLeft = offsetLeft+obj.offsetParent.offsetLeft;
                offsetTop = offsetTop+obj.offsetParent.offsetTop;
                obj = obj.offsetParent;
            }
        }

        overlay.style.top           = offsetTop + 'px';
        overlay.style.left          = offsetLeft - (isIE ? 1 : 0) + 'px';
        overlay.style.width         = container.offsetWidth + (isIE ? 1 : 0) + 'px';
        overlay.style.height        = container.offsetHeight + 'px';
        overlay.style.display       = 'block';
        overlay.style.background    = '#ffffff';
        overlay.style.position      = 'absolute';
        overlay.style.opacity       = '0.4';
        overlay.style.filter        = 'alpha(opacity: 40)';
    }
};

/**
 * EcommerceTeam seo layered navigation
 *
 * @constructor
 */
var EcoLayeredNav = function() {
    this.baseUrl          = null;
    this.inProcess        = false;
    this.navigationBlocks = {};
    this.updateHistory    = true;
    this.tool             = EcoLayeredNavTool;
    this.overlay          = EcoLayeredNavOverlay;
    if ('undefined' != typeof this.initialize) {
        this.initialize.apply(this, arguments);
    }
};

/**
 * Constructor
 *
 * @param baseUrl
 */
EcoLayeredNav.prototype.initialize = function(baseUrl)
{
    var layered = this;
    this.setBaseUrl(baseUrl);
    window.onload = function() {
        setTimeout(function() {
            window.onpopstate = function (event) {
                layered.updateHistory = false;
                layered.setUrl(document.location.href);
            };
        }, 10);
    }

    this.renderElements();
    this.initializeEvents();
};

/**
 * Set base url
 * @param baseUrl
 * @returns {EcoLayeredNav}
 */
EcoLayeredNav.prototype.setBaseUrl = function(baseUrl) {
    this.baseUrl = baseUrl;

    return this;
};

/**
 * Render custom elements: sliders, custom selects, etc
 *
 * @returns {EcoLayeredNav}
 */
EcoLayeredNav.prototype.renderElements = function() {
    if (typeof TPG != 'undefined'
        && typeof TPG.Control != 'undefined'
        && typeof TPG.Control.Slider != 'undefined') {
        TPG.Control.Slider.manager.destroyAll();
        TPG.Control.Slider.manager.createAll();
    }

    return this;
};


/**
 * Initialize element events
 */
EcoLayeredNav.prototype.initializeEvents = function()
{
    var layered = this;
    $$('div.block-layered-nav, div.toolbar').each(function(elem) {
        layered.tool.select('a', elem).each(function(elem) {
            // Fix for IE9
            elem.onclick = function() {
                layered.tool.toggleClass(this, 'checked');
                layered.updateHistory = true;
                layered.setUrl(this.href, 'get', {});

                return false;
            };
        });
        layered.tool.select('select', elem).each(function(elem) {
            elem.onchange = 'return false';
            layered.tool.observe(elem, 'change', function(e) {
                layered.updateHistory = true;
                layered.setUrl(this.value, 'get', {});
                Event.stop(e);
            });
        });
    });
    layered.tool.select('div.block-layered-nav').each(function(elem) {
        layered.tool.select('dt', elem).each(function(elem) {
            layered.tool.observe(elem, 'click', function() {
                if(jQuery(elem).hasClass('active')){
					jQuery(elem).removeClass('active');
				}else{
					jQuery(elem).addClass('active');
				}
				jQuery(this).next('dd').toggleClass('hide');
				
				layered.tool.toggle(layered.tool.next(this, 'dd'));

                // Slider reinitialize
                TPG.Control.Slider.manager.destroyAll();
                TPG.Control.Slider.manager.createAll();
            });
        });
        layered.tool.select('li.more', elem).each(function(elem) {
            layered.tool.observe(elem, 'click', function() {
                layered.tool.select('.additional', layered.tool.parent(this, 'ol')).each(function(elem) {
                    layered.tool.toggleClass(elem, 'hidden');
                });
                layered.tool.select('.more-label', elem).each(function(elem) {
                    layered.tool.toggle(elem);
                })
            });
        })
    });

    if (typeof ConfigurableMediaImages != 'undefined') {
        $j(document).trigger('configurable-media-images-init', ConfigurableMediaImages);
    }
};

/**
 * Submit ajax request
 *
 * @param url
 * @param method
 * @param params
 */
EcoLayeredNav.prototype.setUrl = function(url, method, params)
{
    var layered = this;
    if(!layered.inProcess){
        layered.inProcess = true;
        layered.overlay.showOverlay();
        var forceLayered = ((url.replace(/\?.+$/, "") != layered.baseUrl.replace(/\?.+$/, "")));
        var parameters   = {};
        if (params) {
            layered.tool.extend(parameters, params);
        }
        layered.tool.ajax(url, parameters, method, {forceLayered: (forceLayered ? 1 : 0)},
            function (response) {
                layered.processResponse(response.responseText.evalJSON(), url);
                layered.inProcess = false;
                layered.overlay.hideOverlay();
				
				jQuery("img.lazy").lazyload({threshold : 50, skip_invisible:false});
				
				var i = 0;
				if(jQuery('#narrow-by-list a.checked').length > 0){
					jQuery('#narrow-by-list a.checked').each(function(){
						if(i == 0){
							jQuery(this).closest('dd').prev('dd').addClass('active');
							jQuery(this).closest('dd').siblings('dd').addClass('hide');
						}else{
							jQuery(this).closest('dd').prev('dd').addClass('active');
							jQuery(this).closest('dd').removeClass('hide');	
						}
						i = i+1;
					});
				}else{
					jQuery('#narrow-by-list dt').removeClass('active');
					jQuery('#narrow-by-list dd').addClass('hide');
				}
				
            },
            function (){
                setLocation(url);
                layered.inProcess = false;
                layered.overlay.hideOverlay();
            }
        );
    }
};

/**
 * Update elements end events
 *
 * @param data
 * @param url
 */
EcoLayeredNav.prototype.processResponse = function(data, url)
{
    var layered = this;
    var buffer  = document.createElement('div');
    var blockId, script;
    if ('undefined' != typeof data['navigation_block_html'] && data['navigation_block_html']) {
        for (blockId in data['navigation_block_html']) {
            if (!data['navigation_block_html'].hasOwnProperty(blockId)) {
                continue;
            }
            var html = data['navigation_block_html'][blockId]['html'];
            if (html) {
                buffer.innerHTML = html;
                if(script = data['navigation_block_html'][blockId]['script']){
                    try {
                        eval(script);
                    } catch (error) {
                        if (console) {
                            console.log(error);
                        }
                    }
                }
            }
            var navigationBlock = $(blockId);
            if(navigationBlock && html){
                navigationBlock.parentNode.replaceChild(buffer.firstChild, navigationBlock);
            } else if(navigationBlock){
                var emptyNode = document.createTextNode('');
                this.navigationBlocks[blockId] = emptyNode;
                navigationBlock.parentNode.replaceChild(emptyNode, navigationBlock);
            } else if(html){
                if (navigationBlock = this.navigationBlocks[blockId]) {
                    navigationBlock.parentNode.replaceChild(buffer.firstChild, navigationBlock);
                    this.navigationBlocks[blockId] = null;
                }
            }
        }
    }

    buffer.innerHTML = data['product_list_block_html'];
    var newProductList = null;
    if (layered.tool.select('.category-products', buffer).length) {
        newProductList = layered.tool.select('.category-products', buffer)[0];
    } else if (layered.tool.select('.note-msg', buffer).length){
        newProductList = layered.tool.select('.note-msg', buffer)[0]
    }
    if (newProductList) {
        var currentProductList = layered.tool.select('.category-products')[0];
        if (!currentProductList) {
            currentProductList = layered.tool.select('.col-main .note-msg')[0];
        }
        currentProductList.parentNode.replaceChild(newProductList, currentProductList);
    }

    layered.setBaseUrl(data['layered_base_url']);
    layered.initializeEvents();
    layered.renderElements();

    if (window.History.enabled && layered.updateHistory) {
        window.History.pushState({is_layered: 1}, data['page_title'] || '', url);
    }
};

EcoLayeredNavTool.onDomReady(function(){
    window.layered = new EcoLayeredNav(window['layeredBaseUrl']);
});
