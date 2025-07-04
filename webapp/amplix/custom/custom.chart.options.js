﻿// make custom chart wizard panels

IG$.__chartoption.chartcateg.push({
	name: "Time based Stock Chart",
	value: "h-stock"
});

IG$.cSET/* chartOptionSet */= "f_palette;f_showvalues;m_zoom_level;m_marker;m_min;m_max;s_t_f;s_t_fo;e3d_en;e3d_al;e3d_be;e3d_de;e3d_vd;edu_val1;cdata_m_tmpl;m_xypos";

IG$._customChartPanels = function() {
	return [
	// p1 panel
	// for map chart options
	{
		layout: {
			type: "vbox",
			align: "stretch"
		},
		name: "_cust_options",
		border: 0,
		title: IRm$.r1("L_MAP_OPTIONS"), // "Extra Options",
		defaults: {
			anchor: "100%"
		},
		
		autoScroll: true,
		
		initData: function() {
			var me = this, 
				ma = me.__main__,
				option = (ma.sheetoption && ma.sheetoption.model ? ma.sheetoption.model.chart_option : null),
				settings;

			if (option) {
				settings = option.settings = option.settings || {};
				
				var d1 = [{name: "Select Value", value: ""}],
					d2 = [{name: "Select Value", value: ""}],
					d3 = [{name: "Select Value", value: ""}],
					d4 = [{name: "Select Value", value: ""}],
					d5 = [{name: "Select Value", value: ""}],
					
					d1val = "", d2val = "", d3val = "";
				
				$.each(ma.sheetoption.model.rows, function(i, row) {
					d1.push({
						name: row.name,
						value: row.uid
					});
					
					d2.push({
						name: row.name,
						value: row.uid
					});
					
					d3.push({
						name: row.name,
						value: row.uid
					});
					
					d4.push({
						name: row.name,
						value: row.uid
					});
					
					d5.push({
						name: row.name,
						value: row.uid
					});
					
					if (settings.m_lat == row.uid)
					{
						d1val = row.uid;
					}
					
					if (settings.m_lng == row.uid)
					{
						d2val = row.uid;
					}
					
					if (settings.m_geofield == row.uid)
					{
						d3val = row.uid;
					}
				});
				
				me.down("[name=m_lat]").store.loadData(d1);
				me.down("[name=m_lng]").store.loadData(d2);
				me.down("[name=m_color_categ]").store.loadData(d3);
				me.down("[name=m_geofield]").store.loadData(d4);
				me.down("[name=mapcategory]").store.loadData(d5);
				me.down("[name=mapcategory]").setValue(option.mapcategory);

				option.cdata_m_tmpl = IG$._decodeVal(option.cdata_m_tmpl);
				
				option.cdata_m_tmpl = option.cdata_m_tmpl || [
					"{",
					"	\"title\": \"\",",
					"	\"content\": [",
					"		\"<div class='igc-legend-container'>\",",
					"		\"<ul class='igc-legend-item'>\",",
					"		\"{row:<li><span class='igc-legend-title'>NAME</span><span class='igc-legend-value'>VALUE</span></li>}\",",
					"		\"</ul>\",",
					"		\"<ul class='igc-legend-item'>\",",
					"		\"{measure:<li><span class='igc-legend-title'>NAME</span><span class='igc-legend-value'>VALUE</span></li>}\",",
					"		\"</ul>\",",
					"			\"<div class='igc-legend-chart'>\",",
					"				\"{chart:values=measure;width=120;height=120}\",",
					"			\"</div>\",",
					"		\"</div>\"",
					"	]",
					"}"
				].join("\n");
				
				me.down("[name=m_zoom_level]").setValue(option.m_zoom_level || "8");
				me.down("[name=m_marker]").setValue(option.m_marker || "marker");
				me.down("[name=m_min]").setValue(option.m_min || "1000");
				me.down("[name=m_max]").setValue(option.m_max || "10000");
				me.down("[name=m_min_color]").setValue(settings.m_min_color || "#e60000"); // red
				me.down("[name=m_min_a_color]").setValue(settings.m_min_a_color || "#A3A300"); // red
				me.down("[name=m_mid_color]").setValue(settings.m_mid_color || "#00e600"); // blue
				me.down("[name=m_mid_a_color]").setValue(settings.m_mid_a_color || "#51FFFF"); // red
				me.down("[name=m_max_color]").setValue(settings.m_max_color || "#0000e6"); // green
				me.down("[name=m_rng_val1]").setValue(settings.m_rng_val1);
				me.down("[name=m_rng_val2]").setValue(settings.m_rng_val2);
				me.down("[name=m_rng_val3]").setValue(settings.m_rng_val3);
				me.down("[name=m_rng_val4]").setValue(settings.m_rng_val4);
				me.down("[name=m_rng_val5]").setValue(settings.m_rng_val5);
				me.down("[name=cdata_m_tmpl]").setValue(option.cdata_m_tmpl);
				me.down("[name=m_xypos]").setValue(option.m_xypos || "");
				me.down("[name=m_map_center]").setValue(settings.m_map_center || "");
				me.down("[name=m_map_camera]").setValue(settings.m_map_camera || "");
				me.down("[name=m_lat]").setValue(d1val);
				me.down("[name=m_lng]").setValue(d2val);
				me.down("[name=m_geofield]").setValue(d3val);
				
				me.down("[name=m_color_categ]").setValue(settings.m_color_categ || "");
				me.down("[name=m_marker_size]").setValue(settings.m_marker_size || "20");
				me.down("[name=m_marker_symbol]").setValue(settings.m_marker_symbol || "");
				// me.down("[name=m_map_legend]").setValue(settings.m_map_legend || "");
				me.down("[name=m_map_post_exec]").setValue(settings.m_map_post_exec || "");
				me.down("[name=m_map_save_stat]").setValue(settings.m_map_save_stat == "T");
				me.down("[name=m_map_popup_hover]").setValue(settings.m_map_popup_hover == "T");
				
				if (ig$.arcgis_basemap)
				{
					var basemaps = ig$.arcgis_basemap.split("\n"),
						i, pbase = [],
						prec;
					
					for (i=0; i < basemaps.length; i++)
					{
						prec = basemaps[i].split(",");
						
						if (basemaps[i] == "none")
						{
							pbase.push({
								name: "No basemap",
								value: "-"
							})
						}
						else if (prec.length > 1 && prec[0] && prec[1])
						{
							pbase.push({
								name: prec[0],
								value: prec[0] 
							});
						}
					}
					
					if (pbase.length)
					{
						me.down("[name=m_arc_basemap]").store.loadData(pbase);
					}
				}
				
				me.down("[name=m_arc_basemap]").setValue(settings.m_arc_basemap || "");
				me.down("[name=m_arc_view]").setValue(settings.m_arc_view || "MapView");
				
				// arc layer selection
				var esri_api_layers = me.down("[name=m_arc_layers]"),
					dp = [],
					dpmap = {};
					
				if (ig$.arcgis_rest$)
				{
					
				}
				else if (ig$.arcgis_rest)
				{
					ig$.arcgis_rest$ = [];
					var v = ig$.arcgis_rest.split("\n"),
						i, sv;
						
					for (i=0; i < v.length; i++)
					{
						if (v[i])
						{
							sv = v[i].split(",");
							
							if (sv.length > 2 && sv[0] && sv[1] && sv[2])
							{
								var c = {
									name: sv[0],
									loader: sv[1],
									url: sv[2],
									option: {}
								};
								
								if (sv[3])
								{
									var cc = sv[3].split(";");
									
									$.each(cc, function(m, cv) {
										if (cv && cv.indexOf("=") > 0)
										{
											var n = cv.substring(0, cv.indexOf("=")),
												v = cv.substring(cv.indexOf("=") + 1);
												
											c.option[n] = v;
										}
									});
								}
								ig$.arcgis_rest$.push(c);
							}
						}
					}
				}
					
				if (ig$.arcgis_rest$ && ig$.arcgis_rest$.length)
				{
					if (settings.m_arc_layers)
					{
						$.each(settings.m_arc_layers, function(i, d) {
							dpmap[d] = 1;
						});
					}
					
					$.each(ig$.arcgis_rest$, function(i, d) {
						var m = {
							name: d.name,
							selected: dpmap[d.name] ? true : false
						};
						dp.push(m);
					});
					
					esri_api_layers.store.loadData(dp);
				}
			}
		},
		
		updateOptionValues: function() {
			var me = this, 
				ma = me.__main__,
				option = (ma.sheetoption && ma.sheetoption.model ? ma.sheetoption.model.chart_option : null),
				settings;

			if (option) {
				settings = option.settings = option.settings || {};
				
				option.m_zoom_level = "" + me.down("[name=m_zoom_level]").getValue();
				option.m_marker = me.down("[name=m_marker]").getValue();
				option.m_min = "" + me.down("[name=m_min]").getValue();
				option.m_max = "" + me.down("[name=m_max]").getValue();
				settings.m_min_color = me.down("[name=m_min_color]").getValue();
				settings.m_min_a_color = me.down("[name=m_min_a_color]").getValue();
				settings.m_mid_color = me.down("[name=m_mid_color]").getValue();
				settings.m_mid_a_color = me.down("[name=m_mid_a_color]").getValue();
				settings.m_max_color = me.down("[name=m_max_color]").getValue();
				settings.m_rng_val1 = me.down("[name=m_rng_val1]").getValue();
				settings.m_rng_val2 = me.down("[name=m_rng_val2]").getValue();
				settings.m_rng_val3 = me.down("[name=m_rng_val3]").getValue();
				settings.m_rng_val4 = me.down("[name=m_rng_val4]").getValue();
				settings.m_rng_val5 = me.down("[name=m_rng_val5]").getValue();
				option.cdata_m_tmpl = IG$._encodeVal(me.down("[name=cdata_m_tmpl]").getValue());
				option.m_xypos = me.down("[name=m_xypos]").getValue();
				settings.m_arc_basemap = me.down("[name=m_arc_basemap]").getValue();
				settings.m_arc_view = me.down("[name=m_arc_view]").getValue();
				settings.m_map_center = me.down("[name=m_map_center]").getValue();
				settings.m_map_camera = me.down("[name=m_map_camera]").getValue();
				settings.m_lat = me.down("[name=m_lat]").getValue();
				settings.m_lng = me.down("[name=m_lng]").getValue();
				settings.m_geofield = me.down("[name=m_geofield]").getValue();
				
				settings.m_color_categ = me.down("[name=m_color_categ]").getValue();
				settings.m_marker_size = me.down("[name=m_marker_size]").getValue();
				settings.m_marker_symbol = me.down("[name=m_marker_symbol]").getValue();
				// settings.m_map_legend = me.down("[name=m_map_legend]").getValue();
				settings.m_map_post_exec = me.down("[name=m_map_post_exec]").getValue();
				settings.m_map_save_stat = me.down("[name=m_map_save_stat]").getValue() ? "T" : "F";
				settings.m_map_popup_hover = me.down("[name=m_map_popup_hover]").getValue() ? "T" : "F";
				
				option.maptype = me.down("[name=maptype]").getValue();
				option.mapcategory = me.down("[name=mapcategory]").getValue();
				
				// arc layer selection
				settings.m_arc_layers = [];
				
				var m_arc_layers = me.down("[name=m_arc_layers]"),
					sel = m_arc_layers.getSelectionModel().selected,
					i;
					
				for (i=0; i < sel.length; i++)
				{
					settings.m_arc_layers.push(sel.items[i].get("name"));
				}
			}
		},
		
		invalidateFields: function(opt) {
			var me = this, 
				ma = me.__main__,
				option = (ma.sheetoption && ma.sheetoption.model ? ma.sheetoption.model.chart_option : null),
				maptype = me.down("[name=maptype]"),
				subtype = opt.subtype;
			
			var _esri_version = ig$.arcgis_version || "0";
			
			_esri_version = Math.floor(Number(_esri_version));
			
			/*
			me.down("[name=pb01]").setVisible(
				subtype == "googlemap" ||
				subtype == "navermap" ||
				subtype == "esri" ||
				subtype == "vworldmap");
			*/

			if (subtype == "koreamap" || subtype == "kr_drill_map" || subtype == "changwon_pop_map")
			{
				var maptypes = IG$.cVis.koreaMapTypes();
				maptype.store.loadData(maptypes.sido);
			}
			else
			{
				maptype.store.loadData(IG$.mLU ? IG$.mLU.maptype : []);
			}

			maptype.setValue(option ? option.maptype : null);
			
			me.down("[name=mapoptions]").setVisible(subtype == "map" || subtype == "koreamap" || subtype == "kr_drill_map" || subtype == "changwon_pop_map");
			me.down("[name=m_xypos]").setVisible(subtype == "vworldmap");
			me.down("[name=m_arc_basemap]").setVisible(subtype == "esri");
			me.down("[name=m_arc_view]").setVisible(subtype == "esri" && _esri_version > 3);
			me.down("[name=m_map_camera]").setVisible(subtype == "esri" && _esri_version > 3);
			
			if (ig$.arcgis_rest$)
			{
				
			}
			else if (ig$.arcgis_rest)
			{
				ig$.arcgis_rest$ = [];
				var v = ig$.arcgis_rest.split("\n"),
					i, sv;
					
				for (i=0; i < v.length; i++)
				{
					if (v[i])
					{
						sv = v[i].split(",");
						
						if (sv.length > 2 && sv[0] && sv[1] && sv[2])
						{
							var c = {
								name: sv[0],
								loader: sv[1],
								url: sv[2],
								option: {}
							};
							
							if (sv[3])
							{
								var cc = sv[3].split(";");
								
								$.each(cc, function(m, cv) {
									if (cv && cv.indexOf("=") > 0)
									{
										var n = cv.substring(0, cv.indexOf("=")),
											v = cv.substring(cv.indexOf("=") + 1);
											
										c.option[n] = v;
									}
								});
							}
							ig$.arcgis_rest$.push(c);
						}
					}
				}
			}
			
			// arc layer selection
			me.down("[name=m_arc_layers]").setVisible(subtype == "esri" && ig$.arcgis_rest$ && ig$.arcgis_rest$.length);
			me.down("[name=m_arc_options]").setVisible(subtype == "esri");
		},
		
		items: [
			{
				xtype: "container",
				layout: "anchor",
				name: "pb01",
				// hidden: true,
				items: [
					{
						xtype: "fieldset",
						title: IRm$.r1("L_MAP_OPT"),
						name: "mapoptions",
						defaults: {
							width: 280
						},
						items: [
							{
								name: "maptype",
								fieldLabel: IRm$.r1("L_MAP_TYPE"),
								xtype: "combobox",
								queryMode: "local",
								displayField: "name",
								valueField: "subtype",
								editable: false,
								autoSelect: false,
								store: {
									xtype: "store",
									fields: [
										"name", "subtype", "filename"
									]
								}
							},
							{
								name: "mapcategory",
								fieldLabel: IRm$.r1("L_MAP_AXIS"),
								xtype: "combobox",
								queryMode: "local",
								displayField: "name",
								valueField: "value",
								editable: false,
								autoSelect: false,
								store: {
									xtype: "store",
									fields: [
										"name", "uid", "type", "nodepath"
									]
								}
							}
						]
					},
					{
						xtype: "fieldset",
						title: IRm$.r1("L_MAP_OPTIONS"), // "Map options",
						layout: "anchor",

						items: [ 
							{
								xtype: "numberfield",
								name: "m_zoom_level",
								fieldLabel: IRm$.r1("L_ZOOM_LEVEL"), // "Zoom Level",
								minValue: 1,
								maxValue: 20
							}
						]
					},
					{
						xtype: "fieldset",
						title: IRm$.r1("L_MAP_DRAW_OPTIONS"), // "Map Draw options",
						layout: "anchor",
						items: [
							{
								xtype: "combobox",
								name: "m_arc_view",
								queryMode: "local",
								displayField: "name",
								valueField: "value",
								editable: false,
								autoSelect: true,
								fieldLabel: IRm$.r1("L_ARC_VIEW"), // "Palette",
								store: {
									xtype: "store",
									fields: ["name", "value" ],
									data: [
										{
											name: "MapView",
											value: "MapView"
										},
										{
											name: "SceneView",
											value: "SceneView"
										}
									]
								}
							},
							{
								xtype: "combobox",
								name: "m_marker",
								queryMode: "local",
								displayField: "name",
								valueField: "value",
								editable: false,
								autoSelect: true,
								fieldLabel: IRm$.r1("L_PALETTE"), // "Palette",
								store: {
									xtype: "store",
									fields: ["name", "value" ],
									data: [
										{
											name: "Marker",
											value: "marker"
										},
										{
											name: "Circle",
											value: "circle"
										},
										{
											name: "GeoPolygon",
											value: "polygon"
										},
										{
											name: "Info",
											value: "info"
										},
										{
											name: "Pie",
											value: "pie"
										}
									]
								},
								listeners: {
									change: function(tobj) {
										var me = this,
											ma = me.__main__,
											mp = me.__mainp__,
											sval = tobj.getValue();

										// mp.down("[name=cdata_m_tmpl]").setVisible(sval == "info");
										mp.down("[name=m_geofield]").setVisible(sval == "polygon");
										mp.down("[name=mf_colors]").setVisible(sval == "circle" || sval == "polygon");
										mp.down("[name=mf_color_categ_c]").setVisible(sval != "circle" && sval != "polygon");
									},
									scope: this
								}
							},
							{
								xtype: "fieldcontainer",
								layout: {
									type: "vbox",
									align: "stretch"
								},
								name: "mf_color_categ_c",
								hidden: true,
								items: [
									{
										xtype: "combobox",
										fieldLabel: IRm$.r1("L_COLOR_CATEG"),
										name: "m_color_categ",
										store: {},
										displayField: "name",
										valueField: "value"
									},
									{
										xtype: "combobox",
										fieldLabel: IRm$.r1("L_MARKER_SIZE"),
										name: "m_marker_size",
										store: {
											data: [
												{name: "5", value: "5"},
												{name: "10", value: "10"},
												{name: "20", value: "20"},
												{name: "25", value: "25"},
												{name: "30", value: "30"}
											]
										},
										displayField: "name",
										valueField: "value"
									},
									{
										xtype: "combobox",
										fieldLabel: IRm$.r1("L_MARKER_SYMBOL"),
										name: "m_marker_symbol",
										store: {
											data: [
												{name: "Circle", value: ""},
												{name: "Cross", value: "STYLE_CROSS"},
												{name: "Diamond", value: "STYLE_DIAMOND"},
												{name: "Square", value: "STYLE_SQUARE"},
												{name: "Triangle", value: "STYLE_TRIANGLE"},
												{name: "Diagnoal Cross", value: "STYLE_X"},
											]
										},
										displayField: "name",
										valueField: "value"
									}
								]
							},
							{
								xtype: "fieldcontainer",
								layout: {
									type: "vbox",
									align: "stretch"
								},
								name: "mf_colors",
								hidden: true,
								items: [
									{
										xtype: "fieldcontainer",
										anchor: "100%",
										fieldLabel: IRm$.r1("L_MIN_COLOR"),
										layout: {
											type: "hbox",
											align: "stretch"
										},
										items: [
											{
												xtype: "textfield",
												name: "m_min_color",
												width: 120
											},
											{
												xtype: "splitter"
											},
											{
												xtype: "splitbutton",
												width: 30,
												menu: {
													showSeparator: false,
													items: [
														{
															xtype: "colorpicker",
															listeners: {
																select: function(cp, color) {
																	var ctrl = this.down("[name=m_min_color]");
																	ctrl.setValue("#" + color);
																},
																scope: this
															}
														}, 
														"-"
													]
												}
											},
											{
												xtype: "textfield",
												name: "m_rng_val1",
												width: 220,
												labelAlign: "right",
												fieldLabel: "Range"
											},
											{
												xtype: "container",
												flex: 1
											}
										]
									},
									{
										xtype: "fieldcontainer",
										anchor: "100%",
										fieldLabel: IRm$.r1("L_MIN_A_COLOR"),
										layout: {
											type: "hbox",
											align: "stretch"
										},
										items: [
											{
												xtype: "textfield",
												name: "m_min_a_color",
												width: 120
											},
											{
												xtype: "splitter"
											},
											{
												xtype: "splitbutton",
												width: 30,
												menu: {
													showSeparator: false,
													items: [
														{
															xtype: "colorpicker",
															listeners: {
																select: function(cp, color) {
																	var ctrl = this.down("[name=m_min_a_color]");
																	ctrl.setValue("#" + color);
																},
																scope: this
															}
														}, 
														"-"
													]
												}
											},
											{
												xtype: "textfield",
												name: "m_rng_val2",
												width: 220,
												labelAlign: "right",
												fieldLabel: "Range"
											},
											{
												xtype: "container",
												flex: 1
											}
										]
									},
									{
										xtype: "fieldcontainer",
										anchor: "100%",
										fieldLabel: IRm$.r1("L_MID_COLOR"),
										layout: {
											type: "hbox",
											align: "stretch"
										},
										items: [
											{
												xtype: "textfield",
												name: "m_mid_color",
												width: 120
											},
											{
												xtype: "splitter"
											},
											{
												xtype: "splitbutton",
												width: 30,
												menu: {
													showSeparator: false,
													items: [
														{
															xtype: "colorpicker",
															listeners: {
																select: function(cp, color) {
																	var ctrl = this.down("[name=m_mid_color]");
																	ctrl.setValue("#" + color);
																},
																scope: this
															}
														}, 
														"-"
													]
												}
											},
											{
												xtype: "textfield",
												name: "m_rng_val3",
												width: 220,
												labelAlign: "right",
												fieldLabel: "Range"
											},
											{
												xtype: "container",
												flex: 1
											}
										]
									},
									{
										xtype: "fieldcontainer",
										anchor: "100%",
										fieldLabel: IRm$.r1("L_MID_A_COLOR"),
										layout: {
											type: "hbox",
											align: "stretch"
										},
										items: [
											{
												xtype: "textfield",
												name: "m_mid_a_color",
												width: 120
											},
											{
												xtype: "splitter"
											},
											{
												xtype: "splitbutton",
												width: 30,
												menu: {
													showSeparator: false,
													items: [
														{
															xtype: "colorpicker",
															listeners: {
																select: function(cp, color) {
																	var ctrl = this.down("[name=m_mid_a_color]");
																	ctrl.setValue("#" + color);
																},
																scope: this
															}
														}, 
														"-"
													]
												}
											},
											{
												xtype: "textfield",
												name: "m_rng_val4",
												width: 220,
												labelAlign: "right",
												fieldLabel: "Range"
											},
											{
												xtype: "container",
												flex: 1
											}
										]
									},
									{
										xtype: "fieldcontainer",
										anchor: "100%",
										fieldLabel: IRm$.r1("L_MAX_COLOR"),
										layout: {
											type: "hbox",
											align: "stretch"
										},
										items: [
											{
												xtype: "textfield",
												name: "m_max_color",
												width: 120
											},
											{
												xtype: "splitter"
											},
											{
												xtype: "splitbutton",
												width: 30,
												menu: {
													showSeparator: false,
													items: [
														{
															xtype: "colorpicker",
															listeners: {
																select: function(cp, color) {
																	var ctrl = this.down("[name=m_max_color]");
																	ctrl.setValue("#" + color);
																},
																scope: this
															}
														}, 
														"-"
													]
												}
											},
											{
												xtype: "textfield",
												name: "m_rng_val5",
												width: 220,
												labelAlign: "right",
												fieldLabel: "Range"
											},
											{
												xtype: "container",
												flex: 1
											}
										]
									}
								]
							},
							{
								xtype: "numberfield",
								fieldLabel: IRm$.r1("L_MIN_RADIUS"), // "Min radius",
								name: "m_min",
								minValue: 100,
								maxValue: 1000000
							},
							{
								xtype: "numberfield",
								fieldLabel: IRm$.r1("L_MAX_RADIUS"), // "Max radius",
								name: "m_max",
								minValue: 100,
								maxValue: 10000000
							},
							{
								xtype: "combobox",
								fieldLabel: IRm$.r1("B_LAT"),
								name: "m_lat",
								store: {},
								displayField: "name",
								valueField: "value"
							},
							{
								xtype: "combobox",
								fieldLabel: IRm$.r1("B_LNG"),
								name: "m_lng",
								store: {},
								displayField: "name",
								valueField: "value"
							},
							{
								xtype: "combobox",
								fieldLabel: IRm$.r1("L_GEOFIELD"),
								name: "m_geofield",
								store: {},
								displayField: "name",
								valueField: "value"
							},
							{
								xtype: "textarea",
								popup_editor: true,
								anchor: "100%",
								fieldLabel: IRm$.r1("L_TEMPLATE"), // "Template",
								name: "cdata_m_tmpl" //,
								// hidden: true
							},
							{
								xtype: "textfield",
								name: "m_map_center",
								fieldLabel: IRm$.r1("L_MAP_CENTER_LAT_LNG")
							},
							{
								xtype: "textfield",
								name: "m_map_camera",
								fieldLabel: IRm$.r1("L_MAP_CAMERA")
							},
							{
								xtype: "combobox",
								name: "m_xypos",
								queryMode: "local",
								displayField: "name",
								valueField: "value",
								editable: false,
								autoSelect: true,
								hidden: true,
								fieldLabel: IRm$.r1("L_GEOCODE"), // "GeoCode",
								store: {
									xtype: "store",
									fields: ["name","value" ],
									data: [
										{
											name: "Unknown",
											value: ""
										},
										{
											name: "EPSG:4326",
											value: "EPSG:4326"
										},
										{
											name: "EPSG:3857",
											value: "EPSG:3857"
										} 
									]
								}
							}
						]
					},
					// arc layer selection
					{
						xtype: "fieldset",
						name: "m_arc_options",
						hidden: true,
						layout: {
							type: "vbox",
							align: "stretch"
						},
						items: [
							{
								xtype: "combobox",
								name: "m_arc_basemap",
								queryMode: "local",
								displayField: "name",
								valueField: "value",
								fieldLabel: IRm$.r1("L_BASEMAP"), // "Base Map",
								store: {
									data: [
										{name: "dark-gray", value: "dark-gray"},
										{name: "dark-gray-vector", value: "dark-gray-vector"},
										{name: "gray", value: "gray"},
										{name: "gray-vector", value: "gray-vector"},
										{name: "national-geographic", value: "national-geographic"},
										{name: "oceans", value: "oceans"},
										{name: "osm", value: "osm"},
										{name: "satellite", value: "satellite"},
										{name: "streets", value: "streets"},
										{name: "streets-navigation-vector", value: "streets-navigation-vector"},
										{name: "streets-night-vector", value: "streets-night-vector"},
										{name: "streets-relief-vector", value: "streets-relief-vector"},
										{name: "streets-vector", value: "streets-vector"},
										{name: "terrain", value: "terrrain"},
										{name: "topo", value: "topo"},
										{name: "topo-vector", value: "topo-vector"}
									]
								}	
							},
							/*
							{
								xtype: "textarea",
								popup_editor: true,
								name: "m_map_legend",
								fieldLabel: IRm$.r1("L_CUST_LEGEND"),
								height: 120
							},
							*/
							{
								xtype: "textfield",
								name: "m_map_post_exec",
								fieldLabel: IRm$.r1("L_MAP_POST_EXEC")
							},
							{
								xtype: "checkbox",
								fieldLabel: IRm$.r1("L_MAP_SAVE_POS"),
								boxLabel: IRm$.r1("B_ENABLED"),
								name: "m_map_save_stat"	
							},
							{
								xtype: "checkbox",
								fieldLabel: IRm$.r1("L_MAP_POPUP_HOVER"),
								boxLabel: IRm$.r1("B_ENABLED"),
								name: "m_map_popup_hover"	
							},
							{
								xtype: "gridpanel",
								title: IRm$.r1("L_ARCGIS_LAYERS"), // "ArcGIS MapLayers",
								name: "m_arc_layers",
								height: 300,
								selType: "checkboxmodel",
								selModel: {
									mode: "MULTI"
								},
								store: {
									data: [
									]
								},
								columns: [
									{
										text: IRm$.r1("B_NAME"),
										dataIndex: "name"
									}
								]
							}
						]
					}
				]
			}
		],
		listeners: {
			afterrender: function(p) {
				p.initData.call(p);
			}
		}
	},
	// p2 panel
	// for extra chart extension
	{
		layout: {
			type: "vbox",
			align: "stretch"
		},
		border: 0,
		title: IRm$.r1("L_EXTRA_OPTIONS"), // "Extra Options",
		defaults: {
			anchor: "100%"
		},
		
		autoScroll: true,
		
		initData: function() {
			var me = this, 
				ma = me.__main__,
				option = (ma.sheetoption && ma.sheetoption.model ? ma.sheetoption.model.chart_option : null),
				settings;

			if (option) {
				settings = option.settings = option.settings || {};
				
				if (ig$.svg_renderers)
				{
					var dp = [{name: IRm$.r1("B_SELECT"), value: ""}],
						renderers = ig$.svg_renderers.split("\n");
					
					$.each(renderers, function(i, r) {
						var p = r.split(",");
						if (p.length > 1)
						{
							dp.push({name: p[0], value: p[1]});
						}
					});
					
					me.down("[name=m_svgtype]").store.loadData(dp);
				}
				
				me.down("[name=m_svgtype]").setValue(settings.m_svgtype || "");
				me.down("[name=m_wc_min]").setValue(settings.m_wc_min || 8);
				me.down("[name=m_wc_max]").setValue(settings.m_wc_max || 32);
				me.down("[name=m_svg_min_color]").setValue(settings.m_svg_min_color || "#ffff51");
				me.down("[name=m_svg_max_color]").setValue(settings.m_svg_max_color || "#ff0000");
				me.down("[name=m_svg_nodata_color]").setValue(settings.m_svg_nodata_color || "#FFFFFF");
				me.down("[name=m_svg_line_color]").setValue(settings.m_svg_line_color || "#000000");
				me.down("[name=m_svg_line_width]").setValue(Number(settings.m_svg_line_width || "2"));
				me.down("[name=m_svg_font_color]").setValue(settings.m_svg_font_color || "#ff0000");
				me.down("[name=m_svg_font_size]").setValue(Number(settings.m_svg_font_size || "20"));
				me.down("[name=m_svg_label_option]").setValue(IG$._decodeVal(settings.m_svg_label_option));
				
				me.down("[name=m_h_min]").setValue(Number(settings.m_h_min || "3"));
				me.down("[name=m_h_max]").setValue(Number(settings.m_h_max || "15"));
				me.down("[name=m_h_gravity]").setValue(Number(settings.m_h_gravity || "0.2"));
				me.down("[name=m_h_repulsion]").setValue(Number(settings.m_h_repulsion || "20"));
				me.down("[name=m_h_edgelength]").setValue(Number(settings.m_h_edgelength || "5"));
				me.down("[name=m_h_ratio]").setValue(Number(settings.m_h_ratio || "50"));
				me.down("[name=m_h_end_symbol]").setValue(settings.m_h_end_symbol || "arrow");
				
				me.down("[name=m_html_basestyle]").setValue(settings.m_html_basestyle);
				
				me.down("[name=m_iv_bgimg]").setValue(settings.m_iv_bgimg);
				me.down("[name=m_iv_data]").setValue(settings.m_iv_data);
				me.down("[name=m_iv_type]").setValue(settings.m_iv_type);
				
				me.down("[name=m_run_target]").setValue(settings.m_run_target);
				me.down("[name=m_run_ucl]").setValue(settings.m_run_ucl);
				me.down("[name=m_run_lcl]").setValue(settings.m_run_lcl);
				me.down("[name=diverging_show_both]").setValue(settings.diverging_show_both == "T");
				me.down("[name=diverging_all_label]").setValue(settings.diverging_all_label == "T");
				
				if (!settings.m_rngclr_0 && !settings.m_rngclr_1 && !settings.m_rngclr_2 && !settings.m_rngclr_3 && !settings.m_rngclr_4)
				{
					settings.m_rngclr_0 = "#bf444c";
					settings.m_rngclr_2 = "#d88273";
					settings.m_rngclr_4 = "#f6efa6";
				}
				
				me.down("[name=m_color_range]").setAllValues(settings);
				
				var barr = ma.sheetoption.model.rows.concat(ma.sheetoption.model.measures);
				
				$.each(["m_h_axis_categ", "m_h_axis_src", "m_h_axis_tgt", "m_h_axis_srcdt", "m_h_axis_tgtdt", "m_h_axis_cmt"], function(i, k) {
					var dp = [{name: "Select Value", uid: ""}],
						i, bf = 0,
						ctrl = me.down("[name=" + k + "]");
					
					for (i=0; i < barr.length; i++)
					{
						dp.push({
							uid: barr[i].uid,
							name: barr[i].name
						});
					}
					
					ctrl.store.loadData(dp);
					ctrl.setValue(settings[k] || "");
				});

				me.down("[name=m_chart_designer]").setAllValues(settings);
			}
		},

		updateOptionValues: function() {
			var me = this, 
				ma = me.__main__,
				option = (ma.sheetoption && ma.sheetoption.model ? ma.sheetoption.model.chart_option : null),
				settings;

			if (option) {
				settings = option.settings = option.settings || {};
				
				settings.m_svgtype = me.down("[name=m_svgtype]").getValue();
				settings.m_wc_min = me.down("[name=m_wc_min]").getValue();
				settings.m_wc_max = me.down("[name=m_wc_max]").getValue();
				settings.m_svg_min_color = me.down("[name=m_svg_min_color]").getValue();
				settings.m_svg_max_color = me.down("[name=m_svg_max_color]").getValue();
				settings.m_svg_nodata_color = me.down("[name=m_svg_nodata_color]").getValue();
				settings.m_svg_line_color = me.down("[name=m_svg_line_color]").getValue();
				settings.m_svg_line_width = "" + me.down("[name=m_svg_line_width]").getValue();
				settings.m_svg_font_color = me.down("[name=m_svg_font_color]").getValue();
				settings.m_svg_font_size = "" + me.down("[name=m_svg_font_size]").getValue();
				delete option["m_svg_label_option"];
				settings.m_svg_label_option = IG$._encodeVal(me.down("[name=m_svg_label_option]").getValue());
				
				settings.m_h_min = "" + me.down("[name=m_h_min]").getValue();
				settings.m_h_max = "" + me.down("[name=m_h_max]").getValue();
				
				settings.m_h_gravity = "" + me.down("[name=m_h_gravity]").getValue();
				settings.m_h_repulsion = "" + me.down("[name=m_h_repulsion]").getValue();
				settings.m_h_edgelength = "" + me.down("[name=m_h_edgelength]").getValue();
				settings.m_h_ratio = "" + me.down("[name=m_h_ratio]").getValue();
				settings.m_h_end_symbol = me.down("[name=m_h_end_symbol]").getValue();
				
				settings.m_html_basestyle = me.down("[name=m_html_basestyle]").setValue();
				
				settings.m_iv_bgimg = me.down("[name=m_iv_bgimg]").getValue();
				settings.m_iv_data = me.down("[name=m_iv_data]").getValue();
				settings.m_iv_type = me.down("[name=m_iv_type]").getValue();
				
				settings.m_run_target = me.down("[name=m_run_target]").getValue();
				settings.m_run_ucl = me.down("[name=m_run_ucl]").getValue();
				settings.m_run_lcl = me.down("[name=m_run_lcl]").getValue();
				settings.diverging_show_both = me.down("[name=diverging_show_both]").getValue() ? "T" : "F";
				settings.diverging_all_label = me.down("[name=diverging_all_label]").getValue() ? "T" : "F";
				
				me.down("[name=m_color_range]").getAllValues(settings);
				
				$.each(["m_h_axis_categ", "m_h_axis_src", "m_h_axis_tgt", "m_h_axis_srcdt", "m_h_axis_tgtdt", "m_h_axis_cmt"], function(i, k) {
					var ctrl = me.down("[name=" + k + "]");
					settings[k] = ctrl.getValue();
				});

				me.down("[name=m_chart_designer]").getAllValues(settings);
			}
		},
		invalidateFields: function(opt) {
			var me = this, subtype = opt.subtype;
			
			me.down("[name=pb02]").setVisible(subtype == "kpi");
			me.down("[name=pb03]").setVisible(subtype == "svgmap");
			me.down("[name=m_wc_opt]").setVisible(subtype == "wordcloud");
			me.down("[name=m_hier_options]").setVisible(subtype == "hierarchialgraph");
			me.down("[name=pbrunchart]").setVisible(subtype == "runchart");
			me.down("[name=m_imgviewer_options]").setVisible(subtype == "imgviewer");
			me.down("[name=m_html_options]").setVisible(subtype == "htmltable" || subtype == "html_ranktable");
			me.down("[name=m_color_range]").setVisible(subtype == "weekday");
			me.down("[name=diverging_column]").setVisible(subtype == "diverging_column");
		},
		items: [
			{
				xtype: "fieldset",
				title: IRm$.r1("L_KPI_INDI"), // "KPI Indicator",
				layout: "anchor",
				hidden: true,
				name: "pb02",
				items: [ 
					{
						xtype: "button",
						text: IRm$.r1("L_INDICATOR_WIZARD"),
						handler: function() {
							var me = this,
								ma = me.__main__,
								chartoption = (ma.sheetoption && ma.sheetoption.model ? ma.sheetoption.model.chart_option : null)
								
							if (!window.IG$.kpi_1/* dlg_vindicator */)
							{
								var me = this, 
									js = [ (ig$.datafolder || "./") + "custom/custom.kpi.worker.js" ], 
									ltest = 0; 
								
								var cindopt = chartoption.cindicator ? JSON.parse(IG$._decodeVal(chartoption.cindicator)) : {};
	
								IG$.getScriptCache(js,
									new IG$.callBackObj(me,
										function() {
											var dlg = new IG$.kpi_1/* dlg_vindicator */(
													{
														instance: me.instance,
														cop: chartoption,
														cindicator: cindopt
													});
											IG$.showDlg(me, dlg);
										}
									)
								);
							}
							else
							{
								var cindopt = chartoption.cindicator ? JSON.parse(IG$._decodeVal(chartoption.cindicator)) : {};
								var dlg = new IG$.kpi_1/* dlg_vindicator */(
									{
										instance: me.instance,
										cop: chartoption,
										cindicator: cindopt
									});
								IG$.showDlg(me, dlg);
							}
							
						},
						scope: this
					} 
				]
			},
			{
				xtype: "fieldset",
				title: "Process",
				layout: "anchor",
				hidden: true,
				name: "pbrunchart",
				items: [
					{
						xtype: "textfield",
						fieldLabel: "Target Value",
						name: "m_run_target"
					},
					{
						xtype: "textfield",
						fieldLabel: "Upper Spec Limit",
						name: "m_run_ucl"
					},
					{
						xtype: "textfield",
						fieldLabel: "Lower Spec Limit",
						name: "m_run_lcl"
					}
				]
			},
			{
				xtype: "fieldset",
				title: IRm$.r1("L_SVG_DRAW_OPTIONS"),
				layout: "anchor",
				hidden: true,
				name: "pb03",
				items: [
					{
						xtype: "combobox",
						fieldLabel: IRm$.r1("L_SVG_TYPE"), // "Field Column",
						name: "m_svgtype",
						queryMode: "local",
						valueField: "value",
						displayField: "name",
						editable: false,
						store: {
							xtype: "store",
							fields: [ "name", "value" ]
						}
					},
					{
						xtype: "fieldcontainer",
						anchor: "100%",
						fieldLabel: IRm$.r1("L_MIN_COLOR"),
						layout: {
							type: "hbox",
							align: "stretch"
						},
						items: [
							{
								xtype: "textfield",
								name: "m_svg_min_color",
								width: 120
							},
							{
								xtype: "splitter"
							},
							{
								xtype: "splitbutton",
								width: 30,
								menu: {
									showSeparator: false,
									items: [
										{
											xtype: "colorpicker",
											listeners: {
												select: function(cp, color) {
													var ctrl = this.down("[name=m_svg_min_color]");
													ctrl.setValue("#" + color);
												},
												scope: this
											}
										}, 
										"-"
									]
								}
							},
							
							{
								xtype: "container",
								flex: 1
							}
						]
					},
					
					{
						xtype: "fieldcontainer",
						anchor: "100%",
						fieldLabel: IRm$.r1("L_MAX_COLOR"),
						layout: {
							type: "hbox",
							align: "stretch"
						},
						items: [
							{
								xtype: "textfield",
								name: "m_svg_max_color",
								width: 120
							},
							{
								xtype: "splitter"
							},
							{
								xtype: "splitbutton",
								width: 30,
								menu: {
									showSeparator: false,
									items: [
										{
											xtype: "colorpicker",
											listeners: {
												select: function(cp, color) {
													var ctrl = this.down("[name=m_svg_max_color]");
													ctrl.setValue("#" + color);
												},
												scope: this
											}
										}, 
										"-"
									]
								}
							},
							{
								xtype: "container",
								flex: 1
							}
						]
					},
					
					{
						xtype: "fieldcontainer",
						anchor: "100%",
						fieldLabel: IRm$.r1("L_NODATA_COLOR"),
						layout: {
							type: "hbox",
							align: "stretch"
						},
						items: [
							{
								xtype: "textfield",
								name: "m_svg_nodata_color",
								width: 120
							},
							{
								xtype: "splitter"
							},
							{
								xtype: "splitbutton",
								width: 30,
								menu: {
									showSeparator: false,
									items: [
										{
											xtype: "colorpicker",
											listeners: {
												select: function(cp, color) {
													var ctrl = this.down("[name=m_svg_nodata_color]");
													ctrl.setValue("#" + color);
												},
												scope: this
											}
										}, 
										"-"
									]
								}
							},
							{
								xtype: "container",
								flex: 1
							}
						]
					},
					
					{
						xtype: "fieldcontainer",
						anchor: "100%",
						fieldLabel: IRm$.r1("L_LINE_COLOR"),
						layout: {
							type: "hbox",
							align: "stretch"
						},
						items: [
							{
								xtype: "textfield",
								name: "m_svg_line_color",
								width: 120
							},
							{
								xtype: "splitter"
							},
							{
								xtype: "splitbutton",
								width: 30,
								menu: {
									showSeparator: false,
									items: [
										{
											xtype: "colorpicker",
											listeners: {
												select: function(cp, color) {
													var ctrl = this.down("[name=m_svg_line_color]");
													ctrl.setValue("#" + color);
												},
												scope: this
											}
										}, 
										"-"
									]
								}
							},
							
							{
								xtype: "container",
								flex: 1
							}
						]
					},
					
					{
						xtype: "numberfield",
						name: "m_svg_line_width",
						fieldLabel: IRm$.r1("L_LINE_WIDTH")
					},
					
					{
						xtype: "fieldcontainer",
						anchor: "100%",
						fieldLabel: IRm$.r1("L_FONT_COLOR"),
						layout: {
							type: "hbox",
							align: "stretch"
						},
						items: [
							{
								xtype: "textfield",
								name: "m_svg_font_color",
								width: 120
							},
							{
								xtype: "splitter"
							},
							{
								xtype: "splitbutton",
								width: 30,
								menu: {
									showSeparator: false,
									items: [
										{
											xtype: "colorpicker",
											listeners: {
												select: function(cp, color) {
													var ctrl = this.down("[name=m_svg_font_color]");
													ctrl.setValue("#" + color);
												},
												scope: this
											}
										}, 
										"-"
									]
								}
							},
							
							{
								xtype: "container",
								flex: 1
							}
						]
					},
					
					{
						xtype: "numberfield",
						name: "m_svg_font_size",
						fieldLabel: IRm$.r1("L_FONTSIZE")
					},
					{
						xtype: "textfield",
						name: "m_svg_label_option",
						fieldLabel: IRm$.r1("L_LABEL_OPTION")
					}
				]
			},
			{
				xtype: "fieldset",
				title: IRm$.r1("L_WC_OPT"),
				name: "m_wc_opt",
				hidden: true,
				layout: "anchor",
				items: [
					{
						xtype: "numberfield",
						name: "m_wc_min",
						fieldLabel: IRm$.r1("L_WC_MIN"),
						minValue: 1,
						maxValue: 10
					},
					{
						xtype: "numberfield",
						name: "m_wc_max",
						fieldLabel: IRm$.r1("L_WC_MAX"),
						minValue: 1,
						maxValue: 10
					}
				]
			},
			{
				xtype: "fieldset",
				title: IRm$.r1("L_TIME_FIELD"), // "Time Field",
				layout: "anchor",
				items: [ 
					{
						xtype: "combobox",
						name: "s_t_f",
						fieldLabel: IRm$.r1("L_FIELD_COLUMN"), // "Field Column",
						queryMode: "local",
						valueField: "uid",
						displayField: "name",
						editable: false,
						store: {
							xtype: "store",
							fields: [ "name", "uid" ]
						}
					}, 
					{
						xtype: "textfield",
						name: "s_t_fo",
						fieldLabel: IRm$.r1("L_DATE_FORMAT") // "Date Format"
					} 
				]
			},
			// imgviewer chart options
			{
				xtype: "fieldset",
				title: "Image Viewer Options",
				name: "m_imgviewer_options",
				hidden: true,
				layout: {
					type: "vbox",
					align: "stretch"
				},
				items: [
					{
						xtype: "textfield",
						name: "m_iv_bgimg",
						fieldLabel: "Background Image"
					},
					{
						xtype: "textfield",
						name: "m_iv_data",
						fieldLabel: "Data Url"
					},
					{
						xtype: "combobox",
						name: "m_iv_type",
						fieldLabel: "Draw Type",
						queryMode: "local",
						displayField: "name",
						valueField: "value",
						editable: false,
						autoSelect: false,
						store: {
							xtype: "store",
							fields: [],
							data: [
								{name: "None", value: ""},
								{name: "Pie Chart", value: "pie"},
								{name: "Bar Chart", value: "bar"}
							]
						}
					}
				]
			},
			// html table options
			{
				xtype: "fieldset",
				title: "HTML Table Options",
				name: "m_html_options",
				hidden: true,
				layout: {
					type: "vbox",
					align: "stretch"
				},
				items: [
					{
						xtype: "textfield",
						name: "m_html_basestyle",
						fieldLabel: "Base CSS Style"
					}
				]
			},
			// for general color range
			{
				xtype: "fieldset",
				title: "Color Range",
				name: "m_color_range",
				hidden: true,
				layout: {
					type: "vbox",
					align: "stretch"
				},
				items: [
					{
						xtype: "fieldcontainer",
						layout: {
							type: "vbox",
							align: "stretch"
						},
						items: [
							{
								xtype: "fieldcontainer",
								anchor: "100%",
								fieldLabel: IRm$.r1("L_MIN_COLOR"),
								layout: {
									type: "hbox",
									align: "stretch"
								},
								items: [
									{
										xtype: "textfield",
										name: "m_rngclr_0",
										width: 120
									},
									{
										xtype: "splitter"
									},
									{
										xtype: "splitbutton",
										width: 30,
										menu: {
											showSeparator: false,
											items: [
												{
													xtype: "colorpicker",
													listeners: {
														select: function(cp, color) {
															var ctrl = this.down("[name=m_rngclr_0]");
															ctrl.setValue("#" + color);
														},
														scope: this
													}
												}, 
												"-"
											]
										}
									},
									{
										xtype: "container",
										flex: 1
									}
								]
							},
							{
								xtype: "fieldcontainer",
								anchor: "100%",
								fieldLabel: IRm$.r1("L_MIN_A_COLOR"),
								layout: {
									type: "hbox",
									align: "stretch"
								},
								items: [
									{
										xtype: "textfield",
										name: "m_rngclr_1",
										width: 120
									},
									{
										xtype: "splitter"
									},
									{
										xtype: "splitbutton",
										width: 30,
										menu: {
											showSeparator: false,
											items: [
												{
													xtype: "colorpicker",
													listeners: {
														select: function(cp, color) {
															var ctrl = this.down("[name=m_rngclr_1]");
															ctrl.setValue("#" + color);
														},
														scope: this
													}
												}, 
												"-"
											]
										}
									},
									{
										xtype: "container",
										flex: 1
									}
								]
							},
							{
								xtype: "fieldcontainer",
								anchor: "100%",
								fieldLabel: IRm$.r1("L_MID_COLOR"),
								layout: {
									type: "hbox",
									align: "stretch"
								},
								items: [
									{
										xtype: "textfield",
										name: "m_rngclr_2",
										width: 120
									},
									{
										xtype: "splitter"
									},
									{
										xtype: "splitbutton",
										width: 30,
										menu: {
											showSeparator: false,
											items: [
												{
													xtype: "colorpicker",
													listeners: {
														select: function(cp, color) {
															var ctrl = this.down("[name=m_rngclr_2]");
															ctrl.setValue("#" + color);
														},
														scope: this
													}
												}, 
												"-"
											]
										}
									},
									{
										xtype: "container",
										flex: 1
									}
								]
							},
							{
								xtype: "fieldcontainer",
								anchor: "100%",
								fieldLabel: IRm$.r1("L_MID_A_COLOR"),
								layout: {
									type: "hbox",
									align: "stretch"
								},
								items: [
									{
										xtype: "textfield",
										name: "m_rngclr_3",
										width: 120
									},
									{
										xtype: "splitter"
									},
									{
										xtype: "splitbutton",
										width: 30,
										menu: {
											showSeparator: false,
											items: [
												{
													xtype: "colorpicker",
													listeners: {
														select: function(cp, color) {
															var ctrl = this.down("[name=m_rngclr_3]");
															ctrl.setValue("#" + color);
														},
														scope: this
													}
												}, 
												"-"
											]
										}
									},
									{
										xtype: "container",
										flex: 1
									}
								]
							},
							{
								xtype: "fieldcontainer",
								anchor: "100%",
								fieldLabel: IRm$.r1("L_MAX_COLOR"),
								layout: {
									type: "hbox",
									align: "stretch"
								},
								items: [
									{
										xtype: "textfield",
										name: "m_rngclr_4",
										width: 120
									},
									{
										xtype: "splitter"
									},
									{
										xtype: "splitbutton",
										width: 30,
										menu: {
											showSeparator: false,
											items: [
												{
													xtype: "colorpicker",
													listeners: {
														select: function(cp, color) {
															var ctrl = this.down("[name=m_rngclr_4]");
															ctrl.setValue("#" + color);
														},
														scope: this
													}
												}, 
												"-"
											]
										}
									},
									{
										xtype: "container",
										flex: 1
									}
								]
							}
						]
					}
				]
			},
			
			// hierarchy chart options
			{
				xtype: "fieldset",
				title: "Hierarchy Options",
				name: "m_hier_options",
				hidden: true,
				layout: {
					type: "vbox",
					align: "stretch"
				},
				items: [
					{
						xtype: "numberfield",
						name: "m_h_min",
						fieldLabel: "Min Symbol",
						value: 3
					},
					{
						xtype: "numberfield",
						name: "m_h_max",
						fieldLabel: "Max Symbol",
						value: 15
					},
					{
						xtype: "numberfield",
						name: "m_h_edgelength",
						fieldLabel: "edgeLength",
						value: 5
					},
					{
						xtype: "numberfield",
						name: "m_h_repulsion",
						fieldLabel: "Repulsion",
						value: 20
					},
					{
						xtype: "numberfield",
						name: "m_h_gravity",
						fieldLabel: "Gravity",
						value: 0.2
					},
					{
						xtype: "numberfield",
						name: "m_h_ratio",
						fieldLabel: "Show Label Above",
						value: 50
					},
					{
						xtype: "combobox",
						fieldLabel: "End Symbol",
						name: "m_h_end_symbol",
						queryMode: "local",
						displayField: "name",
						valueField: "value",
						editable: false,
						autoSelect: false,
						store: {
							xtype: "store",
							fields: [],
							data: [
								{name: "None", value: "none"},
								{name: "Circle", value: "circle"},
								{name: "Arrow", value: "arrow"}
							]
						}
					},
					{
						xtype: "fieldset",
						layout: {
							type: "vbox",
							align: "stretch"
						},
						items: [
							{
								xtype: "combobox",
								fieldLabel: "Source Axis",
								name: "m_h_axis_src",
								queryMode: "local",
								displayField: "name",
								valueField: "uid",
								editable: false,
								autoSelect: false,
								store: {
									xtype: "store",
									fields: []
								}
							},
							{
								xtype: "combobox",
								fieldLabel: "Target Axis",
								name: "m_h_axis_tgt",
								queryMode: "local",
								displayField: "name",
								valueField: "uid",
								editable: false,
								autoSelect: false,
								store: {
									xtype: "store",
									fields: []
								}
							},
							{
								xtype: "combobox",
								fieldLabel: "Category Axis",
								name: "m_h_axis_categ",
								queryMode: "local",
								displayField: "name",
								valueField: "uid",
								editable: false,
								autoSelect: false,
								store: {
									xtype: "store",
									fields: []
								}
							},
							{
								xtype: "combobox",
								fieldLabel: "Comment Axis",
								name: "m_h_axis_cmt",
								queryMode: "local",
								displayField: "name",
								valueField: "uid",
								editable: false,
								autoSelect: false,
								store: {
									xtype: "store",
									fields: []
								}
							},
							{
								xtype: "combobox",
								fieldLabel: "Source Value",
								name: "m_h_axis_srcdt",
								queryMode: "local",
								displayField: "name",
								valueField: "uid",
								editable: false,
								autoSelect: false,
								store: {
									xtype: "store",
									fields: []
								}
							},
							{
								xtype: "combobox",
								fieldLabel: "Target Value",
								name: "m_h_axis_tgtdt",
								queryMode: "local",
								displayField: "name",
								valueField: "uid",
								editable: false,
								autoSelect: false,
								store: {
									xtype: "store",
									fields: []
								}
							}
						]
					}
				]
			},
			{
				xtype: "fieldset",
				title: "Diverging Column",
				name: "diverging_column",
				layout: {
					type: "vbox",
					align: "stretch"
				},
				items: [
					{
						xtype: "checkbox",
						name: "diverging_show_both",
						fieldLabel: "Show X Both Side",
						boxLabel: "Enabled"
					},
					{
						xtype: "checkbox",
						name: "diverging_all_label",
						fieldLabel: "Show All Labels",
						boxLabel: "Enabled"
					}
				]
			},
			{
				xtype: "container",
				name: "m_chart_designer",
				layout: {
					type: "vbox",
					align: "stretch"
				},
				items: []
			}
		],
		listeners: {
			afterrender: function(p) {
				p.initData.call(p);
			}
		}
	}
];
};

IG$.makeCustomChartOption = function(wizard, panel) {
	var cpanels = [];
	
	var update_scope = function(tp, items) {
		var i;
		for (i=0; i < items.length; i++)
		{
			if (items[i]._items)
			{
				update_scope(tp, items[i]._items);
			}
			
			if (items[i].handler)
			{
				items[i].scope = tp;
			}
			
			if (items[i]._listeners && items[i]._listeners.scope && items[i]._listeners.scope.length)
			{
				$.each(items[i]._listeners.scope, function(m, sc) {
					m.scope = tp;
				});
				
				$.each(items[i]._listeners, function(k, ev) {
					if (k != "scope" && ev.length)
					{
						$.each(ev, function(l, mv) {
							if (mv.scope)
							{
								mv.scope = tp;
							}
						});
					}
				});
			}
		}
	}

	var panels = IG$._customChartPanels(); 
	$.each(panels, function(i, coption) {
		coption.instance = wizard.instance;
		var p = $s.create($s.formpanel, coption);
		p.__main__ = wizard;
		p.__mainp__ = panel;
		
		// update scope
		if (p._items)
		{
			update_scope(p, p._items);
		}
		
		panel.add(p);
		cpanels.push(p);
	});
	
	return cpanels;
}