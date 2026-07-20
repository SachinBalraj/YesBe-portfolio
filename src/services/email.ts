import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_default";
const ENQUIRY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ENQUIRY_TEMPLATE_ID || "template_enquiry";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

export interface EnquiryFormData {
  name: string;
  company: string;
  designation: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  projectDescription: string;
  businessChallenges: string;
  goals: string;
}

export async function sendEnquiryEmail(data: EnquiryFormData): Promise<{ success: boolean; message: string }> {
  try {
    await emailjs.send(
      SERVICE_ID,
      ENQUIRY_TEMPLATE_ID,
      {
        full_name: data.name,
        company: data.company,
        designation: data.designation,
        email: data.email,
        phone: data.phone,
        service: data.service,
        budget: data.budget,
        timeline: data.timeline,
        project_description: data.projectDescription,
        business_challenges: data.businessChallenges,
        goals: data.goals,
      },
      PUBLIC_KEY
    );
    return { success: true, message: "Thank you! Your enquiry has been submitted. We'll get back to you within 24 hours." };
  } catch {
    return { success: false, message: "Failed to submit enquiry. Please try again or contact us directly via WhatsApp." };
  }
}
