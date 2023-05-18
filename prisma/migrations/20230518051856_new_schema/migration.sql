-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Search" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "searchTerm" TEXT NOT NULL,
    "sessionID" TEXT
);
INSERT INTO "new_Search" ("id", "searchTerm", "sessionID", "type") SELECT "id", "searchTerm", "sessionID", "type" FROM "Search";
DROP TABLE "Search";
ALTER TABLE "new_Search" RENAME TO "Search";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
