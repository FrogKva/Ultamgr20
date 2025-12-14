export const START_BOT = (data, io) =>  {

    function sendMessage(msg) {
        io.emit('chat message', {
            username: "[🤖] Bot",
            text: msg + `<br>`,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            isBot: true,
        });
     }
    
       if(data.text.match(/^cat/i) )   {
            sendMessage("<img src = 'https://avatars.mds.yandex.net/i?id=17fa9b62e7eab9f176af134dde17c6bd642e80d9-4485565-images-thumbs&n=13'>")
            io.emit("scream", true)
        }
        if(data.text.match(/ceph crysis/i) )   {
            sendMessage("<img src = 'https://media1.tenor.com/m/42KPblLn8RIAAAAd/crysis-crysis2.gif'>")
        }
        if(data.text.match(/напугай меня/i) )   {
            sendMessage("Бу!!!")
            io.emit("scream", false)
            
        }
          if(data.text.match(/прив/i) )   {
            sendMessage("Приветствую вас, " + data.username + "!\n<br>Добро пожаловать в Ultimate Messenger 2.0")
        }
}


  