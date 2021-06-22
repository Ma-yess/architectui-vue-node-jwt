module.exports = (mongoose, mongoosePaginate) => {
    const schema = new mongoose.Schema(
      {
        OrderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'orderItem' }],
        invoice_number: Number,
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
        product_title: String,
        product_quantity: Number,
        product_price: String,
        derived_product_price: String,
        derived_vat_payable: String,
        derived_total_cost: String,
        other_line_item_details: String,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    schema.plugin(mongoosePaginate);
    
    const InvoiceLineItem = mongoose.model("invoiceLineItem", schema);
    console.log('InvoiceLineItem model' + InvoiceLineItem);
    return InvoiceLineItem;
  };