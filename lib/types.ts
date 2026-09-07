export interface CivicEntity {
  id: string;
  source: string;
  timestamp: string;
  reliability: number;
}

// Core civic entity types
export interface GovernmentMeeting extends CivicEntity {
  title: string;
  date: Date;
  content: string;
  attendees: string[];
  outcomes: string[];
  voteResult: "yes" | "no" | "abstain" | "not_present";
  resolutions: Record<string, string>;
}

// Election-related entities
export interface Candidate extends CivicEntity {
  name: string;
  party: string;
  platform: string[];
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  campaignFinance: {
    contributions: string[];
    sources: string[];
  };
  endorsements: string[];
}

// Urban planning and civic projects
export interface CivicProject extends CivicEntity {
  name: string;
  location: {
    address: string;
    coordinates: [number, number];
  };
  type: "infrastructure" | "public_works" | "community";
  status: "planning" | "design" | "construction" | "completed";
  budgetEstimate: number;
}

// Enhanced Legal/judicial entities with comprehensive court coverage

export type CourtVenue = 
  | "county_circuit"
  | "county_chancery" 
  | "county_general_sessions"
  | "county_juvenile"
  | "county_probate"
  | "county_municipal"
  | "state_circuit"
  | "state_chancery"
  | "state_criminal_court"
  | "state_appellate"
  | "state_supreme"
  | "federal_district"
  | "federal_bankruptcy"
  | "federal_appeals"
  | "federal_supreme"
  | "other";

export type CaseType = 
  | "civil"
  | "criminal"
  | "family"
  | "probate"
  | "juvenile"
  | "traffic"
  | "small_claims"
  | "landlord_tenant"
  | "contract"
  | "tort"
  | "property"
  | "employment"
  | "civil_rights"
  | "environmental"
  | "administrative"
  | "appeal"
  | "writ"
  | "other";

export type CaseStatus = 
  | "filed"
  | "pending"
  | "active"
  | "stayed"
  | "dismissed"
  | "settled"
  | "judgment_entered"
  | "appealed"
  | "remanded"
  | "closed"
  | "archived";

export interface Party {
  name: string;
  type: "individual" | "corporation" | "government" | "organization" | "unknown";
  role: "plaintiff" | "defendant" | "petitioner" | "respondent" | "appellant" | "appellee" | "third_party" | "intervenor";
  attorney?: string;
  attorneyFirm?: string;
  address?: string;
  isProSe?: boolean;
}

export interface Attorney {
  name: string;
  firm?: string;
  barNumber?: string;
  email?: string;
  phone?: string;
  represents: "plaintiff" | "defendant" | "petitioner" | "respondent" | "appellant" | "appellee";
}

export interface Hearing {
  date: Date;
  time?: string;
  type: "arraignment" | "pre_trial" | "motion" | "status_conference" | "trial" | "sentencing" | "hearing" | "oral_argument" | "status" | "other";
  judge: string;
  location?: string;
  virtualLink?: string;
  result?: "held" | "continued" | "cancelled" | "rescheduled";
  notes?: string;
}

export interface Filing {
  date: Date;
  type: "complaint" | "answer" | "motion" | "brief" | "order" | "judgment" | "notice" | "subpoena" | "exhibit" | "transcript" | "other";
  title: string;
  documentId?: string;
  url?: string;
  filedBy?: string;
  pages?: number;
  sealed?: boolean;
}

export interface DocketEntry {
  date: Date;
  entryNumber?: number;
  description: string;
  filingType?: string;
  documentId?: string;
  url?: string;
  parties?: string[];
}

export interface Judgment {
  date: Date;
  type: "default" | "summary" | "after_trial" | "consent" | "stipulated" | "other";
  amount?: number;
  reliefGranted?: string;
  appealed?: boolean;
  appealCaseNumber?: string;
}

export interface AppealInfo {
  appealed: boolean;
  appealDate?: Date;
  appellateCourt?: string;
  appealCaseNumber?: string;
  status?: "pending" | "briefed" | "argued" | "decided" | "dismissed";
  outcome?: "affirmed" | "reversed" | "remanded" | "vacated" | "modified";
}

export interface CourtCase extends CivicEntity {
  // Core identification
  caseNumber: string;
  docketNumber?: string;
  venue: CourtVenue;
  courtName: string;
  county?: string;
  state: string;
  
  // Case classification
  caseType: CaseType;
  caseSubtype?: string;
  status: CaseStatus;
  
  // Parties
  parties: Party[];
  attorneys: Attorney[];
  
  // Timeline
  filedDate: Date;
  closedDate?: Date;
  statuteOfLimitationsDate?: Date;
  
  // Judge assignment
  assignedJudge?: string;
  magistrateJudge?: string;
  
  // Hearings
  hearings: Hearing[];
  nextHearingDate?: Date;
  
  // Filings and docket
  filings: Filing[];
  docket: DocketEntry[];
  
  // Charges/claims
  charges?: string[];
  claims?: string[];
  causesOfAction?: string[];
  
  // Outcomes
  judgment?: Judgment;
  settlement?: {
    date: Date;
    terms?: string;
    amount?: number;
    confidential?: boolean;
  };
  dismissal?: {
    date: Date;
    type: "with_prejudice" | "without_prejudice" | "voluntary" | "involuntary";
    reason?: string;
  };
  
  // Appeals
  appeal?: AppealInfo;
  
  // Financial
  filingFees?: number;
  costsAwarded?: number;
  attorneyFeesAwarded?: number;
  damagesAwarded?: number;
  
  // Related cases
  relatedCases?: {
    caseNumber: string;
    relationship: "consolidated" | "related" | "counterclaim" | "cross_claim" | "appeal" | "remand" | "transfer";
    venue?: string;
  }[];
  
  // Additional metadata
  tags?: string[];
  notes?: string;
  isSealed?: boolean;
  isPublicRecord?: boolean;
  mediaCoverage?: string[];
  
  // Source tracking
  sourceSystem: string;
  sourceUrl?: string;
  lastFetched: Date;
  fetchVersion: number;
}

// News/event entities
export interface CivicNews extends CivicEntity {
  category: "election_coverage" | "government_meetings" | "court_cases" | "civic_events";
  source: "Herald-Citizen" | "Sheriff-Department" | string;
  contentSummary: string;
  fullLink: string;
}

// General trustable contact points
export interface GovernmentContact extends CivicEntity {
  name: string;
  title: string;
  department: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    website: string;
  };
}

// Rating system for data quality
export enum Reliability { LOW = 0.5, MEDIUM = 0.75, HIGH = 0.95 }

// Utilities for schema conversion
export function mapSheriffDeptToSchema(data: SheriffDeptData): CivicEntity[] {
  // Implementation would map each data type to CivicEntity with proper fields
}

// Add similar mapping functions for Herald-Citizen and other connectors