module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      account_id: String,
      actor_changed: String,
      limit_price: Number,
      order_type: String,
      quantity: Number,
      session_id: String,
      side: String,
      symbol: String,
      time_in_force: String,
      avg_price: String,
      broker_order_id: String,
      client_order_id: String,
      commission: Number,
      company_name: String,
      currency: String,
      display_name: String,
      display_order_id: String,
      exchange: String,
      expire_date: String,
      filled_quantity: Number,
      leave_quantity: Number,
      order_status: Number,
      order_tag: String,
      order_value: String,
      origination: String,
      platform_usage_fee: String,
      step_volume: String,
      stop_price: String,
      total_fee: String,
      trading_fee: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Order = mongoose.model("order", schema);
  return Order;
};
