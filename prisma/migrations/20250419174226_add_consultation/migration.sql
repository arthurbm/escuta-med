/*
  Warnings:

  - You are about to drop the column `patientInfo` on the `consultation` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "session_token_key";

-- AlterTable
ALTER TABLE "consultation" DROP COLUMN "patientInfo";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "patient_identification" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "name" TEXT,
    "gender" TEXT,
    "age" TEXT,
    "education_level" TEXT,
    "birth_city" TEXT,
    "current_city" TEXT,
    "profession" TEXT,
    "marital_status" TEXT,

    CONSTRAINT "patient_identification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "main_complaint" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "description" TEXT,
    "duration" TEXT,

    CONSTRAINT "main_complaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "current_disease_history" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "history" TEXT,

    CONSTRAINT "current_disease_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_history" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "base_diseases" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "allergies" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "surgeries" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "blood_transfusions" BOOLEAN,

    CONSTRAINT "patient_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_history" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "parents_diseases" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "parents_cause_of_death" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "family_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lifestyle" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "smoking" BOOLEAN,
    "alcohol" TEXT,
    "physical_activity" TEXT,
    "diet" TEXT,
    "sleep_pattern" TEXT,

    CONSTRAINT "lifestyle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diagnostic_hypothesis" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "hypothesis" TEXT,

    CONSTRAINT "diagnostic_hypothesis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "general_vitals" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "temperature" TEXT,
    "heart_rate" TEXT,
    "blood_pressure" TEXT,
    "respiratory_rate" TEXT,
    "oxygen_saturation" TEXT,

    CONSTRAINT "general_vitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "general_physical_exam" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "general_appearance" TEXT,
    "skin" TEXT,
    "head_neck" TEXT,
    "respiratory" TEXT,
    "cardiovascular" TEXT,
    "abdomen" TEXT,
    "extremities" TEXT,
    "neurological" TEXT,

    CONSTRAINT "general_physical_exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cardiology_specifics" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "heart_rate" TEXT,
    "blood_pressure" TEXT,
    "heart_sounds" TEXT,
    "ecg_findings" TEXT,
    "previous_cardiac_events" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "chest_pain_characteristics" TEXT,
    "dyspnea" TEXT,
    "edema" TEXT,

    CONSTRAINT "cardiology_specifics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ophthalmology_specifics" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "visual_acuity_right" TEXT,
    "visual_acuity_left" TEXT,
    "intraocular_pressure_right" TEXT,
    "intraocular_pressure_left" TEXT,
    "fundoscopy" TEXT,
    "anterior_segment" TEXT,
    "visual_field" TEXT,
    "color_vision" TEXT,
    "ocular_motility" TEXT,

    CONSTRAINT "ophthalmology_specifics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "neurology_specifics" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "mental_status" TEXT,
    "cranial_nerves" TEXT,
    "motor_system" TEXT,
    "sensory_system" TEXT,
    "reflexes" TEXT,
    "coordination" TEXT,
    "gait" TEXT,
    "imaging_findings" TEXT,

    CONSTRAINT "neurology_specifics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patient_identification_consultationId_key" ON "patient_identification"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "main_complaint_consultationId_key" ON "main_complaint"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "current_disease_history_consultationId_key" ON "current_disease_history"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "patient_history_consultationId_key" ON "patient_history"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "family_history_consultationId_key" ON "family_history"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "lifestyle_consultationId_key" ON "lifestyle"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "diagnostic_hypothesis_consultationId_key" ON "diagnostic_hypothesis"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "general_vitals_consultationId_key" ON "general_vitals"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "general_physical_exam_consultationId_key" ON "general_physical_exam"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "cardiology_specifics_consultationId_key" ON "cardiology_specifics"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "ophthalmology_specifics_consultationId_key" ON "ophthalmology_specifics"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "neurology_specifics_consultationId_key" ON "neurology_specifics"("consultationId");

-- AddForeignKey
ALTER TABLE "patient_identification" ADD CONSTRAINT "patient_identification_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "main_complaint" ADD CONSTRAINT "main_complaint_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "current_disease_history" ADD CONSTRAINT "current_disease_history_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_history" ADD CONSTRAINT "patient_history_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_history" ADD CONSTRAINT "family_history_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lifestyle" ADD CONSTRAINT "lifestyle_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_hypothesis" ADD CONSTRAINT "diagnostic_hypothesis_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_vitals" ADD CONSTRAINT "general_vitals_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_physical_exam" ADD CONSTRAINT "general_physical_exam_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardiology_specifics" ADD CONSTRAINT "cardiology_specifics_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ophthalmology_specifics" ADD CONSTRAINT "ophthalmology_specifics_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "neurology_specifics" ADD CONSTRAINT "neurology_specifics_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
