
module.exports = (mongoose, mongoosePaginate) => {
    const schema = new mongoose.Schema(
      {
        customerFirstName: String,
        customerLastName: String,
        customerEmail: String,
        customerPassword: String,
        customerPhone: String,
        customerPhone2: String,
        customerAdress: String,
        customerAdress2: String,
        customerCity: String,
        customerState: String,
        customerZipCode: String,
        
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    schema.plugin(mongoosePaginate);
    
    const Client = mongoose.model("client", schema);
    console.log('Client model' + Client);
    return Client;
  };