import logger from "../core/log";
import jsonData from "../scripts/admin.json";
import { encryptData } from "../middlewares/encryption.middleware";
import { v4 as uuidv4 } from "uuid";
import { adminModel } from "../model/admin.model";

class adminService {
  async createAdmin() {
    try {
      const admins = JSON.parse(JSON.stringify(jsonData.admins));
      for (const admin of admins) {
        const isExist = await adminModel.findOne({ email: admin.email });
        if (isExist) {
          console.log("Already Admin =", admin.email, "Exists");
          continue;
        }
        const password = encryptData(admin.password);
        const uniqueUserName = `ADM${uuidv4()
          .toUpperCase()
          .replace(/-/g, "")
          .substring(0, 9)}`;
        const object = {
          firstName: admin.firstName,
          lastName: admin.lastName,
          userName: uniqueUserName,
          password: password,
          email: admin.email,
          phoneNumber: admin.phoneNumber,
          emailIsVerified: admin.emailIsVerified,
          phoneIsVerified: admin.phoneIsVerified,
          accountType: admin.accountType,
          status: admin.status,
        };
        const insert = await adminModel.create(object);
        console.log("Saved Admin", admin.email, admin.phoneNumber);
        return insert;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
  // Todo implement login
}

export default new adminService();
