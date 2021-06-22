module.exports = (mongoose, mongoosePaginate) => {
    const schema = new mongoose.Schema(
      {
        product_type_code: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productTypeCode' }],
        product_code: Number,
        product_name: String,
        product_price: Number,
        product_size: Number,
        product_qty: Number,
        product_details: String,
        
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    schema.plugin(mongoosePaginate);
    
    const Product = mongoose.model("product", schema);
    console.log('Product model' + Product);
    return Product;
  };