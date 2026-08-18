import type { INodeProperties } from 'n8n-workflow';

const showOnlyForBookingGet = {
	operation: ['get'],
	resource: ['booking'],
};

export const bookingGetDescription: INodeProperties[] = [
	{
		displayName: 'Booking UID',
		name: 'bookingUid',
		type: 'string',
		required: true,
		displayOptions: { show: showOnlyForBookingGet },
		default: '',
		description: 'The UID of the booking to retrieve',
	},
];
