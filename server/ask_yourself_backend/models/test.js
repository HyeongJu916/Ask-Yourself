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
    }, {
        timestamps:         false,
        freezeTableName:    true,
        underscored:        true,
        talbeName:          "test",
        chartset:           "utf8mb4",
        collate:            "utf8mb4_general_ci",
    });

    test.associate = (models) => {
        const { question } = models;
        test.question = test.hasMany(question, {
            foreignKey: "tid",
            onDelete: "CASCADE",
        });
    };

    return test;
};