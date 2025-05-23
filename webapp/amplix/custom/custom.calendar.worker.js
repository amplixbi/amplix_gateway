﻿var MONTH_NAMES=new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
var DAY_NAMES=new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sun','Mon','Tue','Wed','Thu','Fri','Sat');

function LZ(x) {return(x<0||x>9?"":"0")+x}

function isDate(val,format) {
	var date=getDateFromFormat(val,format);
	if (date==0) { return false; }
	return true;
}

function compareDates(date1,dateformat1,date2,dateformat2) {
	var d1=getDateFromFormat(date1,dateformat1);
	var d2=getDateFromFormat(date2,dateformat2);
	if (d1==0 || d2==0) {
		return -1;
		}
	else if (d1 > d2) {
		return 1;
		}
	return 0;
}
	
function _isInteger(val) {
	var digits="1234567890";
	for (var i=0; i < val.length; i++) {
		if (digits.indexOf(val.charAt(i))==-1) { return false; }
		}
	return true;
}
function _getInt(str,i,minlength,maxlength) {
	for (var x=maxlength; x>=minlength; x--) {
		var token=str.substring(i,i+x);
		if (token.length < minlength) { return null; }
		if (_isInteger(token)) { return token; }
		}
	return null;
}
	

function getDateFromFormat(val,format) {
	val=val+"";
	format=format+"";
	var i_val=0;
	var i_format=0;
	var c="";
	var token="";
	var token2="";
	var x,y;
	var now=new Date();
	var year=now.getYear();
	var month=now.getMonth()+1;
	var date=1;
	var hh=now.getHours();
	var mm=now.getMinutes();
	var ss=now.getSeconds();
	var ampm="";
	
	while (i_format < format.length) {
		// Get next token from format string
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		// Extract contents of value based on format token
		if (token=="yyyy" || token=="yy" || token=="y") {
			if (token=="yyyy") { x=4;y=4; }
			if (token=="yy")   { x=2;y=2; }
			if (token=="y")	{ x=2;y=4; }
			year=_getInt(val,i_val,x,y);
			if (year==null) { return 0; }
			i_val += year.length;
			if (year.length==2) {
				if (year > 70) { year=1900+(year-0); }
				else { year=2000+(year-0); }
				}
			}
		else if (token=="MMM"||token=="NNN"){
			month=0;
			for (var i=0; i<MONTH_NAMES.length; i++) {
				var month_name=MONTH_NAMES[i];
				if (val.substring(i_val,i_val+month_name.length).toLowerCase()==month_name.toLowerCase()) {
					if (token=="MMM"||(token=="NNN"&&i>11)) {
						month=i+1;
						if (month>12) { month -= 12; }
						i_val += month_name.length;
						break;
						}
					}
				}
			if ((month < 1)||(month>12)){return 0;}
			}
		else if (token=="EE"||token=="E"){
			for (var i=0; i<DAY_NAMES.length; i++) {
				var day_name=DAY_NAMES[i];
				if (val.substring(i_val,i_val+day_name.length).toLowerCase()==day_name.toLowerCase()) {
					i_val += day_name.length;
					break;
					}
				}
			}
		else if (token=="MM"||token=="M") {
			month=_getInt(val,i_val,token.length,2);
			if(month==null||(month<1)||(month>12)){return 0;}
			i_val+=month.length;}
		else if (token=="dd"||token=="d") {
			date=_getInt(val,i_val,token.length,2);
			if(date==null||(date<1)||(date>31)){return 0;}
			i_val+=date.length;}
		else if (token=="hh"||token=="h") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>12)){return 0;}
			i_val+=hh.length;}
		else if (token=="HH"||token=="H") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>23)){return 0;}
			i_val+=hh.length;}
		else if (token=="KK"||token=="K") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>11)){return 0;}
			i_val+=hh.length;}
		else if (token=="kk"||token=="k") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>24)){return 0;}
			i_val+=hh.length;hh--;}
		else if (token=="mm"||token=="m") {
			mm=_getInt(val,i_val,token.length,2);
			if(mm==null||(mm<0)||(mm>59)){return 0;}
			i_val+=mm.length;}
		else if (token=="ss"||token=="s") {
			ss=_getInt(val,i_val,token.length,2);
			if(ss==null||(ss<0)||(ss>59)){return 0;}
			i_val+=ss.length;}
		else if (token=="a") {
			if (val.substring(i_val,i_val+2).toLowerCase()=="am") {ampm="AM";}
			else if (val.substring(i_val,i_val+2).toLowerCase()=="pm") {ampm="PM";}
			else {return 0;}
			i_val+=2;}
		else {
			if (val.substring(i_val,i_val+token.length)!=token) {return 0;}
			else {i_val+=token.length;}
			}
		}
	// If there are any trailing characters left in the value, it doesn't match
	if (i_val != val.length) { return 0; }
	// Is date valid for month?
	if (month==2) {
		// Check for leap year
		if ( ( (year%4==0)&&(year%100 != 0) ) || (year%400==0) ) { // leap year
			if (date > 29){ return 0; }
			}
		else { if (date > 28) { return 0; } }
		}
	if ((month==4)||(month==6)||(month==9)||(month==11)) {
		if (date > 30) { return 0; }
		}
	// Correct hours value
	if (hh<12 && ampm=="PM") { hh=hh-0+12; }
	else if (hh>11 && ampm=="AM") { hh-=12; }
	var newdate=new Date(year,month-1,date,hh,mm,ss);
	return newdate; // .getTime();
	}

// ------------------------------------------------------------------
// parseDate( date_string [, prefer_euro_format] )
//
// This function takes a date string and tries to match it to a
// number of possible date formats to get the value. It will try to
// match against the following international formats, in this order:
// y-M-d   MMM d, y   MMM d,y   y-MMM-d   d-MMM-y  MMM d
// M/d/y   M-d-y	  M.d.y	 MMM-d	 M/d	  M-d
// d/M/y   d-M-y	  d.M.y	 d-MMM	 d/M	  d-M
// A second argument may be passed to instruct the method to search
// for formats like d/M/y (european format) before M/d/y (American).
// Returns a Date object or null if no patterns match.
// ------------------------------------------------------------------
function parseDate(val) {
	var preferEuro=(arguments.length==2)?arguments[1]:false;
	generalFormats=new Array('y-M-d','MMM d, y','MMM d,y','y-MMM-d','d-MMM-y','MMM d');
	monthFirst=new Array('M/d/y','M-d-y','M.d.y','MMM-d','M/d','M-d');
	dateFirst =new Array('d/M/y','d-M-y','d.M.y','d-MMM','d/M','d-M');
	var checkList=new Array('generalFormats',preferEuro?'dateFirst':'monthFirst',preferEuro?'monthFirst':'dateFirst');
	var d=null;
	for (var i=0; i<checkList.length; i++) {
		var l=window[checkList[i]];
		for (var j=0; j<l.length; j++) {
			d=getDateFromFormat(val,l[j]);
			if (d!=0) { return new Date(d); }
			}
		}
	return null;
	}


IG$.cVis.calendar.prototype.draw = function(results) {
	var me = this,
		chartview = me.chartview,
		container = $(chartview.container),
		sop = chartview._ILb,
		cop = chartview.cop,
		usedualaxis = cop.usedualaxis,
		dualaxisitem = cop.dualaxisitem;
	
	me.container = container;
	
	container.empty();
	
	if (results)
	{
		var colfix,
			rowfix,
			rows,
			cols,
			i, j, k,
			tw = IG$.j$ext._w(container),
			th = IG$.j$ext._h(container),
			px = 0, py = 0, pw,
			gtype,
			series = {
				type: "heatmap",
				coordinateSystem: "calendar",
				calendarIndex: 0,
				yAxisIndex: 0,
				data: []
			},
			data,
			dtcol = 0, dt,
			dr,
			df,
			dv,
			v, y, m, d, h, mm, ss;
		
		cols = results.colcnt;
		data = results._tabledata;
		rows = data.length;
		colfix = results.colfix;
		rowfix = results.rowfix;
		
		container.empty();
		me.dataIndex = 0;
		me.results = results;

		var houter = $("<div></div>")
			.css({
				position: "relative",
				width: "100%",
				height: "100%",
				padding: 0,
				margin: 0
			})
			.appendTo(container);

		var copt = {
			chart: {
				renderTo: houter[0]
			},
			tooltip: {
				position: 'top',
				formatter: function (p) {
					var format = echarts.format.formatTime('yyyy-MM-dd', p.data.value[0]);
					return format + ': ' + (p.data.label || "-");
				}
			},
			visualMap: {
				// type: "piecewise",
				calculable: true,
				orient: "horizontal",
				left: "center",
				top: 35,
				textStyle: {
					color: "#000"
				}
			},
			
			calendar: {
				top: 120,
				left: 30,
				right: 30,
				cellSize: ["auto", 13],
				itemStyle: {
					borderWidth: 0.5
				},
				yearLabel: {
					show: true
				},
				range: []
			}
		}, vmin, vmax, cmax, cmin;
		
		if (cop.s_t_f)
		{
			for (i=0; i < sop.rows.length; i++)
			{
				if (sop.rows[i].uid == cop.s_t_f)
				{
					dtcol = i;
					break;
				}
			}
		}
		
		df = cop.s_t_fo || "epoch";
		
		for (i=0; i < series.length; i++)
		{
			if (cop.renderas && cop.renderas.length > i && cop.renderas[i] != null && cop.renderas[i] != "")
			{
				series[i].type = IG$.getSeriesType(cop.renderas[i]);
			}
		}

		for (i=0; i < rowfix; i++)
		{
			series.name = (i == 0 ? data[i][colfix].text : series.name + " " + data[i][colfix].text);
		}
		
		for (i=rowfix; i < rows; i++)
		{
			dt = data[i][dtcol].code || data[i][dtcol].text;
			if (!dt)
				continue;
				
			if (df == "epoch")
			{
				dv = Number(dt);
				if (isNaN(dv))
					continue;
				dt = new Date(dv);
			}
			else if (df)
			{
				dt = getDateFromFormat(dt, df);
			}
			else
			{
				if (dt.length == 8)
				{
					y = dt.substring(0, 4);
					m = dt.substring(4, 6);
					d = dt.substring(6, 8);
					dt = new Date(y, m, d).getTime();
				}
				else if (dt.length > 11)
				{
					y = dt.substring(0, 4);
					m = dt.substring(4, 6);
					d = dt.substring(6, 8);
					h = dt.substring(8, 10);
					mm = dt.substring(10, 12);
					ss = 0;
					if (dt.length > 13)
					{
						ss = dt.substring(12, 14);
					}
					dt = new Date(y, m, d, h, mm, ss).getTime();
				}
			}

			if (dt)
			{
				if (!cmin)
				{
					cmin = dt;
					cmax = dt;
				}
				else
				{
					if (cmin.getTime() > dt.getTime())
					{
						cmin = dt;
					}
					
					if (cmax.getTime() < dt.getTime())
					{
						cmax = dt;
					}
				}

				dr = {
					value: [dt]
				};
				v = 0;
				if (data[i][colfix])
				{
					v = data[i][colfix].code;
					v = Number(v);
					if (isNaN(v))
					{
						v = 0;
					}
					
					dr.label = data[i][colfix].text;
					dr.drname = data[i][dtcol].text || data[i][dtcol].code;
				}
				
				if (isNaN(vmin))
				{
					vmin = vmax = v;
				}
				else
				{
					vmin = Math.min(vmin, v);
					vmax = Math.max(vmax, v);
				}
				
				dr.value.push(v);
				// dr.push("TTTT");
				// dr.push("TTTT");
				// dr.push({disp: data[i][colfix].text});
				
				series.data.push(dr);
			}
		}
		
		if (cop.title)
		{
			copt.title = {
				top: 30,
				left: "center",
				text: cop.title
			};
		}
		
		copt.series = series;
		copt.visualMap.min = vmin;
		copt.visualMap.max = vmax;
		copt.calendar.range = [];
		
		if (cmin.getFullYear() < cmax.getFullYear())
		{
			var vtop = copt.calendar.top,
				smap = {},
				k;
			copt.series = [];
			copt.calendar = [];

			for (i=cmax.getFullYear(); i >= cmin.getFullYear(); i--)
			{
				k = "" + i;
				copt.calendar.push({
					range: k,
					cellSize: ['auto', 20],
					top: vtop,
					right: 10
				});
				vtop += 220;
				var serie = {
					type: "heatmap",
					coordinateSystem: "calendar",
					calendarIndex: cmax.getFullYear() - i,
					yAxisIndex: 0,
					data: []
				};
				smap[k] = serie;
				copt.series.push(serie);
			}

			for (i=0; i < series.data.length; i++)
			{
				if (series.data[i].value[0].getFullYear)
				{
					var fyear = "" + series.data[i].value[0].getFullYear();
					if (smap[fyear])
					{
						smap[fyear].data.push(series.data[i]);
					}
				}
			}

			houter.height(vtop);
			container.css({
				overflowX: "hidden",
				overflowY: "auto"
			});
		}
		else 
		{
			copt.calendar.range = [("" + cmin.getFullYear()) + "-01-01", ("" + cmax.getFullYear()) + "-12-31"];
		}
		// copt.calendar.range = [cmin, cmax];

		var hchart = echarts.init(copt.chart.renderTo, cop.echart_theme || ig$.echarts_theme || 'amplix', {
				renderer: "svg"
			});

		me.hchart = hchart;
		
		hchart.setOption(copt);
		
		hchart.on("pieselectchanged", function(params) {
			
		});
		
		hchart.on("click", function(params) {
			if (params.componentType == "series")
			{
				chartview.procClickEvent(
					{
						series: {
							name: params.seriesName,
							type: params.seriesType
						}
					}, 
					{
					point: params.data
					}
				);
			}
		});
		
		hchart.on("brushselected", function(params) {
			
		});
	}
};
	
IG$.cVis.calendar.prototype.updatedisplay = function(w, h) {
	var me = this,
		hchart = me.hchart;

	if (hchart)
	{
		// hchart.resize({width: w, height: h});
	}
};

IG$.cVis.calendar.prototype.dispose = function() {
	var me = this,
		hchart = me.hchart;

	if (hchart)
	{
		hchart.dispose();
	}

	me.container && me.container.empty();
};
