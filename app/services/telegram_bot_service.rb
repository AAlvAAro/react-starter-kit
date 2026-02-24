# frozen_string_literal: true

class TelegramBotService
  COMMANDS = {
    "/start" => :handle_start,
    "/help" => :handle_help,
    "/orders" => :handle_orders,
    "/order" => :handle_order,
    "/customers" => :handle_customers,
    "/products" => :handle_products,
    "/store" => :handle_store
  }.freeze

  def initialize(token: TELEGRAM_BOT_TOKEN)
    @token = token
    @api = ::Telegram::Bot::Api.new(@token)
  end

  def process_message(message)
    return unless message.is_a?(::Telegram::Bot::Types::Message) && message.text.present?

    text = message.text.strip
    command = text.split(" ").first.downcase
    args = text.split(" ")[1..]

    if COMMANDS.key?(command)
      send(COMMANDS[command], message, args)
    else
      send_message(message.chat.id, "Unknown command. Type /help to see available commands.")
    end
  rescue StandardError => e
    Rails.logger.error("Telegram bot error: #{e.message}")
    send_message(message.chat.id, "Something went wrong. Please try again.")
  end

  private

  def handle_start(message, _args)
    text = <<~MSG
      Welcome to Nexara AI Bot! 🛒

      I can help you check your store data. Use these commands:

      /orders - List recent orders
      /order <id> - Get order details
      /customers - List recent customers
      /products - List products
      /store - Get store info
      /help - Show this help message
    MSG
    send_message(message.chat.id, text)
  end

  def handle_help(message, _args)
    handle_start(message, _args)
  end

  def handle_orders(message, args)
    limit = (args.first || 5).to_i.clamp(1, 20)
    orders = ::Bigcommerce::Order.all(limit: limit)

    if orders.empty?
      send_message(message.chat.id, "No orders found.")
      return
    end

    text = "📦 *Recent Orders (#{orders.size}):*\n\n"
    orders.each do |order|
      text += "• *##{order.id}* — #{order.status}\n"
      text += "  💰 #{order.currency_code} #{order.total_inc_tax}\n"
      text += "  📅 #{order.date_created}\n\n"
    end

    send_message(message.chat.id, text, parse_mode: "Markdown")
  rescue StandardError => e
    send_message(message.chat.id, "Failed to fetch orders: #{e.message}")
  end

  def handle_order(message, args)
    order_id = args.first&.to_i
    unless order_id && order_id > 0
      send_message(message.chat.id, "Please provide an order ID: /order 123")
      return
    end

    order = ::Bigcommerce::Order.find(order_id)

    text = <<~MSG
      📦 *Order ##{order.id}*

      *Status:* #{order.status}
      *Payment:* #{order.payment_method} (#{order.payment_status})
      *Total:* #{order.currency_code} #{order.total_inc_tax}
      *Subtotal:* #{order.currency_code} #{order.subtotal_inc_tax}
      *Shipping:* #{order.currency_code} #{order.shipping_cost_inc_tax}
      *Items:* #{order.items_total} (#{order.items_shipped} shipped)
      *Created:* #{order.date_created}
      *Customer ID:* #{order.customer_id}
    MSG

    send_message(message.chat.id, text, parse_mode: "Markdown")
  rescue ::Bigcommerce::NotFound
    send_message(message.chat.id, "Order ##{order_id} not found.")
  rescue StandardError => e
    send_message(message.chat.id, "Failed to fetch order: #{e.message}")
  end

  def handle_customers(message, args)
    limit = (args.first || 5).to_i.clamp(1, 20)
    customers = ::Bigcommerce::Customer.all(limit: limit)

    if customers.empty?
      send_message(message.chat.id, "No customers found.")
      return
    end

    text = "👥 *Recent Customers (#{customers.size}):*\n\n"
    customers.each do |c|
      text += "• *#{c.first_name} #{c.last_name}*\n"
      text += "  📧 #{c.email}\n"
      text += "  📅 #{c.date_created}\n\n"
    end

    send_message(message.chat.id, text, parse_mode: "Markdown")
  rescue StandardError => e
    send_message(message.chat.id, "Failed to fetch customers: #{e.message}")
  end

  def handle_products(message, args)
    limit = (args.first || 5).to_i.clamp(1, 20)
    response = ::Bigcommerce.api.get("catalog/products", limit: limit)
    products = response.body["data"] || []

    if products.empty?
      send_message(message.chat.id, "No products found.")
      return
    end

    text = "🏷️ *Products (#{products.size}):*\n\n"
    products.each do |p|
      text += "• *#{p['name']}*\n"
      text += "  💰 $#{p['price']} | Stock: #{p['inventory_level']}\n"
      text += "  SKU: #{p['sku']}\n\n"
    end

    send_message(message.chat.id, text, parse_mode: "Markdown")
  rescue StandardError => e
    send_message(message.chat.id, "Failed to fetch products: #{e.message}")
  end

  def handle_store(message, _args)
    response = ::Bigcommerce.api.get("store")
    store = response.body

    text = <<~MSG
      🏪 *Store Info*

      *Name:* #{store['name']}
      *Domain:* #{store['domain']}
      *Currency:* #{store['currency']}
      *Plan:* #{store['plan_name']}
      *Status:* #{store['status']}
      *Language:* #{store['language']}
    MSG

    send_message(message.chat.id, text, parse_mode: "Markdown")
  rescue StandardError => e
    send_message(message.chat.id, "Failed to fetch store info: #{e.message}")
  end

  def send_message(chat_id, text, **options)
    @api.send_message(chat_id: chat_id, text: text, **options)
  end
end
