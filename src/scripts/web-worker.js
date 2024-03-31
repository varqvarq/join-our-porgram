let events = [];

onmessage = async (e) => {
  events.push(e.data);
  console.log(events)


  if(events.length === 5) {
    sendDataToServer(events);
    events = []
  }
}
async function sendDataToServer(data) {
  try {
    const response = await fetch('api/analytics/user', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    if(!response.ok) {
      throw new Error('failed to send data')
    } else {
      let data = await response.json();
      console.log(data);
    }

  } catch(e){
    console.error(e);
  }
}