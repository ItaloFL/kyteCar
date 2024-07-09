/*
  Warnings:

  - You are about to drop the column `brand` on the `Demand` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brandName` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Demand" DROP COLUMN "brand",
ADD COLUMN     "brandName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brandName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandName_fkey" FOREIGN KEY ("brandName") REFERENCES "Brand"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_brandName_fkey" FOREIGN KEY ("brandName") REFERENCES "Brand"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
