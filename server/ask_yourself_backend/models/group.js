module.exports = (sequelize, Datatypes) => {
    const group = sequelize.define("group", {
        gid: {
            type            : Datatypes.INTEGER,
            autoIncrement   : true,
            primaryKey      : true
        },
        title: {
            type            : Datatypes.STRING(20),
            allowNull       : false,
        },
    }, {
        timestamps:         false,
        freezeTableName:    true,
        underscored:        true,
        talbeName:          "group",
        chartset:           "utf8mb4",
        collate:            "utf8mb4_general_ci",
    });

    group.associate = (models) => {
        const { user, user_group_test } = models;
        group.user = group.belongsToMany(user, {
            through: "user_group",
            foreignKey: {
                name: "gid",
                primaryKey: true,
            },
        });

        group.hasMany(user_group_test, {
            foreignKey: {
                name: "gid",
                primaryKey: true,
            },
            onDelete: "CASCADE",
        });
    };

    return group;
};