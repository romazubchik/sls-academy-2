import TelegramBot from "node-telegram-bot-api";
import { Command } from "commander";

const program = new Command();
const TOKEN = process.env.My_Token_NotesBot; //6018134348:AAEzE9lSWfMtu5482FQJ-Vo7HyAd_F9zk74  :)
const chat_id = process.env.chat_id_NotesBot; //427361077  :)

const bot = new TelegramBot(TOKEN, { polling: true });

program
  .command("send-message")
  .alias("m")
  .description("Send a message (Telegram bot)")
  .argument("message", "Message to send")
  .action(async (message) => {
    try {
      await bot.sendMessage(chat_id, message);
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
      await bot.sendPhoto(chat_id, path);
      console.log("Photo sent");
      process.exit();
    }
    catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);