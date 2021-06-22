
module.exports = (mongoose, mongoosePaginate) => {
    const schema = new mongoose.Schema(
      {
        orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
        product_quantity: Number,
        details_order_item: String,
        
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    schema.plugin(mongoosePaginate);
    
    const OrderItem = mongoose.model("orderItem", schema);
    console.log('OrderItem model' + OrderItem);
    return OrderItem;
  };