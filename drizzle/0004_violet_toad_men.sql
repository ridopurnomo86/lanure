CREATE TABLE "product_video" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" varchar NOT NULL,
	"url" varchar NOT NULL,
	"type" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product_video" ADD CONSTRAINT "product_video_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;