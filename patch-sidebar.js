const fs = require('fs');
let sidebar = fs.readFileSync('admin-dashboard/components/admin/Sidebar.tsx', 'utf8');
if (!sidebar.includes("href: '/site/links'")) {
    sidebar = sidebar.replace(
        "import { LayoutDashboard, Users, MessageSquare, Briefcase, FileText, Settings, Activity, Image } from 'lucide-react';",
        "import { LayoutDashboard, Users, MessageSquare, Briefcase, FileText, Settings, Activity, Image, Link as LinkIcon } from 'lucide-react';"
    );
    sidebar = sidebar.replace(
        "{ href: '/site/images', label: 'Images', icon: <Image size={20} /> },",
        "{ href: '/site/images', label: 'Images', icon: <Image size={20} /> },\n        { href: '/site/links', label: 'Links', icon: <LinkIcon size={20} /> },"
    );
    fs.writeFileSync('admin-dashboard/components/admin/Sidebar.tsx', sidebar);
}
console.log('Sidebar patched');
