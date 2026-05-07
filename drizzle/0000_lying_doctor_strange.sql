CREATE TABLE "admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"username" varchar,
	"password" varchar NOT NULL,
	"full_name" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"brand" varchar NOT NULL,
	"category" varchar NOT NULL,
	"price" integer NOT NULL,
	"original_price" integer,
	"rating" real DEFAULT 0 NOT NULL,
	"review_count" integer DEFAULT 0 NOT NULL,
	"image" varchar NOT NULL,
	"affiliate_url" varchar NOT NULL,
	"description" text NOT NULL,
	"short_desc" varchar NOT NULL,
	"skin_types" json DEFAULT '[]'::json NOT NULL,
	"tags" json DEFAULT '[]'::json NOT NULL,
	"ingredients" json,
	"how_to_use" text,
	"volume" varchar,
	"in_stock" boolean DEFAULT true NOT NULL,
	"commission_rate" real DEFAULT 0 NOT NULL
);
