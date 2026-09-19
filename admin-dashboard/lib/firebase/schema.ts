// lib/firebase/schema.ts
// TypeScript interfaces for every Firestore collection
// These are the single source of truth for the data model

import { Timestamp } from 'firebase/firestore';

// ─── companies/ ───────────────────────────────────────────────────────────────
export interface Company {
  id?: string;
  name: string;
  country: string;
  country_code: string;    // "USA", "GBR", etc.
  category_code: string;   // "C1"–"C4" → industry vertical
  service_code: string;    // "S1"–"S7" → primary service used
  revenue_code: number;    // deal size/tier (from r_code)
  description: string;
  logo_url?: string;       // Firebase Storage URL (future)
  is_featured: boolean;    // controls marquee visibility on public site
  is_active: boolean;
  created_at: Timestamp;
}

// ─── reviews/ ─────────────────────────────────────────────────────────────────
export interface Review {
  id?: string;
  rating: number;          // 1.0–5.0
  text: string;
  country: string;
  country_code: string;
  service: string;
  reviewer_name?: string;  // currently anonymous
  is_verified: boolean;
  is_published: boolean;   // admin can hide without deleting
  created_at: Timestamp;
}

// ─── employees/ ───────────────────────────────────────────────────────────────
export interface Employee {
  id?: string;
  name: string;
  role: string;
  department: string;
  location: string;
  level: string;           // "Executive Leadership", "Senior Lead", etc.
  focus: string;
  photo_url?: string;      // only for founders
  is_founder: boolean;     // controls whether photo is shown
  sort_order: number;
  is_active: boolean;
}

// ─── site_config/ ─────────────────────────────────────────────────────────────
export interface SiteMetrics {
  total_tasks: number;
  contractual_accounts: number;
  years_operational: number;
  employee_experience: number;
  total_clients?: number;
  total_employees_core?: number;
  contractual_fleet_size?: number;
}

// ─── content/ ─────────────────────────────────────────────────────────────────
export interface PageContent {
  id?: string;             // pageId: "homepage", "our-story", etc.
  hero_headline: string;
  hero_subtext: string;
  hero_image_url: string;
  sections: Record<string, string>; // extensible free-form section copy
}

// ─── inquiries/ ───────────────────────────────────────────────────────────────
export type InquiryStatus = 'new' | 'in_review' | 'responded' | 'closed';

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  company?: string;
  service_interest?: string;
  budget?: string;
  message: string;
  inquiry_type: 'discovery_call' | 'partnership' | 'quote' | 'general';
  status: InquiryStatus;
  created_at: Timestamp;
  admin_notes?: string;
}

// ─── talent_registry/ ─────────────────────────────────────────────────────────
export type TalentStatus = 'pending' | 'reviewed' | 'shortlisted' | 'rejected';

export interface TalentApplication {
  id?: string;
  full_name: string;
  email: string;
  location: string;
  domain: string;
  linkedin_url: string;
  resume_url: string;
  summary?: string;
  status: TalentStatus;
  created_at: Timestamp;
  reviewer_notes?: string;
}

// ─── users/ ───────────────────────────────────────────────────────────────────
export type UserRole = 'super_admin' | 'admin' | 'client' | 'viewer';

export interface AdminUser {
  uid: string;
  email: string;
  display_name?: string;
  role: UserRole;
  permissions: string[];
  client_company_id?: string; // for 'client' role users
  is_active: boolean;
  created_at: Timestamp;
}

// ─── mail_events/ ─────────────────────────────────────────────────────────────
export type MailTemplate = 'inquiry_notification' | 'talent_notification' | 'welcome' | 'status_update';
export type MailStatus = 'pending' | 'sent' | 'failed';

export interface MailEvent {
  id?: string;
  to: string;
  template: MailTemplate;
  payload: Record<string, unknown>;
  status: MailStatus;
  error?: string;
  created_at: Timestamp;
}
