import express from "express";

import { login, register, logout, checkAuth } from "../controllers/authentication";
import { isAuthenticated } from "../middlewares/index";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/logout", logout);
  router.get('/auth/check', isAuthenticated, checkAuth);
};
