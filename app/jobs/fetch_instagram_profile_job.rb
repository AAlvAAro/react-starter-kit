# frozen_string_literal: true

class FetchInstagramProfileJob < ApplicationJob
  queue_as :default

  def perform(profile_search_id)
    profile_search = ProfileSearch.find(profile_search_id)
    user = profile_search.user
    instagram_profile = profile_search.instagram_profile

    # Fetch the profile data from Instagram API
    if instagram_profile.stale?
      data = Instagram::SearchApiService.fetch_profile(instagram_profile.username)
      InstagramProfile.create_or_update_from_api(instagram_profile.username, data)
      instagram_profile.reload
    end

    # Generate both business and personal insights
    instagram_profile.generate_dual_insights!(locale: user.locale || "es")

    # Mark as ready
    profile_search.update!(status: "ready", completed_at: Time.current)

    # Broadcast to user's channel to update UI in real-time
    ProfileSearchesChannel.broadcast_to(user, {
      type: "profile_ready",
      profile_search_id: profile_search.id,
      username: instagram_profile.username,
      status: "ready"
    })

    # Send notifications
    ProfileReadyMailer.with(profile_search: profile_search).notify.deliver_later
    WhatsappNotificationService.new(user).profile_ready(profile_search) if user.phone.present?
  rescue StandardError => e
    profile_search&.update!(status: "failed", error_message: e.message)
    Rails.logger.error("FetchInstagramProfileJob failed: #{e.message}\n#{e.backtrace.first(5).join("\n")}")
    raise e
  end
end
