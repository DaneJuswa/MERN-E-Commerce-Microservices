import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "cart-service",
    brokers: [process.env.KAFKA_BROKER || "localhost:9092"]
})

const consumer = kafka.consumer({
    groupId: "cart-service-group"
});

export const connectConsumer = async () => {
    await consumer.connect()

    console.log("Cart Kafka Consumer Connected");

    await consumer.subscribe({
        topic: "product.created",
        fromBeginning: true,
    });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const value = message.value?.toString();

            console.log("Received Kafka message:");
            console.log("Topic:", topic);
            console.log("Partition:", partition);
            console.log("Message:", value);
        },
    })
}