import { type User, type InsertUser,type Sponsor, type InsertSponsor, type Team, type InsertTeam } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

getAllSponsors(): Promise<Sponsor[]>;
  getSponsor(id: string): Promise<Sponsor | undefined>;
  createSponsor(sponsor: InsertSponsor): Promise<Sponsor>;
  updateSponsor(id: string, sponsor: Partial<InsertSponsor>): Promise<Sponsor | undefined>;
  deleteSponsor(id: string): Promise<boolean>;
  
  getAllTeams(): Promise<Team[]>;
  getTeam(id: string): Promise<Team | undefined>;
  createTeam(team: InsertTeam): Promise<Team>;
  updateTeam(id: string, team: Partial<InsertTeam>): Promise<Team | undefined>;
  deleteTeam(id: string): Promise<boolean>;
}export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private sponsors: Map<string, Sponsor>;
  private teams: Map<string, Team>;

  constructor() {
    this.users = new Map();
    this.sponsors = new Map();
    this.teams = new Map();
    this.seedSponsors();
    this.seedTeams();
  }
private seedSponsors() {
    const initialSponsors: InsertSponsor[] = [
      { name: "Tech Giants Inc.", tier: "title", displayOrder: 1 },
      { name: "Innovation Labs", tier: "platinum", displayOrder: 1 },
      { name: "Digital Solutions", tier: "platinum", displayOrder: 2 },
      { name: "Future Tech", tier: "platinum", displayOrder: 3 },
      { name: "Cloud Systems", tier: "gold", displayOrder: 1 },
      { name: "Smart Corp", tier: "gold", displayOrder: 2 },
      { name: "Tech Vision", tier: "gold", displayOrder: 3 },
      { name: "Code Masters", tier: "gold", displayOrder: 4 },
      { name: "Startup Hub", tier: "silver", displayOrder: 1 },
      { name: "Dev Tools", tier: "silver", displayOrder: 2 },
      { name: "Data Analytics", tier: "silver", displayOrder: 3 },
      { name: "AI Innovations", tier: "silver", displayOrder: 4 },
      { name: "Web Solutions", tier: "silver", displayOrder: 5 },
      { name: "Mobile First", tier: "silver", displayOrder: 6 },
    ];

    initialSponsors.forEach(sponsor => {
      const id = randomUUID();
      this.sponsors.set(id, { ...sponsor, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

async getAllSponsors(): Promise<Sponsor[]> {
    return Array.from(this.sponsors.values()).sort((a, b) => {
      const tierOrder = { title: 0, platinum: 1, gold: 2, silver: 3 };
      const tierA = tierOrder[a.tier as keyof typeof tierOrder] ?? 999;
      const tierB = tierOrder[b.tier as keyof typeof tierOrder] ?? 999;
      if (tierA !== tierB) return tierA - tierB;
      return a.displayOrder - b.displayOrder;
    });
  }

  async getSponsor(id: string): Promise<Sponsor | undefined> {
    return this.sponsors.get(id);
  }

  async createSponsor(insertSponsor: InsertSponsor): Promise<Sponsor> {
    const id = randomUUID();
    const sponsor: Sponsor = { ...insertSponsor, id };
    this.sponsors.set(id, sponsor);
    return sponsor;
  }

  async updateSponsor(id: string, updates: Partial<InsertSponsor>): Promise<Sponsor | undefined> {
    const existing = this.sponsors.get(id);
    if (!existing) return undefined;
    
    const updated: Sponsor = { ...existing, ...updates };
    this.sponsors.set(id, updated);
    return updated;
  }

  async deleteSponsor(id: string): Promise<boolean> {
    return this.sponsors.delete(id);
  }

  private seedTeams() {
    const initialTeams: InsertTeam[] = [
      { name: "Dr. Rajesh Kumar", role: "Faculty Coordinator", bio: "Professor of Computer Science with 15 years of experience", displayOrder: 1 },
      { name: "Priya Sharma", role: "Student Coordinator", bio: "Final year CS student passionate about tech events", displayOrder: 2 },
      { name: "Arjun Patel", role: "Technical Lead", bio: "Leading the technical infrastructure team", displayOrder: 3 },
      { name: "Sneha Reddy", role: "Design Head", bio: "Creating stunning visuals for Ignitia 2K26", displayOrder: 4 },
      { name: "Rahul Verma", role: "Marketing Head", bio: "Spreading the word about our amazing event", displayOrder: 5 },
      { name: "Ananya Singh", role: "Sponsorship Lead", bio: "Building partnerships with industry leaders", displayOrder: 6 },
      { name: "Vikram Joshi", role: "Logistics Manager", bio: "Ensuring smooth event operations", displayOrder: 7 },
      { name: "Meera Kapoor", role: "Content Writer", bio: "Crafting compelling stories and content", displayOrder: 8 },
    ];

    initialTeams.forEach(team => {
      const id = randomUUID();
      this.teams.set(id, { ...team, id });
    });
  }

  async getAllTeams(): Promise<Team[]> {
    return Array.from(this.teams.values()).sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getTeam(id: string): Promise<Team | undefined> {
    return this.teams.get(id);
  }

  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    const id = randomUUID();
    const team: Team = { ...insertTeam, id };
    this.teams.set(id, team);
    return team;
  }

  async updateTeam(id: string, updates: Partial<InsertTeam>): Promise<Team | undefined> {
    const existing = this.teams.get(id);
    if (!existing) return undefined;
    
    const updated: Team = { ...existing, ...updates };
    this.teams.set(id, updated);
    return updated;
  }

  async deleteTeam(id: string): Promise<boolean> {
    return this.teams.delete(id);
  }
}


export const storage = new MemStorage();
