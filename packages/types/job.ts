import { Note } from './note';
import { ApplicationStatus } from './application-status';

export interface Job {
    id: string;
    userId: string;
    company: string;
    role: string;
    url?: string;
    status: ApplicationStatus;
    tags?: string[];
    appliedAt?: Date;
    notes?: Note[];
    createdAt: Date;
    updatedAt: Date;
}