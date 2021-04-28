module.exports = function (server) {
    var User = server.models.user;
    var Role = server.models.Role;
    var RoleMapping = server.models.RoleMapping;
    var users = [
        { email: "john@example.com", password: "opensesame" },
        { email: "jane@example.com", password: "opensesame" },
        { email: "bob@example.com", password: "opensesame" },
    ];
    RoleMapping.belongsTo(User);
    User.hasMany(RoleMapping, { foreignKey: "principalId" });
    Role.hasMany(User, { through: RoleMapping, foreignKey: "roleId" });
    User.create(users, function (err, users) {
        if (err) {
            return console.log(err);
        }
        //create the admin role
        Role.create({
            name: "admin",
        }, function (err, role) {
            if (err) {
                console.log(err);
            }
            //make bob an admin
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[0].id,
            }, function (err, principal) {
                console.log(err, principal);
            });
        });
    });
};
//# sourceMappingURL=roles.js.map