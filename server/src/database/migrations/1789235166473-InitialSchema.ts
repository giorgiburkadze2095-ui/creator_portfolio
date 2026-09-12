import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1789235166473 implements MigrationInterface {
    name = 'InitialSchema1789235166473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin_users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "name" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'ADMIN', "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_dcd0c8a4b10af9c986e510b9ecc" UNIQUE ("email"), CONSTRAINT "PK_06744d221bb6145dc61e5dc441d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "label" character varying NOT NULL, "description" text, "sortOrder" integer NOT NULL DEFAULT '0', "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "content_items" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "platform" character varying NOT NULL, "externalUrl" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "categoryId" integer, "displayModes" text NOT NULL DEFAULT '', "thumbnailUrl" character varying, "authorCredit" character varying, "featured" boolean NOT NULL DEFAULT false, "published" boolean NOT NULL DEFAULT true, "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_9c6bf4f28851752cee186915e39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quotes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "text" text NOT NULL, "author" character varying, "isOriginal" boolean NOT NULL DEFAULT true, "attributionSource" character varying, "sourceUrl" character varying, "categoryId" integer, "featured" boolean NOT NULL DEFAULT false, "published" boolean NOT NULL DEFAULT true, "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_99a0e8bcbcd8719d3a41f23c263" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partners" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "logoUrl" character varying, "description" text, "websiteUrl" character varying, "socialUrl" character varying, "collaborationType" character varying NOT NULL DEFAULT 'OTHER', "featured" boolean NOT NULL DEFAULT false, "active" boolean NOT NULL DEFAULT true, "sortOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_998645b20820e4ab99aeae03b41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "social_links" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "platform" character varying NOT NULL, "url" character varying NOT NULL, "label" character varying NOT NULL, "iconType" character varying NOT NULL, "sortOrder" integer NOT NULL DEFAULT '0', "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_50d32c67ddd71c09d372b02167f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "site_content" ("id" integer NOT NULL DEFAULT '1', "heroTitle" character varying NOT NULL DEFAULT '', "heroSubtitle" character varying NOT NULL DEFAULT '', "heroTagline" character varying NOT NULL DEFAULT '', "personalStatement" text NOT NULL DEFAULT '', "aboutIntro" text NOT NULL DEFAULT '', "aboutStory" text NOT NULL DEFAULT '', "aboutInterests" text NOT NULL DEFAULT '', "aboutFitnessJourney" text NOT NULL DEFAULT '', "aboutMusicJourney" text NOT NULL DEFAULT '', "aboutPhilosophy" text NOT NULL DEFAULT '', "collaborationInfo" text NOT NULL DEFAULT '', "workWithMeDescription" text NOT NULL DEFAULT '', "contactEmail" character varying, "contactUrl" character varying, "ctaTitle" text NOT NULL DEFAULT '', "ctaText" text NOT NULL DEFAULT '', "footerText" text NOT NULL DEFAULT '', "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a1362a1a095ab41c4347aea2c2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "content_items" ADD CONSTRAINT "FK_19fc449c956b3eeb44689f2337c" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quotes" ADD CONSTRAINT "FK_9bbe63fb9b6d595a8e7a5819c1f" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotes" DROP CONSTRAINT "FK_9bbe63fb9b6d595a8e7a5819c1f"`);
        await queryRunner.query(`ALTER TABLE "content_items" DROP CONSTRAINT "FK_19fc449c956b3eeb44689f2337c"`);
        await queryRunner.query(`DROP TABLE "site_content"`);
        await queryRunner.query(`DROP TABLE "social_links"`);
        await queryRunner.query(`DROP TABLE "partners"`);
        await queryRunner.query(`DROP TABLE "quotes"`);
        await queryRunner.query(`DROP TABLE "content_items"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "admin_users"`);
    }

}
