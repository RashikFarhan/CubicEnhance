const fs = require('fs');

let table = fs.readFileSync('admin-dashboard/app/(admin)/inquiries/contact/InquiriesTable.tsx', 'utf8');

if (!table.includes('selected.preferred_date')) {
    table = table.replace(
        '{selected.service_interest && <div><span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Service</span><p className="text-gray-600">{selected.service_interest}</p></div>}',
        '{selected.service_interest && <div><span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Service</span><p className="text-gray-600">{selected.service_interest}</p></div>}\n            {selected.preferred_date && <div><span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Preferred Date / Company Type</span><p className="text-gray-600">{selected.preferred_date}</p></div>}\n            {selected.timezone && <div><span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Time Zone</span><p className="text-gray-600">{selected.timezone}</p></div>}'
    );
    fs.writeFileSync('admin-dashboard/app/(admin)/inquiries/contact/InquiriesTable.tsx', table);
}
console.log('Updated InquiriesTable.tsx');
