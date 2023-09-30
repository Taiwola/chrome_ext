"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const route_1 = __importDefault(require("./router/route"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.raw({ type: "application/octet-stream" }));
app.use(express_1.default.static("public"));
app.use("/api", route_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
