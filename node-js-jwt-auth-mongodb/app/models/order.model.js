
module.exports = (mongoose, mongoosePaginate) => {
    const schema = new mongoose.Schema(
      {
        clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
        date_order: { type: Date, default: Date.now },
        details_order: String,
        
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    schema.plugin(mongoosePaginate);
    
    const Order = mongoose.model("order", schema);
    console.log('Order model' + Order);
    return Order;
  };