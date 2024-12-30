/*
  Warnings:

  - The primary key for the `bookmarks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `compilation_id` on the `bookmarks` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `doa_id` on the `bookmarks` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id` on the `bookmarks` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `compilation_doas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `compilation_id` on the `compilation_doas` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `doa_id` on the `compilation_doas` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id` on the `compilation_doas` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `compilations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `compilations` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `doa_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `category_id` on the `doa_categories` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `doa_id` on the `doa_categories` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id` on the `doa_categories` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `doa_sources` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `doa_id` on the `doa_sources` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id` on the `doa_sources` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `source_id` on the `doa_sources` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `doas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `doas` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `sources` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `sources` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bookmarks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "compilation_id" INTEGER,
    "doa_id" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bookmarks_compilation_id_fkey" FOREIGN KEY ("compilation_id") REFERENCES "compilations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "bookmarks_doa_id_fkey" FOREIGN KEY ("doa_id") REFERENCES "doas" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_bookmarks" ("compilation_id", "created_at", "doa_id", "id", "updated_at", "user_id") SELECT "compilation_id", "created_at", "doa_id", "id", "updated_at", "user_id" FROM "bookmarks";
DROP TABLE "bookmarks";
ALTER TABLE "new_bookmarks" RENAME TO "bookmarks";
CREATE TABLE "new_categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_categories" ("description", "id", "name") SELECT "description", "id", "name" FROM "categories";
DROP TABLE "categories";
ALTER TABLE "new_categories" RENAME TO "categories";
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");
CREATE TABLE "new_compilation_doas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "compilation_id" INTEGER NOT NULL,
    "doa_id" INTEGER NOT NULL,
    "order_number" INTEGER NOT NULL,
    CONSTRAINT "compilation_doas_compilation_id_fkey" FOREIGN KEY ("compilation_id") REFERENCES "compilations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "compilation_doas_doa_id_fkey" FOREIGN KEY ("doa_id") REFERENCES "doas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_compilation_doas" ("compilation_id", "doa_id", "id", "order_number") SELECT "compilation_id", "doa_id", "id", "order_number" FROM "compilation_doas";
DROP TABLE "compilation_doas";
ALTER TABLE "new_compilation_doas" RENAME TO "compilation_doas";
CREATE TABLE "new_compilations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
INSERT INTO "new_compilations" ("created_at", "description", "id", "is_public", "slug", "title", "updated_at", "user_id", "views") SELECT "created_at", "description", "id", "is_public", "slug", "title", "updated_at", "user_id", "views" FROM "compilations";
DROP TABLE "compilations";
ALTER TABLE "new_compilations" RENAME TO "compilations";
CREATE UNIQUE INDEX "compilations_slug_key" ON "compilations"("slug");
CREATE TABLE "new_doa_categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "doa_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    CONSTRAINT "doa_categories_doa_id_fkey" FOREIGN KEY ("doa_id") REFERENCES "doas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "doa_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_doa_categories" ("category_id", "doa_id", "id") SELECT "category_id", "doa_id", "id" FROM "doa_categories";
DROP TABLE "doa_categories";
ALTER TABLE "new_doa_categories" RENAME TO "doa_categories";
CREATE TABLE "new_doa_sources" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "doa_id" INTEGER NOT NULL,
    "source_id" INTEGER NOT NULL,
    "reference" TEXT,
    CONSTRAINT "doa_sources_doa_id_fkey" FOREIGN KEY ("doa_id") REFERENCES "doas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "doa_sources_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_doa_sources" ("doa_id", "id", "reference", "source_id") SELECT "doa_id", "id", "reference", "source_id" FROM "doa_sources";
DROP TABLE "doa_sources";
ALTER TABLE "new_doa_sources" RENAME TO "doa_sources";
CREATE TABLE "new_doas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title_my" TEXT,
    "title_en" TEXT,
    "text_ar" TEXT,
    "text_my" TEXT,
    "text_en" TEXT,
    "fadhilat_amal_my" TEXT,
    "fadhilat_amal_en" TEXT,
    "slug" TEXT,
    "is_verified" BOOLEAN,
    "is_public" BOOLEAN,
    "user_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    CONSTRAINT "doas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_doas" ("created_at", "deleted_at", "fadhilat_amal_en", "fadhilat_amal_my", "id", "is_public", "is_verified", "slug", "text_ar", "text_en", "text_my", "title_en", "title_my", "updated_at", "user_id") SELECT "created_at", "deleted_at", "fadhilat_amal_en", "fadhilat_amal_my", "id", "is_public", "is_verified", "slug", "text_ar", "text_en", "text_my", "title_en", "title_my", "updated_at", "user_id" FROM "doas";
DROP TABLE "doas";
ALTER TABLE "new_doas" RENAME TO "doas";
CREATE TABLE "new_sources" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT
);
INSERT INTO "new_sources" ("id", "name", "type") SELECT "id", "name", "type" FROM "sources";
DROP TABLE "sources";
ALTER TABLE "new_sources" RENAME TO "sources";
CREATE UNIQUE INDEX "sources_name_key" ON "sources"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
