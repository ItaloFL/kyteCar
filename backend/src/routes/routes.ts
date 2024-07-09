import { Router } from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import { CreateProductController } from "../modules/product/create-product/create-product-controller";
import { FindProductByIdController } from "../modules/product/find-product-by-id/find-product-by-id-controller";

import { CreateBrandController } from "../modules/brand/create-brand/create-brand-controller";
import { ListAllBrandsController } from "../modules/brand/list-all-brands/list-all-brands-controller";
import { CreateHistoryController } from "../modules/history/create-history/create-history-controller";
import { CreateDemandController } from "../modules/demand/create-demand/create-demand-controller";

import { ListProductsController } from "../modules/product/list-products/list-products-controller";
import { ListDemandsController } from "../modules/demand/list-demands/list-demands-controller";
import { ListHistoryController } from "../modules/history/list-history/list-history-controller";
import { FindProductController } from "../modules/product/find-product/find-product-controller";
import { FindDemandByIdController } from "../modules/demand/find-demand-by-id/find-demand-by-id-controller";
import { GetStaticsRangeDateController } from "../modules/statics/get-statics-renge-date/get-statics-range-date-controller";
import { GetMonthOrdersAmountController } from "../modules/statics/get-month-orders-amount/get-month-orders-amount-controller";
import { GetTodayOrdersQuantityController } from "../modules/statics/get-today-orders-quantity/get-today-orders-quantity-controller";

export const kyteRoutes = Router();
const uploadProductImage = multer(multerConfig);

const createProductController = new CreateProductController();
const findProductByIdController = new FindProductByIdController();
const listProductsController = new ListProductsController();
const createBrandController = new CreateBrandController();
const listAllBrandController = new ListAllBrandsController();
const createHistoryController = new CreateHistoryController();
const createDemandController = new CreateDemandController();
const listDemandController = new ListDemandsController();
const listHistoryController = new ListHistoryController();
const findProductController = new FindProductController();
const findDemandByIdController = new FindDemandByIdController();
const getStaticsRangeDateController = new GetStaticsRangeDateController();
const getMonthOrdersAmountController = new GetMonthOrdersAmountController();
const getTodayOrdersQuantityController = new GetTodayOrdersQuantityController();

//Product ROUTES
kyteRoutes.post(
  "/products",
  uploadProductImage.single("imageURL"),
  createProductController.handle
);
kyteRoutes.get("/products/:id", findProductByIdController.handle);
kyteRoutes.get("/products", listProductsController.handle);
kyteRoutes.get("/product", findProductController.handle);

//Brand ROUTES
kyteRoutes.post("/brand", createBrandController.handle);
kyteRoutes.get("/brand", listAllBrandController.handle);

//demand ROUTES
kyteRoutes.post("/demand", createDemandController.handle);
kyteRoutes.get("/demand", listDemandController.handle);
kyteRoutes.get("/demand/:id", findDemandByIdController.handle);

//history ROUTES
kyteRoutes.post("/history", createHistoryController.handle);
kyteRoutes.get("/history", listHistoryController.handle);

//statics ROUTES
kyteRoutes.get("/statics", getStaticsRangeDateController.handle);
kyteRoutes.get("/statics/monthamount", getMonthOrdersAmountController.handle);
kyteRoutes.get("/statics/todayorders", getTodayOrdersQuantityController.handle);
