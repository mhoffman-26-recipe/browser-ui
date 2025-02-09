import { Kafka } from 'kafkajs';
import { KAFKA_BROKER } from '../../utils/consts';

const kafka = new Kafka({
    clientId: 'recipe-world-ui',
    brokers: [KAFKA_BROKER],
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
    
    
    const topics = await admin.listTopics();
    if (!topics.includes('generate-report')) {
        await admin.createTopics({
            topics: [{
                topic: 'generate-report',
                numPartitions: 1,
                replicationFactor: 1
            }]
        });
        console.log('Topic created successfully');
    }

    await admin.disconnect();
};

run().catch(console.error);


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