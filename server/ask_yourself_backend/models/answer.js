module.exports = (sequelize, Datatypes) => {
    const answer = sequelize.define("answer", {
        content: {
            type            : Datatypes.STRING(30),
            allowNull       : false,
        },
    }, {
        timestamps:         false,
        freezeTableName:    true,
        underscored:        true,
        talbeName:          "answer",
        chartset:           "utf8mb4",
        collate:            "utf8mb4_general_ci",
    });

    return answer;
};