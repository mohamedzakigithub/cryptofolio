module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Post;
};
