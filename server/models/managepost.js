module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'managepost', 
        {
            area: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            jobname: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            nickname: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            title: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            content: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            date: {
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