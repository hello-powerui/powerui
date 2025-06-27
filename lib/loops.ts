import { LoopsClient } from "loops";

const loops = new LoopsClient(process.env.LOOPS_API_KEY!);

export interface LoopsContact {
  email: string;
  firstName?: string;
  lastName?: string;
  userGroup?: string;
  userId?: string;
  plan?: string;
  source?: string;
}

export async function createOrUpdateContact(contact: LoopsContact) {
  try {
    // Build the contact properties object, only including defined values
    const contactProperties: Record<string, string | number | boolean | null> = {
      source: contact.source || "app",
      lastUpdated: new Date().toISOString(),
    };

    // Only add properties if they're defined
    if (contact.firstName !== undefined) contactProperties.firstName = contact.firstName;
    if (contact.lastName !== undefined) contactProperties.lastName = contact.lastName;
    if (contact.userId !== undefined) contactProperties.userId = contact.userId;
    
    // Updated plan logic - use empty string for free users
    if (contact.plan !== undefined) {
      contactProperties.plan = contact.plan === 'PRO' || contact.plan === 'TEAM' ? contact.plan : '';
    }
    
    // Updated userGroup logic to match our migration
    if (contact.userGroup !== undefined) {
      contactProperties.userGroup = contact.userGroup;
    } else if (contact.plan) {
      // Auto-determine userGroup based on plan
      if (contact.plan === 'TEAM') {
        contactProperties.userGroup = 'Team Customer';
      } else if (contact.plan === 'PRO') {
        contactProperties.userGroup = 'Pro Customer';
      } else {
        contactProperties.userGroup = 'Free User';
      }
    }

    // Try to update first, create if it fails
    try {
      const response = await loops.updateContact(contact.email, contactProperties);
      return { success: true, data: response };
    } catch (error: any) {
      // If update fails because contact doesn't exist, create it
      if (error.message?.includes('not found') || error.message?.includes('does not exist')) {
        const response = await loops.createContact(contact.email, contactProperties);
        return { success: true, data: response };
      }
      throw error;
    }
  } catch (error) {
    console.error("Error creating/updating Loops contact:", error);
    return { success: false, error };
  }
}

export async function updateContactPlan(email: string, plan: string) {
  try {
    // Determine user group based on plan
    let userGroup: string;
    if (plan === 'TEAM') {
      userGroup = 'Team Customer';
    } else if (plan === 'PRO') {
      userGroup = 'Pro Customer';
    } else {
      userGroup = 'Free User';
    }
    
    const response = await loops.updateContact(email, { 
      plan: plan === 'PRO' || plan === 'TEAM' ? plan : '',
      userGroup,
      lastUpdated: new Date().toISOString()
    });
    return { success: true, data: response };
  } catch (error) {
    console.error("Error updating Loops contact plan:", error);
    return { success: false, error };
  }
}

export async function deleteContact(email: string) {
  try {
    const response = await loops.deleteContact({ email });
    return { success: true, data: response };
  } catch (error) {
    console.error("Error deleting Loops contact:", error);
    return { success: false, error };
  }
}

export async function findContact(email: string) {
  try {
    const response = await loops.findContact({ email });
    return { success: true, data: response };
  } catch (error) {
    console.error("Error finding Loops contact:", error);
    return { success: false, error };
  }
}

export async function sendEvent(email: string, eventName: string, eventProperties?: Record<string, any>) {
  try {
    const response = await loops.sendEvent({
      email,
      eventName,
      eventProperties,
    });
    return { success: true, data: response };
  } catch (error) {
    console.error("Error sending Loops event:", error);
    return { success: false, error };
  }
}