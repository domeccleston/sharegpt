export interface ConversationProps {
  id: string;
  content: {
    avatarUrl: string;
    items: {
      from: "human" | "gpt";
      value: string;
    }[];
  };
  views: number;
}

export interface ConversationMeta {
  id: string;
  title: string;
  avatar: string;
  creator: {
    name: string;
    image: string;
  };
  upvotes: number;
  createdAt: string;
}

export interface Session {
  user: {
    email?: string | null;
    id?: string | null;
    name?: string | null;
  };
}
