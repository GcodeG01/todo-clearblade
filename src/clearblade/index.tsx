import 'clearblade-js-client/lib/mqttws31'; 
import { ClearBlade } from 'clearblade-js-client';

const cb = new ClearBlade();

const initCallback = (err: boolean, data: any) => {
  if (err) {
    console.log('connection failed');
  } else {
    console.log ('connection successful');
  };
};

type InitType = {
  URI: string,
  messagingURI: string,
  messagingPort: number,
  useMQTT: boolean,
  cleanSession: boolean,
  systemKey: string,
  systemSecret: string,
  callback: CbCallback<any>,
  email: string,
  password: string
}

const initOptions: InitType = {
  URI: "https://platform.clearblade.com",
  messagingURI: "platform.clearblade.com",
  messagingPort: 8904,
  useMQTT: true,
  cleanSession: true,
  systemKey: "b686bf860cccd6b2efc799ddbabe01",
  systemSecret: "B686BF860CE4C6ABF5DDFFAD9163",
  callback: initCallback,
  email: '',
  password: ''
}

cb.init(initOptions)
export { cb, initOptions };