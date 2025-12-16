import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_vendors_type" AS ENUM('food', 'beverage', 'beer', 'merchandise');
  CREATE TABLE "vendors_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_vendors_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "vendors_type" ADD CONSTRAINT "vendors_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vendors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "vendors_type_order_idx" ON "vendors_type" USING btree ("order");
  CREATE INDEX "vendors_type_parent_idx" ON "vendors_type" USING btree ("parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "vendors_type" CASCADE;
  DROP TYPE "public"."enum_vendors_type";`)
}
