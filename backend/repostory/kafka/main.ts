import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'recipe-world-ui',
    brokers: ['localhost:30092'],
    ssl: false,
    retry: {
        initialRetryTime: 110,
        retries: 4
    }
});

const kafkaProducer = kafka.producer();
const admin = kafka.admin();

const run = async () => {
    await admin.connect();
    await kafkaProducer.connect();

    const topics = await admin.listTopics();
    if (!topics.includes('test-topic')) {
        await admin.createTopics({
            topics: [{
                topic: 'test-topic',
                numPartitions: 1,
                replicationFactor: 1
            }]
        });
        console.log('Topic created successfully');
    }

    await kafkaProducer.send({
        topic: 'test-topic',
        messages: [{ key: 'key1', value: 'Hello Kafka!' }],
    });
    console.log('Message sent!');

    await kafkaProducer.disconnect();
    await admin.disconnect();
};

run().catch(console.error);
// Connect the producer when the module is loaded
// const connectProducer = async () => {
//     try {
//         await kafkaProducer.connect();
//         console.log('Successfully connected to Kafka');
//     } catch (error) {
//         console.error('Failed to connect to Kafka:', error);
//     }
// };

// // Connect immediately
// connectProducer();

// Handle graceful shutdown
process.on('SIGTERM', async () => {
    try {
        await kafkaProducer.disconnect();
        console.log('Disconnected from Kafka');
    } catch (error) {
        console.error('Error disconnecting from Kafka:', error);
    }
    process.exit(0);
});

export {
    kafkaProducer
}