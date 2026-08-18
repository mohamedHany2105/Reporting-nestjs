// enums: meaning you declare a state like approved or rejected, Happy or sad & ETC...
export enum AiGenerationStatus {
  Queued = 'queued',
  Generated = 'generated',
  PendingReview = 'pending_review',
  Approved = 'approved',
  Rejected = 'rejected',
  Sent = 'sent',
  Failed = 'failed',
}