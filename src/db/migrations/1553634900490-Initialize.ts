import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1553634900490 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "issues" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "pomo" integer NOT NULL, "archived" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_9d8ecbbeff46229c700f0449257" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "issues" ADD CONSTRAINT "FK_b9ea72827c8809e665cdddff9ae" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "issues" DROP CONSTRAINT "FK_b9ea72827c8809e665cdddff9ae"`);
        await queryRunner.query(`DROP TABLE "issues"`);
    }

}
