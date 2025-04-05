export const GROUPS = {
  ARCTERYX_COMMUNITY_GRANT: "Arc'teryx Community Grant Program",
  STRATEGIC_PARTNERSHIPS: "Strategic Partnerships Program", 
  PARTICIPATORY_GRANTMAKING: "Participatory Grantmaking Program"
}

export const Message = {
  id: String,
  text: String,
  createdAt: Date,
  author: String,
}

export const Conversation = {
  id: String,
  title: String,
  messages: [Message],
}
