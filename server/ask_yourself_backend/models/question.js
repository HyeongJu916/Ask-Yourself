module.exports = (sequelize, Datatypes) => {
    const question = sequelize.define("question", {
        qid: {
            type            : Datatypes.INTEGER,
            autoIncrement   : true,
            primaryKey      : true
        },
        content: {
            type            : Datatypes.STRING(100),
            allowNull       : false,
        },
    }, {
        timestamps:         false,
        freezeTableName:    true,
        underscored:        true,
        talbeName:          "question",
        chartset:           "utf8mb4",
        collate:            "utf8mb4_general_ci",
    });

    question.associate = (models) => {
        const { answer } = models;
        question.answer = question.hasOne(answer, {
            foreignKey: "qid",
            onDelete: "CASCADE",
        });
    };

    return question;
};