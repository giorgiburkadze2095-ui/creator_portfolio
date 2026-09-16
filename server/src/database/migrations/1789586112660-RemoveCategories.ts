import { MigrationInterface, QueryRunner } from "typeorm";

// Removes the manual, admin-managed categories system entirely. content_items
// only ever needed it to answer "is this a Music item", so that's replaced
// with a plain boolean; quotes never had any public consumer that filtered
// by category, so it's dropped there with no replacement.
export class RemoveCategories1789586112660 implements MigrationInterface {
    name = 'RemoveCategories1789586112660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Add the replacement column first, so the existing categoryId
        //    values are still readable when we copy them across below.
        await queryRunner.query(`ALTER TABLE "content_items" ADD "isMusic" boolean NOT NULL DEFAULT false`);

        // 2. Carry forward which content items were tagged with the "music"
        //    category before that association is destroyed.
        await queryRunner.query(`
            UPDATE "content_items"
            SET "isMusic" = true
            WHERE "categoryId" IN (SELECT "id" FROM "categories" WHERE "slug" = 'music')
        `);

        // 3. Drop the old category relations and the categories table itself.
        await queryRunner.query(`ALTER TABLE "content_items" DROP CONSTRAINT "FK_19fc449c956b3eeb44689f2337c"`);
        await queryRunner.query(`ALTER TABLE "quotes" DROP CONSTRAINT "FK_9bbe63fb9b6d595a8e7a5819c1f"`);
        await queryRunner.query(`ALTER TABLE "content_items" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "quotes" DROP COLUMN "categoryId"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 1. Recreate the categories table and its original default rows —
        //    schema/state parity is restored; any categories an admin added
        //    or edited beyond the seeded defaults cannot be recovered, since
        //    that data was genuinely destroyed by up() (as requested).
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "label" character varying NOT NULL, "description" text, "sortOrder" integer NOT NULL DEFAULT '0', "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`
            INSERT INTO "categories" ("slug", "label", "sortOrder") VALUES
                ('motivation', 'Motivation', 0),
                ('music', 'Music', 1),
                ('quotes', 'Quotes', 2),
                ('thoughts', 'Thoughts', 3),
                ('silence', 'Silence', 4),
                ('lifestyle', 'Lifestyle', 5)
        `);

        // 2. Restore the FK columns.
        await queryRunner.query(`ALTER TABLE "content_items" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "quotes" ADD "categoryId" integer`);

        // 3. Best-effort data restore: re-point isMusic items at the
        //    recreated "music" category.
        await queryRunner.query(`
            UPDATE "content_items"
            SET "categoryId" = (SELECT "id" FROM "categories" WHERE "slug" = 'music')
            WHERE "isMusic" = true
        `);

        await queryRunner.query(`ALTER TABLE "quotes" ADD CONSTRAINT "FK_9bbe63fb9b6d595a8e7a5819c1f" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "content_items" ADD CONSTRAINT "FK_19fc449c956b3eeb44689f2337c" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "content_items" DROP COLUMN "isMusic"`);
    }

}
