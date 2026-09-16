export enum NotificationType {
  LIKE = 'like',
  COMMENT = 'comment',
  MENTION = 'mention',
  FOLLOW = 'follow',
}

export class Notification {
  constructor(
    public id: string,
    public userId: string,
    public type: NotificationType,
    public title: string,
    public message: string,
    public relatedId: string, // postId, commentId, etc
    public read: boolean = false,
    public timestamp: number = Date.now()
  ) {}

  static fromJSON(data: any): Notification {
    return new Notification(
      data.id,
      data.userId,
      data.type as NotificationType,
      data.title,
      data.message,
      data.relatedId,
      data.read,
      data.timestamp
    );
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      type: this.type,
      title: this.title,
      message: this.message,
      relatedId: this.relatedId,
      read: this.read,
      timestamp: this.timestamp,
    };
  }

  markAsRead() {
    this.read = true;
  }
}
