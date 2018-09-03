import { Permissions, Notifications } from "expo";
import SQL from "./SQL";

export default class Notification {
  static async Register(Email, curToken) {
    try {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;

      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== "granted") {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }

      // Stop here if the user did not grant permissions
      if (finalStatus !== "granted") {
        return;
      }

      // Get the token that uniquely identifies this device
      const Token = await Notifications.getExpoPushTokenAsync();
      if(curToken != Token)
        SQL.UpdateNotification(Email, Token);
      return Token;
    } catch (error) {
      console.log(error);
    }
  }
}

