Ext.regApplication({
    name : "app",
    launch: function() {
    	this.views.viewport = new this.views.Viewport();	
    	
    	app.myMask = new Ext.LoadMask(Ext.getBody(), {msg: 'Loading'});		
    	
    	var configStore = Ext.getStore('myConfigStore');			
    	configStore.load();
		if (!configStore.first()) {
			console.log('1');
			setUserDataToLocal(DEFAULT_CONFIG_DATA);
			configStore.getProxy().clear();
			configStore.add(app.myConfigVO.data);
			configStore.sync();
			
		} else {			
			console.log(configStore.first().data);
			setUserDataToLocal(configStore.first().data);		
			
		}		
    	
    	if (!app.views.tabbarView) {
			Ext.apply(app.views, {
				tabbarView : new app.views.TabbarView()
			});
			app.views.viewport.add(app.views.tabbarView);
		}
		app.views.viewport.setActiveItem(app.views.tabbarView);
    	
    }
    
});

