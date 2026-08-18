import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { bookingDescription } from './resources/booking';
import { eventTypeDescription } from './resources/eventType';

export class CalCom implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Cal.com',
		name: 'calCom',
		icon: { light: 'file:calcom.svg', dark: 'file:calcom.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Cal.com scheduling API',
		defaults: {
			name: 'Cal.com',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'calComApi',
				required: true,
			},
		],
		requestDefaults: {
			// Set on the credential so the same node serves Cal.com cloud and
			// self-hosted instances, which expose /api/v2 on their own domain.
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			// NOTE: cal-api-version is deliberately NOT set globally. Verified
			// against the live API 2026-08-18: /bookings needs 2024-08-13 to
			// return a flat array, but /event-types 404s on that version and
			// needs 2024-06-14. The header is set per operation instead.
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Booking',
						value: 'booking',
					},
					{
						name: 'Event Type',
						value: 'eventType',
					},
				],
				default: 'booking',
			},
			...bookingDescription,
			...eventTypeDescription,
		],
	};
}
