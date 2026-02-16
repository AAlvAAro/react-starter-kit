# Future Features

## Premium Personalization (Freemium Model)

### Concept
Allow users to create a personality profile, then generate **personalized compatibility insights** between the user and the Instagram profile they're researching.

### Free Tier (Current)
- Generic insights about the target person's personality, interests, communication style
- Basic prep guide and message templates
- Same insights for all users viewing that profile

### Premium Tier (Future)
- User completes a **personality profile** via:
  - Quiz (multiple choice questions about communication style, interests, values)
  - Text input (describe yourself, your goals, your communication preferences)
  - Voice input (speak about yourself, AI transcribes and analyzes)
- AI generates **compatibility analysis** between user and target
- Personalized conversation strategies based on **both** personalities
- Custom message templates tailored to user's communication style
- Purpose-specific (business networking vs dating) recommendations

### Database Changes Needed
1. Create `UserProfile` model with personality/preferences columns
2. Add personalized insight columns to `ProfileSearch`
3. Add `premium` flag to track which searches used premium features
4. Consider caching personalized insights per user+profile+purpose combination

### User Flow
1. **Free**: Search profile → See generic insights
2. **Premium**: Complete personality quiz → Search profile → See personalized compatibility + strategies

### Billing Integration
- Track premium searches for billing purposes
- Consider per-search pricing or monthly subscription with X premium searches included
