module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'eatnote', 
        {
            user_name: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            my_name: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            conversation: {
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