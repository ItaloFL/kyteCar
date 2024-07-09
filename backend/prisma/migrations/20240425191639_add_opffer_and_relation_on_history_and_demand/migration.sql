/*
  Warnings:

  - Added the required column `offer` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offer` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Demand" ADD COLUMN     "offer" INTEGER NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "History" ADD COLUMN     "offer" INTEGER NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
