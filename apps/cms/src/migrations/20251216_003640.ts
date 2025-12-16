import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_venues_type" AS ENUM('sportsStadium', 'concertArena', 'collegeVenue', 'minorLeaguePark', 'conventionCenter', 'other');
  CREATE TYPE "public"."enum_venues_location_state" AS ENUM('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY');
  CREATE TYPE "public"."enum_venues_time_zone" AS ENUM('America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Anchorage', 'Pacific/Honolulu');
  CREATE TYPE "public"."enum_inventory_items_unit_of_measure" AS ENUM('each', 'case', 'pack', 'lb', 'oz', 'gal', 'l', 'ml');
  CREATE TYPE "public"."enum_inventory_items_costing_method" AS ENUM('fifo', 'weightedAverage');
  CREATE TABLE "venues" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"name" varchar NOT NULL,
  	"type" "enum_venues_type" NOT NULL,
  	"location_address_line1" varchar NOT NULL,
  	"location_address_line2" varchar,
  	"location_city" varchar NOT NULL,
  	"location_state" "enum_venues_location_state" NOT NULL,
  	"location_zip_code" varchar NOT NULL,
  	"capacity" numeric NOT NULL,
  	"time_zone" "enum_venues_time_zone" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "inventory_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"name" varchar NOT NULL,
  	"venue_id" integer NOT NULL,
  	"unit_of_measure" "enum_inventory_items_unit_of_measure" NOT NULL,
  	"category" varchar NOT NULL,
  	"costing_method" "enum_inventory_items_costing_method" DEFAULT 'fifo' NOT NULL,
  	"unit_cost" numeric NOT NULL,
  	"par_level" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "venues_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "inventory_items_id" integer;
  ALTER TABLE "venues" ADD CONSTRAINT "venues_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "venues_tenant_idx" ON "venues" USING btree ("tenant_id");
  CREATE INDEX "venues_name_idx" ON "venues" USING btree ("name");
  CREATE INDEX "venues_updated_at_idx" ON "venues" USING btree ("updated_at");
  CREATE INDEX "venues_created_at_idx" ON "venues" USING btree ("created_at");
  CREATE INDEX "inventory_items_tenant_idx" ON "inventory_items" USING btree ("tenant_id");
  CREATE INDEX "inventory_items_name_idx" ON "inventory_items" USING btree ("name");
  CREATE INDEX "inventory_items_venue_idx" ON "inventory_items" USING btree ("venue_id");
  CREATE INDEX "inventory_items_category_idx" ON "inventory_items" USING btree ("category");
  CREATE INDEX "inventory_items_updated_at_idx" ON "inventory_items" USING btree ("updated_at");
  CREATE INDEX "inventory_items_created_at_idx" ON "inventory_items" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_venues_fk" FOREIGN KEY ("venues_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_inventory_items_fk" FOREIGN KEY ("inventory_items_id") REFERENCES "public"."inventory_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_venues_id_idx" ON "payload_locked_documents_rels" USING btree ("venues_id");
  CREATE INDEX "payload_locked_documents_rels_inventory_items_id_idx" ON "payload_locked_documents_rels" USING btree ("inventory_items_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "venues" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "inventory_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "venues" CASCADE;
  DROP TABLE "inventory_items" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_venues_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_inventory_items_fk";
  
  DROP INDEX "payload_locked_documents_rels_venues_id_idx";
  DROP INDEX "payload_locked_documents_rels_inventory_items_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "venues_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "inventory_items_id";
  DROP TYPE "public"."enum_venues_type";
  DROP TYPE "public"."enum_venues_location_state";
  DROP TYPE "public"."enum_venues_time_zone";
  DROP TYPE "public"."enum_inventory_items_unit_of_measure";
  DROP TYPE "public"."enum_inventory_items_costing_method";`)
}
