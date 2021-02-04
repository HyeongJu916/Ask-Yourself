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
        }
    }, {
        timestamps:         false,
        freezeTableName:    true,
        underscored:        true,
        talbeName:          "question_answer",
        chartset:           "utf8mb4",
        collate:            "utf8mb4_general_ci",
    });

    return question_answer;
};