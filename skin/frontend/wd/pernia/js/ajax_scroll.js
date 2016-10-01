  jQuery(document).ready(function() {
    jQuery("img.lazy").lazyload({threshold : 50, skip_invisible:false});
	var e = (jQuery("body"), jQuery(window)),
        r = jQuery(document),
        t = (e.width(), e.height(), jQuery(".filters-wrap"), jQuery(".sub-filters"), jQuery(".filters-action"), jQuery(".spacer"), window.location.pathname, jQuery(".filter-cont"), jQuery(".filter-header"), 1),
        u = 2,
        a = !1,
        i = jQuery("#current_url_pagn").val(),
        o = jQuery("#totalProduct").val(),
        n = jQuery("#page-count").val(),
        l = (jQuery(".products-grid"), jQuery("footer")),
        y = jQuery(".footer-container"),
        s = (jQuery(".toolbar"), jQuery(".pager"), jQuery("#crnt-select"), ""),
        c = !1,
        j = {
            on: function(e) {
                this.elm = e.elm, jQuery(this.elm).append('<div class="ias_loader"></div>')
                //this.elm = e.elm, jQuery(this.elm).append('<div style="display:none" class="fme_loading_filters"><img src="http://www.perniaspopupshop.com/skin/frontend/default/mytheme/images/FME/ajax-loader.gif" id="loading-image"></div>');
				
			},
            off: function(e) {
                this.elm = e.elm, jQuery(this.elm).find(".ias_loader").remove()
            }
        },
        p = function() {
            if (i = jQuery("#current_url_pagn").val(), o = jQuery("#totalProduct").val(), n = jQuery("#page-count").val(), t = jQuery("#currentPage").val(), u = jQuery("#nextPage").val(), a || -1 !== i.indexOf("?")){				
				//var str =jQuery("#current_url_pagn").val().substr(0, jQuery("#current_url_pagn").val().indexOf('&p='));
				//alert('str if'+str[0]);
				i = window.location.href;
				i = removeParam('p', i);
				var e = i + "&p=" + u + "&isAjax=1";
			
			}else{
				
				//var str =jQuery("#current_url_pagn").val().substr(0, jQuery("#current_url_pagn").val().indexOf('?p='));
				//alert('str else'+str[0]);
				i = window.location.href;
				i = removeParam('p', i);
				e = i + "?p=" + u + "&isAjax=1";}
//            alert('call');
			totalpage = jQuery('#totalPage').val();
			items_count = jQuery('.category-products-container').find('li.item').length;
			if(items_count >= totalpage){
				jQuery.support.cors = !0, jQuery.ajax({
					url: e,
					cache: "true",
					type: "get",
					crossDomain: !0,
					beforeSend: function(e) {
						/*c = !0, j.on({
							elm: ".category-products"
						}), e.setRequestHeader("X-Requested-With", "XMLHttpRequest")*/
						j.on({elm: ".category-products"});
					},
					success: function(e) {
						var r = jQuery("#page_name").val();
	//                    if ("search" == r) s = jQuery(e).find(".products-grid").html(), jQuery("#products-grid").append(s);
	//                    else {
							s = jQuery(e).find(".category-products-container").html();{
								"page_p" + jQuery("#currentPage").val(), "page_p" + jQuery("#nextPage").val()
							}
							//alert(s);
							//alert(jQuery(s).find('li.item').length);
							jQuery(".category-products-container").append(s);
							//jQuery('img.lazy').jail({event: 'load+scroll',  timeout: '50'});
							jQuery("img.lazy").lazyload({threshold : 50, skip_invisible:false});
	//                    }
	
					},
					error: function() {},
					complete: function() {
						var e = jQuery(".product_ids_" + u).val();
						//jQuery('img.lazy').jail({event: 'load+scroll'});
						jQuery("img.lazy").lazyload({threshold : 50, skip_invisible:false});
						e && checkProductsInWishlist(e), t++, u++, jQuery("#currentPage").val(t), jQuery("#nextPage").val(u), c = !1, j.off({
							elm: ".category-products"
						}), jQuery("#nextPage").val() > jQuery("#page-count").val()
					}
            	})
  			}
        };
    e.scroll(function() {
        var lock = parseInt(jQuery('#is_stop_scroll').val());

		if (e.scrollTop() > r.height() - e.height() - l.height() - y.height() - 350 && !c) {
            var t = parseInt(jQuery("#nextPage").val()),
                u = parseInt(jQuery("#page-count").val());
            u >= t && (c = !0, p())
        }
    })
});
function checkProductsInWishlist(obj){

}
function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
            param,
            params_arr = [],
            queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}