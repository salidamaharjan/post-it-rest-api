import Post from "./Post";
import Client from "./Client";
import Like from "./Like";
Client.hasMany(Post);
Post.belongsTo(Client);
Post.hasMany(Like);
Like.belongsTo(Post);
Client.hasMany(Like);
Like.belongsTo(Client);

export { Post, Client, Like };
