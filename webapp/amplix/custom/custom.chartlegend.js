IG$.__chartoption.charttype.push(
	{
		label: "Chart Legend",
		charttype: "chartlegend",
		subtype: "chartlegend",
		img: "chartlegend",
		grp: "scientific"
	}
);

IG$.__chartoption.chartext.chartlegend = function(owner) {
	this.owner = owner;
}

IG$.__chartoption.chartext.chartlegend.prototype = {	
	drawChart: function(owner, results) {
		var me = this,
			container = owner.container,
			cop = owner.cop,
			copsettings = cop.settings || {},
			html = me.html;
			
		if (html)
		{
			html.remove();
		}
		
		html = me.html = $("<div class='ig-chart-legend'></div>").appendTo(container);
		
		if (results)
		{
			var tabledata = results._tabledata,
				colfix = results.colfix,
				c_cset = cop.colorset || results.c_cset,
				echart_theme = cop.echart_theme,
				scroll_left = $("<div class='igc-scroll-left'></div>").appendTo(html),
				mscroll = $("<div class='igc-scroll'></div>").appendTo(html),
				ul = $("<ul></ul>").appendTo(mscroll),
				scroll_right = $("<div class='igc-scroll-right'></div>").appendTo(html),
				colors,
				seq = 0;
				
			me._html = {
				scroll_left: scroll_left,
				scroll_right: scroll_right,
				scroll: mscroll,
				ul: ul
			};
				
			if (IG$.__chartoption && IG$.__chartoption.chartcolors && IG$.__chartoption.chartcolors[c_cset])
			{
				colors =  IG$.__chartoption.chartcolors[c_cset];
			}
			
			$.each(tabledata, function(i, row) {
				var t, j,
					s, li,
					srect,
					nc;
					
				if (i < results.rowfix)
					return;
				
				for (j=0; j < colfix; j++)
				{
					s = row[j].text || row[j].code;
					t = (j == 0) ? s : t + " " + s;
				}
				
				li = $("<li><span class='t_icon'></span><span>" + t + "<span></li>").appendTo(ul);
				srect = $(".t_icon", li);
				
				nc = seq % (colors.length);
				
				srect.css({
					"backgroundColor": colors[nc]
				});
				
				seq++;
			});
			
			setTimeout(function() {
				me._do_scroll();
			}, 10)
		}
		
	},
	
	_do_scroll: function() {
		var me = this,
			_html = me._html,
			scroll = _html.scroll,
			sw = scroll.width(),
			ul = _html.ul,
			uw = ul.width(),
			scroll_left = _html.scroll_left,
			scroll_right = _html.scroll_right,
			inc = Math.floor(sw / 4);
			
		if (uw > sw)
		{
			scroll_left.show();
			scroll_right.show();
			
			scroll_left.bind("click", function(e) {
				var c = scroll.scrollLeft() || 0;
				scroll.scrollLeft(c - inc);
			});
			
			scroll_right.bind("click", function(e) {
				var c = scroll.scrollLeft() || 0;
				scroll.scrollLeft(c + inc);
			});
		}
		else
		{
			scroll_left.hide();
			scroll_right.hide();
		}
	},
	
	updatedisplay: function(owner, w, h) {
	},
	destroy: function() {
		var me = this;
	}
};