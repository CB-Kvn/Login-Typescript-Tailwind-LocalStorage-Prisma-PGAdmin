import express from "express";
import { tokenAccess } from "../middleware/token_verify";
import { Authentication } from "../endpoints/authentication.endpoint";

export  const router = express.Router()
const endpoint = new Authentication


router.post("/sigIn",endpoint.signIn)
router.post("/logIn",endpoint.logIn)
router.get("/health",tokenAccess,endpoint.health)