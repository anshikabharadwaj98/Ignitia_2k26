import { sql } from "drizzle-orm";
import { pgTable, text, varchar,integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export const sponsorTierEnum = z.enum(["title", "platinum", "gold", "silver"]);

export const sponsors = pgTable("sponsors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  tier: text("tier").notNull(),
  logoUrl: text("logo_url"),
  websiteUrl: text("website_url"),
  displayOrder: integer("display_order").notNull().default(0),
});

export const insertSponsorSchema = createInsertSchema(sponsors).omit({
  id: true,
}).extend({
  tier: sponsorTierEnum,
  displayOrder: z.number().int().min(0),
});

export const updateSponsorSchema = insertSponsorSchema.partial();

export type InsertSponsor = z.infer<typeof insertSponsorSchema>;
export type UpdateSponsor = z.infer<typeof updateSponsorSchema>;
export type Sponsor = typeof sponsors.$inferSelect;

export const teams = pgTable("teams", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  imageUrl: text("image_url"),
  bio: text("bio"),
  socialLinks: text("social_links"),
  displayOrder: integer("display_order").notNull().default(0),
});

export const insertTeamSchema = createInsertSchema(teams).omit({
  id: true,
}).extend({
  displayOrder: z.number().int().min(0),
});

export const updateTeamSchema = insertTeamSchema.partial();

export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type UpdateTeam = z.infer<typeof updateTeamSchema>;
export type Team = typeof teams.$inferSelect;

