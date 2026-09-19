const fs = require('fs');

// 1. Update schema.ts
let schema = fs.readFileSync('lib/firebase/schema.ts', 'utf8');
schema = schema.replace(/export interface SiteMetrics \{[^}]+\}/,
  `export interface SiteMetrics {
  total_tasks: number;
  contractual_accounts: number;
  years_operational: number;
  employee_experience: number;
  total_clients?: number;
  total_employees_core?: number;
  contractual_fleet_size?: number;
}`
);
fs.writeFileSync('lib/firebase/schema.ts', schema);

// 2. Update MetricsForm.tsx
let form = fs.readFileSync('app/(admin)/site/metrics/MetricsForm.tsx', 'utf8');
form = form.replace(/const METRIC_FIELDS.*?\];/s,
`const METRIC_FIELDS: { key: keyof SiteMetrics; label: string; description: string }[] = [
  { key: 'total_tasks', label: 'Total Tasks Completed', description: 'Drives the far-left counter on the homepage' },
  { key: 'contractual_accounts', label: 'Contractual Managed Accounts', description: 'Drives the second counter. Must be manually updated here or calculated.' },
  { key: 'years_operational', label: 'Years in Operation', description: 'Drives the third counter' },
  { key: 'employee_experience', label: 'Years Employee Experience', description: 'Drives the fourth counter' }
];`);
fs.writeFileSync('app/(admin)/site/metrics/MetricsForm.tsx', form);
console.log('Admin files updated successfully.');
