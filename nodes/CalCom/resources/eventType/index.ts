import type { INodeProperties } from 'n8n-workflow';
import { eventTypeGetAllDescription } from './getAll';

const showOnlyForEventTypes = {
	resource: ['eventType'],
};

export const eventTypeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForEventTypes,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many event types',
				description: 'Retrieve the event types bookable on this account',
				routing: {
					request: {
						method: 'GET',
						url: '/event-types',
					},
				},
			},
		],
		default: 'getAll',
	},
	...eventTypeGetAllDescription,
];
