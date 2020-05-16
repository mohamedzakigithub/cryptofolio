module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    post: {
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
