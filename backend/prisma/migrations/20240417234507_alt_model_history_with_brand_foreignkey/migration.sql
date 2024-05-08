/*
  Warnings:

  - You are about to drop the column `brand` on the `History` table. All the data in the column will be lost.
  - Added the required column `brandName` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "brand",
ADD COLUMN     "brandName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_brandName_fkey" FOREIGN KEY ("brandName") REFERENCES "Brand"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
