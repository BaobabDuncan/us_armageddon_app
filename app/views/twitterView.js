/**
 * 
 */


app.twitter = Ext.extend(Ext.Panel, {
	id : 'twitter',
	fullscreen : true,
	layout : 'card',	
	
	initComponent : function() {
		console.log("===twitter initComponent===");		
		var me = this;
		this.evidenceList = new Ext.List({
			itemTpl : '{main_title}',
			store : evidenceStore,
			onItemDisclosure: function (record,btn,index) 
			{
				console.log('onItemDisclosure');
				var childCard = new app.twitterDetail({					
					prevCard : me,
					groundsDetailStore : record
				});		
				app.views.viewport.add(childCard);
				app.views.viewport.setActiveItem(childCard,{type: 'slide', direction: 'left'});				
			}
		});
		this.mainPanel = new Ext.Panel({
			layout : 'fit',
			dockedItems : [ {
				xtype : 'toolbar',
				title : 'Twitter'		
			}/*,{
				html : 'This is Evidence'
			}*/],
			items : [this.evidenceList]
		});
		this.items = [this.mainPanel];
		
		this.mainPanel.on('afterrender', this.loadMainPanel, this);
		app.twitter.superclass.initComponent.apply(this, arguments);		
	},
	loadMainPanel : function() {
		console.log("===twitter loadMainPanel===");		
		var me = this;
		me.refleshTab();
	},
	refleshTab : function(){
		
	}
	
});
Ext.reg('twitter_view', app.twitter);



app.twitterDetail = Ext.extend(Ext.Panel,{
	id : 'twitterDetail',
	layout : 'card',
	groundsDetailStore : null,
	prevCard : null,
	initComponent : function() {
		console.log("===twitterDetail initComponent===");	
		var me = this;		
		this.mainPanel = new Ext.Panel({
			layout : 'fit',
			dockedItems : [ {
				xtype : 'toolbar',
				title : 'TWITTER',
				items : [ {
					ui : 'back',
					text : 'Back',
					scope : this,
					handler : function() {						
						app.views.viewport.setActiveItem(app.views.tabbarView,{type: 'slide', direction: 'right'});
						app.views.viewport.remove(me);
						me.destroy();							
					}
				}, {
					xtype : 'spacer'
				}]
			}]		
		});
		this.items = [this.mainPanel];
		
		this.mainPanel.on('afterrender', this.loadMainPanel, this);
		app.twitterDetail.superclass.initComponent.apply(this, arguments); //1.저녁미사->기사보기 
	},
	loadMainPanel : function() {
		console.log("===twitterDetail loadMainPanel===");				
	}
	
});



