export type Sender = "user" | "operator" | "system";

export type Identity = {
  name: string;
  email: string;
};

export type ContactMessage = {
  id: string;
  sender: Sender;
  text: string;
  createdAt: number;
};

export type Conversation = {
  id: string;
  identity: Identity;
  threadTs?: string;
  createdAt: number;
  updatedAt: number;
};

export type SendMessageResult =
  | {
      ok: true;
      conversationId: string;
      messages: ContactMessage[];
    }
  | {
      ok: false;
      error:
        | "validation"
        | "rate_limited"
        | "missing_identity"
        | "slack_failed"
        | "internal";
      message: string;
    };
