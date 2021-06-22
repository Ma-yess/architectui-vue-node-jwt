module.exports = (mongoose, mongoosePaginate) => {
    const schema = new mongoose.Schema(
      {
        invoice_number: Number,
        orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
        invoice_date: { type: Date, default: Date.now },
        invoice_details: String,
        
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    schema.plugin(mongoosePaginate);
    
    const Invoice = mongoose.model("invoice", schema);
    console.log('Invoice model' + Invoice);
    return Invoice;
  };