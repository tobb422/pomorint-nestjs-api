import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1553371901003 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "labels" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "user_id" integer, CONSTRAINT "PK_c0c4e97f76f1f3a268c7a70b925" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "labels" ADD CONSTRAINT "FK_89817c6a4a2afead69d27ead0b3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "labels" DROP CONSTRAINT "FK_89817c6a4a2afead69d27ead0b3"`);
        await queryRunner.query(`DROP TABLE "labels"`);
    }

}
