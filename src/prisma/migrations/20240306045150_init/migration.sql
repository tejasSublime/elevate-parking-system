/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `operatorUserId` on table `Operator` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "emailID" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "flatNo" TEXT,
    "vNumber" TEXT,
    "pslot" TEXT,
    "level" INTEGER,
    "phoneNo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email", "flatNo", "level", "name", "phoneNo", "pslot", "userId", "vNumber") SELECT "createdAt", "email", "flatNo", "level", "name", "phoneNo", "pslot", "userId", "vNumber" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_phoneNo_key" ON "User"("phoneNo");
CREATE TABLE "new_Operator" (
    "operatorId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "operatorUserId" TEXT NOT NULL,
    "password" TEXT,
    "level" INTEGER
);
INSERT INTO "new_Operator" ("level", "name", "operatorId", "operatorUserId", "password") SELECT "level", "name", "operatorId", "operatorUserId", "password" FROM "Operator";
DROP TABLE "Operator";
ALTER TABLE "new_Operator" RENAME TO "Operator";
CREATE UNIQUE INDEX "Operator_operatorUserId_key" ON "Operator"("operatorUserId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
