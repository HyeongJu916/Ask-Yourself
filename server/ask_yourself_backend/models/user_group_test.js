module.exports = (sequelize, Datatypes) => {
    const user_group_test = sequelize.define("user_group_test", {
        title: {
            type            : Datatypes.STRING(15),
            allowNull       : false,
        },
        correct_count: {
            type            : Datatypes.INTEGER,
            allowNull       : true,
        },
        question_count: {
            type            : Datatypes.INTEGER,
            allowNull       : false,
        },
        examed_at: {
            type            : Datatypes.DATE,
            allowNull       : true,
        }
    }, {
        timestamps:         true,
        freezeTableName:    true,
        underscored:        true,
        talbeName:          "user_group_test",
        chartset:           "utf8mb4",
        collate:            "utf8mb4_general_ci",
    });

    user_group_test.removeAttribute("id");

    user_group_test.associate = (models) => {
        const { user_group } = models;

        user_group_test.belongsTo(user_group, {
            foreignKey: {
                name: "gid",
                primaryKey: true,
            },
            onDelete: "CASCADE",
        });
    };  

    return user_group_test;
};