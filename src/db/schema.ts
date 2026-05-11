import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  real,
  boolean,
  json,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const admin = pgTable("admin", {
  id: serial("id").primaryKey(),
  email: varchar("email").unique().notNull(),
  username: varchar("username"),
  password: varchar("password").notNull(),
  fullName: varchar("full_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const product = pgTable("product", {
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull(),
  brand: varchar("brand").notNull(),
  category: varchar("category").notNull(),
  price: integer("price").notNull(),
  originalPrice: integer("original_price"),
  rating: real("rating").default(0).notNull(),
  reviewCount: integer("review_count").default(0).notNull(),
  image: varchar("image").notNull(),
  affiliateUrl: varchar("affiliate_url").notNull(),
  description: text("description").notNull(),
  shortDesc: varchar("short_desc").notNull(),
  skinTypes: json("skin_types").$type<string[]>().default([]).notNull(),
  tags: json("tags").$type<string[]>().default([]).notNull(),
  ingredients: json("ingredients"),
  howToUse: text("how_to_use"),
  volume: varchar("volume"),
  inStock: boolean("in_stock").default(true).notNull(),
  commissionRate: real("commission_rate").default(0).notNull(),
});

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  label: varchar("label").notNull(),
  image: varchar("image").notNull(),
  isSpecial: boolean("is_special").default(false).notNull(),
  slug: varchar("slug").unique().notNull(),
});

export const productImage = pgTable("product_image", {
  id: serial("id").primaryKey(),
  productId: varchar("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  url: varchar("url").notNull(),
  order: integer("order").default(0).notNull(),
});

// Relations
export const productRelations = relations(product, ({ many }) => ({
  images: many(productImage),
}));

export const productImageRelations = relations(productImage, ({ one }) => ({
  product: one(product, {
    fields: [productImage.productId],
    references: [product.id],
  }),
}));

// Types
export type Admin = typeof admin.$inferSelect;
export type NewAdmin = typeof admin.$inferInsert;

export type Product = typeof product.$inferSelect;
export type NewProduct = typeof product.$inferInsert;

export type ProductImage = typeof productImage.$inferSelect;
export type NewProductImage = typeof productImage.$inferInsert;

export type Category = typeof category.$inferSelect;
export type NewCategory = typeof category.$inferInsert;
