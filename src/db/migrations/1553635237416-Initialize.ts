import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1553635237416 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "issues_labels_labels" ("issuesId" integer NOT NULL, "labelsId" integer NOT NULL, CONSTRAINT "PK_3beea6f72b04221a4df73c3293f" PRIMARY KEY ("issuesId", "labelsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_924ce42927e7f34bb4c900dd3c" ON "issues_labels_labels" ("issuesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c6c703b2cba023164e0170846c" ON "issues_labels_labels" ("labelsId") `);
        await queryRunner.query(`ALTER TABLE "issues_labels_labels" ADD CONSTRAINT "FK_924ce42927e7f34bb4c900dd3cb" FOREIGN KEY ("issuesId") REFERENCES "issues"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issues_labels_labels" ADD CONSTRAINT "FK_c6c703b2cba023164e0170846cd" FOREIGN KEY ("labelsId") REFERENCES "labels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "issues_labels_labels" DROP CONSTRAINT "FK_c6c703b2cba023164e0170846cd"`);
        await queryRunner.query(`ALTER TABLE "issues_labels_labels" DROP CONSTRAINT "FK_924ce42927e7f34bb4c900dd3cb"`);
        await queryRunner.query(`DROP INDEX "IDX_c6c703b2cba023164e0170846c"`);
        await queryRunner.query(`DROP INDEX "IDX_924ce42927e7f34bb4c900dd3c"`);
        await queryRunner.query(`DROP TABLE "issues_labels_labels"`);
    }

}
