import { STATUS, PRIORITY } from './constants';

// Mock ticket dataset. In a real app this would come from a REST API.
// Each ticket includes customer info, an issue description, metadata,
// and a mock conversation thread between the customer and support agents.

export const mockTickets = [
  {
    id: 'TKT-1001',
    customer: {
      name: 'Amara Okafor',
      email: 'amara.okafor@example.com',
    },
    subject: 'Unable to reset my password',
    description:
      "I've tried the 'Forgot password' link several times but I never receive the reset email. I checked my spam folder too. Could you help me regain access to my account?",
    priority: PRIORITY.HIGH,
    status: STATUS.OPEN,
    createdAt: '2026-09-08T09:14:00.000Z',
    messages: [
      {
        id: 'm1',
        author: 'Amara Okafor',
        role: 'customer',
        text: "I've tried the 'Forgot password' link several times but I never receive the reset email.",
        timestamp: '2026-09-08T09:14:00.000Z',
      },
      {
        id: 'm2',
        author: 'Support Agent',
        role: 'agent',
        text: "Hi Amara, thanks for reaching out. I can see your account — let me check our mail delivery logs and get back to you shortly.",
        timestamp: '2026-09-08T10:02:00.000Z',
      },
    ],
  },
  {
    id: 'TKT-1002',
    customer: {
      name: 'Liam Chen',
      email: 'liam.chen@example.com',
    },
    subject: 'Billing charged twice this month',
    description:
      'My credit card was charged twice for the Pro subscription on the same day. I only have one active plan. Please refund the duplicate charge.',
    priority: PRIORITY.HIGH,
    status: STATUS.IN_PROGRESS,
    createdAt: '2026-09-07T14:30:00.000Z',
    messages: [
      {
        id: 'm1',
        author: 'Liam Chen',
        role: 'customer',
        text: 'My card was charged twice for the Pro plan. Please refund the duplicate.',
        timestamp: '2026-09-07T14:30:00.000Z',
      },
      {
        id: 'm2',
        author: 'Support Agent',
        role: 'agent',
        text: 'Thanks Liam, I see the duplicate transaction. I have escalated this to billing and a refund is being processed.',
        timestamp: '2026-09-07T15:45:00.000Z',
      },
      {
        id: 'm3',
        author: 'Liam Chen',
        role: 'customer',
        text: 'Great, appreciate the quick response!',
        timestamp: '2026-09-07T16:10:00.000Z',
      },
    ],
  },
  {
    id: 'TKT-1003',
    customer: {
      name: 'Sofia Martinez',
      email: 'sofia.martinez@example.com',
    },
    subject: 'Feature request: dark mode',
    description:
      'Would love to see a dark mode option in the dashboard. The bright white is hard on the eyes during night shifts.',
    priority: PRIORITY.LOW,
    status: STATUS.OPEN,
    createdAt: '2026-09-06T08:00:00.000Z',
    messages: [
      {
        id: 'm1',
        author: 'Sofia Martinez',
        role: 'customer',
        text: 'Please add a dark mode — the white UI is tough on the eyes at night.',
        timestamp: '2026-09-06T08:00:00.000Z',
      },
    ],
  },
  {
    id: 'TKT-1004',
    customer: {
      name: 'Noah Williams',
      email: 'noah.williams@example.com',
    },
    subject: 'App crashes on export to PDF',
    description:
      'Every time I try to export a report to PDF, the app freezes and then crashes. This happens on both Chrome and Firefox.',
    priority: PRIORITY.MEDIUM,
    status: STATUS.IN_PROGRESS,
    createdAt: '2026-09-05T11:20:00.000Z',
    messages: [
      {
        id: 'm1',
        author: 'Noah Williams',
        role: 'customer',
        text: 'PDF export crashes the app on Chrome and Firefox.',
        timestamp: '2026-09-05T11:20:00.000Z',
      },
      {
        id: 'm2',
        author: 'Support Agent',
        role: 'agent',
        text: 'Thanks for the report Noah. Could you tell me the approximate size of the report you are exporting?',
        timestamp: '2026-09-05T12:05:00.000Z',
      },
    ],
  },
  {
    id: 'TKT-1005',
    customer: {
      name: 'Priya Nair',
      email: 'priya.nair@example.com',
    },
    subject: 'How do I invite team members?',
    description:
      'I upgraded to the Team plan but I cannot find where to invite my colleagues. Is there a settings page for this?',
    priority: PRIORITY.LOW,
    status: STATUS.RESOLVED,
    createdAt: '2026-09-04T16:45:00.000Z',
    messages: [
      {
        id: 'm1',
        author: 'Priya Nair',
        role: 'customer',
        text: 'Where do I invite team members after upgrading to the Team plan?',
        timestamp: '2026-09-04T16:45:00.000Z',
      },
      {
        id: 'm2',
        author: 'Support Agent',
        role: 'agent',
        text: 'Hi Priya! Go to Settings → Team → Invite. Enter your colleague emails there and they will receive an invitation.',
        timestamp: '2026-09-04T17:30:00.000Z',
      },
      {
        id: 'm3',
        author: 'Priya Nair',
        role: 'customer',
        text: 'Found it, thank you so much!',
        timestamp: '2026-09-04T17:52:00.000Z',
      },
    ],
  },
  {
    id: 'TKT-1006',
    customer: {
      name: 'Marcus Johnson',
      email: 'marcus.johnson@example.com',
    },
    subject: 'API rate limit too low',
    description:
      'We are hitting the 100 requests/minute rate limit constantly on our integration. Can this be raised for our account?',
    priority: PRIORITY.MEDIUM,
    status: STATUS.OPEN,
    createdAt: '2026-09-09T07:05:00.000Z',
    messages: [
      {
        id: 'm1',
        author: 'Marcus Johnson',
        role: 'customer',
        text: 'Our integration keeps hitting the 100 req/min rate limit. Can we get it raised?',
        timestamp: '2026-09-09T07:05:00.000Z',
      },
    ],
  },
  {
    id: 'TKT-1007',
    customer: {
      name: 'Elena Rossi',
      email: 'elena.rossi@example.com',
    },
    subject: 'Data not syncing across devices',
    description:
      'Changes I make on my laptop are not showing up on my phone app until I manually refresh. Sync used to be instant.',
    priority: PRIORITY.HIGH,
    status: STATUS.RESOLVED,
    createdAt: '2026-09-03T13:15:00.000Z',
    messages: [
      {
        id: 'm1',
        author: 'Elena Rossi',
        role: 'customer',
        text: 'Sync between my laptop and phone is delayed — it used to be instant.',
        timestamp: '2026-09-03T13:15:00.000Z',
      },
      {
        id: 'm2',
        author: 'Support Agent',
        role: 'agent',
        text: 'We identified a regression in our sync service and deployed a fix. Please confirm if it is working now.',
        timestamp: '2026-09-03T18:40:00.000Z',
      },
      {
        id: 'm3',
        author: 'Elena Rossi',
        role: 'customer',
        text: 'Yes, syncing is instant again. Thanks!',
        timestamp: '2026-09-03T19:05:00.000Z',
      },
    ],
  },
  {
    id: 'TKT-1008',
    customer: {
      name: 'David Kim',
      email: 'david.kim@example.com',
    },
    subject: 'Cannot upload files larger than 5MB',
    description:
      'The uploader rejects any file over 5MB with a generic error. Our documents are often 10-20MB. Is there a way around this?',
    priority: PRIORITY.MEDIUM,
    status: STATUS.IN_PROGRESS,
    createdAt: '2026-09-08T19:50:00.000Z',
    messages: [
      {
        id: 'm1',
        author: 'David Kim',
        role: 'customer',
        text: 'File uploads over 5MB fail with a generic error. We need to upload 10-20MB docs.',
        timestamp: '2026-09-08T19:50:00.000Z',
      },
      {
        id: 'm2',
        author: 'Support Agent',
        role: 'agent',
        text: 'Thanks David. The 5MB cap applies to the Starter plan; the Pro plan supports up to 50MB. I can walk you through upgrading.',
        timestamp: '2026-09-09T08:15:00.000Z',
      },
    ],
  },
];
