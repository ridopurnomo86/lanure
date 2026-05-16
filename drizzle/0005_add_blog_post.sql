CREATE TABLE "blog_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"title" varchar NOT NULL,
	"date" varchar NOT NULL,
	"author" varchar NOT NULL,
	"category" varchar NOT NULL,
	"excerpt" text NOT NULL,
	"content" text NOT NULL,
	"image" varchar NOT NULL,
	"tags" json DEFAULT '[]'::json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "blog_post_slug_unique" UNIQUE("slug")
);
