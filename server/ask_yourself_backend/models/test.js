module.exports = (sequelize, Datatypes) => {
    const test = sequelize.define("test", {
        tid: {
            type            : Datatypes.INTEGER,
            primaryKey      : true
        },
        title: {
            type            : Datatypes.STRING(15),
            allowNull       : true,
        },
        own: {
            type            : Datatypes.INTEGER,
            allowNull       : false,
        },
        correct_count: {
            type            : Datatypes.INTEGER,
            allowNull       : true,
            default          : 0
        },
        question_count: {
            type            : Datatypes.INTEGER,
            allowNull       : false,
        },
        examed_at: {
            type            : Datatypes.DATE,
            allowNull       : true,
            defaultValue    : sequelize.NOW
        }
    }, {
        timestamps:         true,
        freezeTableName:    true,
        underscored:        true,
        talbeName:          "test",
        chartset:           "utf8mb4",
        collate:            "utf8mb4_general_ci",
    });

    test.associate = (models) => {
        const { user_group_test } = models;
        // test.question_answer = test.hasMany(question_answer, {
        //     foreignKey: {
        //         name: "tid",
        //         allowNull: false,
        //     },
        //     onDelete: "CASCADE",
        // });

        test.user_group_test = test.hasMany(user_group_test, {
            foreignKey: {
                name: "tid",
                primaryKey: true,
            },
            onDelete: "CASCADE",
        });
    };


    return test;
};