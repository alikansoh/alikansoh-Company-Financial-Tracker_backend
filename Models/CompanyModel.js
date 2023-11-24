export const createCompanyModel = (sequelize, DataTypes) => {
    const Company = sequelize.define("Companies", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        capital:{
            type:DataTypes.FLOAT,
        }, 
        balance:{
            type:DataTypes.FLOAT,
        }
    },

    {
        timestamps: false
    });
    return Company;
};
