# frozen_string_literal: true

Rails.application.routes.draw do
  get  "sign_in", to: "sessions#new", as: :sign_in
  post "sign_in", to: "sessions#create"
  get  "sign_up", to: "users#new", as: :sign_up
  post "sign_up", to: "users#create"

  resources :sessions, only: [:destroy]
  delete "sessions", to: "sessions#destroy_current", as: :destroy_current_session
  resource :users, only: [:destroy]

  namespace :identity do
    resource :email_verification, only: [:show, :create]
    resource :password_reset,     only: [:new, :edit, :create, :update]
  end

  get :dashboard, to: "dashboard#index"

  # Instagram Profile Insights
  resources :instagram, only: [:index, :create], controller: "instagram/instagram"
  get "instagram/:username", to: "instagram/instagram#show", as: :instagram_profile
  get "instagram/:username/insights", to: "instagram/instagram#insights", as: :instagram_profile_insights
  get "instagram/:username/strategy", to: "instagram/instagram#strategy", as: :instagram_profile_strategy
  post "instagram/:username/chat", to: "instagram/instagram#chat", as: :instagram_profile_chat

  resources :plans, except: [:show]

  namespace :settings do
    resource :profile, only: [:show, :update]
    resource :password, only: [:show, :update]
    resource :email, only: [:show, :update]
    resources :sessions, only: [:index]
    resource :billing, only: [:show], controller: 'billing' do
      post :cancel, on: :collection
    end
    inertia :appearance
  end

  # Billing
  get :pricing, to: "billing#pricing"
  post "billing/checkout", to: "billing#checkout"
  get "billing/success", to: "billing#success"
  post "billing/portal", to: "billing#portal"

  # Webhooks
  namespace :webhooks do
    post :stripe, to: "stripe#create"
  end

  root "home#index"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
end
