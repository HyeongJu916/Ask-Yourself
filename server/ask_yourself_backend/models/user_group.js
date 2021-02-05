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

    return user_group;
};