export const dynamic = "force-static";

const summarizeUsers = (
  users: Array<{
    company: { department?: string };
    gender: "male" | "female";
    age: number;
    hair?: { color?: string };
    firstName: string;
    lastName: string;
    address?: { postalCode?: string };
  }>
) => {
  if (!users || !Array.isArray(users)) {
    throw new Error("Invalid user data");
  }

  const summary: Record<
    string, // department name
    {
      male: number; // ---> Male Count Summary
      female: number; // ---> Female Count Summary
      ageRange: string; // ---> Range
      hair: Record<string, number>; // ---> "Color": Color Summary
      addressUser: Record<string, string>; // ---> "Full Name": Postal Code Summary
    }
  > = {};

  const ages: number[] = []; // To collect ages for range calculation

  for (const user of users) {
    const department = user.company?.department || "Unknown";

    if (!summary[department]) {
      summary[department] = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {},
      };
    }

    // Count gender
    if (user.gender === "male") summary[department].male++;
    else if (user.gender === "female") summary[department].female++;

    // Collect ages
    ages.push(user.age);

    // Count hair color
    const color = user.hair?.color;
    if (color) {
      summary[department].hair[color] =
        (summary[department].hair[color] || 0) + 1;
    }

    // Address summary
    const fullName = `${user.firstName}${user.lastName}`;
    const postalCode = user.address?.postalCode;
    if (postalCode) {
      summary[department].addressUser[fullName] = postalCode;
    }
  }

  // Finalize age ranges
  for (const dept in summary) {
    const min = Math.min(...ages);
    const max = Math.max(...ages);
    summary[dept].ageRange = `${min}-${max}`;
  }

  return summary;
};

export async function GET() {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();

  return Response.json(summarizeUsers(data.users));
}
