module.exports = (sequelize, Datatypes) => {
    const user = sequelize.define("user", {
        uid: {
            type:           Datatypes.INTEGER,
            autoIncrement:  true,
            primaryKey:     true
        },
        id: {
            type:           Datatypes.STRING(15),
            allowNull:      false,
        },
        password: {
            type:           Datatypes.STRING(256),
            allowNull:      false,
        },
        image_url: {
            type:           Datatypes.STRING(128),
            allowNull:      false,
        }
    }, {
        timestamps:         false,
        freezeTableName:    true,
        underscored:        true,
        talbeName:          "user",
        chartset:           "utf8mb4",
        collate:            "utf8mb4_general_ci",
    });

    user.associate = (models) => {
        const { test } = models;
    
        user.hasMany(test, {
            foreignKey: "uid",
            onDelete: "CASCADE",
        });
    };

    return user;
};