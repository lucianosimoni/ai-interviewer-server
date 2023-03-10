-- AlterTable
ALTER TABLE "InterviewMessage" ADD COLUMN     "summaryId" INTEGER;

-- CreateTable
CREATE TABLE "InterviewSummary" (
    "id" SERIAL NOT NULL,
    "interviewId" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterviewSummary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InterviewMessage" ADD CONSTRAINT "InterviewMessage_summaryId_fkey" FOREIGN KEY ("summaryId") REFERENCES "InterviewSummary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewSummary" ADD CONSTRAINT "InterviewSummary_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
