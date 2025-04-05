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

export const Forum = {
  conversations: [Conversation],
}

export const Group = {
  id: String,
  forum: Forum
}
