-- CreateTable
CREATE TABLE "animes" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "episode" INTEGER NOT NULL,

    CONSTRAINT "animes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnAnimes" (
    "animeId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "CategoriesOnAnimes_pkey" PRIMARY KEY ("animeId","categoryId")
);

-- AddForeignKey
ALTER TABLE "CategoriesOnAnimes" ADD CONSTRAINT "CategoriesOnAnimes_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnAnimes" ADD CONSTRAINT "CategoriesOnAnimes_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
