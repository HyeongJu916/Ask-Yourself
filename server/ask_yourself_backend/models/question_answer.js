module.exports = (sequelize, Datatypes) => {
    const question_answer = sequelize.define("question_answer", {
        qid: {
            type            : Datatypes.INTEGER,
            autoIncrement   : true,
            primaryKey      : true
        },
        question: {
            type            : Datatypes.STRING(100),
            allowNull       : false,
        },
        answer: {
            type            : Datatypes.STRING(30),
            allowNull       : false,
        },
        is_correct: {
            type            : Datatypes.INTEGER,
            allowNull       : true,
        },
        uid: {
            type            : Datatypes.INTEGER,
            references      : {
                model: "test",
                key: "uid"
            },
            onDelete        : "CASCADE",
            allowNull       : false,
        },
        tid: {
            type            : Datatypes.INTEGER,
            references      : {
                model: "test",
                key: "tid"
            },
            onDelete        : "CASCADE",
            allowNull       : false,
        }
    }, {
        timestamps:         false,
        freezeTableName:    true,
        underscored:        true,
        talbeName:          "question_answer",
        chartset:           "utf8mb4",
        collate:            "utf8mb4_general_ci",
    });

    // question_answer.associate = (models) => {
    //     const { test } = models;
    //     question_answer.test = question_answer.belongsTo(test, {
    //         foreignKey: {
    //             name: "uid",
    //             allowNull: false,
    //         },
    //         foreignKey: {
    //             name: "tid",
    //             allowNull: false,
    //         },
    //         onDelete: "CASCADE",
    //     });
    // };

    return question_answer;
};