export const createUserModel = (sequelize, DataTypes) => {
    const User = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Roles',
                key: 'id',      
                as:'role_id'
            }
        }
    }, {
        timestamps: false
    });
     // Generate authentication token
     User.prototype.generateAuthToken = function () {
        const token = jwt.sign({ id: this.id, role_id: this.role_id }, process.env.JWT_KEY);
        resizeBy.status(200).send({ 
            id: this.id,
            email: this.email,
            accessToken: token,
         });
    };

    // Verify password
    User.prototype.validPass = async function (password) {
         await bcrypt.compare(password, this.password);
         if (!validPass|| !User){
            return res.status(404).json('Invalid password');
         }
    };

    return User;
};
