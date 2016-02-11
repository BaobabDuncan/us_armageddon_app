app.board = Ext.extend(Ext.Panel, {
	id : 'board',
	fullscreen : true,
	layout : 'card',	
	
	initComponent : function() {
		console.log("===board initComponent===");	
		var me = this;
		this.boardList = new Ext.List({
			store : Ext.getStore('boardStore'),	
			activeCls: 'board-item-active',
			id : 'boardList',
			itemTpl: new Ext.XTemplate('<div class="board-item"><p>{name}<span class="created">{update_at}</sapn></p>',
			'<p class="message">{message}</p></div>'),
			plugins : [ {
				ptype : 'listpaging',
				autoPaging : false
			}]
		});
		this.mainPanel = new Ext.Panel({
			layout : 'fit',
			dockedItems : [{
				xtype : 'toolbar',
				title : 'Board',
				items : [{
					xtype : 'spacer'
				},{					
					ui : 'action',
					text : 'Post',
					id : 'post_btn',
					handler : function() {
						console.log("Post handler");						
						var childCard = new app.writeBoard({					
							prevCard : me
						});		
						app.views.viewport.add(childCard);
						app.views.viewport.setActiveItem(childCard,{type: 'slide', direction: 'down'});		
					}
				}]
			}],
			items : [this.boardList]
		});
		this.items = [this.mainPanel];
		
		this.mainPanel.on('afterrender', this.loadMainPanel, this);
		app.board.superclass.initComponent.apply(this, arguments);		
	},
	loadMainPanel : function() {
		console.log("===board loadMainPanel===");	
		var me = this;
		me.refleshTab();
		
	},
	refleshTab : function() {
		console.log("===board refleshTab===");
		var me = this;
		var store = Ext.getStore('boardStore');
		store.removeAll();		
		store.currentPage = 1;		
		store.proxy.extraParams={};				
		store.load({
			callback: function(operation) {		
				setTimeout(function() {							
					Ext.getCmp('boardList').scroller.scrollTo({ y : 0 }, true);			
				}, 1);	
									
		    }
		});
		setTimeout(function() {								
			if(!getTimingDifference(app.myConfigVO.data.update_at)){				
				Ext.getCmp('post_btn').hide();
			}
		}, 1);
	}
	
});
Ext.reg('board_view', app.board);

app.writeBoard = Ext.extend(Ext.Panel,{
	id : 'writeBoard',
	layout : 'card',
	groundsDetailStore : null,
	prevCard : null,
	initComponent : function() {
		console.log("===writeBoard initComponent===");	
		var me = this;
		
		this.postPanel = new Ext.Panel({
			/*style: {	                    
                margin: '10px'
            },*/
			items : [{
				html : '<div class="writeboard_info">Writing once a day is possible.<br>carefully written</div>'
			},{
				xtype : 'textareafield',
				name : 'comment',
				id : 'comment',
				maxLength : 140,				
				placeHolder : 'comment'
			},{
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
					
					if (Ext.getCmp('comment').getValue().length < 10){
						Ext.Msg.alert('Alert','You Must add comment at at least 10 characters!!!',function(){
							
						}).doComponentLayout();	
						return false;
					}
					me.sendPostMessage(Ext.getCmp('comment').getValue());
					
				}
            }]
		});
		
		this.mainPanel = new Ext.Panel({
			layout : 'fit',
			dockedItems : [ {
				xtype : 'toolbar',
				title : 'POST',
				items : [ {
					ui : 'back',
					text : 'Back',
					scope : this,
					handler : function() {
						console.log("handler");									
						app.views.viewport.setActiveItem(app.views.tabbarView,{type: 'slide', direction: 'up'});						
						app.views.viewport.remove(me);
						me.destroy();							
					}
				}, {
					xtype : 'spacer'
				}]
			}],			
			items : [this.postPanel]
		});
		this.items = [this.mainPanel];
		
		this.mainPanel.on('afterrender', this.loadMainPanel, this);
		app.writeBoard.superclass.initComponent.apply(this, arguments); //1.저녁미사->기사보기 
	},
	loadMainPanel : function() {
		console.log("===writeBoard loadMainPanel===");		
		var me = this;		
	},
	sendPostMessage : function(aMessage){
		var me = this;
		app.myMask.show();	
		var sendData = {
				name : app.myConfigVO.data.username,
				message : aMessage,
				update_at :new Date()
		};	
		Ext.Ajax.request({ 
			cache : true,
			method: 'POST',			
			url: SERVER_URL+'armageddon/api/sendWallPoster/',
			params : sendData,
			//timeout: 50,
			success: function(response){	
				app.myMask.hide();
				var data = StringToJSON(response.responseText);										
				if (data.api_header.status != 'True') {											
					Ext.Msg.alert('Alert','Post had failed to register.',function(){
						
					}).doComponentLayout();	
				}
				else{			
					Ext.Msg.alert('Alert','Post  was successful.',function(){
						app.myConfigVO.data.update_at = getToDayDate();
						app.myConfigVO.data.wall_read_status = true;	
						saveUserDataToNative();
						app.views.viewport.setActiveItem(app.views.tabbarView);
						me.prevCard.refleshTab();
						app.views.viewport.remove(me);
						me.destroy();		
					}).doComponentLayout();	
					
				}								
			},			
			failure : function(response){	                        
				console.log("failure");
				Ext.Msg.alert('Alert','Post had failed to register.',function(){
					
				}).doComponentLayout();	
				
			}		
		});
	}
	
});

