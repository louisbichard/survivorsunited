SU.service("navigationRoutesService", function() {
    this.routes = [{
        "group_title": "Main",
        "sub_routes": [{
            "route": "dashboard",
            "label": "Dashboard",
            "icon": "dashboard",
            "allowed_roles": ["Basic", "Mentor", "Admin"]
        }, {
            "route": "mentees",
            "label": "Mentees",
            "icon": "male",
            "allowed_roles": ["Mentor"]
        }, {
            "route": "mentor",
            "label": "Mentor",
            "icon": "male",
            "allowed_roles": ["Basic"]
        }]
    }, {
        "group_title": "account",
        "sub_routes": [{
            "route": "account",
            "label": "Account",
            "icon": "user",
            "allowed_roles": ["Basic", "Mentor", "Admin"]
        }]
    }, {
        "group_title": "events",
        "sub_routes": [{
            "route": "create_event",
            "label": "Create",
            "icon": "plus",
            "allowed_roles": ["Mentor", "Admin"]
        }, {
            "route": "upcoming_events",
            "label": "Upcoming Events",
            "icon": "calendar",
            "allowed_roles": ["Mentor", "Admin", "Basic"]
        }, {
            "route": "events_calendar",
            "label": "Events Calendar",
            "icon": "calendar",
            "allowed_roles": ["Mentor", "Admin", "Basic"]
        }, {
            "route": "events_by_location",
            "label": "By Location",
            "icon": "map-marker",
            "allowed_roles": ["Mentor", "Admin", "Basic"]
        }]
    }, {
        "group_title": "processes ",
        "sub_routes": [{
            "route": "select_process",
            "label": "Manage",
            "icon": "pencil",
            "allowed_roles": ["Mentor", "Admin"]
        }]
    }, {
        "group_title": "admin",
        "sub_routes": [{
            "route": "referrals",
            "label": "Referrals",
            "icon": "level-up",
            "allowed_roles": ["Mentor", "Admin"]
        }, {
            "route": "statistics",
            "label": "Statistics",
            "icon": "area-chart",
            "allowed_roles": ["Mentor", "Admin"]
        }, {
            "route": "user_management",
            "label": "User management",
            "icon": "users",
            "allowed_roles": ["Mentor", "Admin"]
        }, {
            "route": "developer_console",
            "label": "Developer console",
            "icon": "cogs",
            "allowed_roles": ["Admin"]
        }]
    }];

});