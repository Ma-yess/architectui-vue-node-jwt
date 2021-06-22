module.exports = (mongoose, mongoosePaginate) => {
    const schema = new mongoose.Schema(
      {
        account: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
        clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
        invoiceNumber: [{ type: mongoose.Schema.Types.ObjectId, ref: 'invoice' }],
        TransactionType: [{ type: mongoose.Schema.Types.ObjectId, ref: 'transactionType' }],
        transaction_date: { type: Date, default: Date.now },
        transaction_amount: String,
        transaction_comment: String,
        other_transaction_details: String,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    schema.plugin(mongoosePaginate);
    
    const FinancialTransaction = mongoose.model("financialTransaction", schema);
    console.log('FinancialTransaction model' + FinancialTransaction);
    return FinancialTransaction;
  };