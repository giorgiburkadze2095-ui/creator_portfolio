import { MigrationInterface, QueryRunner } from "typeorm";

// Removes the standalone Quotes feature (table, admin management page,
// public homepage section) — the site now focuses on Music and Content
// only. The quotes table has no incoming foreign keys from any other table
// (categoryId was already dropped from it by RemoveCategories), so this is
// a clean, self-contained drop.
export class RemoveQuotes1789594598363 implements MigrationInterface {
    name = 'RemoveQuotes1789594598363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "quotes"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quotes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "text" text NOT NULL, "author" character varying, "isOriginal" boolean NOT NULL DEFAULT true, "attributionSource" character varying, "sourceUrl" character varying, "featured" boolean NOT NULL DEFAULT false, "published" boolean NOT NULL DEFAULT true, "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_99a0e8bcbcd8719d3a41f23c263" PRIMARY KEY ("id"))`);
    }

}
