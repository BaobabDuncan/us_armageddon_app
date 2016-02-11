app.setting = Ext.extend(Ext.Panel, {
	id : 'setting',
	fullscreen : true,
	layout : 'card',	
	
	initComponent : function() {
		console.log("===setting initComponent===");		
		
		this.settingFormPanel = new Ext.form.FormPanel({	
			
			items : [{
                xtype: 'fieldset',
                title: 'Personal Info',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '50%'
                },
                //instructions: 'Please enter the name above.',               
                items: [{
					xtype : 'textfield',
					id : 'username',
					name : 'name',
					label: 'YourName',
					maxLength : 10,
					value : app.myConfigVO.data.username,
					useClearIcon : true,
					maxLength : 10,
					required : true
                }]
            },{
                xtype: 'fieldset',
                title: 'Personal Info',
                //instructions: 'Please enter the information above.',  
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '50%'
                },
                items: [{
    				xtype : 'textfield',	
    				name : 'judgment_day',
    				label: 'Judgment Day',
    				value : TARGET_DATE,
    				listeners: {
                        afterrender: function(ele){
                           ele.fieldEl.dom.readOnly = true;
                        }
                   }     
    			},{
    				xtype : 'textfield',    				
    				//value : getPostStatusValue(app.myConfigVO.data.wall_read_status),
    				name : 'post_status',
    				id : 'post_status',
    				label: 'Post Status',
    				listeners: {
                        afterrender: function(ele){
                           ele.fieldEl.dom.readOnly = true;
                        }
                   }     
    			}]
            },{
            	style: {	                    
                    marginTop: '-30px'               
                },
            	html : '<div id="uksmart_info"><p>You can  see the more uksmart application</p>'+
            	'<a href="http://uk-smart.appspot.com/redirect" target="_black">UKSMART</a></div>'
            }]
		});
		
		this.mainPanel = new Ext.Panel({
			layout : 'fit',
			dockedItems : [ {
				xtype : 'toolbar',
				title : 'Setting',
				items : [{
					xtype : 'spacer'
				},{					
					ui : 'action',
					text : 'Save',
					handler : function() {
						console.log("Save handler");
						//console.log(me);
						console.log(Ext.getCmp('username').getValue());
						if (Ext.getCmp('username').getValue().length < 3){
							Ext.Msg.alert('Alert','You have to input username<br>at least 3 character',function(){
								Ext.getCmp('username').setValue(app.myConfigVO.data.username);
							}).doComponentLayout();	
						}
						else{
							app.myConfigVO.data.username = Ext.getCmp('username').getValue();
							saveUserDataToNative();
							Ext.Msg.alert('Alert','The name to store success.',function(){
								
							}).doComponentLayout();	
						}
					}
				}]
			}],
			items : [this.settingFormPanel]
		});
		this.items = [this.mainPanel];
		
		this.mainPanel.on('afterrender', this.loadMainPanel, this);
		app.setting.superclass.initComponent.apply(this, arguments);		
	},
	loadMainPanel : function() {
		console.log("===setting loadMainPanel===");	
		var me = this;
		me.refleshTab();
		
	},
	refleshTab : function(){
		setTimeout(function() {					
			console.log(app.myConfigVO.data);
			console.log(getTimingDifference(app.myConfigVO.data.update_at));
			var post_status = 'Possibility';
			if(!getTimingDifference(app.myConfigVO.data.update_at)){				
				post_status = 'Impossibility';
			}
			Ext.getCmp('post_status').setValue(post_status);
		}, 1);
	}
	
});
Ext.reg('setting_view', app.setting);

