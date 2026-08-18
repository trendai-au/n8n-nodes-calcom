import type { INodeProperties } from 'n8n-workflow';

const showOnlyForBookingCancel = {
	operation: ['cancel'],
	resource: ['booking'],
};

export const bookingCancelDescription: INodeProperties[] = [
	{
		displayName: 'Booking UID',
		name: 'bookingUid',
		type: 'string',
		required: true,
		displayOptions: { show: showOnlyForBookingCancel },
		default: '',
		description: 'The UID of the booking to cancel',
	},
	{
		displayName: 'Cancellation Reason',
		name: 'cancellationReason',
		type: 'string',
		displayOptions: { show: showOnlyForBookingCancel },
		default: '',
		description: 'Reason shown to the attendee',
		routing: {
			request: {
				body: {
					cancellationReason: '={{$value}}',
				},
			},
		},
	},
];
