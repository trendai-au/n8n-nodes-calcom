import type { INodeProperties } from 'n8n-workflow';

const showOnlyForEventTypeGetAll = {
	operation: ['getAll'],
	resource: ['eventType'],
};

export const eventTypeGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Username',
		name: 'username',
		type: 'string',
		displayOptions: { show: showOnlyForEventTypeGetAll },
		default: '',
		description: 'Only return event types belonging to this Cal.com username',
		routing: {
			request: {
				qs: {
					username: '={{$value || undefined}}',
				},
			},
		},
	},
];
