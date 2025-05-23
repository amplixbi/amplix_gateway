﻿IG$.__chartoption.charttype = IG$.__chartoption.charttype || [];

IG$.__chartoption.charttype.push(
	{
		label:"Google map",
		charttype: "googlemap",
		subtype: "googlemap",
		img: "map_google",
		grp: "map"
	}
);

// https://maps.googleapis.com/maps/api/js?&sensor=false
IG$.cVis.googlemap = $s.extend(IG$.cVis.base, {
	draw: function(results) {
		var me = this;
		
		if (!ig$.google_map_api_key)
		{
			IG$.alertmsg(ig$.appname, "API key is missing!", null, null, 0, "error");
			return;	
		}
		
		if (IG$.cVis.googlemap._loading)
		{
			setTimeout(function() {
				me.draw(results);
			}, 500);
			
			return;
		}
		
		if (!IG$.cVis.googlemap._loaded)
		{
			IG$.cVis.googlemap._loading = 1;
			
			IG$.getScriptCache([
				{
					src: "https://maps.googleapis.com/maps/api/js?key=" + ig$.google_map_api_key + "&libraries=maps&v=beta", // + "&callback=initMap",
					defer: true,
					async: true
				}
			], new IG$.callBackObj(this, function() {
				var js = [
						(ig$.datafolder || "./") + "custom/custom.map.google.worker.js",
						(ig$.datafolder || "./") + "custom/custom.map.google.clustermarkerplus.js"
					];
				
				IG$.getScriptCache(
					js, 
					new IG$.callBackObj(this, function() {
						IG$.cVis.googlemap._loaded = 1;
						me.draw(results);
					})
				);
			}));
		}
	},

	updatedisplay: function(w, h) {
		var me = this,
			map = me.map;
			
		if (map)
		{
			google.maps.event.trigger(map, "resize");
		}
	},

	dispose: function() {
		// called when need to dispose the component
		var me = this,
			map = me.map_inst,
			chartview = me.chartview,
			container = chartview.container;
			
		if (map)
		{
			// $(container).empty();
		}
		
		//me.map_inst = null;
	}
});

