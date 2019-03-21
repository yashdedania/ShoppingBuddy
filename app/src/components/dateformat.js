const format = {
    Date: function (date){
        if(date == null || date == '' || date == undefined){
            return null;
        }
        else{
            //console.log("Date recieved: "+date);
            let d  = new Date(date);
            //console.log("After formatting recieved: "+d);
            return (d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear());
        }
        
    },
    Time: function (time){
        if(time == null || time == '' || time == undefined){
            return null;
        }
        else{
            var t = new Date(time);
            return(t.getHours()+':'+t.getMinutes()+':'+t.getSeconds());
        }
    },
    sDate:function(date){
        if(date == null || date == '' || date == undefined){
            return null;
        }
        else{
            var d  = new Date(date);
            return (d.getDate() +'/'+(d.getMonth()+1)+'/'+d.getFullYear());
        }
    }
}

export default format;