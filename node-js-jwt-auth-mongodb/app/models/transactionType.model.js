
module.exports = (mongoose, mongoosePaginate) => {
    const schema = new mongoose.Schema(
      {
        transaction_type_code: Number,
        transaction_type_description: String,
        
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    schema.plugin(mongoosePaginate);
    
    const TransactionType = mongoose.model("transactionType", schema);
    console.log('TransactionType model' + TransactionType);
    return TransactionType;
  };