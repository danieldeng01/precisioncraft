import { index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Quote & contact requests submitted from the website.
 * `type` distinguishes a general contact message from a project quote request.
 */
export const inquiries = pgTable(
  "inquiries",
  {
    id: serial("id").primaryKey(),
    type: text("type").notNull().default("quote"),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    service: text("service").notNull().default("general"),
    message: text("message").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("inquiries_created_at_idx").on(table.createdAt),
    index("inquiries_type_idx").on(table.type),
  ],
);

/** Footer newsletter subscribers. */
export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("newsletter_created_at_idx").on(table.createdAt)],
);
