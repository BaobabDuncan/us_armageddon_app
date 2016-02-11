app.views.Viewport = Ext.extend(Ext.Panel, 
{
	id : 'viewport',	
	layout : 'card',
	fullscreen : true,
	listeners: {        
        
    },
	initComponent : function() 
	{		
		app.views.Viewport.superclass.initComponent.apply(this, arguments);	    
	}

});