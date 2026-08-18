import type { INodeProperties } from 'n8n-workflow';
import { bookingGetDescription } from './get';
import { bookingGetAllDescription } from './getAll';
import { bookingCancelDescription } from './cancel';

const showOnlyForBookings = {
	resource: ['booking'],
};

export const bookingDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForBookings,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many bookings',
				description: 'Retrieve bookings, optionally filtered by status or attendee',
				routing: {
					request: {
						method: 'GET',
						url: '/bookings',
						headers: { 'cal-api-version': '2024-08-13' },
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a booking',
				description: 'Retrieve a single booking by its UID',
				routing: {
					request: {
						method: 'GET',
						url: '=/bookings/{{$parameter.bookingUid}}',
						headers: { 'cal-api-version': '2024-08-13' },
					},
				},
			},
			{
				name: 'Cancel',
				value: 'cancel',
				action: 'Cancel a booking',
				description: 'Cancel an existing booking',
				routing: {
					request: {
						method: 'POST',
						url: '=/bookings/{{$parameter.bookingUid}}/cancel',
						headers: { 'cal-api-version': '2024-08-13' },
					},
				},
			},
		],
		default: 'getAll',
	},
	...bookingGetAllDescription,
	...bookingGetDescription,
	...bookingCancelDescription,
];
