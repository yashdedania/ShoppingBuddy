const searchData = {
    contains: function (data, query) {
        const id = data.id.toString();
        const name = (data.name !== null && data.name !== undefined) ? data.name.toLowerCase() : "";
        if (id.includes(query) || name.includes(query)) {
            return true;
        }
        return false;
    },
    activityContains: function (data, query) {
        const activity_type = data.activity_type.toLowerCase();
        const username = data.user.username;
        if (activity_type.includes(query) || username.includes(query)) {
            return true;
        }
        return false;
    },
    userContains: function (data, query) {
        const username = data.username.toLowerCase();
        if (username.includes(query)) {
            return true;
        }
        return false;
    },
    productContains: function (data, query) {
        query = query.replace(/\s+/g, '');
        const username = (data.user !== null && data.user !== undefined) ? data.user.username.toLowerCase() : '';
        const id = (data.id !== null && data.id !== undefined) ? data.id.toString() : '';
        const order_status = (data.user !== null && data.user !== undefined) ? data.user.order_status.toLowerCase() : '';
        if (username.includes(query) || id.includes(query) || order_status.includes(query)) {
            return true;
        }
        return false;
    }
};
export default searchData;
