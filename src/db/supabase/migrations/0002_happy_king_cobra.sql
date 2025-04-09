CREATE TABLE "cecila123_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"service" text NOT NULL,
	"message" text,
	"quote" text,
	"zip_code" text NOT NULL,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"utm_content" text,
	"ip_address" text,
	"user_agent" text,
	"form_source" text,
	"submission_date" timestamp with time zone DEFAULT now(),
	"status" text DEFAULT 'pending' NOT NULL,
	"followed_by" text,
	"followed_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "cecilia123_updates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"submission_id" uuid NOT NULL,
	"content" text NOT NULL,
	"updated_by" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "cecilia123_updates" ADD CONSTRAINT "cecilia123_updates_submission_id_cecila123_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."cecila123_submissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cecilia123_updates" ADD CONSTRAINT "cecilia123_updates_updated_by_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;