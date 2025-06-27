import { LoopsClient } from "loops";
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

async function processFailedContact() {
  const loops = new LoopsClient(process.env.LOOPS_API_KEY!);
  
  const contactData = {
    email: 'admin@nocnok.com',
    name: 'CARLOS G ALATORRE S',
    totalSpent: '$99.99',
    plan: 'PRO',
    source: 'Memberstack', // Assigning to Memberstack as requested
    userGroup: 'Pro Customer',
    lastUpdated: new Date().toISOString(),
  };
  
  try {
    console.log('Processing failed contact: admin@nocnok.com');
    await loops.updateContact(contactData.email, contactData);
    console.log('✅ Successfully updated admin@nocnok.com');
  } catch (error) {
    console.error('Failed to update contact:', error);
  }
}

processFailedContact();