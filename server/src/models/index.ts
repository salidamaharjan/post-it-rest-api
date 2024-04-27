import Post from "./Post";
import Client from "./Client";
Client.hasMany(Post);
Post.belongsTo(Client);
export { Post, Client };
