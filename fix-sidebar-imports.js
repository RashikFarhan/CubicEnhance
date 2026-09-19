const fs = require('fs');

let sidebar = fs.readFileSync('admin-dashboard/components/admin/Sidebar.tsx', 'utf8');

// The line is exactly: import { LayoutDashboard, List, Image, Activity, Mail, Users, Settings, ExternalLink, LogOut } from 'lucide-react';
sidebar = sidebar.replace(
    "import { LayoutDashboard, List, Image, Activity, Mail, Users, Settings, ExternalLink, LogOut } from 'lucide-react';", 
    "import { LayoutDashboard, List, Image, Activity, Mail, Users, Settings, ExternalLink, LogOut, Link as LinkIcon, Share2 } from 'lucide-react';"
);

fs.writeFileSync('admin-dashboard/components/admin/Sidebar.tsx', sidebar);
console.log('Fixed Sidebar imports perfectly');
