import { Insight } from "@/types/analytics";

export const sampleInsights: Insight[] = [
  {
    id: 1,
    title: "Highest Conversion Source",
    description:
      "LinkedIn generated the highest number of converted leads this month.",
    priority: "High",
  },
  {
    id: 2,
    title: "Inactive Leads",
    description:
      "23 leads have not received any follow-up in the last 7 days.",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Revenue Opportunity",
    description:
      "Following up with pending enterprise leads could increase revenue by approximately ₹1.2L.",
    priority: "High",
  },
  {
    id: 4,
    title: "Duplicate Records",
    description:
      "3 duplicate email addresses were detected in the uploaded dataset.",
    priority: "Low",
  },
  {
    id: 5,
    title: "Best Performing Campaign",
    description:
      "Instagram campaign achieved the highest response rate this week.",
    priority: "Medium",
  },
  {
    id: 6,
    title: "AI Recommendation",
    description:
      "Schedule follow-up emails within 48 hours for pending leads to improve conversion.",
    priority: "High",
  }
];