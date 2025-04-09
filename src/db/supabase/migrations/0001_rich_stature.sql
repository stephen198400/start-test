CREATE TYPE "public"."role" AS ENUM('admin', 'boss', 'manager', 'designer', 'applicant');--> statement-breakpoint
CREATE TABLE "route_access" (
	"id" text PRIMARY KEY NOT NULL,
	"route_id" text NOT NULL,
	"user_id" text NOT NULL,
	"role" "role" DEFAULT 'designer',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" text
);
--> statement-breakpoint
ALTER TABLE "route_access" ADD CONSTRAINT "route_access_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "route_access" ADD CONSTRAINT "route_access_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;