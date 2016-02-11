//var SERVER_URL = 'http://localhost:8080/';
var SERVER_URL = 'http://api-server-1.appspot.com/';
var TARGET_DAY_DATE = "december 21, 2012 00:00";
var DEFAULT_CONFIG_DATA = {
	"id" : 1,
	"username": 'GUEST', 
	"update_at" : '2012-01-11',
	"wall_read_status" : false	
};
var TARGET_DATE = '2012/12/21';

function StringToJSON(aString)
{
    return eval('(' + aString + ')');
};

function setUserDataToLocal(aConfigData)
{	
	try{
		var appConfigVO = Ext.ModelMgr.create({	
			'id' : aConfigData.id,
			'username' :aConfigData.username,
			'update_at' : aConfigData.update_at,
			'wall_read_status' : aConfigData.wall_read_status		
		}, 'app.models.ConfigVO');		
		
		Ext.apply(app, {
			myConfigVO : appConfigVO
		});			
		return true;
	}
	catch(e){
		return false;
	}
};

function getPostStatusValue(status)
{
	var value = null;
	if(status){
		value = 'Impossibility';
	}
	else{
		value = 'Possibility';
	}
	return value;
};

function saveUserDataToNative()
{		
	console.log("saveUserDataToNative");
				
	var configStore = Ext.getStore('myConfigStore');
	configStore.getProxy().clear();
	configStore.add(app.myConfigVO.data);		
	configStore.save();
	configStore.sync();	
	
	return;
};

function getToDayDate(){
	var today = new Date();
	var s = leadingZeros(today.getFullYear(), 4) + '-' +
		leadingZeros(today.getMonth() + 1, 2) + '-' +
		leadingZeros(today.getDate(), 2);
	return s;
};
function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
};
function getTimingDifference(targetDate) {
	var todayDate = getToDayDate();
	if(todayDate==targetDate){		
		return false;
	}	
	return true;	
};
