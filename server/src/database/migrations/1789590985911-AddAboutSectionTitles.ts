import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAboutSectionTitles1789590985911 implements MigrationInterface {
    name = 'AddAboutSectionTitles1789590985911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "site_content" ADD "aboutIntroTitle" character varying NOT NULL DEFAULT 'Who I am'`);
        await queryRunner.query(`ALTER TABLE "site_content" ADD "aboutMusicJourneyTitle" character varying NOT NULL DEFAULT 'The music journey'`);
        await queryRunner.query(`ALTER TABLE "site_content" ADD "aboutPhilosophyTitle" character varying NOT NULL DEFAULT 'How I think about it'`);
        await queryRunner.query(`ALTER TABLE "site_content" ADD "collaborationInfoTitle" character varying NOT NULL DEFAULT 'Collaboration'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "site_content" DROP COLUMN "collaborationInfoTitle"`);
        await queryRunner.query(`ALTER TABLE "site_content" DROP COLUMN "aboutPhilosophyTitle"`);
        await queryRunner.query(`ALTER TABLE "site_content" DROP COLUMN "aboutMusicJourneyTitle"`);
        await queryRunner.query(`ALTER TABLE "site_content" DROP COLUMN "aboutIntroTitle"`);
    }

}
