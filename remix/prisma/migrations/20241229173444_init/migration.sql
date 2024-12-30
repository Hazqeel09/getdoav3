/*
  Warnings:

  - You are about to drop the column `desc` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `compilations` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_categories" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_categories" ("id", "name") SELECT "id", "name" FROM "categories";
DROP TABLE "categories";
ALTER TABLE "new_categories" RENAME TO "categories";
CREATE TABLE "new_compilations" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "views" INTEGER,
    "is_public" BOOLEAN,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "compilations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_compilations" ("created_at", "id", "is_public", "slug", "title", "updated_at", "user_id", "views") SELECT "created_at", "id", "is_public", "slug", "title", "updated_at", "user_id", "views" FROM "compilations";
DROP TABLE "compilations";
ALTER TABLE "new_compilations" RENAME TO "compilations";
CREATE UNIQUE INDEX "compilations_slug_key" ON "compilations"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
