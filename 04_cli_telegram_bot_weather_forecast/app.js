import TelegramBot from "node-telegram-bot-api";
import Buttons from "./components/Button.js";
import { getHourlyWeatherData } from "./components/WeatherUtils.js";

const TOKEN = process.env.My_Token_WeatherKyivBot;

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const username = msg.chat.username;
  const chatId = msg.chat.id;
  console.log(chatId);
  bot.sendMessage(chatId, `Hello ${username}`, Buttons.btnStart);
});

bot.on('callback_query', async (msg) => {
  const chatId = msg.message.chat.id;
  const data = msg.data;

  switch (data) {
    case "kyiv":
      askInterval(chatId);
      break;
    case "3":
      await sendWeatherData(chatId, 1);
      askInterval(chatId);
      break;
    case "6":
      await sendWeatherData(chatId, 2);
      askInterval(chatId);
      break;
  }
});

function askInterval(chatId) {
  bot.sendMessage(
    chatId,
    'Return weather forecast every 3 hours or every 6 hours?',
    Buttons.timeIntervals
  );
}

async function sendWeatherData(chatId, interval) {
  const weatherData = await getHourlyWeatherData(interval);
  bot.sendMessage(chatId, weatherData);
}

bot.on('polling_error', (error) => {
  console.log('Polling error:', error);
});