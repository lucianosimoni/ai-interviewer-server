-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interview" (
    "id" SERIAL NOT NULL,
    "current_round" INTEGER NOT NULL,
    "max_round" INTEGER NOT NULL,

    CONSTRAINT "interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inverview_stats" (
    "id" SERIAL NOT NULL,
    "inverview_id" INTEGER NOT NULL,
    "good" BOOLEAN NOT NULL,
    "silence_seconds" INTEGER NOT NULL,

    CONSTRAINT "inverview_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "inverview_stats_inverview_id_key" ON "inverview_stats"("inverview_id");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inverview_stats" ADD CONSTRAINT "inverview_stats_inverview_id_fkey" FOREIGN KEY ("inverview_id") REFERENCES "interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
