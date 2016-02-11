Ext.data.ProxyMgr.registerType("pxyBoard", Ext.extend(Ext.data.Proxy, 
{		
	read : function(operation, callback, scope) 
	{
		console.log("pxyBoard read");
		
		var preCallback = callback;
		var me=this;
		var store = Ext.getStore('boardStore');
		var records = new Array();	
		var iStoreCount = store.getCount();		
		var sendData = {};	
		
		var next = null;		
		if (iStoreCount>0) {			
			console.log('load More');
			console.log(store.last());
			next = store.last().get('uuid');			
			sendData.next = next;
		}		
		
		Ext.Ajax.request({ 
			cache : true,
			method: 'GET',			
			url: SERVER_URL+'armageddon/api/getWallPoster/',
			params : sendData,
			//timeout: 50,
			success: function(response){				
				var data = StringToJSON(response.responseText);				
					
				if (data.api_header.status != 'True') {											
					
				}
				else{						
					operation.setSuccessful();		
					
					if (iStoreCount>0) {								
						var newRecords = new Array();
						store.each(function(obj) {							
							newRecords.push(obj);
						});
						
						if(data.messages.length > 1) {
							for(var index = 0; index< data.messages.length;index++) {
								var aItem = data.messages[index];	
								var voItem = Ext.ModelMgr.create({
									uid:aItem.id,
									uuid : aItem.uuid,
									update_at : aItem.update_at,
									name : aItem.name,
									message : aItem.message											
								}, 'app.models.boardVO');	
								
								newRecords.push(voItem);
							}
						}
						
						records = newRecords;
						delete newRecords;
					}	
					else{
						for ( var index = 0; index < data.messages.length; index++) 
						{						
							var aItem = data.messages[index];									
							var voItem = Ext.ModelMgr.create({
								uid:aItem.id,
								uuid : aItem.uuid,
								update_at : aItem.update_at,
								name : aItem.name,
								message : aItem.message											
							}, 'app.models.boardVO');					
							records.push(voItem);
						}
					}
							
				}
				store.data.clear();					
				store.sync();	
				operation.records = records;					
				preCallback.call(scope || me, operation);
			},			
			failure : function(response){	                        
				console.log("failure");
				operation.setSuccessful();				
				store.data.clear();					
				store.sync();	
				operation.records = records;					
				preCallback.call(scope || me, operation);
			}		
		});
	},
	create : function(operation, callback, scope) {

	},
	update : function(operation, callback, scope) {
		
	},
	destroy : function(operation, callback, scope) {
		
	}
	
}));

app.models.boardVO = Ext.regModel('app.models.boardVO',{
	idProperty : 'uuid',	
	fields : [ 
	{
		name : 'uuid',
		type : 'string'		
	},{
		name : 'update_at',
		type : 'string'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'message',
		type : 'string'
	}]
});

app.stores.boardStore = new Ext.data.Store({
	id:'boardStore',
	model : 'app.models.boardVO',	
	pageSize:20,
	proxy : {
		type : 'pxyBoard',
		id:'pxyBoard'
	}	
});

app.models.evidenceVO = Ext.regModel('app.models.evidenceVO',{
	idProperty : 'uuid',	
	fields : [ 
	{
		name : 'main_title',
		type : 'string'		
	},{
		name : 'title',
		type : 'string'
	}, {
		name : 'description',
		type : 'string'
	}, {
		name : 'image_url',
		type : 'string'
	}]
});

var evidenceStore = new Ext.data.JsonStore({
	model : 'app.models.evidenceVO',
	data : [
	    {main_title : 'Mayan', title : 'Mayan calendar', description : 'Using remarkable ingenuity, the Maya created the "Long Count" calendar, a departure from the shorter calendars.<br>The Long Count is a numerically predictable calendar, not based on archaic measures of time.<br>Now, purely as a consequence of the Long Count is numerical value, many Mayan scholars agree that the calendar will "run out" after 5,126 years (or, at least, it is first cycle does).<br>The Mayans set this calendar to begin in the year 3114 B.C.(according to our modern Gregorian calendar).<br>If the Long Count began in 3114 B.C. and it is calculated to continue for 5126 years, the "end date" will be -- you guessed it -- 2012 A.D. Further refinement sets the date to Dec. 21, the day of the winter solstice for the Northern Hemisphere.', image_url : './resources/images/mayan.jpg'},
		{main_title : 'Web Bot', title : 'The Web Bot Project', description : 'In 2001, the web bot operators began to notice that stock market predictions were not the only matters being accurately predicted by the web bot and they began to take notice of the coincidence with occurrences and explored it further.<br>One of the first accurate predictions from the web bot took place in June of 2001.<br>At that time, the web bot predicted that a life altering event would take place within the next 60-90 days.<br>An occurrence of such proportion that it is effects would be felt worldwide.<br>The program based it is prediction on its filtered web chatter content which, I guess you could say, ultimately represents the collective unconscious of society.<br>Regrettably, the program is prediction proved accurate and the Twin Towers fell on 9/11/2001.<br>This is where the web bot starts to become interesting. The web bot program also predicts a worldwide calamity taking place in the year 2012. For those of you who study astrology, prophecies, and the like, you may already be familiar with this date.', image_url : './resources/images/webbot.jpg'},
		{main_title : 'Pole', title : 'Pole Shift & Pole Reversal', description : 'In 2012 the next polar reversal will take place on earth. This means that the North Pole will be changed into the South Pole.<br>Scientifically this can only be explained by the fact that the earth will start rotating in the opposite direction, together with a huge disaster of unknown proportions.<br>In my books I reveal the immense cataclysm that is going to torment the earth in the near future.<br>It is presently assumed by most people and the general scientific world at large, that the rotation of the Earth is stable, however, as expounded in my previous works on this subject, this is not the case.<br>The gruesome reports of the previous catastrophes should, hopefully, be clear to all.', image_url : './resources/images/pole.jpg'},
		{main_title : 'Planetary', title : 'Planetary Alignment', description : 'Most of them would be aware about 2012 planetary alignment that is predicted by Mayan calendar to destruct this world.<br>This event is anticipated to spark end of this era on doomsday.<br>The exact significance of 2012 planetary alignment and its impact on human beings and earth are illustrated.<br>The solution to this question can be arrived by carefully studying Mayan calendar. According to this calendar, doomsday will occur on 21 December 2012.<br>This event will destruct all life in earth and initiate beginning of new age.<br>The planets and sun will align themselves along a row in a straight line.<br>This alignment is assumed to be potentially dangerous that would trigger range of events such as droughts, floods, and other epidemic diseases that will erase all life creatures on earth.', image_url : './resources/images/planetary.jpg'},
		{main_title : 'Solar', title : 'Solar Storm Theory', description : 'Scientists have been warning that the sun is solar cycle which peaks in 2012, could cause powerful solar storms that could leave many places on earth without communication and electricity for months.', image_url : './resources/images/solar.jpg'}
	]
});

app.models.ConfigVO = Ext.regModel('app.models.ConfigVO',{
    idProperty : 'id',
    fields : [{
            name : 'id',
            type : 'integer'
    },{
            name : 'username'
    },{
    		name : 'update_at'
    },{
            name : 'wall_read_status',
            type : 'boolean'
    }]
});
Ext.regStore('myConfigStore', {
    model : 'app.models.ConfigVO', 
    sorters : [ {
            property : 'id',
            direction : 'DESC'
    } ],
    proxy : {
            type : 'localstorage',
            id : 'myAMConfig-localstore'
    },
    autoLoad:true
});






