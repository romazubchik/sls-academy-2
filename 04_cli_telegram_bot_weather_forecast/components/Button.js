export default  {
    btnStart: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Kyiv', callback_data: 'kyiv' }],
            ]
          })
    },
    timeIntervals: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Every 3-hour interval', callback_data: '3' }],
              [{ text: 'Every 6-hour interval', callback_data: '6' }]
            ]
          })
    }
}