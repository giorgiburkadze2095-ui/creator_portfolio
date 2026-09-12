import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatorNameToSiteContent1789237306351 implements MigrationInterface {
    name = 'AddCreatorNameToSiteContent1789237306351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "site_content" ADD "creatorName" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "site_content" DROP COLUMN "creatorName"`);
    }

}
