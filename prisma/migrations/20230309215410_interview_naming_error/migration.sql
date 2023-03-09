/*
  Warnings:

  - You are about to drop the `InverviewStats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InverviewStats" DROP CONSTRAINT "InverviewStats_inverviewId_fkey";

-- DropTable
DROP TABLE "InverviewStats";

-- CreateTable
CREATE TABLE "InterviewStats" (
    "id" SERIAL NOT NULL,
    "interviewId" INTEGER NOT NULL,
    "good" BOOLEAN,
    "silenceSeconds" INTEGER,

    CONSTRAINT "InterviewStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterviewStats_interviewId_key" ON "InterviewStats"("interviewId");

-- AddForeignKey
ALTER TABLE "InterviewStats" ADD CONSTRAINT "InterviewStats_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
