const Client = require('azure-iothub').Client;
const Message = require('azure-iot-common').Message;

const receiveFeedback = (err, receiver) => {
  receiver.on('message', function (msg) {
    console.log('Feedback message:')
    console.log(msg.getData().toString('utf-8'));
  });
}

const printResultFor = (op) => {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

class CloudToDevice {
  constructor(connectionString, targetDevice, message) {
    this.connectionString = connectionString;
    this.targetDevice = targetDevice;
    this.message = message;
    this.sendMessage = this.sendMessage.bind(this);
  }
  sendMessage() {
    const serviceClient = Client.fromConnectionString(this.connectionString);
    serviceClient.open((err) => {
      if (err) {
        console.error('Could not connect: ' + err.message);
        return false;
      } else {
        console.log('Service client connected');
        serviceClient.getFeedbackReceiver(receiveFeedback);
        var message = new Message('Cloud to device message.');
        message.ack = 'full';
        message.messageId = "My Message ID";
        console.log('Sending message: ' + message.getData());
        serviceClient.send(this.targetDevice, this.message, printResultFor('send'));
      }
    });
  }
}

export default CloudToDevice;