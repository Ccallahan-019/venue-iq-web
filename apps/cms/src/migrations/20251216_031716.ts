import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "inventory_items_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source_id" integer NOT NULL,
  	"price" numeric NOT NULL,
  	"item_code" varchar
  );
  
  CREATE TABLE "vendors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"name" varchar NOT NULL,
  	"venue_id" integer NOT NULL,
  	"primary_contact_phone" varchar NOT NULL,
  	"primary_contact_email" varchar NOT NULL,
  	"primary_contact_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "vendors_id" integer;
  ALTER TABLE "inventory_items_sources" ADD CONSTRAINT "inventory_items_sources_source_id_vendors_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."vendors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "inventory_items_sources" ADD CONSTRAINT "inventory_items_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."inventory_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendors" ADD CONSTRAINT "vendors_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vendors" ADD CONSTRAINT "vendors_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "inventory_items_sources_order_idx" ON "inventory_items_sources" USING btree ("_order");
  CREATE INDEX "inventory_items_sources_parent_id_idx" ON "inventory_items_sources" USING btree ("_parent_id");
  CREATE INDEX "inventory_items_sources_source_idx" ON "inventory_items_sources" USING btree ("source_id");
  CREATE INDEX "vendors_tenant_idx" ON "vendors" USING btree ("tenant_id");
  CREATE INDEX "vendors_name_idx" ON "vendors" USING btree ("name");
  CREATE INDEX "vendors_venue_idx" ON "vendors" USING btree ("venue_id");
  CREATE INDEX "vendors_updated_at_idx" ON "vendors" USING btree ("updated_at");
  CREATE INDEX "vendors_created_at_idx" ON "vendors" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vendors_fk" FOREIGN KEY ("vendors_id") REFERENCES "public"."vendors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_vendors_id_idx" ON "payload_locked_documents_rels" USING btree ("vendors_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "inventory_items_sources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vendors" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "inventory_items_sources" CASCADE;
  DROP TABLE "vendors" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_vendors_fk";
  
  DROP INDEX "payload_locked_documents_rels_vendors_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "vendors_id";`)
}
