module.exports = (sequelize, Datatypes) => {
    const user_group = sequelize.define("user_group", {
    
    }, {
        timestamps:         false,
        freezeTableName:    true,
        underscored:        true,
        talbeName:          "user_group",
        chartset:           "utf8mb4",
        collate:            "utf8mb4_general_ci",
    });

    user_group.associate = (models) => {
        const { user_group_test } = models;

        user_group.hasMany(user_group_test, {
            foreignKey: {
                name: "uid",
                primaryKey: true,
            },
            onDelete: "CASCADE",
        });
    };

    return user_group;
};