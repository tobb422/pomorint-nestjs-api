import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initialize1553336522844 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_0bd5012aeb82628e07f6a1be53b"`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_id"`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD "google_id" character varying`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_0bd5012aeb82628e07f6a1be53b" UNIQUE ("google_id")`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_0bd5012aeb82628e07f6a1be53b"`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_id"`)
    await queryRunner.query(`ALTER TABLE "users" ADD "google_id" integer`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_0bd5012aeb82628e07f6a1be53b" UNIQUE ("google_id")`,
    )
  }
}
