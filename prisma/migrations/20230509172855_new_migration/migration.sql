/*
  Warnings:

  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Blog";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "searchID" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "oneWordReview" TEXT NOT NULL,
    "similar" TEXT NOT NULL,
    CONSTRAINT "Result_searchID_fkey" FOREIGN KEY ("searchID") REFERENCES "Search" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Search" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "searchTerm" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Result_searchID_key" ON "Result"("searchID");
