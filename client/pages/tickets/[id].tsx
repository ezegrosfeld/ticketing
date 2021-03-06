import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '../../components/Button';
import Text from '../../components/Text';
import useFetch from '../../hooks/use-fetch';
import useRequest from '../../hooks/use-request';
import useUser from '../../hooks/use-user';

const Ticket = () => {
	useUser(true);
	const router = useRouter();
	const { id } = router.query;
	if (!id) return null;
	const { data: ticket, isLoading } = useFetch(`/api/tickets/${id}`, {
		refreshInterval: 1,
	});

	if (isLoading) return <h1>Cargando...</h1>;

	const [loading, setLoading] = useState(false);
	const { doRequest, errors } = useRequest({
		url: '/api/orders',
		method: 'post',
		body: {
			ticketId: id ?? '',
		},
		onSuccess: (order: any) => router.push(`/orders/${order.id}`),
	});

	const submit = async () => {
		if (!loading) {
			setLoading(true);
			await doRequest();
		}
		setLoading(false);
	};

	return (
		<div className="p-10 xs:text-center">
			<Text variant="h1" className="text-4xl font-bold" text={ticket.title} />
			<Text
				variant="h2"
				className="mt-6"
				color="gray"
				text={`Precio: $ ${ticket.price}`}
			/>
			{ticket.orderId && (
				<Text variant="h2" className="mt-6 text-pink-600" text={`Reservado`} />
			)}
			<Button
				onClick={submit}
				loading={loading}
				disabled={!!ticket.orderId || loading}
				text="Comprar"
				className="sm:ml-0 mt-7"
			/>
			{errors}
		</div>
	);
};

export default Ticket;
