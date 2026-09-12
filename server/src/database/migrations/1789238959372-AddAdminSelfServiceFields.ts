import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdminSelfServiceFields1789238959372 implements MigrationInterface {
    name = 'AddAdminSelfServiceFields1789238959372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin_users" ADD "passwordSetupTokenHash" character varying`);
        await queryRunner.query(`ALTER TABLE "admin_users" ADD "passwordSetupTokenExpiresAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "admin_users" ALTER COLUMN "passwordHash" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin_users" ALTER COLUMN "passwordHash" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin_users" DROP COLUMN "passwordSetupTokenExpiresAt"`);
        await queryRunner.query(`ALTER TABLE "admin_users" DROP COLUMN "passwordSetupTokenHash"`);
    }

}
