import resource from 'resource-router-middleware';
import CloudDevice from '../azure-iothub';

export default () => resource({

  /** Property name to store preloaded entity on `request`. */
  id: 'tag',

  /** POST / - Send a cloud-to-device message */
  create({ body }, res) {
    console.log(body);
    const connectionString = body.connectionString;
    const targetDevice = body.targetDevice;
    const message = body.message;
    const client = new CloudDevice(connectionString, targetDevice, message);
    client.sendMessage();

    res.json(body);
  },
});
