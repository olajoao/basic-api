import { Request, Response } from "express";
import User from "../database/schemas/User";
import crypto from "node:crypto";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    try {
      const userAlreadyExists = await User.findOne({ email });

      if (userAlreadyExists) {
        return response.status(400).json({
          error: "Oops",
          message: "User already exists",
        });
      }

      const user = await User.create({
        name,
        email,
        password: crypto.createHash("aes-123-cbc", password),
      });

      return response.json(user);
    } catch (error) {
      return response.status(500).send({
        error: "Registration failed",
        message: error,
      });
    }
  }

  async get(request: Request, response: Response) {
    try {
      const users = await User.find();

      return response.json(users);
    } catch (error) {
      return response.status(500).send({
        error: "Problems to get users",
        message: error,
      });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name } = request.body;

      await User.updateOne({ id }, { name });

      return response.status(200).send("User updated");
    } catch (error) {
      return response.status(500).send({
        error: "Error to update user",
        message: error,
      });
    }
  }
}

export default new UserController();
