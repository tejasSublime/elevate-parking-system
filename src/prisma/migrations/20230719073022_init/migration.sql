-- CreateTable
CREATE TABLE "Operator" (
    "operatorId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "operatorUserId" TEXT,
    "password" TEXT,
    "level" INTEGER
);

-- CreateTable
CREATE TABLE "RequestUser" (
    "requestId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "level" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Operator_operatorUserId_key" ON "Operator"("operatorUserId");
