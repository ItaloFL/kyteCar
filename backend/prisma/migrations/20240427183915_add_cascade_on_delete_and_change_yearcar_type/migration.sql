/*
  Warnings:

  - Changed the type of `yearCar` on the `Demand` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `yearCar` on the `History` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `yearCar` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Demand" DROP CONSTRAINT "Demand_brandName_fkey";

-- DropForeignKey
ALTER TABLE "Demand" DROP CONSTRAINT "Demand_productId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_brandName_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_brandName_fkey";

-- AlterTable
ALTER TABLE "Demand" DROP COLUMN "yearCar",
ADD COLUMN     "yearCar" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "History" DROP COLUMN "yearCar",
ADD COLUMN     "yearCar" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "yearCar",
ADD COLUMN     "yearCar" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandName_fkey" FOREIGN KEY ("brandName") REFERENCES "Brand"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_brandName_fkey" FOREIGN KEY ("brandName") REFERENCES "Brand"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_brandName_fkey" FOREIGN KEY ("brandName") REFERENCES "Brand"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
