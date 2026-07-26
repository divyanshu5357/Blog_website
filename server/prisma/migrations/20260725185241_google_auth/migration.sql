/*
  Warnings:

  - You are about to drop the column `approved` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `publicUserId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('GOOGLE');

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "approved",
DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "publicUserId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PublicUser" (
    "id" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "provider" "AuthProvider" NOT NULL DEFAULT 'GOOGLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicUser_googleId_key" ON "PublicUser"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "PublicUser_email_key" ON "PublicUser"("email");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_publicUserId_fkey" FOREIGN KEY ("publicUserId") REFERENCES "PublicUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
