import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1557417113316 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "issues" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "estimate_point" integer NOT NULL, "result_point" integer NOT NULL DEFAULT 0, "box_index" integer NOT NULL, "archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "issue_box_id" integer, CONSTRAINT "PK_9d8ecbbeff46229c700f0449257" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "labels" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_c0c4e97f76f1f3a268c7a70b925" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying, "email" character varying NOT NULL, "image" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_479f4d9be96da3b90c54f85a379" UNIQUE ("image"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "issue_boxes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_c32561676c304199e40496c41ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "issue_labels" ("issue_id" integer NOT NULL, "label_id" integer NOT NULL, CONSTRAINT "PK_1ac0a33ade1abb32c03516fa496" PRIMARY KEY ("issue_id", "label_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_68c7892926826f61d6a4a6f564" ON "issue_labels" ("issue_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b0766ecbfc520efad8879ef13e" ON "issue_labels" ("label_id") `);
        await queryRunner.query(`ALTER TABLE "issues" ADD CONSTRAINT "FK_b9ea72827c8809e665cdddff9ae" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issues" ADD CONSTRAINT "FK_988a527706ae0f3e104602007a5" FOREIGN KEY ("issue_box_id") REFERENCES "issue_boxes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "labels" ADD CONSTRAINT "FK_89817c6a4a2afead69d27ead0b3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue_boxes" ADD CONSTRAINT "FK_e12589825ad37e17faabf5ecc13" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue_labels" ADD CONSTRAINT "FK_68c7892926826f61d6a4a6f564d" FOREIGN KEY ("issue_id") REFERENCES "issues"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue_labels" ADD CONSTRAINT "FK_b0766ecbfc520efad8879ef13e3" FOREIGN KEY ("label_id") REFERENCES "labels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "issue_labels" DROP CONSTRAINT "FK_b0766ecbfc520efad8879ef13e3"`);
        await queryRunner.query(`ALTER TABLE "issue_labels" DROP CONSTRAINT "FK_68c7892926826f61d6a4a6f564d"`);
        await queryRunner.query(`ALTER TABLE "issue_boxes" DROP CONSTRAINT "FK_e12589825ad37e17faabf5ecc13"`);
        await queryRunner.query(`ALTER TABLE "labels" DROP CONSTRAINT "FK_89817c6a4a2afead69d27ead0b3"`);
        await queryRunner.query(`ALTER TABLE "issues" DROP CONSTRAINT "FK_988a527706ae0f3e104602007a5"`);
        await queryRunner.query(`ALTER TABLE "issues" DROP CONSTRAINT "FK_b9ea72827c8809e665cdddff9ae"`);
        await queryRunner.query(`DROP INDEX "IDX_b0766ecbfc520efad8879ef13e"`);
        await queryRunner.query(`DROP INDEX "IDX_68c7892926826f61d6a4a6f564"`);
        await queryRunner.query(`DROP TABLE "issue_labels"`);
        await queryRunner.query(`DROP TABLE "issue_boxes"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "labels"`);
        await queryRunner.query(`DROP TABLE "issues"`);
    }

}
