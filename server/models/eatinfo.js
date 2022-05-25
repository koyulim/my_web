module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'eatinfo', 
        {
            url: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            area: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            jobname: {
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