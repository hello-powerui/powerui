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
    };

    // Only add properties if they're defined
    if (contact.firstName !== undefined) contactProperties.firstName = contact.firstName;
    if (contact.lastName !== undefined) contactProperties.lastName = contact.lastName;
    if (contact.userGroup !== undefined) contactProperties.userGroup = contact.userGroup;
    if (contact.userId !== undefined) contactProperties.userId = contact.userId;
    if (contact.plan !== undefined) contactProperties.plan = contact.plan;

    const response = await loops.createContact(contact.email, contactProperties);
    
    return { success: true, data: response };
  } catch (error) {
    console.error("Error creating/updating Loops contact:", error);
    return { success: false, error };
  }
}

export async function updateContactPlan(email: string, plan: string) {
  try {
    const userGroup = plan === 'TEAM' ? 'team' : 'pro';
    const response = await loops.updateContact(email, { 
      plan,
      userGroup 
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