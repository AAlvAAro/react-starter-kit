# frozen_string_literal: true

class PlansController < InertiaController
  before_action :require_super_admin
  before_action :set_plan, only: [:edit, :update, :destroy]

  def index
    @plans = Plan.ordered
    render inertia: "admin/plans/index", props: {
      plans: @plans.map { |plan| plan_json(plan) }
    }
  end

  def new
    render inertia: "admin/plans/new"
  end

  def create
    @plan = Plan.new(plan_params)

    if @plan.save
      # Automatically create Stripe product and price
      begin
        StripePlanService.create_product_and_price(@plan)
        redirect_to dashboard_plans_path, notice: I18n.t("flash.plan_created_with_stripe")
      rescue StripePlanService::StripeError => e
        # Plan was saved but Stripe creation failed
        redirect_to edit_dashboard_plan_path(@plan), alert: I18n.t("flash.stripe_creation_failed", error: e.message)
      end
    else
      redirect_to new_dashboard_plan_path, inertia: { errors: @plan.errors }
    end
  end

  def edit
    render inertia: "admin/plans/edit", props: {
      plan: plan_json(@plan)
    }
  end

  def update
    if @plan.update(plan_params)
      redirect_to dashboard_plans_path, notice: I18n.t("flash.plan_updated")
    else
      redirect_to edit_dashboard_plan_path(@plan), inertia: { errors: @plan.errors }
    end
  end

  def destroy
    @plan.destroy
    redirect_to dashboard_plans_path, notice: I18n.t("flash.plan_deleted")
  end

  private

  def require_super_admin
    unless Current.user&.super_admin?
      redirect_to dashboard_path, alert: I18n.t("flash.no_permission")
    end
  end

  def set_plan
    @plan = Plan.find(params[:id])
  end

  def plan_params
    params.permit(
      :name, :description, :stripe_price_id, :stripe_product_id,
      :price_cents, :interval, :currency, :active, :position, :features
    )
  end

  def plan_json(plan)
    {
      id: plan.id,
      name: plan.name,
      description: plan.description,
      stripe_price_id: plan.stripe_price_id,
      stripe_product_id: plan.stripe_product_id,
      price_cents: plan.price_cents,
      formatted_price: plan.formatted_price,
      interval: plan.interval,
      currency: plan.currency,
      features: plan.features_list,
      active: plan.active,
      position: plan.position,
      created_at: plan.created_at,
      updated_at: plan.updated_at
    }
  end
end
