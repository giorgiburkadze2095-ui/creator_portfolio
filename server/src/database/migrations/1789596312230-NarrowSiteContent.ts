import { MigrationInterface, QueryRunner } from "typeorm";

export class NarrowSiteContent1789596312230 implements MigrationInterface {
    name = 'NarrowSiteContent1789596312230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "site_content" DROP COLUMN "aboutIntro"`);
        await queryRunner.query(`ALTER TABLE "site_content" DROP COLUMN "aboutStory"`);
        await queryRunner.query(`ALTER TABLE "site_content" DROP COLUMN "aboutInterests"`);
        await queryRunner.query(`ALTER TABLE "site_content" DROP COLUMN "aboutFitnessJourney"`);
        await queryRunner.query(`ALTER TABLE "site_content" DROP COLUMN "aboutMusicJourney"`);
        await queryRunner.query(`ALTER TABLE "site_content" DROP COLUMN "aboutPhilosophy"`);
        await queryRunner.query(`ALTER TABLE "site_content" DROP COLUMN "collaborationInfo"`);
        await queryRunner.query(`ALTER TABLE "site_content" DROP COLUMN "contactUrl"`);
        await queryRunner.query(`ALTER TABLE "site_content" DROP COLUMN "aboutIntroTitle"`);
        await queryRunner.query(`ALTER TABLE "site_content" DROP COLUMN "aboutMusicJourneyTitle"`);
        await queryRunner.query(`ALTER TABLE "site_content" DROP COLUMN "aboutPhilosophyTitle"`);
        await queryRunner.query(`ALTER TABLE "site_content" DROP COLUMN "collaborationInfoTitle"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "site_content" ADD "collaborationInfoTitle" character varying NOT NULL DEFAULT 'Collaboration'`);
        await queryRunner.query(`ALTER TABLE "site_content" ADD "aboutPhilosophyTitle" character varying NOT NULL DEFAULT 'How I think about it'`);
        await queryRunner.query(`ALTER TABLE "site_content" ADD "aboutMusicJourneyTitle" character varying NOT NULL DEFAULT 'The music journey'`);
        await queryRunner.query(`ALTER TABLE "site_content" ADD "aboutIntroTitle" character varying NOT NULL DEFAULT 'Who I am'`);
        await queryRunner.query(`ALTER TABLE "site_content" ADD "contactUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "site_content" ADD "collaborationInfo" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "site_content" ADD "aboutPhilosophy" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "site_content" ADD "aboutMusicJourney" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "site_content" ADD "aboutFitnessJourney" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "site_content" ADD "aboutInterests" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "site_content" ADD "aboutStory" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "site_content" ADD "aboutIntro" text NOT NULL DEFAULT ''`);
    }

}
