import { Listener, OrderCreatedEvent, subjects } from '@eg-ticketing/common';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-queue';
import { QUEUE_GROUP_NAME } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
	readonly subject = subjects.OrderCreated;

	queueGroupName = QUEUE_GROUP_NAME;

	async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
		const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

		await expirationQueue.add(
			data.id,
			{
				orderId: data.id,
			},
			{
				delay,
			}
		);

		msg.ack();
	}
}