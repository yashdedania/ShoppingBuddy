const searchData = {
    contains : function (data,query){
        const id = data.id.toString();
        const username = (data.user !== null && data.user !== undefined) ? data.user.username.toLowerCase() : "";
       if(id.includes(query) || username.includes(query)){
           return true;
       }
       return false;    
    },
    activityContains:function (data,query){
        const activity_type = data.activity_type.toLowerCase();
        const username = data.user.username;
        if(activity_type.includes(query) || username.includes(query)){
            return true;
        }
        return false;
    },
    userContains:function (data,query){
        const username = data.username.toLowerCase();
        if(username.includes(query)){
            return true;
        }
        return false;
    }
};
export default searchData;