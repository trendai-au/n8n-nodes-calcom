import type { INodeProperties } from 'n8n-workflow';

const showOnlyForBookingGetAll = {
	operation: ['getAll'],
	resource: ['booking'],
};

export const bookingGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		displayOptions: { show: showOnlyForBookingGetAll },
		options: [
			{ name: 'Any', value: '' },
			{ name: 'Cancelled', value: 'cancelled' },
			{ name: 'Past', value: 'past' },
			{ name: 'Upcoming', value: 'upcoming' },
		],
		default: '',
		description: 'Filter bookings by status',
		routing: {
			request: {
				qs: {
					status: '={{$value || undefined}}',
				},
			},
		},
	},
	{
		displayName: 'Attendee Email',
		name: 'attendeeEmail',
		type: 'string',
		placeholder: 'name@email.com',
		displayOptions: { show: showOnlyForBookingGetAll },
		default: '',
		description: 'Only return bookings for this attendee',
		routing: {
			request: {
				qs: {
					attendeeEmail: '={{$value || undefined}}',
				},
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1 },
		displayOptions: { show: showOnlyForBookingGetAll },
		default: 50,
		description: 'Max number of results to return',
		routing: {
			request: {
				qs: {
					take: '={{$value}}',
				},
			},
		},
	},
];
