module.exports = (mongoose, mongoosePaginate) => {
    const schema = new mongoose.Schema(
      {
        parent_product_type_code: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productTypeCode' }],
        product_type_description: String,
        vat_rating: String,
        
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    schema.plugin(mongoosePaginate);
    
    const ProductType = mongoose.model("productType", schema);
    console.log('ProductType model' + ProductType);
    return ProductType;
  };