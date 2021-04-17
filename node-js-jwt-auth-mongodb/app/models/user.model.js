

module.exports = (mongoose, mongoosePaginate) => {
  const schema = new mongoose.Schema(
    {
      username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.plugin(mongoosePaginate);
  
  const User = mongoose.model("user", schema);
  console.log('user model' + User)
  return User;
};