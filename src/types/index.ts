export interface User {
  id: string;
  name: string;
  entity: string;
  role: UserRole;
  certificateInfo: CertificateInfo;
  avatar?: string;
}

export type UserRole = 'ctd' | 'minddevel' | 'minfi' | 'tresor' | 'auditeur' | 'admin';

export interface CertificateInfo {
  issuer: string;
  expiryDate: string;
  serialNumber: string;
  status: 'valid' | 'expired' | 'revoked';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: ProjectStatus;
  submittedBy: string;
  submissionDate: string;
  evaluationScore?: number;
  blockchainHash?: string;
}

export type ProjectStatus = 'submitted' | 'under_review' | 'approved' | 'rejected' | 'funded' | 'completed';

export interface KPIData {
  totalProjects: number;
  approvedProjects: number;
  totalBudget: number;
  averageProcessingTime: number;
}

export interface Transaction {
  id: string;
  type: string;
  amount?: number;
  timestamp: string;
  hash: string;
  signedBy: string;
  projectId?: string;
  projectTitle?: string;
  status?: string;
  blockNumber?: number;
  gasUsed?: number;
  gasPrice?: string;
  from?: string;
  to?: string;
  nonce?: number;
  data?: string;
  confirmations?: number;
  previousHash?: string;
  nextHash?: string;
  metadata?: {
    description?: string;
    category?: string;
    region?: string;
    evaluator?: string;
    evaluationScore?: number;
    comments?: string;
  };
}

export interface Evaluation {
  id: string;
  projectId: string;
  evaluatorId: string;
  score: number;
  comments: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  timestamp: string;
}

export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  averageScore: number;
}

export interface BudgetStats {
  totalBudget: number;
  approvedBudget: number;
  spentBudget: number;
  remainingBudget: number;
}
