import { DatasetSummary } from "./analyzer";

export interface AIRecommendation {
  priority: "High" | "Medium" | "Low";
  title: string;
  description: string;
}

export function generateRecommendations(
  summary: DatasetSummary
): AIRecommendation[] {
  const recommendations: AIRecommendation[] = [];

  if (summary.duplicateRows > 0) {
    recommendations.push({
      priority: "High",
      title: "Remove Duplicate Leads",
      description: `Detected ${summary.duplicateRows} duplicate records. Removing duplicates prevents repeated outreach and improves reporting accuracy.`,
    });
  }

  if (summary.missingValues > 0) {
    recommendations.push({
      priority: "High",
      title: "Complete Missing Data",
      description: `There are ${summary.missingValues} missing field values. Fill important customer information before starting campaigns.`,
    });
  }

  if (summary.invalidEmails > 0) {
    recommendations.push({
      priority: "High",
      title: "Validate Email Addresses",
      description: `${summary.invalidEmails} email addresses appear to be invalid. Verify or remove them to improve email delivery.`,
    });
  }

  if (summary.invalidPhones > 0) {
    recommendations.push({
      priority: "High",
      title: "Validate Phone Numbers",
      description: `${summary.invalidPhones} phone numbers appear invalid. Correct them before running call campaigns.`,
    });
  }

  if (summary.completionRate < 70) {
    recommendations.push({
      priority: "High",
      title: "Improve Dataset Quality",
      description: `Dataset completion is only ${summary.completionRate}%. Collect more complete customer information.`,
    });
  } else if (summary.completionRate < 90) {
    recommendations.push({
      priority: "Medium",
      title: "Improve Data Completeness",
      description: `Dataset completion is ${summary.completionRate}%. Filling remaining missing values will improve AI insights.`,
    });
  } else {
    recommendations.push({
      priority: "Low",
      title: "Dataset Quality is Good",
      description: `Dataset completion is ${summary.completionRate}%. Continue maintaining clean lead data.`,
    });
  }

  if (
    summary.duplicateRows === 0 &&
    summary.invalidEmails === 0 &&
    summary.invalidPhones === 0 &&
    summary.missingValues === 0
  ) {
    recommendations.push({
      priority: "Low",
      title: "Ready for Campaign",
      description:
        "No major data quality issues were detected. The dataset is suitable for marketing and sales campaigns.",
    });
  }

  return recommendations;
}