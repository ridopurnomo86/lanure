CREATE TABLE "product_image" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" varchar NOT NULL,
	"url" varchar NOT NULL,
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;