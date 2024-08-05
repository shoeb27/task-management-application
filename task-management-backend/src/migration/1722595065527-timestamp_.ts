import { MigrationInterface, QueryRunner } from "typeorm";

export class Timestamp_1722595065527 implements MigrationInterface {
    name = 'Timestamp_1722595065527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'Todo', "is_deleted" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "deleted_at" TIMESTAMP DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
