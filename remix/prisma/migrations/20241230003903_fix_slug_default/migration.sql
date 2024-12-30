/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `doas` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_compilations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "slug" TEXT,
    "views" INTEGER,
    "is_public" BOOLEAN,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "compilations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_compilations" ("created_at", "description", "id", "is_public", "slug", "title", "updated_at", "user_id", "views") SELECT "created_at", "description", "id", "is_public", "slug", "title", "updated_at", "user_id", "views" FROM "compilations";
DROP TABLE "compilations";
ALTER TABLE "new_compilations" RENAME TO "compilations";
CREATE UNIQUE INDEX "compilations_slug_key" ON "compilations"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "doas_slug_key" ON "doas"("slug");
