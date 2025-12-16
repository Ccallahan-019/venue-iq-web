import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tenants_defaults_time_zone" AS ENUM('America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Anchorage', 'Pacific/Honolulu');
  ALTER TABLE "tenants" ADD COLUMN "defaults_time_zone" "enum_tenants_defaults_time_zone" DEFAULT 'America/New_York';
  ALTER TABLE "tenants" DROP COLUMN "defaults_timezone";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tenants" ADD COLUMN "defaults_timezone" varchar DEFAULT 'America/New_York';
  ALTER TABLE "tenants" DROP COLUMN "defaults_time_zone";
  DROP TYPE "public"."enum_tenants_defaults_time_zone";`)
}
