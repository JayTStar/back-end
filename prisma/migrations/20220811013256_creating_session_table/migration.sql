-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
