
 module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the Author model a name of type STRING
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
        }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
        }
    },
    age: {
      type: DataTypes.INT,
      allowNull: false,
      validate: {
        isInt: true,
        len: [2,3]
        }
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
      // custom validate for 'f' or 'm'
      validate: {
        startsWith:function(bodyVal) {
          var first = bodyVal.charAt(0);
          if (first !== 'f' || first !== 'm'){
            throw new Error("First character of body must be upper");
          }    
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      // set primary key
      primaryKey: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  });

  User.associate = function(models) {
    // Associating User with Drugs
    // When an User is deleted, also delete any associated Drugs
    User.hasMany(models.Drug, {
      onDelete: "cascade"
    });
  };

  return User;
};