-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "banned_at" DATETIME
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "expires_at" DATETIME NOT NULL,
    CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "doas" (
    "id" BIGINT NOT NULL PRIMARY KEY,
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

-- CreateTable
CREATE TABLE "doa_categories" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "doa_id" BIGINT NOT NULL,
    "category_id" BIGINT NOT NULL,
    CONSTRAINT "doa_categories_doa_id_fkey" FOREIGN KEY ("doa_id") REFERENCES "doas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "doa_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categories" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "desc" TEXT
);

-- CreateTable
CREATE TABLE "doa_sources" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "doa_id" BIGINT NOT NULL,
    "source_id" BIGINT NOT NULL,
    "reference" TEXT,
    CONSTRAINT "doa_sources_doa_id_fkey" FOREIGN KEY ("doa_id") REFERENCES "doas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "doa_sources_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sources" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT
);

-- CreateTable
CREATE TABLE "compilations" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "desc" TEXT,
    "slug" TEXT NOT NULL,
    "views" INTEGER,
    "is_public" BOOLEAN,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "compilations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "compilation_doas" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "compilation_id" BIGINT NOT NULL,
    "doa_id" BIGINT NOT NULL,
    "order_number" INTEGER NOT NULL,
    CONSTRAINT "compilation_doas_compilation_id_fkey" FOREIGN KEY ("compilation_id") REFERENCES "compilations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "compilation_doas_doa_id_fkey" FOREIGN KEY ("doa_id") REFERENCES "doas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bookmarks" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "compilation_id" BIGINT,
    "doa_id" BIGINT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bookmarks_compilation_id_fkey" FOREIGN KEY ("compilation_id") REFERENCES "compilations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "bookmarks_doa_id_fkey" FOREIGN KEY ("doa_id") REFERENCES "doas" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "compilations_slug_key" ON "compilations"("slug");
