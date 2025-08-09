document.addEventListener('DOMContentLoaded', function () {
  // Function to speak "Drink water." 3 times sequentially
  function speakReminder() {
    const texts = ["Drink water.", "Drink water.", "Drink water."];
    function speakNext(index = 0) {
      if (index >= texts.length) return;
      const message = new SpeechSynthesisUtterance(texts[index]);
      message.lang = 'en-US';
      message.onend = () => speakNext(index + 1);
      speechSynthesis.speak(message);
    }
    speakNext();
  }

  function sendNotification() {
    if (Notification.permission === 'granted') {
      new Notification("💧 Time to Drink Water!", {
        body: "Stay hydrated. Take a sip!",
        icon: "https://cdn-icons-png.flaticon.com/512/2913/2913465.png"
      });
      speakReminder();
    }
  }

  if (Notification.permission === 'granted') {
    // Already granted — start reminders
    sendNotification();
    setInterval(sendNotification, 1800000);
  } else if (Notification.permission !== 'denied') {
    // Ask for permission
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        sendNotification();
        setInterval(sendNotification, 1800000);
      } else {
        alert("❌ Notifications were denied. Enable them to receive reminders.");
      }
    });
  } else {
    alert("❌ Notifications are blocked. Please enable them in your browser settings.");
  }
});
