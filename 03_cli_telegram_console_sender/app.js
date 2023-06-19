import TelegramBot from "node-telegram-bot-api";
import { Command } from "commander";

const program = new Command();
const TOKEN = process.env.My_Token_NotesBot; //6018134348:AAEzE9lSWfMtu5482FQJ-Vo7HyAd_F9zk74  :)

const bot = new TelegramBot(TOKEN, { polling: true });

program
  .command("send-message")
  .alias("m")
  .description("Send a message (Telegram bot)")
  .argument("message", "Message to send")
  .action(async (message) => {
    try {
      const chatId = msg.message.chat.id;
      await bot.sendMessage(chatId, message);
      console.log("Message sent");
      process.exit();
    }
    catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  });

program
  .command("send-photo")
  .alias("p")
  .description("Send a photo (Telegram bot)")
  .argument("path", "Path to photo")
  .action(async (path) => {
    try {
      const chatId = msg.message.chat.id;
      await bot.sendPhoto(chatId, path);
      console.log("Photo sent");
      process.exit();
    }
    catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);