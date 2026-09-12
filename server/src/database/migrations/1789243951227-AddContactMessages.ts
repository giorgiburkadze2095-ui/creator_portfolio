import { MigrationInterface, QueryRunner } from "typeorm";

export class AddContactMessages1789243951227 implements MigrationInterface {
    name = 'AddContactMessages1789243951227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact_messages" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "message" text NOT NULL, "read" boolean NOT NULL DEFAULT false, "starred" boolean NOT NULL DEFAULT false, "archived" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b74f96eb2edd977ccfba6533293" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contact_messages"`);
    }

}
