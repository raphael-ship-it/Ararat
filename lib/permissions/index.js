import Instance from "./instance";
import { getUserPermissions } from "../getUserPermissions";
import prisma from "../prisma";
import ImageServer from "./imageServer";
import Node from "./node";
import User from "./user";

export default class Permissions {
    constructor(user) {
        this.user = user;
    }
    node(id) {
        return new Node(this, id);
    }
    imageServer(id) {
        return new ImageServer(this, id);
    }
    instance(id) {
        return new Instance(this, id);
    }
    usr(id) {
        return new User(this);
    }
    get permissions() {
        return new Promise(async (resolve, reject) => {
            let permissions = await getUserPermissions(this.user);
            return resolve(permissions);
        })
    }
    get createNode() {
        return new Promise(async (resolve, reject) => {
            if ((await this.permissions).includes("create_node")) {
                return resolve(true);
            }
            return resolve(false);
        });
    }
}