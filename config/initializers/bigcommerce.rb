require 'bigcommerce'

Bigcommerce.configure do |config|
  config.store_hash   = "zlony"
  # config.access_token = "69nnr2y7ve4ik94oht7esbvtc096dd2"
  config.access_token = "ehtxeitfbvsl9srf6ir3565zwv3a4kt"
  config.timeout      = 30  # optional, default: 30s
  config.open_timeout = 10  # optional, default: 10s
end

# BigCommerce API credentials
# If you are using Chrome, Firefox, or Edge a text file containing the API token and client ID should have downloaded to your computer.

# Client ID
# 6fft1p7z6q2amxhjrzndpn7lm4hngag
# Client secret
# 4ced8189f286aa66f05cc257b7846f83c70f3581d2f680b3fed9cd4279eac7c9
# Access token
# ehtxeitfbvsl9srf6ir3565zwv3a4kt
# This is the only copy you will have access to. If you lose it, delete the account and create a new one...
