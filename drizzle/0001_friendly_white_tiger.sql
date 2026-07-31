CREATE INDEX "inquiries_created_at_idx" ON "inquiries" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "inquiries_type_idx" ON "inquiries" USING btree ("type");--> statement-breakpoint
CREATE INDEX "newsletter_created_at_idx" ON "newsletter_subscribers" USING btree ("created_at");