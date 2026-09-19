const fs = require('fs');
let sidebar = fs.readFileSync('components/admin/Sidebar.tsx', 'utf8');
sidebar = sidebar.replace("{ href: '/site/metrics', label: 'Metrics', icon: <Activity size={20} /> },", 
`{ href: '/site/metrics', label: 'Metrics', icon: <Activity size={20} /> },
        { href: '/site/images', label: 'Images', icon: <Image size={20} /> },`);
// Need to add Image icon if it's imported from lucide-react
if (sidebar.includes('lucide-react') && !sidebar.includes('Image')) {
    sidebar = sidebar.replace('Activity', 'Activity, Image');
}
fs.writeFileSync('components/admin/Sidebar.tsx', sidebar);
console.log('Sidebar updated');
