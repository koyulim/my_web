module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'signup', 
        {
            nickname: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            password: {
                type: DataTypes.STRING(50),
                allowNull: true
            }
        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false,
        }
    )
};