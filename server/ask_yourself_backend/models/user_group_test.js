module.exports = (sequelize, Datatypes) => {
    const user_group_test = sequelize.define("user_group_test", {
        who_share: {
            type            : Datatypes.INTEGER,
            allowNull       : false,
        },
    }, {
        timestamps:         false,
        freezeTableName:    true,
        underscored:        true,
        talbeName:          "user_group_test",
        chartset:           "utf8mb4",
        collate:            "utf8mb4_general_ci",
    });

    user_group_test.removeAttribute("id");

    user_group_test.associate = (models) => {
        const { test } = models;

        user_group_test.test = user_group_test.belongsTo(test, {
            foreignKey: {
                name: "uid",
                primaryKey: true,
            },
            onDelete: "CASCADE",
        });
    };

    return user_group_test;
};