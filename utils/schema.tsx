import { boolean, pgTable, serial, text, varchar, json } from "drizzle-orm/pg-core";

// AIOutput Table
export const AIOutput = pgTable('aiOutput', {
  id: serial('id').primaryKey(),
  formData: json('formData').notNull(),
  aiResponse: text('aiResponse'),
  templateSlug: varchar('templateSlug', { length: 255 }).notNull(),
  createdBy: varchar('createdBy', { length: 255 }).notNull(),
  createdAt: varchar('createdAt', { length: 255 }).default('NOW()'),
});

// UserSubscription Table
export const UserSubscription = pgTable('userSubscription', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  userName: varchar('userName', { length: 255 }).notNull(),
  active: boolean('active').default(false), // Default to inactive
  paymentId: varchar('paymentId', { length: 255 }).notNull(),
  joinDate: varchar('joinDate', { length: 255 }).default('NOW()'), // Default to current timestamp
});
