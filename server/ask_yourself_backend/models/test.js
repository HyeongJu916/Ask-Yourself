module.exports = (sequelize, Datatypes) => {
    const test = sequelize.define("test", {
        tid: {
            type            : Datatypes.INTEGER,
            autoIncrement   : true,
            primaryKey      : true
        },
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
        talbeName:          "test",
        chartset:           "utf8mb4",
        collate:            "utf8mb4_general_ci",
    });

    test.associate = (models) => {
        const { question_answer, user_group_test } = models;
        test.question_answer = test.hasMany(question_answer, {
            foreignKey: "tid",
            onDelete: "CASCADE",
        });

        test.hasMany(user_group_test, {
            foreignKey: {
                name: "tid",
                primaryKey: true,
            },
            onDelete: "CASCADE",
        });
    };

    return test;
};