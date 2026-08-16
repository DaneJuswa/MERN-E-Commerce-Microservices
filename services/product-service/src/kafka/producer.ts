// src/kafka/producer.ts

import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "product-service",
    brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

const producer = kafka.producer();

export const connectProducer = async () => {
    await producer.connect();
    console.log("Kafka Producer Connected");
};

export const publishProductCreated = async (product: {
    productId: string;
    name: string;
    price: number;
}) => {
    await producer.send({
        topic: "product.created",
        messages: [
            {
                key: product.productId,
                value: JSON.stringify({
                    event: "product.created",
                    data: product,
                    timestamp: new Date().toISOString(),
                }),
            },
        ],
    });

    console.log("product.created event published");
};