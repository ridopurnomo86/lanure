CREATE TABLE "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"image" varchar NOT NULL,
	"is_special" boolean DEFAULT false NOT NULL,
	"slug" varchar NOT NULL,
	CONSTRAINT "category_slug_unique" UNIQUE("slug")
);
