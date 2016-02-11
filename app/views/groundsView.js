app.grounds = Ext.extend(Ext.Panel, {
	id : 'grounds',
	fullscreen : true,
	layout : 'card',	
	
	initComponent : function() {
		console.log("===grounds initComponent===");		
		var me = this;
		this.evidenceList = new Ext.List({
			itemTpl : '{main_title}',
			store : evidenceStore,
			onItemDisclosure: function (record,btn,index) 
			{
				console.log('onItemDisclosure');
				var childCard = new app.groundsDetail({					
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
				title : 'Evidence'		
			}/*,{
				html : 'This is Evidence'
			}*/],
			items : [this.evidenceList]
		});
		this.items = [this.mainPanel];
		
		this.mainPanel.on('afterrender', this.loadMainPanel, this);
		app.grounds.superclass.initComponent.apply(this, arguments);		
	},
	loadMainPanel : function() {
		console.log("===grounds loadMainPanel===");		
		var me = this;
		me.refleshTab();
	},
	refleshTab : function(){
		
	}
	
});
Ext.reg('grounds_view', app.grounds);

app.groundsDetail = Ext.extend(Ext.Panel,{
	id : 'groundsDetail',
	layout : 'card',
	groundsDetailStore : null,
	prevCard : null,
	initComponent : function() {
		console.log("===groundsDetail initComponent===");	
		var me = this;
		
		this.groundInfo = new Ext.Panel({	
		
			scroll: 'vertical',
			tpl : new Ext.XTemplate('<div id="result"><p class="title">{title}</p>',
				'<p class="image"><img src="{image_url}" /></p>',
				'<p class="description">{description}</p></div></div>')	
			
		});
		
		this.btnPanel = new Ext.Panel({
			items : [{
				xtype : 'button',
                ui  : 'round',
                text: 'SEND',
                /*style: {	        
                	marginTop: '10px',
                    marginLeft: '20px',
                    marginRight: '20px'
                },*/
                handler : function() {
					console.log("Post handler");		
					console.log(Ext.getCmp('comment').getValue().length);
					/*
					if (Ext.getCmp('comment').getValue().length < 1){
						return false;
					}
					me.sendPostMessage(Ext.getCmp('comment').getValue());
					*/
				}
            }]
		});
		
		this.mainPanel = new Ext.Panel({
			layout : 'fit',
			dockedItems : [ {
				xtype : 'toolbar',
				title : me.groundsDetailStore.data.main_title,
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
			}],
			
			items : [this.groundInfo]
		});
		this.items = [this.mainPanel];
		
		this.mainPanel.on('afterrender', this.loadMainPanel, this);
		app.groundsDetail.superclass.initComponent.apply(this, arguments); //1.저녁미사->기사보기 
	},
	loadMainPanel : function() {
		console.log("===groundsDetail loadMainPanel===");		
		var me = this;
		console.log(me.groundsDetailStore);
		me.groundInfo.update(me.groundsDetailStore.data);  //기사보기
	}
	
});
