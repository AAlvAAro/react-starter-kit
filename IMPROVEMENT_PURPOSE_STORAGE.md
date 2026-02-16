# Improvement: Purpose-Based Insights Storage

## Current Design (Problem)

Each purpose (business, dating) has 3 dedicated columns on `instagram_profiles`:

```
business_insights_data, business_strategy_data, business_templates_data
dating_insights_data, dating_strategy_data, dating_templates_data
```

**Issues:**
- Adding a new purpose (e.g. "friendship", "mentorship") requires a migration for 3 new columns each time
- The table grows wide with many JSON columns
- Columns like `insights_data`, `strategy_data`, `personas_data`, `message_templates_data` are now unused legacy columns
- No metadata about when each purpose's insights were generated

## Proposed Improvement: Separate `profile_insights` Table

### New Table: `profile_insights`

```ruby
create_table :profile_insights do |t|
  t.references :instagram_profile, null: false, foreign_key: true
  t.string :purpose, null: false          # "business", "dating", "friendship", etc.
  t.string :insight_type, null: false     # "insights", "strategy", "templates"
  t.json :data, null: false
  t.datetime :generated_at, null: false
  t.timestamps
end

add_index :profile_insights, [:instagram_profile_id, :purpose, :insight_type], unique: true, name: "idx_profile_insights_unique"
```

### Benefits
1. **Extensible** - Add new purposes without migrations
2. **Normalized** - No wide table with many JSON columns
3. **Metadata** - Track when each specific insight was generated
4. **Cacheable** - Easy to invalidate/regenerate specific insights
5. **Queryable** - Find all profiles with dating insights, etc.

### Model

```ruby
class ProfileInsight < ApplicationRecord
  belongs_to :instagram_profile

  PURPOSES = %w[business dating].freeze
  INSIGHT_TYPES = %w[insights strategy templates].freeze

  validates :purpose, inclusion: { in: PURPOSES }
  validates :insight_type, inclusion: { in: INSIGHT_TYPES }
  validates :purpose, uniqueness: { scope: [:instagram_profile_id, :insight_type] }

  scope :for_purpose, ->(purpose) { where(purpose: purpose) }
  scope :insights, -> { where(insight_type: "insights") }
  scope :strategy, -> { where(insight_type: "strategy") }
  scope :templates, -> { where(insight_type: "templates") }
end
```

### Usage

```ruby
# InstagramProfile model
class InstagramProfile < ApplicationRecord
  has_many :profile_insights, dependent: :destroy

  def insights_for(purpose)
    {
      insights: profile_insights.find_by(purpose: purpose, insight_type: "insights")&.data,
      strategy: profile_insights.find_by(purpose: purpose, insight_type: "strategy")&.data&.dig("sections"),
      message_templates: profile_insights.find_by(purpose: purpose, insight_type: "templates")&.data&.dig("templates")
    }
  end

  def insights_stale?(purpose:)
    !profile_insights.exists?(purpose: purpose, insight_type: "insights")
  end
end
```

### Migration Path
1. Create `profile_insights` table
2. Migrate existing data from JSON columns to new table
3. Update generators to write to new table
4. Update controller to read from new table
5. Remove old JSON columns in a follow-up migration
6. Clean up legacy columns (`insights_data`, `strategy_data`, `personas_data`, `message_templates_data`)

### Where to Start
1. **Create the migration** for the new `profile_insights` table
2. **Create the model** with validations and scopes
3. **Write a data migration** script to move existing data
4. **Update generators** to save to the new table instead of columns
5. **Update `InstagramProfile`** model methods
6. **Update controller** (should be minimal since `insights_for` interface stays the same)
7. **Test everything**, then remove old columns
