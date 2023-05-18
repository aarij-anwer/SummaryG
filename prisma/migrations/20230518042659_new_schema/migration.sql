/*
  Warnings:

  - Added the required column `sessionID` to the `Search` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Search" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "searchTerm" TEXT NOT NULL,
    "sessionID" TEXT NOT NULL
);
INSERT INTO "new_Search" ("id", "searchTerm", "type") SELECT "id", "searchTerm", "type" FROM "Search";
DROP TABLE "Search";
ALTER TABLE "new_Search" RENAME TO "Search";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
