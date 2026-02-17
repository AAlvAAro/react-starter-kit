# frozen_string_literal: true

class FetchTiktokProfileJob < ApplicationJob
  queue_as :default

  def perform(tiktok_search_id)
    tiktok_search = TiktokSearch.find(tiktok_search_id)
    user = tiktok_search.user
    tiktok_profile = tiktok_search.tiktok_profile

    # Fetch the profile data from TikTok API
    if tiktok_profile.stale?
      data = Tiktok::SearchApiService.fetch_profile(tiktok_profile.username)
      TiktokProfile.create_or_update_from_api(tiktok_profile.username, data)
      tiktok_profile.reload
    end

    # Generate both business and personal insights
    tiktok_profile.generate_dual_insights!(locale: user.locale || "es")

    # Mark as ready
    tiktok_search.update!(status: "ready", completed_at: Time.current)

    # Broadcast to user's channel to update UI in real-time
    TiktokSearchesChannel.broadcast_to(user, {
      type: "profile_ready",
      tiktok_search_id: tiktok_search.id,
      username: tiktok_profile.username,
      status: "ready"
    })

    # Send notifications
    TiktokProfileReadyMailer.with(tiktok_search: tiktok_search).notify.deliver_later
  rescue StandardError => e
    tiktok_search&.update!(status: "failed", error_message: e.message)
    Rails.logger.error("FetchTiktokProfileJob failed: #{e.message}\n#{e.backtrace.first(5).join("\n")}")
    raise e
  end
end
