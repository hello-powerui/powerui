import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { parse } from 'csv-parse/sync';
import path from 'path';

interface Customer {
  email: string;
  firstName?: string;
  lastName?: string;
  source: string;
  userGroup: string;
  signupDate?: string;
  purchaseDate?: string;
  plan: string;
  totalSpent: number;
  teamRole?: string;
  stripeCustomerId?: string;
}

interface TeamData {
  admin: string;
  members: string[];
}

interface TeamMembersFile {
  teams: TeamData[];
}

function createComprehensiveCustomerDocument() {
  console.log('📊 Creating Comprehensive Customer Document\n');

  // 1. Read the Loops export (our most complete source)
  const loopsPath = '/Users/jonsandmann/projects/powerui/customer-analysis/output/loops-final-export.csv';
  const loopsContent = readFileSync(loopsPath, 'utf-8');
  const loopsContacts = parse(loopsContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // 2. Read the original customer CSV for additional data
  const customerCsvPath = '/Users/jonsandmann/projects/powerui/customer-analysis/output/consolidated-customers.csv';
  const customerCsvContent = readFileSync(customerCsvPath, 'utf-8');
  const originalCustomers = parse(customerCsvContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // 3. Read team members data
  const teamData: TeamMembersFile = JSON.parse(
    readFileSync('/Users/jonsandmann/projects/powerui/customer-analysis/team-members.json', 'utf-8')
  );

  // Create maps for quick lookup
  const customerMap = new Map<string, any>();
  originalCustomers.forEach((c: any) => {
    customerMap.set(c.email.toLowerCase(), c);
  });

  // Create team role map
  const teamRoleMap = new Map<string, string>();
  teamData.teams.forEach(team => {
    teamRoleMap.set(team.admin.toLowerCase(), 'admin');
    team.members.forEach(member => {
      teamRoleMap.set(member.toLowerCase(), 'member');
    });
  });

  // Build comprehensive customer list
  const comprehensiveCustomers: Customer[] = [];
  
  loopsContacts.forEach((contact: any) => {
    const email = contact.email.toLowerCase();
    const originalData = customerMap.get(email);
    
    // Parse total spent
    let totalSpent = 0;
    if (contact.totalSpent) {
      totalSpent = parseFloat(contact.totalSpent.replace('$', '').replace(',', ''));
    } else if (originalData?.total_spent) {
      totalSpent = parseFloat(originalData.total_spent);
    }

    // Determine dates
    let signupDate = originalData?.first_seen || '';
    let purchaseDate = originalData?.last_activity || '';
    
    // For paid customers, purchase date is likely their first_seen date
    if ((contact.plan === 'PRO' || contact.plan === 'TEAM') && originalData?.first_seen) {
      purchaseDate = originalData.first_seen;
    }

    // Get Stripe customer ID
    let stripeCustomerId = originalData?.stripe_customer_id || '';

    // Parse name if we don't have firstName/lastName
    let firstName = contact.firstName || '';
    let lastName = contact.lastName || '';
    
    if ((!firstName || !lastName) && originalData?.name) {
      const nameParts = originalData.name.split(' ');
      if (nameParts.length >= 2) {
        firstName = firstName || nameParts[0];
        lastName = lastName || nameParts.slice(1).join(' ');
      } else if (nameParts.length === 1) {
        firstName = firstName || nameParts[0];
      }
    }

    const customer: Customer = {
      email: contact.email,
      firstName,
      lastName,
      source: contact.source || '',
      userGroup: contact.userGroup || 'Free User',
      signupDate,
      purchaseDate,
      plan: contact.plan || '',
      totalSpent,
      teamRole: teamRoleMap.get(email) || contact.teamRole || '',
      stripeCustomerId,
    };

    comprehensiveCustomers.push(customer);
  });

  // Sort by email for consistency
  comprehensiveCustomers.sort((a, b) => a.email.localeCompare(b.email));

  // Create output directory
  const outputDir = path.join(process.cwd(), 'customer-analysis/final');
  mkdirSync(outputDir, { recursive: true });

  // Save as CSV
  const csvLines = [
    'email,firstName,lastName,source,userGroup,signupDate,purchaseDate,plan,totalSpent,teamRole,stripeCustomerId',
    ...comprehensiveCustomers.map(c => [
      c.email,
      c.firstName || '',
      c.lastName || '',
      c.source,
      c.userGroup,
      c.signupDate || '',
      c.purchaseDate || '',
      c.plan,
      c.totalSpent.toFixed(2),
      c.teamRole || '',
      c.stripeCustomerId || ''
    ].map(field => {
      // Escape fields containing commas
      if (typeof field === 'string' && field.includes(',')) {
        return `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    }).join(','))
  ];

  const csvPath = path.join(outputDir, 'comprehensive-customer-data.csv');
  writeFileSync(csvPath, csvLines.join('\n'));

  // Save as JSON for easier programmatic access
  const jsonPath = path.join(outputDir, 'comprehensive-customer-data.json');
  writeFileSync(jsonPath, JSON.stringify({
    metadata: {
      totalCustomers: comprehensiveCustomers.length,
      generatedAt: new Date().toISOString(),
      sources: {
        loops: loopsContacts.length,
        original: originalCustomers.length,
        teams: teamData.teams.length
      }
    },
    customers: comprehensiveCustomers
  }, null, 2));

  // Generate summary statistics
  const stats = {
    totalCustomers: comprehensiveCustomers.length,
    byPlan: {} as Record<string, number>,
    bySource: {} as Record<string, number>,
    byUserGroup: {} as Record<string, number>,
    totalRevenue: 0,
    teamStats: {
      totalTeams: teamData.teams.length,
      totalAdmins: 0,
      totalMembers: 0,
    },
    customersWithStripeId: 0,
  };

  comprehensiveCustomers.forEach(c => {
    // Plan stats
    const plan = c.plan || 'Free';
    stats.byPlan[plan] = (stats.byPlan[plan] || 0) + 1;

    // Source stats
    stats.bySource[c.source] = (stats.bySource[c.source] || 0) + 1;

    // User group stats
    stats.byUserGroup[c.userGroup] = (stats.byUserGroup[c.userGroup] || 0) + 1;

    // Revenue
    stats.totalRevenue += c.totalSpent;

    // Team roles
    if (c.teamRole === 'admin') stats.teamStats.totalAdmins++;
    if (c.teamRole === 'member') stats.teamStats.totalMembers++;

    // Stripe IDs
    if (c.stripeCustomerId) stats.customersWithStripeId++;
  });

  console.log('📊 Summary Statistics:\n');
  console.log(`Total Customers: ${stats.totalCustomers}`);
  console.log(`Total Revenue: $${stats.totalRevenue.toFixed(2)}`);
  console.log(`Customers with Stripe ID: ${stats.customersWithStripeId}`);
  
  console.log('\n💎 By Plan:');
  Object.entries(stats.byPlan).sort((a, b) => b[1] - a[1]).forEach(([plan, count]) => {
    console.log(`  ${plan || 'Free'}: ${count} (${((count / stats.totalCustomers) * 100).toFixed(1)}%)`);
  });

  console.log('\n📍 By Source:');
  Object.entries(stats.bySource).sort((a, b) => b[1] - a[1]).forEach(([source, count]) => {
    console.log(`  ${source}: ${count} (${((count / stats.totalCustomers) * 100).toFixed(1)}%)`);
  });

  console.log('\n👥 By User Group:');
  Object.entries(stats.byUserGroup).sort((a, b) => b[1] - a[1]).forEach(([group, count]) => {
    console.log(`  ${group}: ${count} (${((count / stats.totalCustomers) * 100).toFixed(1)}%)`);
  });

  console.log('\n🏢 Team Statistics:');
  console.log(`  Total Teams: ${stats.teamStats.totalTeams}`);
  console.log(`  Team Admins: ${stats.teamStats.totalAdmins}`);
  console.log(`  Team Members: ${stats.teamStats.totalMembers}`);

  // Save summary
  const summaryPath = path.join(outputDir, 'customer-summary.json');
  writeFileSync(summaryPath, JSON.stringify(stats, null, 2));

  console.log('\n✅ Files created:');
  console.log(`  - ${csvPath}`);
  console.log(`  - ${jsonPath}`);
  console.log(`  - ${summaryPath}`);
}

// Run the script
createComprehensiveCustomerDocument();