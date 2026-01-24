# frozen_string_literal: true

class Dashboard::ProjectMdController < InertiaController
  before_action :require_super_admin

  def index
  end

  def create
    content = generate_project_md(project_md_params)
    file_path = Rails.root.join("PROJECT.md")

    File.write(file_path, content)

    redirect_to dashboard_project_md_path, notice: "PROJECT.md generated successfully!"
  rescue StandardError => e
    redirect_to dashboard_project_md_path, alert: "Error generating PROJECT.md: #{e.message}"
  end

  private

  def require_super_admin
    return if Current.user&.super_admin?

    redirect_to dashboard_path, alert: "You don't have permission to access this page."
  end

  def project_md_params
    params.permit(
      :project_name,
      :project_description,
      :primary_vertical,
      :primary_background,
      :secondary_background,
      :warm_background,
      :accent_background,
      :primary_button,
      :primary_button_text,
      :warm_button,
      :warm_button_text,
      :accent,
      :accent_alt,
      :text_primary,
      :text_secondary,
      :text_warm,
      :text_warm_secondary,
      :success,
      :success_warm,
      :warning,
      :danger,
      :border,
      :border_warm,
      :font_family,
      :font_family_alt,
      :domain_models,
      :page_guidelines,
      :example_prompts,
      :initial_setup_prompts
    )
  end

  def generate_project_md(params)
    <<~MARKDOWN
      # #{params[:project_name]} — Project Guidelines

      > This project extends the [react-starter-kit CLAUDE.md](./CLAUDE.md).
      > See that file for tech stack, file structure, and coding patterns.

      ---

      ## Project Overview

      #{params[:project_description]}

      **Primary vertical:** #{params[:primary_vertical]}

      ---

      ## Design System

      ### Colors

      ```
      Primary Background:    #{params[:primary_background] || '#FFFFFF'}
      Secondary Background:  #{params[:secondary_background] || '#F9FAFB'}
      Warm Background:       #{params[:warm_background] || '#FFFDF9'}
      Accent Background:     #{params[:accent_background] || '#F5EDE4'}

      Primary Button:        #{params[:primary_button] || '#18181B'}
      Primary Button Text:   #{params[:primary_button_text] || '#FFFFFF'}

      Warm Button:           #{params[:warm_button] || '#3D2C1E'}
      Warm Button Text:      #{params[:warm_button_text] || '#FFFFFF'}

      Accent:                #{params[:accent] || '#D4A056'}
      Accent Alt:            #{params[:accent_alt] || '#C4725D'}

      Text Primary:          #{params[:text_primary] || '#18181B'}
      Text Secondary:        #{params[:text_secondary] || '#6B7280'}
      Text Warm:             #{params[:text_warm] || '#2D2A26'}
      Text Warm Secondary:   #{params[:text_warm_secondary] || '#6B5E54'}

      Success:               #{params[:success] || '#16A34A'}
      Success Warm:          #{params[:success_warm] || '#5E8C61'}
      Warning:               #{params[:warning] || '#F59E0B'}
      Danger:                #{params[:danger] || '#DC2626'}

      Border:                #{params[:border] || '#E5E7EB'}
      Border Warm:           #{params[:border_warm] || '#E8E0D8'}
      ```

      ### Typography

      ```
      Font Family:           #{params[:font_family] || 'Inter, system-ui, sans-serif'}
      Font Family Alt:       #{params[:font_family_alt] || "'DM Sans', system-ui, sans-serif"}

      Hero Headline:         48-64px, font-bold, tracking-tight
      Section Title:         32-40px, font-semibold
      Card Title:            18-20px, font-semibold
      Body:                  16px, font-normal
      Small:                 14px, font-normal
      Caption:               12px, font-medium, text-secondary
      ```

      ### Spacing Scale

      ```
      Base unit: 4px

      xs:   4px   (1)
      sm:   8px   (2)
      md:   16px  (4)
      lg:   24px  (6)
      xl:   32px  (8)
      2xl:  48px  (12)
      3xl:  64px  (16)
      4xl:  80px  (20)
      5xl:  120px (30)
      ```

      ### Border Radius

      ```
      Inputs:      8px   (rounded-lg)
      Cards:       12px  (rounded-xl)
      Buttons:     8px   (rounded-lg)
      Modals:      16px  (rounded-2xl)
      Pills/Tags:  9999px (rounded-full)
      ```

      ### Shadows

      ```
      Card:        shadow-sm or shadow (subtle)
      Dropdown:    shadow-lg
      Modal:       shadow-xl
      Hover lift:  shadow-md with -translate-y-1 transition
      ```

      ---

      ## Domain Models

      #{params[:domain_models]}

      ---

      ## Page-Specific Guidelines

      #{params[:page_guidelines]}

      ---

      ## Example Prompts

      #{params[:example_prompts]}

      ---

      ## Initial Setup Prompts

      #{params[:initial_setup_prompts]}
    MARKDOWN
  end
end
