import express from "express";

import {getAllOrders, getOrderById, destroyOrder, updateOrder, getOrdersByUser, createOrder} from "../../server/db/components/orders.js";

const ordersRouter = express.Router();

ordersRouter.get("/", async (req, res, next) => {
    try {
        const orders = await getAllOrders();

        res.send(orders);
    } catch (error) {
        next(error);
    }
})

ordersRouter.get("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const order = await getOrderById(id);

        res.send(order);
    } catch (error) {
        next(error);
    }
})

ordersRouter.post("/", async (req, res, next) => {
    try {
        const {userId, status} = req.body;
        const order = await createOrder({userId, status});

        res.send(order);
    } catch (error) {
        next(error);
    }
})

ordersRouter.patch("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const order = await updateOrder({orderId: id, status});

        res.send(order);
    } catch (error) {
        next(error);
    }
})

ordersRouter.delete("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const order = await destroyOrder(id);

        res.send(order);
    } catch (error) {
        next(error);
    }
})

ordersRouter.get("/users/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const orders = await getOrdersByUser(id);

        res.send(orders);
    } catch (error) {
        next(error);
    }
})

export default ordersRouter;