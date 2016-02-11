app.dDay = Ext.extend(Ext.Panel, {
	id : 'dDay',
	fullscreen : true,
	layout : 'card',	
	
	
	initComponent : function() {
		console.log("===dDay initComponent===");		
		
		this.countPanel = new Ext.Panel({
			cls : "dDay-body",
			html : '<div class="d_day"><p class="title">Time remaining until the destruction of the world</p>'+
			'<div id="container"><p id="time" class="time"></p></div></div>'
		});
		
		this.mainPanel = new Ext.Panel({
			layout : 'fit',
			dockedItems : [ {
				xtype : 'toolbar',
				title : 'Armageddon'		
			}],
			items : [this.countPanel]
		});
		this.items = [this.mainPanel];
		
		this.mainPanel.on('afterrender', this.loadMainPanel, this);
		app.dDay.superclass.initComponent.apply(this, arguments);		
	},
	loadMainPanel : function() {
		console.log("===dDay loadMainPanel===");	
		var me = this;
		me.refleshTab();
		
	},
	refleshTab : function(){
		setTimeout(function() {					
			$("#time").countdown({
				//date: "december 21, 2012 00:00",
				//date: "January 16, 2012 21:35",
				date : TARGET_DAY_DATE,
				onChange: function( event, timer ){		
				},
				onComplete: function( event ){			
					$(this).html('Congratulations!!<br> We survived');
				},
				leadingZero: true
			});
		}, 1);
	}
	
});
Ext.reg('d_day_view', app.dDay);

