export type ConversationProps = {
  id: string;
  content: {
    avatarUrl: string;
    items: {
      from: "human" | "gpt";
      value: string;
    }[];
  };
};

export interface Session {
  user: {
    email?: string | null;
    id?: string | null;
    name?: string | null;
  };
}
