-- DropForeignKey
ALTER TABLE "CategoriesOnAnimes" DROP CONSTRAINT "CategoriesOnAnimes_animeId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnAnimes" DROP CONSTRAINT "CategoriesOnAnimes_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "CategoriesOnAnimes" ADD CONSTRAINT "CategoriesOnAnimes_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnAnimes" ADD CONSTRAINT "CategoriesOnAnimes_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
