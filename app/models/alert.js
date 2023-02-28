module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      alert_id: String,
      user_id: String,
      symbol: String,
      exchange: String,
      alert_type: String,
      status: Number,
      target: Number,
      alert_repeat: String,
      alert_trigger: String,
      method: Array,
      email: String,
      display_name: String,
      currency: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Alert = mongoose.model("alert", schema);
  return Alert;
};
