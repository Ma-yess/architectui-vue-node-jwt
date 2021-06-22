module.exports = (mongoose) => {
    const schema = new mongoose.Schema(
      {
        clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
        account_opened_date: { type: Date, default: Date.now },
        account_name: String,
        other_account_details: String,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    
    
    const Account = mongoose.model("account", schema);
    console.log('Account model' + Account);
    return Account;
  };