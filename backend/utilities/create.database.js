// ENSURE THAT THE USERNAME FIELD IS UNIQUE
db.users.ensureIndex({
    'username': 1
}, {
    'unique': true
});