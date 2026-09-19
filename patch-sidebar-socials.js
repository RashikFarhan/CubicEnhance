const fs = require('fs');

let sidebar = fs.readFileSync('admin-dashboard/components/admin/Sidebar.tsx', 'utf8');

// Add Link and Share2 (for Socials) to lucide-react imports if missing
if (!sidebar.includes('LinkIcon')) {
    sidebar = sidebar.replace(/import \{([^}]+)\} from 'lucide-react';/, "import {$1, Link as LinkIcon, Share2 } from 'lucide-react';");
}

// Add Socials link to Site Config
if (!sidebar.includes("href: '/site/socials'")) {
    sidebar = sidebar.replace(
        "{ href: '/site/links', label: 'Links', icon: <LinkIcon size={20} /> },",
        "{ href: '/site/links', label: 'Links', icon: <LinkIcon size={20} /> },\n        { href: '/site/socials', label: 'Socials', icon: <Share2 size={20} /> },"
    );
}

fs.writeFileSync('admin-dashboard/components/admin/Sidebar.tsx', sidebar);
console.log('Fixed Sidebar.tsx imports and added Socials');
