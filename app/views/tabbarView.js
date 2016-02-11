app.views.TabbarView = Ext.extend(Ext.TabPanel, {
    
	id        : 'TabbarView',    
	layout    : 'card',    
	fullscreen: true,
    
    tabBar : {
		ui : 'dark',
		dock : 'bottom',
		layout : {
			pack : 'center'
		}
	},
	
	cardSwitchAnimation : false,    
	
    items : [{
		title : 'D-Day',		
		cls : 'card0',
		iconCls: 'time',
		xtype : 'd_day_view',
		viewType : 0
	},{
		title : 'Board',		
		cls : 'card1',
		iconCls: 'compose',	
		xtype : 'board_view',
		viewType : 1
	},{
		title : 'Evidence',
		cls : 'card3',
		iconCls: 'bookmarks',
		xtype : 'grounds_view',
		viewType : 3
	},{
		title : 'Setting',
		cls : 'card4',
		iconCls: 'settings',
		xtype : 'setting_view',
		viewType : 4
	}],
    
    initComponent: function() {
    	console.log('armageddon.TabbarView');
    	this.on('cardswitch', this.handleCardSwitch, this);
    	app.views.TabbarView.superclass.initComponent.apply(this, arguments);
    },
    
    handleCardSwitch : function(container, newCard, oldCard, index, animated) {	
		console.log('tab changed ' + index);	
		newCard.refleshTab();
	}
});


