export const mockProfile = {
  username: "alex.rivera",
  fullName: "Alex Rivera",
  avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=alex",
  bio: "Design lover | Coffee addict ☕ | Always exploring new places 🌍 | Let's grab a drink sometime 🍷",
  followers: 48200,
  following: 892,
  posts: 1247,
  engagement: 4.2,
  verified: true,
};

export const mockInsights = {
  tone: {
    label: "Tone & Voice",
    value: "Warm, witty, and genuine. Communicates with ease and humor. Prefers casual conversations with depth over small talk.",
    score: 82,
  },
  topics: {
    label: "Topics of Interest",
    items: ["Travel", "Design", "Coffee Culture", "Photography", "Sustainability", "Live Music"],
  },
  words: {
    label: "Most Used Words",
    items: [
      { word: "explore", count: 142 },
      { word: "create", count: 128 },
      { word: "love", count: 115 },
      { word: "discover", count: 98 },
      { word: "vibe", count: 87 },
      { word: "story", count: 76 },
      { word: "adventure", count: 65 },
      { word: "dream", count: 58 },
    ],
  },
  personality: {
    label: "Personality",
    traits: [
      { trait: "Openness", score: 88 },
      { trait: "Conscientiousness", score: 75 },
      { trait: "Extraversion", score: 70 },
      { trait: "Agreeableness", score: 65 },
      { trait: "Emotional Stability", score: 78 },
    ],
  },
  posture: {
    label: "Thoughts & Posture",
    value: "Values authenticity and meaningful connections. Prefers quality time over superficial interactions. Open-minded and curious about the world.",
  },
  interests: {
    label: "Interests",
    items: ["Photography", "Architecture", "Travel", "Coffee Culture", "Minimalist Design", "Podcasts"],
  },
  flags: {
    label: "Flags",
    items: [
      { text: "Dislikes people who are always on their phone during conversations", type: "warning" as const },
      { text: "Can be guarded at first — takes time to open up", type: "warning" as const },
      { text: "Loves deep conversations and intellectual topics", type: "success" as const },
      { text: "Very loyal once trust is established", type: "success" as const },
    ],
  },
};

export const mockStrategyQA = [
  {
    id: "icebreakers",
    question: "What are good icebreakers?",
    answer: "Ask about their recent travels or a photo they posted — they love sharing stories. You could also mention a coffee spot you've been wanting to try, or ask about their favorite design project. Keep it light and genuine.",
    icon: "MessageSquare",
  },
  {
    id: "avoid",
    question: "What should I avoid talking about?",
    answer: "Don't lead with overly personal questions right away — they take time to warm up. Avoid being on your phone during the conversation. Steer clear of negative gossip or complaining; they prefer positive, forward-looking conversations.",
    icon: "ShieldAlert",
  },
  {
    id: "topics",
    question: "What topics should I bring up?",
    answer: "Travel experiences work great — ask about a place they've been recently. Design and creativity are natural fits. Coffee culture is an easy win. If you've listened to any interesting podcasts lately, that's a great shared interest to explore.",
    icon: "Handshake",
  },
  {
    id: "common",
    question: "What do we have in common?",
    answer: "Based on their profile, you can connect over photography, exploring new neighborhoods, trying new coffee shops, or discussing minimalist design. They also enjoy live music — suggest catching a show sometime.",
    icon: "Briefcase",
  },
  {
    id: "contact",
    question: "How should I reach out?",
    answer: "A thoughtful DM referencing something specific from their posts works best. Keep it short, genuine, and suggest something casual — like grabbing coffee or checking out an exhibit. They respond well to low-pressure invitations.",
    icon: "Mail",
  },
  {
    id: "impression",
    question: "How to make a great first impression?",
    answer: "Be present and engaged. Ask thoughtful questions and listen actively. Share something genuine about yourself. They value authenticity over trying too hard. A relaxed, curious attitude goes a long way.",
    icon: "Presentation",
  },
  {
    id: "followup",
    question: "How to follow up after meeting?",
    answer: "Send a message within 24 hours referencing something specific you talked about. Share a link, photo, or recommendation that connects to your conversation. Keep it casual but show you were paying attention.",
    icon: "Scale",
  },
];

export const mockChatPersonas = [
  {
    id: "friendly",
    name: "Warm & Open",
    description: "They're in a great mood and genuinely happy to chat. Practice having a flowing conversation.",
    color: "success",
    systemPrompt: "You are Alex Rivera, warm and open to meeting new people. You're genuinely interested in getting to know them.",
  },
  {
    id: "tough",
    name: "Reserved & Cautious",
    description: "They're a bit guarded at first. Practice building trust through genuine conversation.",
    color: "warning",
    systemPrompt: "You are Alex Rivera, a bit reserved at first. You need to feel that the other person is genuine before opening up.",
  },
  {
    id: "irrational",
    name: "Distracted & Busy",
    description: "They seem preoccupied. Practice keeping their attention and making the conversation count.",
    color: "destructive",
    systemPrompt: "You are Alex Rivera, distracted and busy. You're not fully engaged in the conversation right now.",
  },
];
