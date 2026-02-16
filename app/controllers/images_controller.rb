# frozen_string_literal: true

class ImagesController < ApplicationController
  before_action :authenticate

  def proxy
    url = params[:url]

    return head :bad_request if url.blank?

    # Only allow Instagram/Facebook CDN URLs
    unless url.match?(/\Ahttps?:\/\/[a-z0-9-]+\.(cdninstagram\.com|fbcdn\.net)\//ix)
      return head :forbidden
    end

    response = fetch_image(url)

    if response
      send_data response[:body],
                type: response[:content_type],
                disposition: "inline"
    else
      head :not_found
    end
  end

  private

  def fetch_image(url)
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = uri.scheme == "https"
    http.open_timeout = 5
    http.read_timeout = 10

    request = Net::HTTP::Get.new(uri.request_uri)
    request["User-Agent"] = "Mozilla/5.0 (compatible; ImageProxy/1.0)"

    response = http.request(request)

    if response.is_a?(Net::HTTPSuccess)
      {
        body: response.body,
        content_type: response["Content-Type"] || "image/jpeg"
      }
    end
  rescue StandardError => e
    Rails.logger.error("Image proxy error: #{e.message}")
    nil
  end
end
